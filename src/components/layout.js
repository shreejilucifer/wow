import light from '../styles/light/layout.module.css';
import dark from '../styles/dark/layout.module.css';

import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Stats from '../components/dashboard/stats';
import WatchList from '../components/dashboard/watchlist';
import Stockbar from './stockbar';

const Layout = ({ children, theme, updateTheme }) => {
  const styles = theme ? light : dark;

  return (
    <div className={styles.wrapper}>
      <Navbar theme={theme} />
      <div className={styles.horizontalWrapper}>
        <Sidebar onChangeTheme={() => updateTheme()} theme={theme} />
        <div className={styles.mainContainer}>
          <Stats theme={theme} />
          <div className={styles.main}>
            <div className={styles.childrenContainer}>{children}</div>
            <div className={styles.watchlistContainer}>
              <WatchList theme={theme} />
            </div>
          </div>
        </div>
      </div>
      <Stockbar theme={theme} />
    </div>
  );
};

export default Layout;
