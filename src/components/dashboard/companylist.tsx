import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/companylist.module.css';
import dark from '../../styles/dark/companylist.module.css';

import { useState } from 'react';

interface companyProps {
  stat: string;
  onSelect?: () => any;
}

const Company: React.FC<companyProps> = ({ stat, onSelect }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  const renderClassName = (stat: string) => {
    let myClassName = styles.companyItems;
    if (stat === 'up') myClassName += ' ' + styles.up;
    else myClassName += ' ' + styles.down;
    return myClassName;
  };

  const renderArrow = (stat: string) => {
    if (stat === 'up') return <img src='/icons/green_arrow.svg' />;
    else return <img src='/icons/red_arrow.svg' />;
  };

  return (
    <div
      className={styles.companyContainer}
      onClick={() => {
        onSelect ? onSelect() : null;
      }}
    >
      <div className={styles.companyItems}>TCS</div>
      <div className={renderClassName(stat)}>4.9%</div>
      <div className={styles.companyItems}>{renderArrow(stat)}</div>
      <div className={renderClassName(stat)}>₹1,240</div>
    </div>
  );
};
interface categoryProps {
  categoryName: string;
  onSelect?: () => any;
}

const Category: React.FC<categoryProps> = ({ categoryName, onSelect }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <React.Fragment>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryName}>{categoryName}</div>
        <div className={styles.caret} onClick={() => setOpen(!open)}>
          {open ? (
            <img
              src={
                theme
                  ? '/icons/black_arrow_up.svg'
                  : '/icons/arrow_up_white.svg'
              }
            />
          ) : (
            <img
              src={
                theme ? '/icons/arrow_down.svg' : '/icons/arrow_down_white.svg'
              }
            />
          )}
        </div>
      </div>
      {open ? (
        <React.Fragment>
          <Company stat='up' onSelect={onSelect} />
          <Company stat='down' onSelect={onSelect} />
          <Company stat='up' onSelect={onSelect} />
          <Company stat='down' onSelect={onSelect} />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const CompanyList = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <React.Fragment>
      <MobileCompanyList />
      <div className={styles.container}>
        <SearchBar />
        <div className={styles.listContainer}>
          <Category categoryName='IT Software' />
        </div>
      </div>
    </React.Fragment>
  );
};

const SearchBar = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>
        <img src={theme ? '/icons/search.svg' : '/icons/search_white.svg'} />
      </div>
      <input
        placeholder='Search for a Category/Company'
        className={styles.searchbar}
        type='text'
      />
    </div>
  );
};

const MobileCompanyList = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const [selected, setSelected] = useState(false);

  return (
    <div className={styles.mobileContainer}>
      <div
        onClick={() => setSelected(!selected)}
        className={styles.mobileTitle}
      >
        Select Company
      </div>
      {!selected ? (
        <div className={styles.mobileWrapper}>
          <SearchBar />

          <div className={styles.listContainer}>
            <Category
              categoryName='IT Software'
              onSelect={() => setSelected(!selected)}
            />
            <Category
              categoryName='IT Software'
              onSelect={() => setSelected(!selected)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CompanyList;
