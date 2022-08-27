import { FormEvent, useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IProduct } from "types/Product";
import { useQuery } from "@tanstack/react-query";
import { api } from "services/api";
import { ProductContext } from "contexts/ProductsContext";
import { formatProducts } from "hooks/useFetchProducts";
import styles from "./styles.module.scss";

export function Search() {
    const [search, setSearch] = useState('');
    const { handleAddProducts } = useContext(ProductContext);

    async function getProductByText(): Promise<IProduct[]> {
        try {
            const response = await api.get(`materials?q=${search}`);
            return response.data;
        } catch {
            console.log("Desculpe, mas não achamos o produto pesquisado")
        }
        return [];
    }

    const { refetch } = useQuery(["product"], getProductByText, {
        enabled: false,
        onSuccess: (data) => {
            if (data) {
                const productsFormatted = formatProducts(data);
                handleAddProducts(productsFormatted);
            }
        },
    });

    async function handleSearchProducts(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await refetch({ cancelRefetch: true, throwOnError: false });
    }


    function handleValueInputSearch(search: string) {
        setSearch(search);

        if (search.length === 0) {
            handleAddProducts([]);
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSearchProducts}>
            <input
                type="text"
                placeholder="Pesquise por descrição ou linha"
                value={search}
                onChange={e => handleValueInputSearch(e.target.value)}
                required
            />
            <button type="submit">
                <FiSearch />
            </button>
        </form>
    );
}