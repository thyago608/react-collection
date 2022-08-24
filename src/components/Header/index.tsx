import Link from "next/link";
import { Input } from "components/Input";
import Image from "next/image";
import styles from "./styles.module.scss";

export function Header() {
    return (
        <header className="header-container">
            <div className="header-content">
                <Link href="/">
                    <a>
                        <Image src="" alt="" />
                    </a>
                </Link>
                <Input />
                <button type="button">Inserir novo material</button>
            </div>
        </header>
    );
}