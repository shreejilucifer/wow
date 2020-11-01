import argon2 from 'argon2';
import {
	Arg,
	Ctx,
	Field,
	InputType,
	Mutation,
	Resolver,
	UseMiddleware,
} from 'type-graphql';
import { Admin } from '../entities/Admin';
import { isAdmin } from '../middleware/isAdmin';
import { MyContext } from '../types';
import { AdminResponse } from './modules/AdminResponse';

@InputType()
export class AdminRegisterInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

@Resolver(Admin)
export class AdminResolver {
	@Mutation(() => AdminResponse)
	async registerAdmin(
		@Arg('secret') secret: String,
		@Arg('options') options: AdminRegisterInput,
		@Ctx() { req }: MyContext
	): Promise<AdminResponse> {
		if (secret !== process.env.SESSION_SECRET)
			return {
				errors: [
					{
						field: 'email',
						message: 'Stop what u are doing!',
					},
				],
			};

		const hashedPassword = await argon2.hash(options.password);

		let admin;
		try {
			admin = await Admin.create({
				email: options.email,
				password: hashedPassword,
			}).save();
		} catch (err) {
			if (err.message.includes('duplicate key'))
				return {
					errors: [
						{
							field: 'email',
							message: 'Cannot use same email',
						},
					],
				};

			return {
				errors: [{ field: 'email', message: 'Something went wrong' }],
			};
		}

		req.session!.adminId = admin.id;

		return { admin };
	}

	@Mutation(() => AdminResponse)
	async loginAdmin(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { req }: MyContext
	): Promise<AdminResponse> {
		const admin = await Admin.findOne({ where: { email: email } });

		if (!admin)
			return {
				errors: [{ field: 'email', message: 'Email does not exist ' }],
			};

		const valid = await argon2.verify(admin.password, password);

		if (!valid)
			return {
				errors: [{ field: 'password', message: 'Invalid Password' }],
			};

		req.session!.adminId = admin.id;

		return { admin };
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAdmin)
	logoutAdmin(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) =>
			req.session!.destroy((err) => {
				res.clearCookie('qid');
				if (err) {
					resolve(false);
					return;
				}
				resolve(true);
			})
		);
	}
}
