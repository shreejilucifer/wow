import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/stockbar.module.css';
import dark from '../../styles/dark/stockbar.module.css';
import {
  PreviousValue,
  RegularCompanyFragment,
  useCompaniesQuery,
} from '../../generated/graphql';
import shortName from '../../utils/shortName';
import { calculateStat } from '../../utils/calculateStat';
import { calculateRate } from '../../utils/calculateRate';

interface stockbaritemProps {
  name: string;
  stat: string;
}

const StockbarItem: React.FC<stockbaritemProps> = ({ name, stat }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.name}>{name}</div>
      <div className={styles.stat}>
        {stat === 'up' ? (
          <div className={styles.up} />
        ) : (
          <div className={styles.down} />
        )}
      </div>
    </div>
  );
};
// a.name + ' ' + a.percentage
const Stockbar = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  const { data } = useCompaniesQuery();

  const renderCompanies = (companies: RegularCompanyFragment[]) => {
    return (
      companies &&
      companies.map((a, index) => (
        <StockbarItem
          name={`${a.name} ${
            shortName(a.name) === a.name ? '' : '(' + shortName(a.name) + ')'
          } ${calculateRate(
            a.previousValues as PreviousValue[],
            a.shareValue
          )}%`}
          stat={calculateStat(a.previousValues as PreviousValue[])}
          key={index}
        />
      ))
    );
  };

  return (
    <div className={styles.container}>
      <span className={styles.slider1}>
        {renderCompanies(data?.companies as RegularCompanyFragment[])}
      </span>
      <span className={styles.slider2}>
        {renderCompanies(data?.companies as RegularCompanyFragment[])}
      </span>
      <span className={styles.slider3}>
        {renderCompanies(data?.companies as RegularCompanyFragment[])}
      </span>
    </div>
  );
};

export default Stockbar;
