import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeAdminQuery } from '../generated/graphql';

export const useIsAuth = () => {
	const { data, loading } = useMeAdminQuery();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !data?.meAdmin) {
			router.replace('/?next=' + router.pathname);
		}
	}, [loading, data, router]);

	return { data, loading };
};
