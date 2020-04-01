import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/company.module.css';
import dark from '../../styles/dark/company.module.css';

import nc from '../../utils/commanumber';
import Graph from './graph';

const Card = ({ top, bottom }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.card}>
      <div className={styles.top}>{top}</div>
      <div className={styles.bottom}>{bottom}</div>
    </div>
  );
};

const Company = ({ company }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const {
    short,
    name,
    rate,
    stat,
    price,
    availableVolume,
    boughtVolume,
    currentPrice,
    basePrice
  } = company;
  return (
    <React.Fragment>
      <div className={styles.companyName}> {short}</div>
      <div className={styles.companyDetails}>
        <div className={styles.companyDetailsLeft}>
          <div className={styles.name}>{name}</div>
          <div
            className={
              stat === 'up'
                ? styles.rate + ' ' + styles.up
                : styles.rate + ' ' + styles.down
            }
          >
            {rate}%
          </div>
          <div className={styles.arrow}>
            {stat === 'up' ? (
              <img src='/icons/green_arrow.svg' />
            ) : (
              <img src='/icons/red_arrow.svg' />
            )}
          </div>
          <div
            className={
              stat === 'up'
                ? styles.rate + ' ' + styles.up
                : styles.rate + ' ' + styles.down
            }
          >
            ₹{nc(price)}
          </div>
        </div>

        <div className={styles.heart}>
          <img src={theme ? '/icons/heart.svg' : '/icons/heart_white.svg'} />
        </div>
      </div>
      <div className={styles.companyCards}>
        <Card top='Available Volume' bottom={nc(availableVolume)} />
        <Card top='Bought Volume' bottom={boughtVolume} />
        <Card top='Current Price' bottom={'₹' + nc(currentPrice)} />
        <Card top='Base Price' bottom={'₹' + nc(basePrice)} />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.wrapperLeft}>
          <Graph />
        </div>
        <div className={styles.wrapperRight}>
          <div className={styles.formContainer}>
            <div className={styles.title}>
              <span>Instant Execution</span>
              <span>Enter amount to buy/sell shares.</span>
            </div>

            <div className={styles.groupContainer}>
              <div className={styles.inputContainer}>
                <input className={styles.input} type='text' />
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button}>BUY</button>
              </div>
            </div>
            <div className={styles.groupContainer}>
              <div className={styles.inputContainer}>
                <input className={styles.input} type='text' />
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button}>SELL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Company;
