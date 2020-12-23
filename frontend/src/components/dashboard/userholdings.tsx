import { useContext, useState } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/userholdings.module.css';
import dark from '../../styles/dark/userholdings.module.css';
import shortName from '../../utils/shortName';
import {
  CurrentHolding,
  useCurrentHoldingsQuery,
} from '../../generated/graphql';

interface searchbarProps {
  onSearch: (str: string) => void;
}

const SearchBar: React.FC<searchbarProps> = ({ onSearch }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <div className={styles.searchBarContainer}>
      {searchVisible ? (
        <div className={styles.searchbar}>
          <input type='text' onChange={(e) => onSearch(e.target.value)} />
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

interface holdingItemProps {
  id: number;
  companyName: string;
  shareValue: number;
  sharePrice: number;
}

const HoldingItem: React.FC<holdingItemProps> = ({
  companyName,
  id,
  sharePrice,
  shareValue,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.holdingContainer}>
      <div>
        {companyName} ({shortName(companyName)})
      </div>
      <div>{shareValue}</div>
      <div>₹{sharePrice}</div>
      <div className={styles.buySellContainer}>
        <div className={styles.transactionContainer}>
          <button>Buy {id}</button>
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
  const { data, loading } = useCurrentHoldingsQuery();
  const [search, setSearch] = useState('');

  const searchFilter = (currentholdings: any) => {
    return currentholdings.filter((c: CurrentHolding) =>
      c.company.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>User Holdings</div>
      <SearchBar onSearch={(search) => setSearch(search)} />
      {loading ? (
        <div
          style={{
            height: '63vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <div>Company</div>
            <div>Quantity</div>
            <div>Current Price</div>
            <div>Transaction</div>
          </div>
          <div className={styles.holdings}>
            {searchFilter(data?.currentholding).map(
              (currentHolding: CurrentHolding) => (
                <HoldingItem
                  key={currentHolding.id}
                  companyName={currentHolding.company.name}
                  id={currentHolding.id}
                  sharePrice={currentHolding.sharePrice}
                  shareValue={currentHolding.shareCount}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserHoldings;
