import * as React from 'react';
import AddNews from '../components/AddNews';
import Layout from '../components/Layout';
import ListNews from '../components/ListNews';

interface INewsPageProps {}

const NewsPage: React.FunctionComponent<INewsPageProps> = () => {
	return (
		<Layout>
			<AddNews />
			<ListNews />
		</Layout>
	);
};

export default NewsPage;
