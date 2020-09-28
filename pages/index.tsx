import React, { useState } from 'react';
import Head from '../src/components/common/head';
import Link from 'next/link';
import { NextRouter, withRouter } from 'next/router';
import styles from '../src/styles/light/login.module.css';
import { login } from '../src/utils/login';

interface homeProps {
  router: NextRouter;
}
const Home: React.FC<homeProps> = ({ router }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({ phone: '', password: '' });

  const handleSubmit = async (phone: string, password: string) => {
    setLoading(true);
    const data = await login(phone, password);

    if (data.status) {
      setLoading(false);
      router.push('/dashboard');
    } else {
      setLoading(false);
      setError('Error');
    }
  };

  const valueChange = (type: string, val: string) => {
    setError('');
    switch (type) {
      case 'phone': {
        setUser({ ...user, phone: val });
        break;
      }
      case 'password': {
        setUser({ ...user, password: val });
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
          <img src='/icons/logo.svg' className={styles.logo} alt='logo' />
          <div className={styles.sitetitle}>wolf of wall street 3.0</div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.title}>Log in</div>
          <div className={styles.greetings}>
            Welcome, <br /> Log into your account
          </div>
          <div className={styles.inputContainer}>
            <input
              disabled={loading}
              type='text'
              placeholder='Phone no.'
              value={user.phone}
              onChange={(e) => valueChange('phone', e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              disabled={loading}
              type='password'
              placeholder='Password'
              value={user.password}
              onChange={(e) => valueChange('password', e.target.value)}
            />
          </div>
          <div>{error}</div>
          <Link href='/forgotpassword'>
            <a className={styles.forget}>forgot password?</a>
          </Link>
          <button
            disabled={loading}
            className={styles.loginButton}
            onClick={() => handleSubmit(user.phone, user.password)}
          >
            log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
