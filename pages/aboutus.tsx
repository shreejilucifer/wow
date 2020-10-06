import Head from '../src/components/common/head';
import Layout from '../src/components/common/layout';
import { useIsAuth } from '../src/utils/useIsAuth';
import { withApollo } from '../src/utils/withApollo';

const AboutUs = () => {
  useIsAuth();
  return (
    <div>
      <Head title='About Us' />
      <Layout>
        <div>About Us</div>
      </Layout>
    </div>
  );
};

export default withApollo({ ssr: true })(AboutUs);
