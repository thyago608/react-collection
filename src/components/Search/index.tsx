import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IProduct } from "types/Product";
import { useQuery } from "@tanstack/react-query";
import { api } from "services/api";
import { useProductsSearch } from "hooks/useProductsSearch";
import { formatProducts } from "hooks/useFetchProducts";
import { toastError, toastWarning } from "utils/toasts";
import styles from "./styles.module.scss";

export function Search() {
    const [search, setSearch] = useState('');
    const { handleAddProducts } = useProductsSearch();

    async function getProductByText(): Promise<IProduct[]> {
        const response = await api.get(`materials?q=${search}`);
        return response.data;
    }

    const { refetch } = useQuery(["product"], getProductByText, {
        enabled: false,
        onSuccess: (data) => {
            if (data.length > 0) {
                const productsFormatted = formatProducts(data);
                handleAddProducts(productsFormatted);
            } else {
                toastWarning("Desculpe, o produto buscado não existe na nossa base da dados ");
                handleAddProducts([]);
            }
        },
        onError: () =>
            toastError("Ops, houve uma falha na comunicação com o servidor"),
    });

    function handleValueInputSearch(search: string) {
        setSearch(search);

        if (search.length === 0) {
            handleAddProducts([]);
        }
    }

    async function handleSearchProducts(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await refetch({ cancelRefetch: true, throwOnError: false });
    }

    return (
        <form className={styles.container} onSubmit={handleSearchProducts} role={"searchbox"}>
            <input
                type="text"
                name="search"
                placeholder="Pesquise por descrição ou linha"
                value={search}
                onChange={e => handleValueInputSearch(e.target.value)}
                required
                role="search"
            />
            <button type="submit">
                <FiSearch />
            </button>
        </form>
    );
}