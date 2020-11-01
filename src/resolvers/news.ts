import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { News } from '../entities/News';
import { isAdmin } from '../middleware/isAdmin';
import { isAuth } from '../middleware/isAuth';

@Resolver(News)
export class NewsResolver {
	@Query(() => [News])
	@UseMiddleware(isAuth)
	async news(): Promise<News[]> {
		return await News.find();
	}

	@Query(() => [News])
	@UseMiddleware(isAdmin)
	async newsAdmin(): Promise<News[]> {
		return await News.find();
	}

	@Mutation(() => News)
	@UseMiddleware(isAdmin)
	async addNewsAdmin(
		@Arg('title') title: string,
		@Arg('description') description: string
	): Promise<News> {
		const news = await News.create({
			description,
			title,
			time: new Date(),
		}).save();

		return news;
	}
}
