import React, { useState } from 'react';
import styles from './App.module.scss';
import Word from "./components/Word/Word";
import Result from "./components/Result/Result";
import data from './data/data';

function App() : JSX.Element {
    const [correctWords, setCorrectWords] = useState<string[]>([]);

    const handleCorrectWord = (correctWord: string): void => {
        setCorrectWords((prevCorrectWords) => [...prevCorrectWords, correctWord]);
    };
    return (
        <section className={styles.app}>
            <div className="container">
                <p>#6</p>
                <Result result={data.result} lettersMap={data.lettersMap} correctWords={correctWords}/>
                <div className={styles.words}>
                    {data.words.map((w, i) => {
                        return (
                            <Word
                                key={i}
                                answer={w.answer}
                                question={w.question}
                                lettersMap={data.lettersMap}
                                correctWord={handleCorrectWord}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default App;
