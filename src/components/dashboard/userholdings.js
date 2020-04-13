import { useContext, useState } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/userholdings.module.css';
import dark from '../../styles/dark/userholdings.module.css';

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
            onClick={() => setSearchVisible(!searchVisible)}
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

const HoldingItem = ({ holding }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.holdingContainer}>
      <div>WOLF OF WALL STREET (WOWS)</div>
      <div>400</div>
      <div>₹727</div>
      <div className={styles.buySellContainer}>
        <div className={styles.transactionContainer}>
          <button>Buy</button>
          <input />
        </div>
        <div className={styles.transactionContainer}>
          <button>Sell</button>
          <input />
        </div>
      </div>
    </div>
  );
};

const UserHoldings = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <div className={styles.container}>
      <div className={styles.title}>User Holdings</div>
      <SearchBar />
      <div className={styles.header}>
        <div>Company</div>
        <div>Quantity</div>
        <div>Current Price</div>
        <div>Transaction</div>
      </div>
      <div className={styles.holdings}>
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
        <HoldingItem />
      </div>
    </div>
  );
};

export default UserHoldings;
