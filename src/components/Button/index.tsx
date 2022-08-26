import React, { cloneElement, ButtonHTMLAttributes, ReactElement } from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: ReactElement;
    position?: 'left' | 'right';
}

export function Button({ text, icon, position = 'left', ...rest }: ButtonProps) {
    return (
        <button {...rest}
            className={styles.container}
        >
            {!!icon && cloneElement(icon, {
                style: { order: position === 'left' ? -1 : 1 }
            })}
            {text}
        </button>
    );
}