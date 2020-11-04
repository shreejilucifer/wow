import * as React from 'react';
import Layout from '../components/Layout';
import { withApollo } from '../utils/withApollo';

interface IBrokerPageProps {}

const BrokerPage: React.FunctionComponent<IBrokerPageProps> = () => {
	return <Layout>Broker Page</Layout>;
};

export default withApollo({ ssr: false })(BrokerPage);
