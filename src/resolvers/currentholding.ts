import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CurrentHolding } from '../entities/CurrentHolding';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@Resolver(CurrentHolding)
export class CurrentHoldingResolver {
	@Query(() => [CurrentHolding])
	@UseMiddleware(isAuth)
	async currentholding(@Ctx() { req }: MyContext): Promise<CurrentHolding[]> {
		return await CurrentHolding.find({
			where: {
				user: {
					id: req.session!.userId,
				},
			},
			relations: ['company'],
		});
	}
}
