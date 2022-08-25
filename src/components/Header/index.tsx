import Link from "next/link";
import { Search } from "components/Search";
import Image from "next/image";
import { useModal } from "hooks/useModal";
import styles from "./styles.module.scss";

export function Header() {
    const { handleOpenModal } = useModal();

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Link href="/">
                    <a className={styles.logo}>
                        <Image src="/logo.png" alt="collection" layout="fill" />
                    </a>
                </Link>
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