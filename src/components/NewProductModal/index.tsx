import Modal from 'react-modal';
import { FiX } from "react-icons/fi";
import { Input } from 'components/Input';
import styles from "./styles.module.scss";

export function NewProductModal() {
    return (
        <Modal
            isOpen={true}
            onRequestClose={() => { }}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                className="react-modal-close"
                onClick={() => { }}
            >
                <FiX />
            </button>
            <form onSubmit={() => { }} className={styles.form}>
                <h2>Cadastrar Material</h2>
                <Input
                    label="Descrição"
                    name="descricao"
                />
                <Input
                    label="Linha"
                    name="linha"
                />
                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </Modal>
    );
}