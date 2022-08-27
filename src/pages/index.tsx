import React, { useState, useContext } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import { ProductContext } from "contexts/ProductsContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { toastError } from "utils/toasts";
import { Product } from "components/Product";
import { Button } from "components/Button";
import { IProduct } from "types/Product";
import { getProducts, useFetchProducts } from "hooks/useFetchProducts";
import styles from "./home.module.scss";

interface HomeProps {
    products: IProduct[];
    pages: {
        currentPage: number;
        prevPage: number;
        nextPage: number;
        totalPages: number;
    }
}

export default function Home({ products, pages }: HomeProps) {
    const [page, setPage] = useState(pages.currentPage);
    const { data, error, isLoading } = useFetchProducts(page, {
        products,
        pages: {
            currentPage: pages.currentPage,
            nextPage: pages.nextPage,
            prevPage: pages.prevPage,
            totalPages: pages.totalPages,
        }
    });

    const { products: productsState } = useContext(ProductContext);

    if (error) {
        toastError("Desculpe, não foi possível carregar os produtos");
    }

    function handlePrevPage() {
        if (page === 1) {
            return;
        }
        setPage(page - 1);
    }

    function handleNextPage() {
        if (page === data?.pages.nextPage) {
            return;
        }
        setPage(page + 1);
    }

    return (
        <>
            <Head>
                <title>React Collection | Home</title>
            </Head>
            <main className={styles.container}>
                <ToastContainer />
                {isLoading ? <p>carregando...</p> :
                    <section className={styles.containerProducts}>
                        {productsState.length === 0 ? data?.products.map(product => (
                            <Product key={product.id} product={product} />
                        )) :
                            (productsState.map(product => (
                                <Product key={product.id} product={product} />
                            )))}
                    </section>
                }
                {productsState.length === 0 &&
                    <nav className={styles.navigation}>
                        <Button
                            onClick={handlePrevPage}
                            text="Anterior"
                            icon={<FiArrowLeft />}
                            disabled={page === 1}
                        />
                        <Button
                            onClick={handleNextPage}
                            text="Próximo"
                            icon={<FiArrowRight />}
                            position="right"
                            disabled={page === data?.pages.totalPages}
                        />
                    </nav>
                }
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await getProducts(1);

    return {
        props: response
    }
}