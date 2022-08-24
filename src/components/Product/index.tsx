import Image from "next/image";
import { Product as IProduct } from "types/Product";
import styles from "./styles.module.scss";

interface ProductProps {
    product: IProduct;
}

export function Product({ product }: ProductProps) {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image src={product.url_thumbnail} alt={product.description} layout="fill" />
            </div>
            <p className={styles.description}>{product.description}</p>
            <strong className={styles.line}>{product.line}</strong>
        </div>
    );
}