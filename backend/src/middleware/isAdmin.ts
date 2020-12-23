import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';
// import { Admin } from '../entities/Admin';

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (!context.req.session!.adminId) {
		throw new Error('Not Authenticated');
	}

	//** Uncomment for security Purposes. */
	// const admin = await Admin.findOneOrFail(context.req.session!.adminId);
	// if (!admin) {
	// 	throw new Error('Invalid Authentication');
	// }

	return next();
};
