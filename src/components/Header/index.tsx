import { Search } from "components/Search";
import { FiPlus } from "react-icons/fi";
import { useModal } from "hooks/useModal";
import { Logo } from "components/Logo";
import styles from "./styles.module.scss";

export function Header() {
    const { handleOpenModal } = useModal();

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Logo />
                <Search />
                <button
                    type="button"
                    className={styles.buttonAddNewMaterial}
                    onClick={handleOpenModal}
                >
                    <FiPlus />
                    Novo material
                </button>
            </div>
        </header>
    );
}