import { useContext } from 'react';
import { withRouter } from 'next/router';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/sidebar.module.css';
import dark from '../../styles/dark/sidebar.module.css';

const Sidebar = ({ router }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const { pathname } = router;
  return (
    <div className={styles.sidebarWrapper}>
      <Icon
        click={() => router.push('/dashboard')}
        active={pathname === '/dashboard'}
        img={theme ? '/icons/home.svg' : 'icons/home_white.svg'}
      />
      <Icon
        click={() => router.push('/leaderboard')}
        active={pathname === '/leaderboard'}
        img={theme ? '/icons/leaderboard.svg' : 'icons/leaderboard_white.svg'}
      />
      <Icon
        click={() => router.push('/howtoplay')}
        active={pathname === '/howtoplay'}
        img={theme ? '/icons/how_to_play.svg' : 'icons/how_to_play_white.svg'}
      />
      <Icon
        click={() => router.push('/aboutus')}
        active={pathname === '/aboutus'}
        img={theme ? '/icons/about_us.svg' : 'icons/about_us_white.svg'}
      />
      <Icon
        click={() => setTheme(!theme)}
        img={theme ? '/icons/moon.svg' : '/icons/sun.svg'}
      />
    </div>
  );
};

const Icon = ({ active, img, click }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div
      onClick={click}
      className={
        active ? styles.iconWrapper + ' ' + styles.active : styles.iconWrapper
      }
    >
      <img src={img} className={styles.icon} />
    </div>
  );
};

export default withRouter(Sidebar);
