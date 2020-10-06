import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/transactions.module.css';
import dark from '../../styles/dark/transactions.module.css';
import { useState } from 'react';
import { Transaction, useTransactionsQuery } from '../../generated/graphql';

interface transactionItemProps {
  type: string;
  id: string;
  companyName: string;
  price: number;
  quantity: number;
  time: string;
}

const TransactionItem: React.FC<transactionItemProps> = ({
  companyName,
  id,
  price,
  quantity,
  time,
  type,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.transactionContainer}>
      <div>{type}</div>
      <div>{id}</div>
      <div>{companyName}</div>
      <div>{price}</div>
      <div>{quantity}</div>
      <div>{time}</div>
      <div>completed</div>
    </div>
  );
};

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

const Transactions = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const { data, refetch, loading } = useTransactionsQuery();

  useEffect(() => {
    refetch();
  }, [data?.transactions]);

  const [search, setSearch] = useState('');

  const searchFilter = (transactions: any) => {
    return transactions.filter((t: Transaction) =>
      t.company.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Transactions</div>
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
            <div>Type</div>
            <div>ID</div>
            <div>Company</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Timestamp</div>
            <div>Status</div>
          </div>
          <div className={styles.transactions}>
            {searchFilter(data?.transactions).map(
              (transaction: Transaction) => (
                <TransactionItem
                  type={transaction.type}
                  key={transaction.id}
                  companyName={transaction.company.name}
                  id={transaction.id.toString(16)}
                  price={transaction.shareAmount}
                  quantity={transaction.noOfShares}
                  time={`8:00`}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
