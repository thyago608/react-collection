import { InputHTMLAttributes, forwardRef, ForwardRefRenderFunction } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ label, name, ...rest }, ref) => {
    return (
        <div className={styles.container}>
            <label htmlFor={name}>{label}</label>
            <input id={name} {...rest} ref={ref} />
        </div>
    );
}

export const Input = forwardRef(InputBase);