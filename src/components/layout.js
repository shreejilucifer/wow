import light from '../styles/light/layout.module.css';

import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

const Layout = ({ children }) => {
  const styles = light;
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.horizontalWrapper}>
        <Sidebar />
        <div className={styles.mainContainer}>{children}</div>
      </div>
      <div style={{ height: '6.0606060606061%' }}>egge</div>
    </div>
  );
};

export default Layout;
