import type { AppProps } from 'next/app';
import Modal from "react-modal";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { ProductModal } from 'components/ProductModal';
import { ModalProvider } from "contexts/ModalContext";
import { client } from 'services/queryClient';
import "react-toastify/dist/ReactToastify.css";
import "styles/global.scss";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={client}>
            <ModalProvider>
                <Header />
                <Component {...pageProps} />
                <Footer />
                <ProductModal />
            </ModalProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default MyApp
