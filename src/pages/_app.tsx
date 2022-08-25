import type { AppProps } from 'next/app';
import { QueryClientProvider } from "@tanstack/react-query";
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { NewProductModal } from 'components/NewProductModal';
import { ModalProvider } from "contexts/ModalContext";
import Modal from "react-modal";
import "styles/global.scss";
import { queryClient } from 'services/queryClient';

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <Header />
                <Component {...pageProps} />
                <Footer />
                <NewProductModal />
            </ModalProvider>
        </QueryClientProvider>
    );
}

export default MyApp
