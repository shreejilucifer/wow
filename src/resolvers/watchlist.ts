import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { Company } from '../entities/Company';
import { User } from '../entities/User';
import { Watchlist } from '../entities/Watchlist';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@Resolver(Watchlist)
export class WatchlistResolver {
	@Mutation(() => Watchlist, { nullable: true })
	@UseMiddleware(isAuth)
	async addWatchlist(
		@Ctx() { req }: MyContext,
		@Arg('companyId') companyId: number
	): Promise<Watchlist | undefined> {
		let newWatchlist;
		try {
			let company = await Company.findOne(companyId);
			if (!company) return undefined;
			let user = await User.findOne(req.session!.userId);
			if (!user) return undefined;
			let watchlist = await Watchlist.create({
				company: company,
				user: user,
			}).save();
			newWatchlist = await Watchlist.findOne(watchlist.id, {
				relations: ['company'],
			});
		} catch (error) {
			return undefined;
		}
		return newWatchlist;
	}

	@Mutation(() => Boolean, { nullable: true })
	@UseMiddleware(isAuth)
	async removeWatchlist(
		@Arg('watchlistId') watchlistId: number
	): Promise<Boolean> {
		await Watchlist.delete(watchlistId);
		return true;
	}

	@Query(() => [Watchlist], { nullable: true })
	@UseMiddleware(isAuth)
	async watchlist(@Ctx() { req }: MyContext): Promise<Watchlist[] | null> {
		let user = await User.findOne(req.session!.userId);
		if (!user) return null;
		let watchlist = await Watchlist.find({
			where: {
				user: user,
			},
			relations: ['company', 'company.previousValues'],
		});
		return watchlist;
	}
}
