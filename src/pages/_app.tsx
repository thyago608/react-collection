import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import Modal from "react-modal";
import type { AppProps } from 'next/app';
import "styles/global.scss";
import { NewProductModal } from 'components/NewProductModal';

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <NewProductModal />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp
