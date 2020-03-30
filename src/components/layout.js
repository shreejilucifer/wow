import { useState } from 'react';

import light from '../styles/light/layout.module.css';

import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Stats from '../components/dashboard/stats';
import WatchList from '../components/dashboard/watchlist';

const Layout = ({ children }) => {
  const styles = light;
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.horizontalWrapper}>
        <Sidebar />
        <div className={styles.mainContainer}>
          <Stats />
          <div className={styles.main}>
            <div className={styles.childrenContainer}>{children}</div>
            <div className={styles.watchlistContainer}>
              <WatchList />
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '5vh' }}>This is the Stockbar</div>
    </div>
  );
};

export default Layout;

// Use Marquee from 'styled components website'
