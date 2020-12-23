import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/layout.module.css';
import dark from '../../styles/dark/layout.module.css';

import Navbar from './navbar';
import Sidebar from './sidebar';
import Stats from '../dashboard/stats';
import WatchList from '../dashboard/watchlist';
import Stockbar from './stockbar';
import { isServer } from '../../utils/isServer';
import { useMeQuery } from '../../generated/graphql';

interface layoutProps {
  children?: any;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  if (loading || !data?.me) {
    return <></>;
  } else
    return (
      <div className={styles.wrapper}>
        <Navbar name={data.me.name.split(' ')[0]} />
        <div className={styles.hiname}>Hi {data.me.name.split(' ')[0]}</div>
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
