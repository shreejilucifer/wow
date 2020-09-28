import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
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
export class Watchlist extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.watchlist)
	user: User;

	@Field(() => Company)
	@OneToOne(() => Company)
	@JoinColumn()
	company: Company;
}
