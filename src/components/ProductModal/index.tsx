import { useRef, FormEvent } from "react";
import Modal from 'react-modal';
import { FiX } from "react-icons/fi";
import { Input } from 'components/Input';
import { useModal } from 'hooks/useModal';
import { useProducts } from "hooks/useProducts";
import { validateFields } from "utils/validateFields";
import styles from "./styles.module.scss";

export function ProductModal() {
    const { isOpen, handleCloseModal, currentProduct } = useModal();
    const { createNewProduct, updateProduct } = useProducts();

    const inputDescriptionRef = useRef<HTMLInputElement>(null);
    const inputLineRef = useRef<HTMLInputElement>(null);

    async function handleCreateNewProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const inputDescription = inputDescriptionRef.current;
        const inputLine = inputLineRef.current;

        if (inputDescription && inputLine) {
            const product = {
                description: inputDescription.value,
                line: inputLine.value,
                created_at: new Date().toISOString(),
                url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_MagdalIcePR83185_83x83_Ace_Stack_thumb.jpg",
                status: 1,
            }

            await createNewProduct.mutateAsync(product);
            handleCloseModal();
        }
    }

    async function handleUpdateProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const inputDescription = inputDescriptionRef.current;
        const inputLine = inputLineRef.current;

        if (inputDescription && inputLine) {
            const product = {
                ...currentProduct,
                description: inputDescription.value,
                line: inputLine.value,
                created_at: new Date().toISOString()
            }

            await updateProduct.mutateAsync(product);
            handleCloseModal();
        }
    }

    const modalType = currentProduct.hasOwnProperty('id') ?
        {
            title: 'Atualizar Material',
            formSubmit: handleUpdateProduct,
            buttonLabelSubmit: 'Atualizar'
        } :
        {
            title: 'Cadastrar Material',
            formSubmit: handleCreateNewProduct,
            buttonLabelSubmit: 'Cadastrar'
        }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                className="react-modal-close"
                onClick={handleCloseModal}
            >
                <FiX />
            </button>
            <form onSubmit={modalType.formSubmit} className={styles.form}>
                <h2>{modalType.title}</h2>
                <Input
                    label="Descrição"
                    name="descricao"
                    ref={inputDescriptionRef}
                    placeholder={currentProduct?.description}
                    required
                />
                <Input
                    label="Linha"
                    name="linha"
                    ref={inputLineRef}
                    placeholder={currentProduct?.line}
                    required
                />
                <button type="submit">
                    {modalType.buttonLabelSubmit}
                </button>
            </form>
        </Modal>
    );
}