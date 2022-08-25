import { useState, createContext, ReactNode } from "react";

interface ModalContextData {
    isOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    return (
        <ModalContext.Provider value={{ isOpen, handleOpenModal, handleCloseModal }}>
            {children}
        </ModalContext.Provider>
    );
}