import {
	Arg,
	Field,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';
import { Company } from '../entities/Company';
import { PreviousValue } from '../entities/PreviousValue';

@InputType()
export class CompanyAddInput {
	@Field()
	name: string;

	@Field()
	category: string;

	@Field(() => Int)
	shareCount: number;

	@Field(() => Int)
	shareValue: number;
}

@Resolver(Company)
export class CompanyResolver {
	@Mutation(() => Company, { nullable: true })
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

	@Query(() => [Company], { nullable: true })
	async companies(): Promise<Company[] | null> {
		let companies;
		try {
			companies = await Company.find({ relations: ['previousValues'] });
		} catch (error) {
			return null;
		}

		return companies;
	}
}
