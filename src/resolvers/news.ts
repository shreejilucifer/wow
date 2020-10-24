import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { News } from '../entities/News';
import { isAuth } from '../middleware/isAuth';

@Resolver(News)
export class NewsResolver {
	@Query(() => [News])
	@UseMiddleware(isAuth)
	async news(): Promise<News[]> {
		return await News.find();
	}
}
