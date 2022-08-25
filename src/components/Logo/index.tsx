import Link from "next/link";
import { memo } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

function LogoBase() {
    return (
        <Link href="/">
            <a className={styles.logo}>
                <Image src="/logo.png" alt="collection" layout="fill" />
            </a>
        </Link>
    );
}

export const Logo = memo(LogoBase);