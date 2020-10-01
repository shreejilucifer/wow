import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Company } from '../entities/Company';
import { PreviousValue } from '../entities/PreviousValue';
import { isAuth } from '../middleware/isAuth';
import { CompanyAddInput } from './modules/CompanyAddInput';

@Resolver(Company)
export class CompanyResolver {
	@Mutation(() => Company, { nullable: true })
	@UseMiddleware(isAuth)
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
}
