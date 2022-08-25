import { Search } from "components/Search";
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
                >Inserir novo material</button>
            </div>
        </header>
    );
}