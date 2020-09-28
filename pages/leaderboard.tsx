import Head from '../src/components/common/head';
import Layout from '../src/components/common/layout';
import LeaderboardTable from '../src/components/leaderboard/LeaderboardTable';

const Leaderboard = () => {
  return (
    <div>
      <Head title='Leaderboard' />
      <Layout name={'Daenerys'}>
        <LeaderboardTable />
      </Layout>
    </div>
  );
};

export default Leaderboard;
