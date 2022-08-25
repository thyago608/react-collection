import React from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { toastError } from "utils/toasts";
import { Product } from "components/Product";
import { useProducts } from "hooks/useProducts";
import styles from "./home.module.scss";

export default function Home() {
    const { users } = useProducts();

    if (users.error) {
        toastError("Desculpe, não foi possível carregar os produtos");
    }

    return (
        <>
            <Head>
                <title>React Collection | Home</title>
            </Head>
            <ToastContainer />
            <main className={styles.container}>
                {users.isLoading ? <p>carregando...</p> :
                    <section className={styles.containerProducts}>
                        {users.data?.map(product => (
                            <Product key={product.id} product={product} />
                        ))}
                    </section>
                }
            </main>
        </>
    );
}