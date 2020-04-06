import { useState } from 'react';
import Head from '../src/components/common/head';
import Layout from '../src/components/common/layout';
import Links from '../src/components/dashboard/links';
import Trade from '../src/components/dashboard/trade';
import News from '../src/components/dashboard/news';
import Transactions from '../src/components/dashboard/transactions';
import UserHoldings from '../src/components/dashboard/userholdings';
import WatchList from '../src/components/dashboard/watchlist';

const Dashboard = () => {
  const [active, setActive] = useState('trade');

  const renderMain = () => {
    switch (active) {
      case 'trade':
        return <Trade />;
      case 'news':
        return <News />;
      case 'transactions':
        return <Transactions />;
      case 'userholdings':
        return <UserHoldings />;
      case 'watchlist':
        return <WatchList />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Head title='Dashboard' />
      <Layout name={'Daenerys'}>
        <Links active={active} onChangeActive={(page) => setActive(page)} />
        {renderMain(active)}
      </Layout>
    </div>
  );
};

export default Dashboard;
