import { Input } from "components/Input";
import { useModal } from "hooks/useModal";
import { useProducts } from "hooks/useProducts";
import { FormEvent, useState } from "react";
import { toastInfo, toastSuccess } from "utils/toasts";
import styles from "./styles.module.scss";

export function Form() {
    const { createNewProduct, updateProduct } = useProducts();
    const { handleCloseModal, currentProduct } = useModal();
    const [description, setDescription] = useState('');
    const [line, setLine] = useState('');

    async function handleCreateNewProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const isValid = !!description.trim() && !!line.trim();

        if (isValid) {
            const product = {
                description,
                line,
                created_at: new Date().toISOString(),
                url_thumbnail: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Damme/Damme_MagdalIcePR83185_83x83_Ace_Stack_thumb.jpg",
                status: 1,
            }

            await createNewProduct.mutateAsync(product);
            handleCloseModal();
            toastSuccess('Produto Cadastrado com sucesso!');
        }
    }

    async function handleUpdateProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const isValid = !!description.trim() && !!line.trim();

        if (isValid) {
            const product = {
                ...currentProduct,
                description,
                line,
                created_at: new Date().toISOString()
            }

            await updateProduct.mutateAsync(product);
            handleCloseModal();
            toastInfo('Produto Atualizado!');
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
        <form
            onSubmit={modalType.formSubmit}
            className={styles.form}
        >
            <h2>{modalType.title}</h2>
            <Input
                label="Descrição"
                name="descricao"
                placeholder={currentProduct?.description}
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <Input
                label="Linha"
                name="linha"
                placeholder={currentProduct?.line}
                value={line}
                onChange={e => setLine(e.target.value)}
                required

            />
            <button
                type="submit"
                disabled={!description || !line}
            >
                {modalType.buttonLabelSubmit}
            </button>
        </form>
    );
}