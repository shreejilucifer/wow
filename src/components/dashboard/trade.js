import light from '../../styles/light/trade.module.css';
import CompanyList from './companylist';
import Company from './company';

const company = {
  short: 'TCS',
  name: 'Tata Consultancy Services',
  rate: '3.2',
  stat: 'up',
  price: 1830,
  availableVolume: 1200000,
  boughtVolume: 1200000,
  currentPrice: 1200000,
  basePrice: 1200000
};

const Trade = () => {
  const styles = light;
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
