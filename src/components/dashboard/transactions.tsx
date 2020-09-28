import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/transactions.module.css';
import dark from '../../styles/dark/transactions.module.css';
import { useState } from 'react';

const TransactionItem = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.transactionContainer}>
      <div>Buy</div>
      <div>as2313da5fx3</div>
      <div>Adani petroleum</div>
      <div>1289</div>
      <div>80</div>
      <div>01:33 pm</div>
      <div>completed</div>
    </div>
  );
};

const SearchBar = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <div className={styles.searchBarContainer}>
      {searchVisible ? (
        <div className={styles.searchbar}>
          <input type='text' />
          <img
            alt='search'
            onClick={() => setSearchVisible(!searchVisible)}
            src={theme ? '/icons/search.svg' : '/icons/search_white.svg'}
          />
        </div>
      ) : (
        <img
          alt='search'
          src={theme ? '/icons/search.svg' : '/icons/search_white.svg'}
          onClick={() => setSearchVisible(!searchVisible)}
        />
      )}
    </div>
  );
};

const Transactions = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Transactions</div>
      <SearchBar />
      <div className={styles.header}>
        <div>Type</div>
        <div>ID</div>
        <div>Company</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Timestamp</div>
        <div>Status</div>
      </div>
      <div className={styles.transactions}>
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
      </div>
    </div>
  );
};

export default Transactions;
