import React, { useState } from "react";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import { useFetchProducts } from "hooks/useFetchProducts";
import { useProductsSearch } from "hooks/useProductsSearch";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { toastError } from "utils/toasts";
import { Loading } from "components/Loading";
import { Button } from "components/Button";
import { ProductList } from "components/ProductList";
import styles from "./home.module.scss";

export default function Home() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isRefetching } = useFetchProducts(page);

    const { products: productsSearched } = useProductsSearch();
    const products = productsSearched.length === 0 ? data?.products ?? [] : productsSearched;

    const NavigationComponent = (
        <nav className={styles.navigation}>
            <Button
                onClick={() => setPage(page - 1)}
                text="Anterior"
                icon={<FiArrowLeft />}
                disabled={page === 1}
            />
            <Button
                onClick={() => setPage(page + 1)}
                text="Próximo"
                icon={<FiArrowRight />}
                position="right"
                disabled={page === data?.totalPages}
            />
        </nav>
    );

    if (error) {
        toastError("Desculpe, não foi possível carregar os produtos");
    }

    return (
        <>
            <Head>
                <title>React Collection | Home</title>
            </Head>
            <main className={styles.container}>
                <ToastContainer />
                {!isLoading && isRefetching && <Loading isRefetching={true} />}
                {isLoading ? <Loading /> : <ProductList products={products} />}
                {productsSearched.length === 0 && NavigationComponent}
            </main>
        </>
    );
}