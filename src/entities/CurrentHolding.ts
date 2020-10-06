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
export class CurrentHolding extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column()
	sharePrice!: number;

	@Field(() => Int)
	@Column()
	shareCount!: number;

	@Field(() => Company)
	@ManyToOne(() => Company, (company) => company.currentholding)
	company!: Company;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.currentholding)
	user!: User;
}
