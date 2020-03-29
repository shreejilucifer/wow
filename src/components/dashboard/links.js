import light from '../../styles/light/links.module.css';

const Links = () => {
  const styles = light;
  return (
    <div className={styles.container}>
      <button className={styles.linkButtons + ' ' + styles.active}>
        Trade
      </button>
      <button className={styles.linkButtons}>News</button>
      <button className={styles.linkButtons}>Transactions</button>
      <button className={styles.linkButtons}>Your Holdings</button>
    </div>
  );
};

export default Links;
