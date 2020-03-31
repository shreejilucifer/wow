import light from '../../styles/light/layout.module.css';
import dark from '../../styles/dark/layout.module.css';

import Navbar from './navbar';
import Sidebar from './sidebar';
import Stats from '../dashboard/stats';
import WatchList from '../dashboard/watchlist';
import Stockbar from './stockbar';

const Layout = ({ children, theme, updateTheme, name }) => {
  const styles = theme ? light : dark;

  return (
    <div className={styles.wrapper}>
      <Navbar theme={theme} onChangeTheme={updateTheme} name={name} />
      <div className={styles.hiname}>Hi {name}</div>
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
