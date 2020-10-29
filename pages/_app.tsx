import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { AppProps } from 'next/app';
import * as React from 'react';

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
	return (
		<ThemeProvider>
			<CSSReset />
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
