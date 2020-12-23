import { ObjectType, Field } from 'type-graphql';
import { Transaction } from '../../entities/Transaction';
import { FieldError } from './FieldError';

@ObjectType()
export class TransactionResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[];

	@Field(() => Transaction, { nullable: true })
	transaction?: Transaction;
}
