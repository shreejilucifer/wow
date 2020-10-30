import * as React from 'react';
import AddCompany from '../components/AddCompany';
import Layout from '../components/Layout';
import ListCompany from '../components/ListCompany';

interface ICompanyPageProps {}

const CompanyPage: React.FunctionComponent<ICompanyPageProps> = () => {
	return (
		<Layout>
			<AddCompany />
			<ListCompany />
		</Layout>
	);
};

export default CompanyPage;
