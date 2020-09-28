import styles from '../../styles/light/trade.module.css';
import CompanyList from './companylist';
import Company from './company';
import { company } from '../../utils/fakedata';

const Trade = () => {
  return (
    <div className={styles.container}>
      <CompanyList />
      <div className={styles.main}>
        <Company company={company} />
      </div>
    </div>
  );
};

export default Trade;
