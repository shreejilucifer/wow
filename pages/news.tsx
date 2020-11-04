import * as React from 'react';
import AddNews from '../components/AddNews';
import Layout from '../components/Layout';
import ListNews from '../components/ListNews';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

interface INewsPageProps {}

const NewsPage: React.FunctionComponent<INewsPageProps> = () => {
	useIsAuth();
	return (
		<Layout>
			<AddNews />
			<ListNews />
		</Layout>
	);
};

export default withApollo({ ssr: false })(NewsPage);
