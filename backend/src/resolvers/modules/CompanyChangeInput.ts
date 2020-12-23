import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CompanyChangeInput {
	@Field(() => Int)
	companyId: number;

	@Field(() => Int)
	shareValue: number;
}
