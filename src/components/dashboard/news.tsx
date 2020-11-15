import React, { useContext } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/news.module.css';
import dark from '../../styles/dark/news.module.css';
import { useNewsQuery } from '../../generated/graphql';

interface NewsItemProps {
  title: string;
  description: string;
  time: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, description, time }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  return (
    <div className={styles.newsContainer}>
      <div className={styles.newsTitle}>
        <span>{title}</span>
        <span>
          {new Date(time).getHours()}:{new Date(time).getMinutes()}
        </span>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.content}>{description}</div>
    </div>
  );
};

const News = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;

  const { loading, data } = useNewsQuery();

  return (
    <React.Fragment>
      <div className={styles.title}>News</div>
      <div className={styles.container}>
        {loading ? (
          <div
            style={{
              height: '63vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3>Loading...</h3>
          </div>
        ) : (
          <>
            {data?.news
              .sort(
                (a, b) =>
                  new Date(b.time).getTime() - new Date(a.time).getTime()
              )
              .map((news) => (
                <NewsItem
                  key={news.id}
                  description={news.description}
                  title={news.title}
                  time={news.time}
                />
              ))}
          </>
        )}
        {data?.news.length === 0 && (
          <div className={styles.loading}>
            <h3>No News</h3>
            <p>please wait for market to go live :)</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default News;
