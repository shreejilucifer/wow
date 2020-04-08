import { useState } from 'react';
import Head from '../src/components/common/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import styles from '../src/styles/light/login.module.css';

const Home = ({ router }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (phone, password) => {
    if (!phone || !password) return console.error('No Values');
    router.push('/dashboard');
  };

  const valueChange = (type, val) => {
    switch (type) {
      case 'phone': {
        setPhone(val);
        break;
      }
      case 'password': {
        setPassword(val);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div>
      <Head title='Home' />
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img src='/icons/logo.svg' className={styles.logo} />
          <div className={styles.sitetitle}>wolf of wall street 3.0</div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Log in</div>
          <div className={styles.greetings}>
            Welcome, <br /> Log into your account
          </div>
          <div className={styles.inputContainer}>
            <input
              type='text'
              placeholder='Phone no.'
              value={phone}
              onChange={(e) => valueChange('phone', e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => valueChange('password', e.target.value)}
            />
          </div>
          <Link href='/forgotpassword'>
            <a className={styles.forget}>forgot password?</a>
          </Link>
          <button
            className={styles.loginButton}
            onClick={() => handleSubmit(phone, password)}
          >
            log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
