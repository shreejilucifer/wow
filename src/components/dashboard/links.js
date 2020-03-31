import light from '../../styles/light/links.module.css';
import dark from '../../styles/dark/links.module.css';

const Links = ({ active, onChangeActive, theme }) => {
  const styles = theme ? light : dark;

  return (
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
  );
};

export default Links;
