import light from '../styles/light/sidebar.module.css';

const Icon = ({ active, img }) => {
  const styles = light;
  return (
    <div
      className={
        active ? styles.iconWrapper + ' ' + styles.active : styles.iconWrapper
      }
    >
      <img src={img} className={styles.icon} />
    </div>
  );
};

const Sidebar = () => {
  const styles = light;
  return (
    <div className={styles.sidebarWrapper}>
      <Icon active img='/icons/home.svg' />
      <Icon img='/icons/leaderboard.svg' />
      <Icon img='/icons/how_to_play.svg' />
      <Icon img='/icons/about_us.svg' />
    </div>
  );
};

export default Sidebar;
