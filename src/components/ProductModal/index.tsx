import Modal from 'react-modal';
import { useModal } from 'hooks/useModal';
import { Form } from "components/Form";
import { FiX } from "react-icons/fi";

export function ProductModal() {
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
            <Form />
        </Modal>
    );
}