import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/layout.module.css';
import dark from '../../styles/dark/layout.module.css';

import Navbar from './navbar';
import Sidebar from './sidebar';
import Stats from '../dashboard/stats';
import WatchList from '../dashboard/watchlist';
import Stockbar from './stockbar';

interface layoutProps {
  children?: any;
  name: string;
}

const Layout: React.FC<layoutProps> = ({ children, name }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <div className={styles.wrapper}>
      <Navbar name={name} />
      <div className={styles.hiname}>Hi {name}</div>
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
      <Stockbar />
    </div>
  );
};

export default Layout;
