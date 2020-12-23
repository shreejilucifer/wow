import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Dashboard {
	@Field()
	grossingCompany!: string;

	@Field(() => Int)
	leaderboardTopper!: number;

	@Field(() => Int)
	sharesOwn!: number;

	@Field(() => Int)
	balance!: number;
}
