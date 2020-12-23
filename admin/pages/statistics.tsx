import * as React from 'react';
import Layout from '../components/Layout';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

interface IStatisticsPageProps {}

const StatisticsPage: React.FunctionComponent<IStatisticsPageProps> = () => {
	useIsAuth();
	return <Layout>Statistics Page</Layout>;
};

export default withApollo({ ssr: false })(StatisticsPage);
