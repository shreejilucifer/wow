import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/watchlist.module.css';
import dark from '../../styles/dark/watchlist.module.css';
import nc from '../../utils/commanumber';
import {
  PreviousValue,
  useRemoveFromWatchlistMutation,
  useWatchlistQuery,
  WatchlistQuery,
} from '../../generated/graphql';
import { calculateStat } from '../../utils/calculateStat';
import { calculateRate } from '../../utils/calculateRate';
import shortName from '../../utils/shortName';

interface itemProps {
  id: number;
  name: string;
  stat: string;
  percentage: string;
  price: number;
  stock: number;
}

const Item: React.FC<itemProps> = ({
  id,
  name,
  stat,
  percentage,
  price,
  stock,
}) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  const renderName = (name: string) => {
    let x = name.length > 10 ? name.toString().substring(0, 10) + '....' : name;
    return x;
  };

  const [remove] = useRemoveFromWatchlistMutation();

  return (
    <div className={styles.itemContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.nameContainer}>
          <div className={styles.name}>{renderName(name)}</div>
          <img
            onClick={async () => {
              await remove({
                variables: {
                  watchlistId: id,
                },
                update: (cache) => {
                  cache.evict({ id: 'Watchlist:' + id });
                },
              });
            }}
            alt='icon-watchlist'
            src={
              theme ? '/icons/heart_fill.svg' : '/icons/heart_fill_white.svg'
            }
            className={styles.heart}
          />
        </div>
        <div className={styles.statContainer}>
          <div className={stat === 'up' ? styles.up : styles.down}>
            {percentage}
          </div>
          <div className={stat === 'up' ? styles.up : styles.down}>
            {stat === 'up' ? (
              <img
                alt='icon-watchlist'
                src='/icons/green_arrow.svg'
                className={styles.caret}
              />
            ) : (
              <img
                alt='icon-watchlist'
                src='/icons/red_arrow.svg'
                className={styles.caret}
              />
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
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  const { data, loading, error } = useWatchlistQuery();

  const renderWatchlists = (data: WatchlistQuery | undefined) => {
    if (!data?.watchlist) return null;

    if (data.watchlist.length === 0)
      return <div className={styles.title}>•l•</div>;

    return data.watchlist.map((watchlist) => (
      <Item
        id={watchlist.id}
        key={watchlist.id}
        name={shortName(watchlist.company.name)}
        stat={calculateStat(
          watchlist.company.previousValues as PreviousValue[]
        )}
        percentage={`${calculateRate(
          watchlist.company.previousValues as PreviousValue[],
          watchlist.company.shareValue
        )}`}
        price={watchlist.company.shareValue}
        stock={watchlist.company.shareCount}
      />
    ));
  };

  if (error) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={styles.mobileTitle}>Watchlist</div>
      <div className={styles.container}>
        <div className={styles.title}>Watchlist</div>
        {loading ? (
          <div>••••</div>
        ) : (
          <div className={styles.items}>{renderWatchlists(data)}</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default WatchList;
