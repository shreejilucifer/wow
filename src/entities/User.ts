import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrentHolding } from './CurrentHolding';
import { Transaction } from './Transaction';
import { Watchlist } from './Watchlist';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Field()
	@Column({ unique: true })
	mobile!: string;

	@Field(() => Int)
	@Column({ default: process.env.DEFAULT_WALLET_AMOUNT })
	walletAmount!: number;

	@OneToMany(() => Watchlist, (watchlist) => watchlist.user)
	watchlist: Watchlist[];

	@OneToMany(() => CurrentHolding, (currentholding) => currentholding.user)
	currentholding: CurrentHolding[];

	@OneToMany(() => Transaction, (transaction) => transaction.user)
	transaction: Transaction[];
}
