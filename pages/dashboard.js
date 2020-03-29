import Head from '../src/components/head';
import Layout from '../src/components/layout';
import Stats from '../src/components/dashboard/stats';
import WatchList from '../src/components/dashboard/watchlist';
import Links from '../src/components/dashboard/links';
import Trade from '../src/components/dashboard/trade';

import light from '../src/styles/light/dashboard.module.css';

const Dashboard = () => {
  const styles = light;
  return (
    <div>
      <Head title='Dashboard' />
      <Layout>
        <Stats />
        <div className={styles.container}>
          <div className={styles.main}>
            <Links />
            <Trade />
          </div>
          <WatchList />
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
