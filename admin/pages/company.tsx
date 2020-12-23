import * as React from 'react';
import AddCompany from '../components/AddCompany';
import Layout from '../components/Layout';
import ListCompany from '../components/ListCompany';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';

interface ICompanyPageProps {}

const CompanyPage: React.FunctionComponent<ICompanyPageProps> = () => {
	useIsAuth();
	return (
		<Layout>
			<AddCompany />
			<ListCompany />
		</Layout>
	);
};

export default withApollo({ ssr: false })(CompanyPage);
