import light from '../styles/light/layout.module.css';

import Navbar from '../components/navbar';

const Layout = ({ children }) => {
  const styles = light;
  return (
    <div className={styles.wrapper}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
