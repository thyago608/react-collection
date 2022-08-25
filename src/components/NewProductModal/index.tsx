import { useRef, FormEvent } from "react";
import { client } from "services/queryClient";
import { useMutation } from "@tanstack/react-query";
import Modal from 'react-modal';
import { FiX } from "react-icons/fi";
import { Input } from 'components/Input';
import { useModal } from 'hooks/useModal';
import { validateFields } from "utils/validateFields";
import { api } from "services/api";
import { Product } from "types/Product";
import styles from "./styles.module.scss";

type CreateProductFormData = Omit<Product, "id">;

export function NewProductModal() {
    const { isOpen, handleCloseModal } = useModal();
    const inputDescriptionRef = useRef<HTMLInputElement>(null);
    const inputLineRef = useRef<HTMLInputElement>(null);

    const createProduct = useMutation(async (product: CreateProductFormData) => {
        const response = await api.post('materials', product);

        return response.data;
    }, {
        onSuccess: () => client.invalidateQueries(['products'])
    });

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

                await createProduct.mutateAsync(product);
                handleCloseModal();
            }
        }
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
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Cadastrar Material</h2>
                <Input
                    label="Descrição"
                    name="descricao"
                    ref={inputDescriptionRef}
                />
                <Input
                    label="Linha"
                    name="linha"
                    ref={inputLineRef}
                />
                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </Modal>
    );
}