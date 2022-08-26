import { FormEvent, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { IProduct } from "types/Product";
import styles from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import { api } from "services/api";

export function Search() {
    const searchInputRef = useRef<HTMLInputElement>(null);

    async function getProductByText(): Promise<IProduct | undefined> {
        try {
            const input = searchInputRef.current;

            if (input) {
                const response = await api.get<IProduct>(`materials?q=${input.value}`);
                return response.data;
            }
        } catch (e) {
            console.log("Desculpe mas não encontramos a descrição solicitada")
        }
    }

    const { data, refetch } = useQuery(["product"], getProductByText, { enabled: false });

    async function handleSearchProducts(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await refetch();
    }

    return (
        <form className={styles.container} onSubmit={handleSearchProducts}>
            <input
                type="text"
                placeholder="Pesquise por descrição ou linha"
                ref={searchInputRef}
                required
            />
            <button type="submit">
                <FiSearch />
            </button>
        </form>
    );
}