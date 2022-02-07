import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/globals.css';
import { Provider } from 'react-redux';
import Store from '../Store/Store';

function MyApp({ Component, pageProps }) {
  return(
    <Provider store={Store}>
      <Head>
        <title>Codessa - o blog da programação!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp
