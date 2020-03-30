import Head from '../src/components/head';
import Layout from '../src/components/layout';
import Links from '../src/components/dashboard/links';
import Trade from '../src/components/dashboard/trade';

const Dashboard = () => {
  return (
    <div>
      <Head title='Dashboard' />
      <Layout>
        <Links />
        <Trade />
      </Layout>
    </div>
  );
};

export default Dashboard;
