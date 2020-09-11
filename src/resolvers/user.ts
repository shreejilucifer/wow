import { Mutation, Resolver } from 'type-graphql';
import { User } from '../entities/User';

@Resolver(User)
export class UserResolver {
	@Mutation(() => User, {
		description: 'The `User` type defines users in the database',
	})
	async register(): Promise<User> {
		const user = User.create({
			email: 'example@example.com',
			mobile: '9876543210',
			name: 'John Doe',
			password: 'qwerty',
			walletAmount: parseInt(process.env.DEFAULT_WALLET_AMOUNT),
		});

		const result = await user.save();

		return result;
	}
}
