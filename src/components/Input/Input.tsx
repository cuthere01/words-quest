import React, { forwardRef, ForwardedRef } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

interface InputProps {
    value: string;
    //onChange: (newValue: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onInput: (e: React.FormEvent<HTMLInputElement>) => void;
    ref?: ForwardedRef<HTMLInputElement>;
    isCorrect: boolean;
    isError: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
         value,
         onKeyDown,
         onInput,
         isCorrect,
         isError
     }, ref) => {
    return (
        <input
            type="text"
            maxLength={1}
            value={value}
            onKeyDown={onKeyDown}
            onInput={onInput}
            ref={ref}
            className={cn(styles.input, {
                [styles.correct]: isCorrect,
                [styles.error]: isError
            })}
        />
    );
});

export default Input;