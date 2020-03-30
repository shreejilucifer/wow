import light from '../styles/light/sidebar.module.css';
import dark from '../styles/dark/sidebar.module.css';

const Icon = ({ active, img, fun, theme }) => {
  const styles = theme ? light : dark;
  return (
    <div
      onClick={() => {
        if (fun) return fun();
      }}
      className={
        active ? styles.iconWrapper + ' ' + styles.active : styles.iconWrapper
      }
    >
      <img src={img} className={styles.icon} />
    </div>
  );
};

const Sidebar = ({ theme, onChangeTheme }) => {
  const styles = theme ? light : dark;
  return (
    <div className={styles.sidebarWrapper}>
      <Icon
        theme={theme}
        active
        img={theme ? '/icons/home.svg' : 'icons/home_white.svg'}
      />
      <Icon
        theme={theme}
        img={theme ? '/icons/leaderboard.svg' : 'icons/leaderboard_white.svg'}
      />
      <Icon
        theme={theme}
        img={theme ? '/icons/how_to_play.svg' : 'icons/how_to_play_white.svg'}
      />
      <Icon
        theme={theme}
        img={theme ? '/icons/about_us.svg' : 'icons/about_us_white.svg'}
      />
      <Icon
        theme={theme}
        img={theme ? '/icons/moon.svg' : '/icons/sun.svg'}
        fun={() => onChangeTheme()}
      />
    </div>
  );
};

export default Sidebar;
