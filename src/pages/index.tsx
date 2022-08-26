import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { toastError } from "utils/toasts";
import { Product } from "components/Product";
import { IProduct } from "types/Product";
import { getProducts, useProducts } from "hooks/useProducts";
import styles from "./home.module.scss";

interface HomeProps {
    products: IProduct;
}

export default function Home({ products }: HomeProps) {
    const { users } = useProducts({
        initialData: products
    });

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


export const getServerSideProps: GetServerSideProps = async () => {
    const products = await getProducts();

    return {
        props: {
            products
        }
    }
}