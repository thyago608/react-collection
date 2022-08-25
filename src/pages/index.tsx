import React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { toastError } from "utils/toast";
import { Product } from "components/Product";
import { useProducts } from "hooks/useProducts";
import styles from "./home.module.scss";

export default function Home() {
    const { data, isLoading, error } = useProducts();

    if (error) {
        toastError("Desculpe, não foi possível carregar os produtos");
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
                        {data?.map(product => (
                            <Product key={product.id} product={product} />
                        ))}
                    </section>
                }
            </main>
        </>
    );
}