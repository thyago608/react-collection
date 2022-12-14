import { memo } from "react";
import Image from "next/image";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { useProducts } from "hooks/useProducts";
import { IProduct } from "types/Product";
import { useModal } from "hooks/useModal";
import styles from "./styles.module.scss";

interface ProductProps {
    product: IProduct;
}

function ProductComponent({ product }: ProductProps) {
    const { removeProduct } = useProducts();
    const { handleOpenModal, handleCurrentProduct } = useModal();

    function OpenModal() {
        handleCurrentProduct(product);
        handleOpenModal();
    }

    async function handleDeleteProduct() {
        await removeProduct.mutateAsync(product.id);
    }

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image
                    src={product.url_thumbnail}
                    alt={product.description}
                    layout="fill"
                    loading="eager"
                />
            </div>
            <div className={styles.text}>
                <p className={styles.description}>{product.description}</p>
                <strong className={styles.line}>{product.line}</strong>
                <span>{product.created_at}</span>
            </div>
            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.tool}
                    onClick={OpenModal}
                >
                    <FiEdit2 />
                </button>
                <button
                    type="button"
                    className={styles.trash}
                    onClick={handleDeleteProduct}
                >
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}


export const Product = memo(ProductComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
});