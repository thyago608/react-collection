import { useState, createContext, ReactNode } from "react";
import { Product } from "types/Product";

interface ModalContextData {
    isOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    currentProduct: Product;
    handleCurrentProduct: (product: Product) => void;
}

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product>({} as Product);

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
        setCurrentProduct({} as Product);
    }

    function handleCurrentProduct(current: Product) {
        setCurrentProduct(current);
    }

    return (
        <ModalContext.Provider value={{
            isOpen,
            handleOpenModal,
            handleCloseModal,
            currentProduct,
            handleCurrentProduct
        }}>
            {children}
        </ModalContext.Provider>
    );
}