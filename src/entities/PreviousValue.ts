import { Field, Int, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';

@ObjectType()
@Entity()
export class PreviousValue extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => Int)
	@Column()
	shareValue!: number;

	@Field(() => String)
	@Column()
	time!: Date;

	@Field(() => Company)
	@ManyToOne(() => Company, (company) => company.previousValues)
	company!: Company;
}
