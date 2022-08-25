import type { AppProps } from 'next/app';
import Modal from "react-modal";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { NewProductModal } from 'components/NewProductModal';
import { ModalProvider } from "contexts/ModalContext";
import { queryClient } from 'services/queryClient';
import "styles/global.scss";

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
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default MyApp
