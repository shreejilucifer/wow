import light from '../../styles/light/companylist.module.css';
import dark from '../../styles/dark/companylist.module.css';

import { useState } from 'react';

const Company = ({ stat, theme }) => {
  const styles = theme ? light : dark;

  return (
    <div className={styles.companyContainer}>
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

const Category = ({ categoryName, theme }) => {
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
                  : '/icons/white_arrow_up.svg'
              }
            />
          ) : (
            <img
              src={
                theme
                  ? '/icons/black_arrow_down.svg'
                  : '/icons/white_arrow_down.svg'
              }
            />
          )}
        </div>
      </div>
      {open ? (
        <React.Fragment>
          <Company theme={theme} stat='up' />
          <Company theme={theme} stat='down' />
          <Company theme={theme} stat='up' />
          <Company theme={theme} stat='down' />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const CompanyList = ({ theme }) => {
  const styles = theme ? light : dark;

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchIcon}>
          <img src={theme ? '/icons/search.svg' : 'icons/search_white.svg'} />
        </div>
        <input
          placeholder='Search for a Category/Company'
          className={styles.searchbar}
          type='text'
        />
      </div>
      <div className={styles.listContainer}>
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software 1' />
        <Category theme={theme} categoryName='IT Software 2' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software3' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
        <Category theme={theme} categoryName='IT Software' />
      </div>
    </div>
  );
};

export default CompanyList;
