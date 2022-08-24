import Link from "next/link";
import { Input } from "components/Input";
import Image from "next/image";
import styles from "./styles.module.scss";

export function Header() {
    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Link href="/">
                    <a className={styles.logo}>
                        <Image src="/logo.png" alt="collection" layout="fill" />
                    </a>
                </Link>
                <Input />
                <button
                    type="button"
                    className={styles.buttonAddNewMaterial}
                >Inserir novo material</button>
            </div>
        </header>
    );
}