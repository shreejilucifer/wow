import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/dashboardstats.module.css';
import dark from '../../styles/dark/dashboardstats.module.css';
import nc from '../../utils/commanumber';
import { useDashboardQuery } from '../../generated/graphql';

interface cardProps {
  top: string | number;
  bottom: string | number;
}

const Card: React.FC<cardProps> = ({ top, bottom }) => {
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

  const { loading, data, error } = useDashboardQuery();

  if (error) return <div className={styles.wrapper}>Error Occured</div>;

  return (
    <div className={styles.wrapper}>
      <Card
        top={loading ? '...' : '₹' + nc(data?.dashboard.balance as number)}
        bottom='Your Balance'
      />
      <Card
        top={loading ? '...' : nc(data?.dashboard.sharesOwn as number)}
        bottom='Shares You Own'
      />
      <Card
        top={loading ? '...' : (data?.dashboard.grossingCompany as string)}
        bottom='Grossing Company'
      />
      <Card
        top={
          loading
            ? '...'
            : '₹' + nc(data?.dashboard.leaderboardTopper as number)
        }
        bottom='Leaderboard Topper'
      />
    </div>
  );
};

export default Stats;
