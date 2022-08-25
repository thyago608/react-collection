import Image from "next/image";
import { FiTool, FiTrash2 } from "react-icons/fi";
import { useProducts } from "hooks/useProducts";
import { Product as IProduct } from "types/Product";
import styles from "./styles.module.scss";
import { useModal } from "hooks/useModal";

interface ProductProps {
    product: IProduct;
}

export function Product({ product }: ProductProps) {
    const { removeProduct } = useProducts();
    const { handleOpenModal, handleCurrentProduct, currentProduct } = useModal();

    function OpenModal() {
        handleCurrentProduct(product);
        handleOpenModal();
    }

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
                <button
                    type="button"
                    className={styles.tool}
                    onClick={OpenModal}
                >
                    <FiTool />
                </button>
                <button
                    type="button"
                    className={styles.trash}
                    onClick={() => removeProduct.mutateAsync(product.id)}
                >
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}