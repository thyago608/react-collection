import { Input } from "components/Input";
import { useModal } from "hooks/useModal";
import { useProducts } from "hooks/useProducts";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toastInfo, toastSuccess } from "utils/toasts";
import styles from "./styles.module.scss";

export function Form() {
    const { createNewProduct, updateProduct } = useProducts();
    const { handleCloseModal, currentProduct } = useModal();
    const [description, setDescription] = useState('');
    const [line, setLine] = useState('');
    const [image, setImage] = useState(currentProduct.created_at);

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
            buttonLabelSubmit: 'Atualizar',
            type: 'update'
        } :
        {
            title: 'Cadastrar Material',
            formSubmit: handleCreateNewProduct,
            buttonLabelSubmit: 'Cadastrar',
            type: 'creation'
        }

    const arrayImages = [
        {
            path: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Eliane/Eliane_SilexBrancoPo_60x120_Pol_Stack_thumb.jpg",
            name: "Branco Po"
        },
        {
            path: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Eliane/Eliane_SilexPretoPo_90x90_Pol_Stack_thumb.jpg",
            name: "Preto Po"
        },
        {
            path: "https://d1ptd3zs6hice0.cloudfront.net/Materiais/Porcelanato/Eliane/Eliane_SilexCinzaPo_90x90_Pol_Stack_thumb.jpg",
            name: "Silex Cinza Po"
        },
        {
            path: "https://d3j9qmbv5hjp0y.cloudfront.net/collection/Porcelanato/Eliane/Eliane_JupiterChumboAc_59x118.2_Ace_Stack_thumb.jpg",
            name: "Jupiter Chumbo"
        },
        {
            path: "https://d3j9qmbv5hjp0y.cloudfront.net/collection/Porcelanato/Eliane/Eliane_ErosRosaAc_15x15_Ace_Stack_thumb.jpg",
            name: "Eros Rosa"
        },
        {
            path: "https://d3j9qmbv5hjp0y.cloudfront.net/collection/Porcelanato/Eliane/Eliane_AtenaMarfimPo_59x118.2_Pol_Stack_thumb.jpg",
            name: "Athena Marfim"
        },
        {
            path: "https://d3j9qmbv5hjp0y.cloudfront.net/collection/Porcelanato/Eliane/Eliane_ZeusBrancoMt_30x90_Met_Stack_thumb.jpg",
            name: "Zeus Branco"
        }, {
            path: "https://d3j9qmbv5hjp0y.cloudfront.net/collection/Porcelanato/Eliane/Eliane_DoricoMarfimMa_30x90_Mat_Stack_thumb.jpg",
            name: "Dorico Marfim"
        }
    ];


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
                        {arrayImages.map(item => (
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
            </button>
        </form>
    );
}