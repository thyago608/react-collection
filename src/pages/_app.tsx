import { Header } from 'components/Header';
import type { AppProps } from 'next/app';
import "styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
