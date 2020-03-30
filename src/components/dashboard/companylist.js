import light from '../../styles/light/companylist.module.css';
import { useState } from 'react';

const Company = ({ stat }) => {
  const styles = light;

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

const Category = ({ categoryName }) => {
  const [open, setOpen] = useState(false);
  const styles = light;

  return (
    <React.Fragment>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryName}>{categoryName}</div>
        <div className={styles.caret} onClick={() => setOpen(!open)}>
          {open ? (
            <img src='/icons/black_arrow_up.svg' />
          ) : (
            <img src='/icons/black_arrow_down.svg' />
          )}
        </div>
      </div>
      {open ? (
        <React.Fragment>
          <Company stat='up' />
          <Company stat='down' />
          <Company stat='up' />
          <Company stat='down' />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

const CompanyList = () => {
  const styles = light;

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchIcon}>
          <img src='/icons/search.svg' />
        </div>
        <input
          placeholder='Search for a Category/Company'
          className={styles.searchbar}
          type='text'
        />
      </div>
      <div className={styles.listContainer}>
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software 1' />
        <Category categoryName='IT Software 2' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software3' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
        <Category categoryName='IT Software' />
      </div>
    </div>
  );
};

export default CompanyList;
