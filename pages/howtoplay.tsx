import Head from '../src/components/common/head';
import Layout from '../src/components/common/layout';
import { useIsAuth } from '../src/utils/useIsAuth';
import { withApollo } from '../src/utils/withApollo';

const HowToPlay = () => {
  useIsAuth();
  return (
    <div>
      <Head title='How To Play' />
      <Layout>How to Play</Layout>
    </div>
  );
};

export default withApollo({ ssr: true })(HowToPlay);
