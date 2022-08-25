import type { AppProps } from 'next/app';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { NewProductModal } from 'components/NewProductModal';
import { ModalProvider } from "contexts/ModalContext";
import Modal from "react-modal";
import "styles/global.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ModalProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <NewProductModal />
        </ModalProvider>
    );
}

export default MyApp
