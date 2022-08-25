import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";

export function Search() {
    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Pesquise por descrição ou linha"
            />
            <button type="button">
                <FiSearch />
            </button>
        </div>
    );
}