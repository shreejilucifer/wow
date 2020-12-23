import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Company } from '../entities/Company';
import { PreviousValue } from '../entities/PreviousValue';
import { isAdmin } from '../middleware/isAdmin';
import { isAuth } from '../middleware/isAuth';
import { CompanyAddInput } from './modules/CompanyAddInput';
import { CompanyChangeInput } from './modules/CompanyChangeInput';

@Resolver(Company)
export class CompanyResolver {
	@Mutation(() => Company, { nullable: true })
	@UseMiddleware(isAdmin)
	async addCompany(
		@Arg('options') options: CompanyAddInput
	): Promise<Company | undefined> {
		let newCompany;
		try {
			let company = await Company.create({
				name: options.name,
				category: options.category,
				shareCount: options.shareCount,
				shareValue: options.shareValue,
			}).save();

			await PreviousValue.create({
				company: company,
				shareValue: options.shareValue,
				time: new Date(),
			}).save();

			newCompany = await Company.findOne(company.id, {
				relations: ['previousValues'],
			});
		} catch (error) {
			return undefined;
		}

		return newCompany;
	}

	@Query(() => [Company])
	@UseMiddleware(isAuth)
	async companies(): Promise<Company[]> {
		return await Company.find({ relations: ['previousValues'] });
	}

	@Query(() => Company)
	@UseMiddleware(isAuth)
	company(@Arg('companyId') companyId: number): Promise<Company> {
		return Company.findOneOrFail(companyId, { relations: ['previousValues'] });
	}

	@Query(() => [Company])
	@UseMiddleware(isAdmin)
	async companiesAdmin(): Promise<Company[]> {
		return await Company.find({
			order: {
				id: 'ASC',
			},
		});
	}

	@Mutation(() => Company)
	@UseMiddleware(isAdmin)
	async changeShareValueAdmin(
		@Arg('options') options: CompanyChangeInput
	): Promise<Company> {
		const company = await Company.findOneOrFail(options.companyId);

		await PreviousValue.create({
			company,
			shareValue: company.shareValue,
			time: new Date(),
		}).save();

		await Company.update(options.companyId, {
			shareValue: options.shareValue,
		});

		const newCompany = await Company.findOneOrFail(options.companyId);

		return newCompany;
	}
}
