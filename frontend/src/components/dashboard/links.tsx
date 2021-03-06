import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/links.module.css';
import dark from '../../styles/dark/links.module.css';

interface linksProps {
  active: string;
  onChangeActive: (p: string) => void;
}

const Links: React.FC<linksProps> = ({ active, onChangeActive }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <React.Fragment>
      <MobileLinks
        onChangeActive={(p: string) => onChangeActive(p)}
        active={active}
      />
      <div className={styles.container}>
        <button
          onClick={() => onChangeActive('trade')}
          className={
            active === 'trade'
              ? styles.linkButtons + ' ' + styles.active
              : styles.linkButtons
          }
        >
          Trade
        </button>
        <button
          onClick={() => onChangeActive('news')}
          className={
            active === 'news'
              ? styles.linkButtons + ' ' + styles.active
              : styles.linkButtons
          }
        >
          News
        </button>
        <button
          onClick={() => onChangeActive('transactions')}
          className={
            active === 'transactions'
              ? styles.linkButtons + ' ' + styles.active
              : styles.linkButtons
          }
        >
          Transactions
        </button>
        <button
          onClick={() => onChangeActive('userholdings')}
          className={
            active === 'userholdings'
              ? styles.linkButtons + ' ' + styles.active
              : styles.linkButtons
          }
        >
          Your Holdings
        </button>
        {active === 'news' ? (
          <button
            onClick={() => onChangeActive('callbroker')}
            className={styles.linkButtons + ' ' + styles.brokerbtn}
          >
            Call Broker
          </button>
        ) : null}
      </div>
    </React.Fragment>
  );
};

const MobileLinks: React.FC<linksProps> = ({ active, onChangeActive }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.mobileContainer}>
      <img
        alt='link-icons'
        className={active === 'transactions' ? styles.activeMobile : undefined}
        onClick={() => onChangeActive('transactions')}
        src={
          theme ? '/icons/transactions.svg' : '/icons/transactions_white.svg'
        }
      />
      <img
        alt='link-icons'
        className={active === 'news' ? styles.activeMobile : undefined}
        onClick={() => onChangeActive('news')}
        src={theme ? '/icons/news.svg' : '/icons/news_white.svg'}
      />
      <img
        alt='link-icons'
        className={active === 'trade' ? styles.activeMobile : undefined}
        onClick={() => onChangeActive('trade')}
        src={theme ? '/icons/home.svg' : '/icons/home_white.svg'}
      />
      <img
        alt='link-icons'
        className={active === 'userholdings' ? styles.activeMobile : undefined}
        onClick={() => onChangeActive('userholdings')}
        src={theme ? '/icons/portfolio.svg' : '/icons/portfolio_white.svg'}
      />
      <img
        alt='link-icons'
        className={active === 'watchlist' ? styles.activeMobile : undefined}
        onClick={() => onChangeActive('watchlist')}
        src={theme ? '/icons/watchlist.svg' : '/icons/watchlist_white.svg'}
      />
    </div>
  );
};
export default Links;
