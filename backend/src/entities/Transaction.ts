import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { User } from './User';

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ type: 'enum', enum: ['buy', 'sell'] })
	type!: string;

	@Field()
	@Column()
	noOfShares!: number;

	@Field()
	@Column()
	shareAmount!: number;

	@Field(() => String)
	@Column()
	time!: Date;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.transaction)
	user: User;

	@Field(() => Company)
	@ManyToOne(() => Company, (company) => company.transaction)
	company: Company;
}
