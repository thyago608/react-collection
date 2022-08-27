import { useState, createContext, ReactNode } from "react";
import { IProduct } from "types/Product";

interface ModalContextData {
    isOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    currentProduct: IProduct;
    handleCurrentProduct: (product: IProduct) => void;
}

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<IProduct>({} as IProduct);

    function handleOpenModal() {
        setIsOpen(true);
    }

    function handleCloseModal() {
        setIsOpen(false);
        setCurrentProduct({} as IProduct);
    }

    function handleCurrentProduct(current: IProduct) {
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