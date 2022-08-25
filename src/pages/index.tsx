import Head from "next/head";
import { Product } from "components/Product";
import { Product as IProduct } from "types/Product";
import { useProducts } from "hooks/useProducts";
import styles from "./home.module.scss";

interface HomeProps {
    products: IProduct[];
}

export default function Home({ products }: HomeProps) {
    const { data, isLoading, error } = useProducts();

    return (
        <>
            <Head>
                <title>React Collection | Home</title>
            </Head>
            <main className={styles.container}>
                <section className={styles.containerProducts}>
                    {data?.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </section>
            </main>
        </>
    );
}