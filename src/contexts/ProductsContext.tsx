import { createContext, ReactNode, useState } from "react";
import { IProduct } from "types/Product";

interface ProductsContextData {
    products: IProduct[];
    handleAddProducts: (products: IProduct[]) => void;
}

interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductProvider({ children }: ProductsProviderProps) {
    const [products, setProducts] = useState<IProduct[]>([]);

    function handleAddProducts(products: IProduct[]) {
        setProducts([...products])
    }

    return (
        <ProductContext.Provider value={{ products, handleAddProducts }}>
            {children}
        </ProductContext.Provider>
    );
}