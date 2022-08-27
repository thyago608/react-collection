import React, { useState, useContext } from "react";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import { ProductContext } from "contexts/ProductsContext";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { toastError } from "utils/toasts";
import { Product } from "components/Product";
import { Button } from "components/Button";
import { useFetchProducts } from "hooks/useFetchProducts";
import styles from "./home.module.scss";

export default function Home() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useFetchProducts(page);

    const { products: productsContext } = useContext(ProductContext);

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
                {isLoading ? <p>carregando...</p> :
                    <section className={styles.containerProducts}>
                        {productsContext.length === 0 ? data?.products.map(product => (
                            <Product key={product.id} product={product} />
                        )) :
                            (productsContext.map(product => (
                                <Product key={product.id} product={product} />
                            )))}
                    </section>
                }
                {productsContext.length === 0 &&
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
                }
            </main>
        </>
    );
}