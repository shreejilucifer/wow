import Head from '../src/components/head';
import Link from 'next/link';

const Home = () => (
  <div>
    <Head title='Home' />
    <div>hello world</div>
    <Link href='/dashboard'>
      <a>Dashboard</a>
    </Link>
  </div>
);

export default Home;
