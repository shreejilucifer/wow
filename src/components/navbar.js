import { useState } from 'react';

import light from '../styles/light/navbar.module.css';
import dark from '../styles/dark/navbar.module.css';

const Controls = ({ theme }) => {
  const styles = theme ? light : dark;
  return (
    <div className={styles.controlsDropdownContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>Change Password</div>
        <div className={styles.content}>Log Out</div>
      </div>
    </div>
  );
};

const Navbar = ({ theme }) => {
  const [controls, setControls] = useState(false);
  const styles = theme ? light : dark;
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <img
          src={theme ? '/icons/logo.svg' : '/icons/logo_white.svg'}
          className={styles.logo}
        />
      </div>
      <div className={styles.timerContainer}>
        <img
          src={theme ? '/icons/timer.svg' : '/icons/timer_white.svg'}
          className={styles.timer}
        />
        <div className={styles.timerContent}>00:00:00</div>
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.notificationContainer}>
          <img src='/icons/notification.svg' className={styles.notification} />
        </div>
        <div className={styles.userContainer}>
          <img src='/test-user.png' className={styles.user} />
        </div>
        <div className={styles.name}>DAENERYS</div>
        <div
          className={styles.dropDownContainer}
          onClick={() => setControls(!controls)}
        >
          <img src='/icons/black_arrow_down.svg' className={styles.caret} />
          {controls ? <Controls /> : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
