import * as React from 'react';
import AddCompany from '../components/AddCompany';
import Layout from '../components/Layout';

interface ICompanyPageProps {}

const CompanyPage: React.FunctionComponent<ICompanyPageProps> = () => {
	return (
		<Layout>
			<AddCompany />
		</Layout>
	);
};

export default CompanyPage;
