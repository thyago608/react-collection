import { useRef, FormEvent } from "react";
import Modal from 'react-modal';
import { FiX } from "react-icons/fi";
import { Input } from 'components/Input';
import { useModal } from 'hooks/useModal';
import { useProducts } from "hooks/useProducts";
import { validateFields } from "utils/validateFields";
import styles from "./styles.module.scss";

type ModalInformation = {
    title: string;
    formSubmit: (event: FormEvent<HTMLFormElement>) => void;
    buttonLabelSubmit: string;
}

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
            const isValid = validateFields(inputDescription) && validateFields(inputLine);

            if (isValid) {
                const product = {
                    description: inputDescription.value,
                    line: inputLine.value,
                    created_at: new Date().toLocaleDateString('pt-br', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                    url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_MagdalIcePR83185_83x83_Ace_Stack_thumb.jpg",
                    status: 1,
                }

                await createNewProduct.mutateAsync(product);
                handleCloseModal();
            }
        }
    }

    async function handleUpdateProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const inputDescription = inputDescriptionRef.current;
        const inputLine = inputLineRef.current;

        if (inputDescription && inputLine) {
            const isValid = validateFields(inputDescription) && validateFields(inputLine);

            if (isValid) {
                const product = {
                    ...currentProduct,
                    description: inputDescription.value,
                    line: inputLine.value,
                    created_at: new Date().toLocaleDateString('pt-br', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                }
                await updateProduct.mutateAsync(product);
                handleCloseModal();
            }
        }
    }

    const modalInformation = {
        title: currentProduct.hasOwnProperty('id') ? 'Atualizar Material' : 'Cadastrar Material',
        formSubmit: currentProduct.hasOwnProperty('id') ? handleUpdateProduct : handleCreateNewProduct,
        buttonLabelSubmit: currentProduct.hasOwnProperty('id') ? 'Atualizar' : 'Cadastrar'
    };

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
            <form onSubmit={modalInformation.formSubmit} className={styles.form}>
                <h2>{modalInformation.title}</h2>
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
                    {modalInformation.buttonLabelSubmit}
                </button>
            </form>
        </Modal>
    );
}