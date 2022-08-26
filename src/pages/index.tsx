import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { toastError } from "utils/toasts";
import { Product } from "components/Product";
import { Button } from "components/Button";
import { IProduct } from "types/Product";
import { getProducts, useFetchProducts } from "hooks/useFetchProducts";
import styles from "./home.module.scss";

interface HomeProps {
    products: IProduct;
    currentPage: number;
    prevPage: number;
    nextPage: number;
}

export default function Home({ products, currentPage, prevPage, nextPage }: HomeProps) {
    const [page, setPage] = useState(currentPage);
    const { data, error, isLoading } = useFetchProducts(page, {
        initialData: { products, currentPage, prevPage, nextPage },
    });

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
        if (page === data?.nextPage) {
            return;
        }
        setPage(page + 1);
    }

    return (
        <>
            <Head>
                <title>React Collection | Home</title>
            </Head>
            <ToastContainer />
            <main className={styles.container}>
                {isLoading ? <p>carregando...</p> :
                    <section className={styles.containerProducts}>
                        {data?.products.map(product => (
                            <Product key={product.id} product={product} />
                        ))}
                    </section>
                }
                <nav className={styles.navigation}>
                    <Button
                        onClick={handlePrevPage}
                        text="Anterior"
                        icon={<FiArrowLeft />}
                    />
                    <Button
                        onClick={handleNextPage}
                        text="Próximo"
                        icon={<FiArrowRight />}
                        position="right"
                    />
                </nav>
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