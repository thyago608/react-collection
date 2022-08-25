import Modal from 'react-modal';
import { FiX } from "react-icons/fi";
import { Input } from 'components/Input';
import styles from "./styles.module.scss";
import { useModal } from 'hooks/useModal';

export function NewProductModal() {
    const { isOpen, handleCloseModal } = useModal();

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