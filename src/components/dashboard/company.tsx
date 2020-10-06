import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/company.module.css';
import dark from '../../styles/dark/company.module.css';

import nc from '../../utils/commanumber';
import Graph from './graph';
import {
  Company as CObj,
  useAddToWatchlistMutation,
} from '../../generated/graphql';
import shortName from '../../utils/shortName';
import { calculateRate } from '../../utils/calculateRate';
import { calculateStat } from '../../utils/calculateStat';

interface cardProps {
  top: number | string;
  bottom: number | string;
}

const Card: React.FC<cardProps> = ({ top, bottom }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.card}>
      <div className={styles.top}>{top}</div>
      <div className={styles.bottom}>{bottom}</div>
    </div>
  );
};

const Company: React.FC<{ company: CObj | undefined }> = ({ company }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  if (!company)
    return (
      <div className={styles.loading}>
        <h3>Nothing Selected</h3>
        <p>please select something to play :)</p>
      </div>
    );

  let stat = calculateStat(company.previousValues);

  const [addToWatchlist, { loading }] = useAddToWatchlistMutation();

  return (
    <React.Fragment>
      <div className={styles.companyName}> {shortName(company.name)}</div>
      <div className={styles.companyDetails}>
        <div className={styles.companyDetailsLeft}>
          <div className={styles.name}>{company.name}</div>
          <div
            className={
              stat === 'up'
                ? styles.rate + ' ' + styles.up
                : styles.rate + ' ' + styles.down
            }
          >
            {calculateRate(company.previousValues, company.shareValue)}%
          </div>
          <div className={styles.arrow}>
            {stat === 'up' ? (
              <img alt='uparrow' src='/icons/green_arrow.svg' />
            ) : (
              <img alt='downarrow' src='/icons/red_arrow.svg' />
            )}
          </div>
          <div
            className={
              stat === 'up'
                ? styles.rate + ' ' + styles.up
                : styles.rate + ' ' + styles.down
            }
          >
            ₹{nc(company.shareValue)}
          </div>
        </div>

        <div
          className={styles.heart}
          onClick={async () => {
            await addToWatchlist({
              variables: {
                companyId: company.id,
              },
              refetchQueries: ['Watchlist'],
            });
          }}
        >
          {!loading && (
            <img
              alt='heart'
              src={theme ? '/icons/heart.svg' : '/icons/heart_white.svg'}
            />
          )}
        </div>
      </div>
      <div className={styles.companyCards}>
        <Card top='Available Volume' bottom={nc(company.shareCount)} />
        <Card top='Bought Volume' bottom='000' />
        <Card top='Current Price' bottom={'₹' + nc(company.shareValue)} />
        <Card
          top='Base Price'
          bottom={'₹' + nc(company.previousValues[0].shareValue)}
        />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.wrapperLeft}>
          <Graph data={company.previousValues} />
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
