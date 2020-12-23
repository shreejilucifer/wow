import Head from '../src/components/common/head';
import Layout from '../src/components/common/layout';
import LeaderboardTable from '../src/components/leaderboard/LeaderboardTable';
import { useIsAuth } from '../src/utils/useIsAuth';
import { withApollo } from '../src/utils/withApollo';

const Leaderboard = () => {
  useIsAuth();
  return (
    <div>
      <Head title='Leaderboard' />
      <Layout>
        <LeaderboardTable />
      </Layout>
    </div>
  );
};

export default withApollo({ ssr: true })(Leaderboard);
