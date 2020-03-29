import Head from '../src/components/head';
import Layout from '../src/components/layout';
import Stats from '../src/components/dashboard/stats';
import WatchList from '../src/components/dashboard/watchlist';
import light from '../src/styles/light/dashboard.module.css';

const Dashboard = () => {
  const styles = light;
  return (
    <div>
      <Head title='Dashboard' />
      <Layout>
        <Stats />
        <div className={styles.container}>
          <div className={styles.main}>sfdsdf</div>
          <WatchList />
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
