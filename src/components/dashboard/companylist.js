import light from '../../styles/light/companylist.module.css';
import dark from '../../styles/dark/companylist.module.css';

import { useState } from 'react';

const Company = ({ stat, theme, onSelect }) => {
  const styles = theme ? light : dark;

  return (
    <div
      className={styles.companyContainer}
      onClick={() => {
        if (onSelect) onSelect();
      }}
    >
      <div className={styles.companyItems}>TCS</div>
      <div
        className={
          stat === 'up'
            ? styles.companyItems + ' ' + styles.up
            : styles.companyItems + ' ' + styles.down
        }
      >
        4.9%
      </div>
      <div className={styles.companyItems}>
        {stat === 'up' ? (
          <img src='/icons/green_arrow.svg' />
        ) : (
          <img src='/icons/red_arrow.svg' />
        )}
      </div>
      <div
        className={
          stat === 'up'
            ? styles.companyItems + ' ' + styles.up
            : styles.companyItems + ' ' + styles.down
        }
      >
        ₹1,240
      </div>
    </div>
  );
};

const Category = ({ categoryName, theme, onSelect }) => {
  const [open, setOpen] = useState(false);
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
          <Company theme={theme} stat='up' onSelect={onSelect} />
          <Company theme={theme} stat='down' onSelect={onSelect} />
          <Company theme={theme} stat='up' onSelect={onSelect} />
          <Company theme={theme} stat='down' onSelect={onSelect} />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const CompanyList = ({ theme }) => {
  const styles = theme ? light : dark;

  return (
    <React.Fragment>
      <MobileCompanyList theme={theme} />
      <div className={styles.container}>
        <SearchBar theme={theme} />
        <div className={styles.listContainer}>
          <Category theme={theme} categoryName='IT Software' />
        </div>
      </div>
    </React.Fragment>
  );
};

const SearchBar = ({ theme }) => {
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

const MobileCompanyList = ({ theme }) => {
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
          <SearchBar theme={theme} />

          <div className={styles.listContainer}>
            <Category
              theme={theme}
              categoryName='IT Software'
              onSelect={() => setSelected(!selected)}
            />
            <Category
              theme={theme}
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
