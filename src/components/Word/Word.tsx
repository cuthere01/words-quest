import React, { useState, useRef } from 'react';
import Input from "../Input/Input";
import styles from "./Word.module.scss";

interface WordProps {
    answer: string;
    question: string;
    lettersMap: { [key: string]: number };
}

const Word: React.FC<WordProps> = ({ answer, question, lettersMap }) => {
    const [letters, setLetters] = useState<string[]>(Array(answer.length).fill(''));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const nums: number[] = [];

    answer.split('').forEach(a => {
        if(lettersMap[a.toUpperCase()]) nums.push(lettersMap[a.toUpperCase()]);
    });

    let inputProcessed = false;
    // Обработчик нажатия клавиш
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
        if (e.key.length === 1 && e.key.match(/^\p{L}$/u)) {
            e.preventDefault();
            const newLetters = [...letters];
            newLetters[index] = e.key.toUpperCase(); // Перезаписываем текущий символ
            setLetters(newLetters);

            inputProcessed = true; // Флаг, что событие обработано через onKeyDown

            // Перемещаем фокус на следующий инпут
            if (index < answer.length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        }

        console.log('onkeydown');

        // Навигация по стрелкам
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (index < letters.length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        }

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }

        if (e.key === 'Backspace') {
            e.preventDefault(); // Предотвращаем стандартное удаление
            const newLetters = [...letters];
            newLetters[index] = ''; // Очищаем текущий инпут
            setLetters(newLetters);

            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number): void => {
        if (inputProcessed) {
            inputProcessed = false; // Сбрасываем флаг, чтобы не обрабатывать событие
            return;
        }

        const inputValue = e.currentTarget.value;
        console.log('oninput');
        if (inputValue.length === 1 && inputValue.match(/^\p{L}$/u)) {
            const newLetters = [...letters];
            newLetters[index] = inputValue.toUpperCase();
            setLetters(newLetters);

            if (index < answer.length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    return (
        <div className={styles.word}>
            <div className={styles.answer}>
                {letters.map((letter, index): JSX.Element => (
                    <div key={index} className={styles.inputWrapper}>
                        <Input
                            value={letter}
                            onKeyDown={(e): void => handleKeyDown(e, index)}
                            onInput={(e): void => handleInput(e, index)}
                            ref={(el): void => { inputsRef.current[index] = el; }}
                        />
                        <span>{nums[index]}</span>
                    </div>
                ))}
                {letters.join('')}
            </div>
            {!letters.some(l => l === '') && <div className={styles.checkWrapper}><button className={styles.check}>Проверить</button></div>}
            <p className={styles.question}>{question}</p>
        </div>
    );
};

export default Word;
