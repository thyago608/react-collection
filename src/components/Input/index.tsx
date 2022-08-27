import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Input({ label, name, ...rest }: InputProps) {
    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <input id={name} {...rest} />
        </div>
    );
}