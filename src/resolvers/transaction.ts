import {
	Arg,
	Ctx,
	Field,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { Company } from '../entities/Company';
import { CurrentHolding } from '../entities/CurrentHolding';
import { Transaction } from '../entities/Transaction';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { TransactionResponse } from './modules/TransactionResponse';

@InputType()
export class TransactionInput {
	@Field()
	type: string;

	@Field(() => Int)
	noOfShares: number;

	@Field(() => Int)
	companyId: number;
}

@Resolver()
export class TransactionResolver {
	@Query(() => [Transaction])
	@UseMiddleware(isAuth)
	async transactions(@Ctx() { req }: MyContext): Promise<Transaction[]> {
		const user = await User.findOneOrFail(req.session!.userId);
		return Transaction.find({
			where: {
				user: user,
			},
			relations: ['user', 'company'],
			order: {
				id: 'DESC',
			},
		});
	}

	// Change this to buy
	@Mutation(() => TransactionResponse)
	@UseMiddleware(isAuth)
	async buy(
		@Arg('options') options: TransactionInput,
		@Ctx() { req }: MyContext
	): Promise<TransactionResponse> {
		const user = await User.findOneOrFail(req.session!.userId);
		const company = await Company.findOneOrFail(options.companyId);

		const calculatedAmount = company.shareValue * options.noOfShares;

		if (options.noOfShares < 1) {
			return {
				errors: [
					{
						field: 'buy',
						message: 'Invalid No of Shares!',
					},
				],
			};
		}

		if (calculatedAmount > user.walletAmount) {
			return {
				errors: [{ field: 'buy', message: 'Wallet Amount Not Enough!' }],
			};
		}

		if (company.shareCount < options.noOfShares) {
			return {
				errors: [{ field: 'buy', message: 'Not Enough Shares to Buy!' }],
			};
		}

		const transaction = await Transaction.create({
			company,
			user,
			type: options.type,
			noOfShares: options.noOfShares,
			shareAmount: company.shareValue,
			time: new Date(),
		}).save();

		await User.update(user.id, {
			walletAmount: user.walletAmount - calculatedAmount,
		});

		await Company.update(company.id, {
			shareCount: company.shareCount - options.noOfShares,
		});

		const existingCurrentHolding = await CurrentHolding.findOne({
			where: {
				user,
				company,
			},
		});

		if (!existingCurrentHolding) {
			await CurrentHolding.create({
				company,
				user,
				shareCount: options.noOfShares,
				sharePrice: calculatedAmount,
			}).save();
		} else {
			await CurrentHolding.update(existingCurrentHolding.id, {
				company,
				user,
				shareCount: existingCurrentHolding.shareCount + options.noOfShares,
				sharePrice: existingCurrentHolding.sharePrice + calculatedAmount,
			});
		}

		return { transaction };
	}
}
