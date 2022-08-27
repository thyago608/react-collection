import Image from "next/image";
import { FiTool, FiTrash2 } from "react-icons/fi";
import { useProducts } from "hooks/useProducts";
import { IProduct } from "types/Product";
import { useModal } from "hooks/useModal";
import styles from "./styles.module.scss";
import { toastSuccess } from "utils/toasts";

interface ProductProps {
    product: IProduct;
}

export function Product({ product }: ProductProps) {
    const { removeProduct } = useProducts();
    const { handleOpenModal, handleCurrentProduct } = useModal();

    function OpenModal() {
        handleCurrentProduct(product);
        handleOpenModal();
    }

    function handleDeleteProduct() {
        removeProduct.mutateAsync(product.id);
        toastSuccess('Produto Excluído com sucesso!');
    }

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image
                    src={product.url_thumbnail}
                    alt={product.description}
                    layout="fill"
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
                    <FiTool />
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
