import { useState } from 'react';
import Head from '../src/components/head';
import Layout from '../src/components/layout';
import Links from '../src/components/dashboard/links';
import Trade from '../src/components/dashboard/trade';
import News from '../src/components/dashboard/news';
import Transactions from '../src/components/dashboard/transactions';
import UserHoldings from '../src/components/dashboard/userholdings';

const Dashboard = () => {
  const [active, setActive] = useState('trade');
  const [theme, setTheme] = useState(true);

  const renderMain = () => {
    switch (active) {
      case 'trade':
        return <Trade theme={theme} />;
      case 'news':
        return <News theme={theme} />;
      case 'transactions':
        return <Transactions theme={theme} />;
      case 'userholdings':
        return <UserHoldings theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Head title='Dashboard' />
      <Layout theme={theme} updateTheme={() => setTheme(!theme)}>
        <Links
          theme={theme}
          active={active}
          onChangeActive={page => setActive(page)}
        />
        {renderMain(active)}
      </Layout>
    </div>
  );
};

export default Dashboard;
