import light from '../../styles/light/trade.module.css';
import CompanyList from './companylist';

const Trade = () => {
  const styles = light;
  return (
    <div className={styles.container}>
      <CompanyList />
      <div className={styles.main}>Trade</div>
    </div>
  );
};

export default Trade;
