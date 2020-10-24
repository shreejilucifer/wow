import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import {
  Company as CObj,
  useAddToWatchlistMutation,
  useBuyMutation,
} from '../../generated/graphql';
import dark from '../../styles/dark/company.module.css';
import light from '../../styles/light/company.module.css';
import { calculateRate } from '../../utils/calculateRate';
import { calculateStat } from '../../utils/calculateStat';
import nc from '../../utils/commanumber';
import shortName from '../../utils/shortName';
import { ThemeContext } from '../../utils/theme';
import { toErrorMap } from '../../utils/toErrorMap';
import { InputField } from '../common/inputfield';
import Graph from './graph';

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

  const [addToWatchlist, { loading }] = useAddToWatchlistMutation();
  const [buy, { loading: buyLoading }] = useBuyMutation();

  return (
    <React.Fragment>
      {!company ? (
        <div className={styles.loading}>
          <h3>Nothing Selected</h3>
          <p>please select something to play :)</p>
        </div>
      ) : (
        <>
          <div className={styles.companyName}> {shortName(company.name)}</div>
          <div className={styles.companyDetails}>
            <div className={styles.companyDetailsLeft}>
              <div className={styles.name}>{company.name}</div>
              <div
                className={
                  calculateStat(company.previousValues) === 'up'
                    ? styles.rate + ' ' + styles.up
                    : styles.rate + ' ' + styles.down
                }
              >
                {calculateRate(company.previousValues, company.shareValue)}%
              </div>
              <div className={styles.arrow}>
                {calculateStat(company.previousValues) === 'up' ? (
                  <img alt='uparrow' src='/icons/green_arrow.svg' />
                ) : (
                  <img alt='downarrow' src='/icons/red_arrow.svg' />
                )}
              </div>
              <div
                className={
                  calculateStat(company.previousValues) === 'up'
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

                <Formik
                  initialValues={{ buy: '' }}
                  onSubmit={async (values, { resetForm, setErrors }) => {
                    const response = await buy({
                      variables: {
                        companyId: company.id,
                        noOfShares: parseInt(values.buy),
                        type: 'buy',
                      },
                      refetchQueries: ['Dashboard'],
                    });

                    if (response.data?.buy.errors) {
                      setErrors(toErrorMap(response.data.buy.errors));
                    } else if (response.data?.buy.transaction) {
                      resetForm();
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className={styles.groupContainer}>
                      <div className={styles.inputContainer}>
                        <InputField
                          disabled={isSubmitting}
                          name='buy'
                          className={styles.input}
                          type='text'
                        />
                      </div>
                      <div className={styles.buttonContainer}>
                        <button
                          type='submit'
                          className={styles.button}
                          disabled={isSubmitting}
                        >
                          {buyLoading ? '...' : 'BUY'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

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
        </>
      )}
    </React.Fragment>
  );
};

export default Company;
