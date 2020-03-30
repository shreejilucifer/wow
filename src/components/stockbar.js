import light from '../styles/light/stockbar.module.css';

const x = [
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'up' },
  { name: 'Tata Motors (TM)', percentage: 46.45, stat: 'up' },
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'up' },
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'up' },
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'down' },
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'up' },
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'up' },
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'up' },
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'up' },
  { name: 'Reliance (Rel)', percentage: 46.45, stat: 'down' }
];

const StockbarItem = ({ name, stat }) => {
  const styles = light;
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

const Stockbar = () => {
  const styles = light;

  return (
    <div className={styles.container}>
      <span className={styles.slider1}>
        {x.map((a, index) => (
          <StockbarItem
            name={a.name + ' ' + a.percentage}
            stat={a.stat}
            key={index}
          />
        ))}
      </span>
      <span className={styles.slider2}>
        {x.map((a, index) => (
          <StockbarItem
            name={a.name + ' ' + a.percentage}
            stat={a.stat}
            key={index}
          />
        ))}
      </span>
      <span className={styles.slider3}>
        {x.map((a, index) => (
          <StockbarItem
            name={a.name + ' ' + a.percentage}
            stat={a.stat}
            key={index}
          />
        ))}
      </span>
    </div>
  );
};

export default Stockbar;
