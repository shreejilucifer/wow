import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/dashboardstats.module.css';
import dark from '../../styles/dark/dashboardstats.module.css';
import nc from '../../utils/commanumber';

const Card = ({ top, bottom }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.blockContainer}>
      <div className={styles.card}>
        <div className={styles.top}>{top}</div>
        <div className={styles.bottom}>{bottom}</div>
      </div>
    </div>
  );
};

const Stats = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <div className={styles.wrapper}>
      <Card top={'₹' + nc(1000000)} bottom='Your Balance' />
      <Card top={nc(1000000)} bottom='Shares You Own' />
      <Card top='WOWS' bottom='Grossing Company' />
      <Card top={'₹' + nc(1000000)} bottom='Leaderboard Topper' />
    </div>
  );
};

export default Stats;
