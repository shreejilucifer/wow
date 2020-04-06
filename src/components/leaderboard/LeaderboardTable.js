import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/leaderboard.module.css';
import dark from '../../styles/dark/leaderboard.module.css';

const LeaderboardTable = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.container}>
      <div className={styles.title}>LEADERBOARD</div>
      <div className={styles.header}>
        <div>Company</div>
        <div>Amount</div>
        <div>Rank</div>
      </div>
      <div className={styles.itemsContainer}>
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
        <Item
          company='RELIANCE TELECOMMUNICATIONS'
          amount='10,00,000'
          rank='1'
        />
      </div>
    </div>
  );
};

const Item = ({ company, amount, rank }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.item}>
      <div>{company}</div>
      <div>{amount}</div>
      <div>{rank}</div>
    </div>
  );
};

export default LeaderboardTable;
