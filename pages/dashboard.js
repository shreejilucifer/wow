import { useState } from 'react';
import Head from '../src/components/head';
import Layout from '../src/components/layout';
import Links from '../src/components/dashboard/links';
import Trade from '../src/components/dashboard/trade';
import News from '../src/components/dashboard/news';
import Transactions from '../src/components/dashboard/transactions';

const Dashboard = () => {
  const [active, setActive] = useState('trade');
  const [theme, setTheme] = useState(true);

  return (
    <div>
      <Head title='Dashboard' />
      <Layout theme={theme} updateTheme={() => setTheme(!theme)}>
        <Links
          theme={theme}
          active={active}
          onChangeActive={page => setActive(page)}
        />
        {active === 'trade' ? <Trade theme={theme} /> : null}
        {active === 'news' ? <News theme={theme} /> : null}
        {active === 'transactions' ? <Transactions theme={theme} /> : null}
      </Layout>
    </div>
  );
};

export default Dashboard;
