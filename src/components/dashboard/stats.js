import light from '../../styles/light/dashboardstats.module.css';

function nc(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Card = ({ top, bottom }) => {
  const styles = light;
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
  const styles = light;

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
