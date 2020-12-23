import { UserRegisterInput } from '../resolvers/user';

export const validateRegister = (options: UserRegisterInput) => {
	const mobile = /^[6-9]\d{9}$/;
	const name = /^[a-zA-Z ]{2,30}$/;

	if (options.password.length <= 2) {
		return [{ field: 'password', message: 'Length must be greator than 3' }];
	}

	if (!options.email.includes('@')) {
		return [{ field: 'email', message: 'Invalid Email' }];
	}

	if (!mobile.test(options.mobile)) {
		return [{ field: 'mobile', message: 'Invalid Mobile' }];
	}

	if (!name.test(options.name)) {
		return [{ field: 'name', message: 'Invalid Name' }];
	}
	return null;
};
