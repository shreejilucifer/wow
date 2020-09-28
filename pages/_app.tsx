import { useState, useEffect } from 'react';
import { ThemeContext } from '../src/utils/theme';
import Cookies from 'js-cookie';

import '../src/styles/global.css';

function MyApp({ Component, pageProps }: any) {
  const [theme, setActualTheme] = useState(true);

  useEffect(() => {
    if (Cookies.get('theme') === 'false') setActualTheme(false);
  }, []);

  return (
    <div>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme: (theme) => {
            setActualTheme(theme);
            Cookies.set('theme', theme.toString());
          },
        }}
      >
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </div>
  );
}

export default MyApp;
