import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrentHolding } from './CurrentHolding';
import { PreviousValue } from './PreviousValue';
import { Transaction } from './Transaction';

@ObjectType()
@Entity()
export class Company extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	category!: string;

	@Field(() => Int)
	@Column()
	shareCount!: number;

	@Field(() => Int)
	@Column()
	shareValue!: number;

	@Field(() => [PreviousValue])
	@OneToMany(() => PreviousValue, (previousValue) => previousValue.company)
	previousValues!: PreviousValue[];

	@OneToMany(() => Transaction, (transaction) => transaction.company)
	transaction: Transaction[];

	@OneToMany(() => CurrentHolding, (currentholding) => currentholding.company)
	currentholding: CurrentHolding[];
}
