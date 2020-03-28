import { useState } from 'react';

import light from '../styles/light/navbar.module.css';

const Controls = () => {
  const styles = light;
  return (
    <div className={styles.controlsDropdownContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>Change Password</div>
        <div className={styles.content}>Log Out</div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [controls, setControls] = useState(false);
  const styles = light;
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <img src='/logo.svg' className={styles.logo} />
      </div>
      <div className={styles.timerContainer}>
        <img src='/timer.svg' className={styles.timer} />
        <div className={styles.timerContent}>00:00:00</div>
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.notificationContainer}>
          <img src='/notification.svg' className={styles.notification} />
        </div>
        <div className={styles.userContainer}>
          <img src='/test-user.png' className={styles.user} />
        </div>
        <div className={styles.name}>DAENERYS</div>
        <div
          className={styles.dropDownContainer}
          onClick={() => setControls(!controls)}
        >
          <img src='/caret.svg' className={styles.caret} />
          {controls ? <Controls /> : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
