import React, { useState } from 'react';
import styles from "./Result.module.scss";
import cn from 'classnames';

interface ResultProps {
    result: string;
    lettersMap: { [key: string]: number };
    correctWords: string[];
}

const Result: React.FC<ResultProps> = ({ result, lettersMap, correctWords }) => {
    const nums: number[] = [];

    const parseResult = (): string[] => {
        return result.split('').map(r => {
            if(lettersMap[r.toUpperCase()]) {
                nums.push(lettersMap[r.toUpperCase()]);
                return r.toUpperCase();
            } else {
                nums.push(0);
                return r;
            }
        });
    };

    const [letters, setLetters] = useState<string[]>(parseResult());
    const [letterStatus, setLetterStatus] = useState<number[]>(Array(letters.length).fill(0));

    return (
        <div className={styles.result}>
            {letters.map((letter, index): JSX.Element => (
                <div key={index} className={styles.letterWrapper}>
                    {nums[index] ?
                        <>
                            <div className={cn(styles.output, styles.outputWrapper, {
                                [styles.hidden]: letterStatus[index] === 0
                            })}>{letterStatus[index] !== 0 && letter}</div>
                            <span>{nums[index]}</span>
                        </> : <div className={styles.outputWrapper}>{letter}</div>
                    }
                </div>
            ))}
            <p>{correctWords}</p>
        </div>
    );
};

export default Result;
