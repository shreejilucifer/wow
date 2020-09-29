import { useState, useEffect } from 'react';
import { ThemeContext } from '../src/utils/theme';
import Cookies from 'js-cookie';

import '../src/styles/global.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: any) {
  const [theme, setActualTheme] = useState(true);

  useEffect(() => {
    if (Cookies.get('theme') === 'false') setActualTheme(false);
  }, []);

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default MyApp;
