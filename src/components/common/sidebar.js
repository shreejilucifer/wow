import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/sidebar.module.css';
import dark from '../../styles/dark/sidebar.module.css';

const Sidebar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.sidebarWrapper}>
      <Icon active img={theme ? '/icons/home.svg' : 'icons/home_white.svg'} />
      <Icon
        img={theme ? '/icons/leaderboard.svg' : 'icons/leaderboard_white.svg'}
      />
      <Icon
        img={theme ? '/icons/how_to_play.svg' : 'icons/how_to_play_white.svg'}
      />
      <Icon img={theme ? '/icons/about_us.svg' : 'icons/about_us_white.svg'} />
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

export default Sidebar;
