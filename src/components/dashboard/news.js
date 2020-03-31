import light from '../../styles/light/news.module.css';
import dark from '../../styles/dark/news.module.css';

const NewsItem = ({ theme }) => {
  const styles = theme ? light : dark;

  return (
    <div className={styles.newsContainer}>
      <div className={styles.newsTitle}>
        <span>Fire at Reliance Mumbai Headquaters •</span>
        <span>02:49PM</span>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed
        ipsum molestie, pellentesque risus non, bibendum orci. Suspendisse
        ultrices sodales mi, sit amet iaculis tellus commodo et. Duis iaculis
        imperdiet malesuada. Nam vel varius urna. Pellentesque ornare tincidunt
        augue, at sollicitudin est ultricies nec. Cras nisl orci, maximus at
        odio nec, sodales lobortis lectus. Praesent vel mauris nulla. Nam vel
        varius urna. Pellentesque ornare tincidunt augue, at sollicitudin est
        ultricies nec. Cras nisl orci, maximus at odio nec, sodales lobortis
        lectus. Praesent vel mauris nulla.
      </div>
    </div>
  );
};
const News = ({ theme }) => {
  const styles = theme ? light : dark;
  return (
    <div className={styles.container}>
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
      <NewsItem theme={theme} />
    </div>
  );
};

export default News;
