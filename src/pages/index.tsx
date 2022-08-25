import Head from "next/head";
import { GetServerSideProps } from "next";
import { Product } from "components/Product";
import { Product as IProduct } from "types/Product";
import styles from "./home.module.scss";
import { api } from "services/api";

interface HomeProps {
    products: IProduct[];
}

export default function Home({ products }: HomeProps) {
    return (
        <>
            <Head>
                <title>React Collection | Home</title>
            </Head>
            <main className={styles.container}>
                <section className={styles.containerProducts}>
                    {products?.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </section>
            </main>
        </>
    );
}


export const getServerSideProps: GetServerSideProps = async () => {
    const response = await api.get<IProduct[]>("materials");

    return {
        props: {
            products: response.data
        }
    }
}