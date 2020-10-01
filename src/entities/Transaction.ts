import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
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
	@Column()
	type!: string;

	@Field()
	@Column()
	noOfShares!: number;

	@Field()
	@Column()
	shareAmount!: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.transaction)
	user!: User;

	@Field(() => Company)
	@OneToOne(() => Company)
	@JoinColumn()
	company!: Company;
}
