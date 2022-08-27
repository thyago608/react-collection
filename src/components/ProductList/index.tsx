import { Product } from "components/Product";
import { IProduct } from "types/Product";
import styles from "./styles.module.scss";

interface ProductListProps {
    products: IProduct[];
}

export function ProductList({ products }: ProductListProps) {
    return (
        <section className={styles.container}>
            {products?.map(product => (
                <Product key={product.id} product={product} />
            ))}
        </section>
    )
}