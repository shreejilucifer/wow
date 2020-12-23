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
