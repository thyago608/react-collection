import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { FiTool, FiTrash2 } from "react-icons/fi";
import { Product as IProduct } from "types/Product";
import styles from "./styles.module.scss";
import { client } from "services/queryClient";
import { api } from "services/api";

interface ProductProps {
    product: IProduct;
}

export function Product({ product }: ProductProps) {
    const deleteProduct = useMutation(async (productID: number) =>
        await api.delete(`materials/${productID}`),
        {
            onSuccess: () => client.invalidateQueries(['products'])
        }
    );

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image src={product.url_thumbnail} alt={product.description} layout="fill" />
            </div>
            <div className={styles.text}>
                <p className={styles.description}>{product.description}</p>
                <strong className={styles.line}>{product.line}</strong>
            </div>
            <div className={styles.actions}>
                <button type="button" className={styles.tool}>
                    <FiTool />
                </button>
                <button type="button" className={styles.trash} onClick={() => deleteProduct.mutateAsync(product.id)}>
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}