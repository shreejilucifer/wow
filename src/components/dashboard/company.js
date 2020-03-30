import light from '../../styles/light/company.module.css';
import nc from '../../utils/commanumber';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: '12:00',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: '12:00',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: '12:00',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: '12:00',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: '12:00',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: '12:00',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: '12:00',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const Card = ({ top, bottom }) => {
  const styles = light;
  return (
    <div className={styles.card}>
      <div className={styles.top}>{top}</div>
      <div className={styles.bottom}>{bottom}</div>
    </div>
  );
};

const Company = ({ company, theme }) => {
  const styles = light;
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
      <div className={styles.companyName}>{short}</div>
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
          <img src='/icons/heart.svg' />
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
          <div className={styles.graphContainer}>
            <div className={styles.graph}>
              <ResponsiveContainer>
                <LineChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 20
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='name'
                    axisLine={{ stroke: '#404040', strokeWidth: 2 }}
                    tick={{ fontSize: '9px' }}
                  />
                  <YAxis
                    axisLine={{ stroke: '#404040', strokeWidth: 2 }}
                    tick={{ fontSize: '9px' }}
                  />
                  <Tooltip />
                  <Line type='monotone' dataKey='pv' stroke='#6FB353' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className={styles.wrapperRight}>
          <div className={styles.formContainer}>
            <div className={styles.title}>
              <span>Instant Execution</span>
              <span>Enter amount to buy/sell shares.</span>
            </div>
            <div className={styles.inputContainer}>
              <input className={styles.input} type='text' />
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>BUY</button>
            </div>
            <div className={styles.inputContainer}>
              <input className={styles.input} type='text' />
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>SELL</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Company;
