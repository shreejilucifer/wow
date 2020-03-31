import light from '../../styles/light/transactions.module.css';
import dark from '../../styles/dark/transactions.module.css';

const TransactionItem = ({ theme, transaction }) => {
  const styles = theme ? light : dark;
  return (
    <div className={styles.transactionContainer}>
      <div>Buy</div>
      <div>as2313da5fx3</div>
      <div>Adani petroleum (ADAP)</div>
      <div>1289</div>
      <div>80</div>
      <div>01:33 pm</div>
      <div>completed</div>
    </div>
  );
};
const Transactions = ({ theme }) => {
  const styles = theme ? light : dark;

  return (
    <div className={styles.container}>
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
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
        <TransactionItem theme={theme} />
      </div>
    </div>
  );
};

export default Transactions;
