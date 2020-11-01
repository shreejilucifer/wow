import { MiddlewareFn } from 'type-graphql';
import { Admin } from '../entities/Admin';
import { MyContext } from '../types';

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
	if (!context.req.session!.adminId) {
		throw new Error('Not Authenticated');
	}

	const admin = await Admin.findOneOrFail(context.req.session!.adminId);
	if (!admin) {
		throw new Error('Invalid Authentication');
	}

	return next();
};
