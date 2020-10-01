import { Field, InputType, Int } from 'type-graphql';

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
