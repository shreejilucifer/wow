import { ObjectType, Field } from 'type-graphql';
import { Admin } from '../../entities/Admin';
import { FieldError } from './FieldError';

@ObjectType()
export class AdminResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Admin, { nullable: true })
	admin?: Admin;
}
