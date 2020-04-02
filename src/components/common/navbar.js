import { useContext, useState } from 'react';
import { ThemeContext } from '../../utils/theme';
import light from '../../styles/light/navbar.module.css';
import dark from '../../styles/dark/navbar.module.css';

const Navbar = ({ name }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const [controls, setControls] = useState(false);

  return (
    <React.Fragment>
      <MobileNavbar name={name} />
      <div className={styles.wrapper}>
        <Logo />
        <Timer />
        <div className={styles.controlsContainer}>
          <Notification />
          <User name={name} img='/test-user.png' />
          <div
            className={styles.dropDownContainer}
            onClick={() => setControls(!controls)}
          >
            <img
              src={
                theme ? '/icons/arrow_down.svg' : '/icons/arrow_down_white.svg'
              }
              className={styles.caret}
            />
            {controls ? <Controls /> : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const User = ({ img, name }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.userMobile}>
      <div className={styles.userContainer}>
        <img src={img} className={styles.user} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

const Logo = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.logoContainer}>
      <img
        src={theme ? '/icons/logo.svg' : '/icons/logo_white.svg'}
        className={styles.logo}
      />
    </div>
  );
};

const Controls = () => {
  const { theme } = useContext(ThemeContext);
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

const Timer = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.timerContainer}>
      <img
        src={theme ? '/icons/timer.svg' : '/icons/timer_white.svg'}
        className={styles.timer}
      />
      <div className={styles.timerContent}>00:00:00</div>
    </div>
  );
};

const Notification = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.notificationContainer}>
      <img
        src={theme ? '/icons/notification.svg' : '/icons/bell_white.svg'}
        className={styles.notification}
      />
    </div>
  );
};

const Hamburger = ({ name }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.hamburgerContainer}>
      <img
        src={theme ? '/icons/hamburger.svg' : '/icons/hamburger_white.svg'}
        onClick={() => setOpen(true)}
      />
      {open ? (
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderContainer}>
            <div className={styles.upperContainer}>
              <div className={styles.branding}>
                <Logo />
                <img
                  src='/icons/close_black.svg'
                  onClick={() => setOpen(false)}
                />
              </div>
              <User name={name} img='/test-user.png' />
            </div>
            <div className={styles.linksContainer}>
              <div>leaderboard</div>
              <div>how to play</div>
              <div>about us</div>
              <div onClick={() => setTheme(!theme)}>
                {theme ? 'dark mode' : 'light mode'}
              </div>
              <div>logout</div>
              <div>change password</div>
            </div>
          </div>
          <div className={styles.transparent} onClick={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
};

const MobileNavbar = ({ name }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme ? light : dark;
  return (
    <div className={styles.mobileWrapper}>
      <Hamburger name={name} />
      <Timer />
      <Notification />
    </div>
  );
};

export default Navbar;
