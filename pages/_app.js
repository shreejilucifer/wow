import { useState } from 'react';
import { ThemeContext } from '../src/utils/theme';
import '../src/styles/global.css';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(true);

  return (
    <div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </div>
  );
}

export default MyApp;
