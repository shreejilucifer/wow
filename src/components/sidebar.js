import light from '../styles/light/sidebar.module.css';

const Icon = ({ active, img }) => {
  const styles = light;
  return (
    <div
      className={
        active ? styles.iconWrapper + ' ' + styles.active : styles.iconWrapper
      }
    >
      <div className={styles.iconContainer}>
        <img src={img} />
      </div>
    </div>
  );
};

const Sidebar = () => {
  const styles = light;
  return (
    <div className={styles.sidebarWrapper}>
      <Icon active img='/dashboard.svg' />
      <Icon img='/leaderboard.svg' />
      <Icon img='/howtoplay.svg' />
      <Icon img='/transactions.svg' />
    </div>
  );
};

export default Sidebar;
