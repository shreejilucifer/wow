import * as React from 'react';
import AddNews from '../components/AddNews';
import Layout from '../components/Layout';

interface INewsPageProps {}

const NewsPage: React.FunctionComponent<INewsPageProps> = () => {
	return (
		<Layout>
			<AddNews />
		</Layout>
	);
};

export default NewsPage;
