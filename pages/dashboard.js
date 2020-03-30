import { useState } from 'react';
import Head from '../src/components/head';
import Layout from '../src/components/layout';
import Links from '../src/components/dashboard/links';
import Trade from '../src/components/dashboard/trade';
import News from '../src/components/dashboard/news';

const Dashboard = () => {
  const [active, setActive] = useState('news');

  return (
    <div>
      <Head title='Dashboard' />
      <Layout>
        <Links active={active} onChangeActive={page => setActive(page)} />
        {active === 'trade' ? <Trade /> : null}
        {active === 'news' ? <News /> : null}
      </Layout>
    </div>
  );
};

export default Dashboard;
