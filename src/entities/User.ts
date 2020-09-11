import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
