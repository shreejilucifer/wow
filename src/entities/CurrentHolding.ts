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
	@OneToOne(() => Company)
	@JoinColumn()
	company!: Company;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.currentholding)
	user!: User;
}
