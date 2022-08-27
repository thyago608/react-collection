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
import { ProductProvider } from 'contexts/ProductsContext';

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={client}>
            <ModalProvider>
                <ProductProvider>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                    <ProductModal />
                </ProductProvider>
            </ModalProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default MyApp
