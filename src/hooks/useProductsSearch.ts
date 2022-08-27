import { useContext } from "react";
import { ProductContext } from "contexts/ProductsContext";

export const useProductsSearch = () => useContext(ProductContext);
