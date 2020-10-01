import dark from '../../styles/dark/companylist.module.css';
import light from '../../styles/light/companylist.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';

interface searchbarProps {
  onSearchCompanies: (str: string) => void;
}

const SearchBar: React.FC<searchbarProps> = ({ onSearchCompanies }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <img src={theme ? '/icons/search.svg' : '/icons/search_white.svg'} />
      </div>
      <input
        placeholder='Search for a Company'
        className={styles.searchbar}
        type='text'
        onChange={(e) => onSearchCompanies(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
