import argon2 from 'argon2';
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { validateRegister } from '../utils/validateRegister';
import { UserResponse } from './modules/UserResponse';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UserRegisterInput {
	@Field()
	email: string;

	@Field()
	mobile: string;

	@Field()
	name: string;

	@Field()
	password: string;
}

@Resolver(User)
export class UserResolver {
	@Mutation(() => UserResponse)
	async register(
		@Arg('options') options: UserRegisterInput,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const errors = validateRegister(options);
		if (errors) return { errors };

		const hashedPassword = await argon2.hash(options.password);

		let user;
		try {
			user = await User.create({
				email: options.email,
				mobile: options.mobile,
				name: options.name,
				password: hashedPassword,
				walletAmount: parseInt(process.env.DEFAULT_WALLET_AMOUNT),
			}).save();
		} catch (err) {
			if (err.message.includes('duplicate key'))
				return {
					errors: [
						{ field: 'email', message: 'Cannot use same mobile or email' },
					],
				};

			return {
				errors: [{ field: 'email', message: 'Something went wrong' }],
			};
		}

		req.session!.userId = user.id;

		return { user };
	}

	@Mutation(() => UserResponse)
	async login(
		@Arg('mobile') mobile: string,
		@Arg('password') password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne({ where: { mobile: mobile } });
		if (!user)
			return {
				errors: [{ field: 'mobile', message: 'Mobile does not exist ' }],
			};

		const valid = await argon2.verify(user.password, password);

		if (!valid)
			return {
				errors: [{ field: 'password', message: 'Invalid Password' }],
			};

		req.session!.userId = user.id;

		return { user };
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) =>
			req.session!.destroy((err) => {
				res.clearCookie('qid');
				if (err) {
					resolve(false);
					return;
				}
				resolve(true);
			})
		);
	}

	@Query(() => User, { nullable: true })
	@UseMiddleware(isAuth)
	me(@Ctx() { req }: MyContext) {
		if (!req.session!.userId) {
			return null;
		}
		return User.findOne(req.session!.userId);
	}
}
