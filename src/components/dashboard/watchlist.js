import light from '../../styles/light/watchlist.module.css';
import nc from '../../utils/commanumber';

const Item = ({ name, stat, percentage, price, stock }) => {
  const styles = light;

  const renderName = name => {
    let x = name.length > 10 ? name.toString().substring(0, 10) + '....' : name;
    return x;
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.nameContainer}>
          <div className={styles.name}>{renderName(name)}</div>
          <img src='/icons/heart_fill.svg' className={styles.heart} />
        </div>
        <div className={styles.statContainer}>
          <div className={stat === 'up' ? styles.up : styles.down}>
            {percentage}
          </div>
          <div className={stat === 'up' ? styles.up : styles.down}>
            {stat === 'up' ? (
              <img src='/icons/green_arrow.svg' className={styles.caret} />
            ) : (
              <img src='/icons/red_arrow.svg' className={styles.caret} />
            )}
          </div>
          <div className={stat === 'up' ? styles.up : styles.down}>
            ₹{nc(price)}
          </div>
          <div className={stat === 'up' ? styles.up : styles.down}>{stock}</div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.transactionContainer}>
          <input />
          <button>Buy</button>
        </div>
        <div className={styles.transactionContainer}>
          <input />
          <button>Sell</button>
        </div>
      </div>
    </div>
  );
};

const WatchList = () => {
  const styles = light;
  return (
    <div className={styles.container}>
      <div className={styles.title}>Watchlist</div>
      <div className={styles.items}>
        <Item
          name='Info'
          stat='down'
          percentage='90%'
          price={1000}
          stock={14300}
        />
        <Item
          name='Info'
          stat='up'
          percentage='90%'
          price={1000}
          stock={14300}
        />
        <Item
          name='Info'
          stat='up'
          percentage='90%'
          price={1000}
          stock={14300}
        />
        <Item
          name='Info'
          stat='up'
          percentage='90%'
          price={1000}
          stock={14300}
        />
        <Item
          name='Info'
          stat='up'
          percentage='90%'
          price={1000}
          stock={14300}
        />
        <Item
          name='Info'
          stat='up'
          percentage='90%'
          price={1000}
          stock={14300}
        />
        <Item
          name='Info'
          stat='up'
          percentage='90%'
          price={1000}
          stock={14300}
        />
        <Item
          name='Info'
          stat='up'
          percentage='90%'
          price={1000}
          stock={14300}
        />
      </div>
    </div>
  );
};

export default WatchList;
