import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Company } from '../entities/Company';
import { Dashboard } from '../entities/Dashboard';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@Resolver(Dashboard)
export class DashboardResolver {
	@Query(() => Dashboard)
	@UseMiddleware(isAuth)
	async dashboard(@Ctx() { req }: MyContext): Promise<Dashboard> {
		const user = await User.findOneOrFail(req.session!.userId, {
			relations: ['currentholding'],
		});
		const balance = user.walletAmount;
		const sharesOwn = user.currentholding
			.map((ch) => ch.shareCount)
			.reduce((a, b) => a + b, 0);

		const users = await User.find();
		const amounts = users.map((a) => a.walletAmount);

		const leaderboardTopper = Math.max(...amounts);

		const companies = await Company.find();
		companies.sort((a, b) => a.shareValue - b.shareValue);

		const grossingCompany = companies.length > 0 ? companies[0].name : '';

		return { balance, sharesOwn, leaderboardTopper, grossingCompany };
	}
}
