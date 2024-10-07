import React, { forwardRef, ForwardedRef } from 'react';
import styles from './Input.module.scss';

interface InputProps {
    value: string;
    //onChange: (newValue: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onInput: (e: React.FormEvent<HTMLInputElement>) => void;
    ref?: ForwardedRef<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ value, onKeyDown, onInput }, ref) => {
    //const inputRef = useRef<HTMLInputElement>(null);

    return (
        <input
            type="text"
            maxLength={1}
            value={value}
            onKeyDown={onKeyDown}
            onInput={onInput}
            //onChange={(e): void => { e.target.value.toUpperCase(); } }
            ref={ref} // Используем переданный ref
            className={styles.input}
        />
    );
});

export default Input;