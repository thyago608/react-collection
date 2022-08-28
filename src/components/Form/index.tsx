import { FormEvent, useState } from "react";
import { Input } from "components/Input";
import { useModal } from "hooks/useModal";
import { useProducts } from "hooks/useProducts";
import Image from "next/image";
import { FiRefreshCw } from "react-icons/fi";
import { materialsImages } from "mocks/images";
import styles from "./styles.module.scss";

export function Form() {
    const { createNewProduct, updateProduct } = useProducts();
    const { handleCloseModal, currentProduct } = useModal();
    const [description, setDescription] = useState('');
    const [line, setLine] = useState('');
    const [image, setImage] = useState(currentProduct.created_at);
    const [loading, setLoading] = useState(false);

    async function handleCreateNewProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const isValid = !!description.trim() && !!line.trim() && !!image.trim();

        if (isValid) {
            const product = {
                description,
                line,
                created_at: new Date().toISOString(),
                url_thumbnail: image,
                status: 1,
            }

            setLoading(true);

            try {
                await createNewProduct.mutateAsync(product);
                setTimeout(() => setLoading(false), 500);
            } catch {
                setTimeout(() => setLoading(false), 1000);
                return;
            }

            handleCloseModal();
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

            setLoading(true);

            try {
                await updateProduct.mutateAsync(product);
                setTimeout(() => setLoading(false), 500);
            } catch {
                setTimeout(() => setLoading(false), 1000);
                return;
            }

            handleCloseModal();
        }
    }

    const modalType = currentProduct.hasOwnProperty('id') ?
        {
            title: 'Atualizar Material',
            formSubmit: handleUpdateProduct,
            buttonLabelSubmit: 'Atualizar',
            type: 'update'
        } :
        {
            title: 'Cadastrar Material',
            formSubmit: handleCreateNewProduct,
            buttonLabelSubmit: 'Cadastrar',
            type: 'creation'
        }

    return (
        <form
            onSubmit={modalType.formSubmit}
            className={styles.form}
        >
            <h2>{modalType.title}</h2>
            {modalType.type === 'creation' && (
                <section className={styles.imageSelection}>
                    <header>
                        <h3>Selecione uma imagem:</h3>
                    </header>
                    <div className={styles.images}>
                        {materialsImages.map(item => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => setImage(item.path)}
                                className={item.path === image ? styles.selected : styles.normal}
                            >
                                <Image src={item.path} alt={item.name} layout="fill" />
                            </button>
                        ))}
                    </div>
                </section>
            )}
            <section className={styles.productInformation}>
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
            </section>
            <button
                type="submit"
                disabled={!description || !line || !image}>
                {modalType.buttonLabelSubmit}
                {loading && <FiRefreshCw />}
            </button>
        </form>
    );
}