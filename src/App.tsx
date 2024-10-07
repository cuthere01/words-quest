import React from 'react';
import styles from './App.module.scss';
import Word from "./components/Word/Word";
import data from './data/data';

function App() : JSX.Element {
  return (
    <section className={styles.app}>
        <div className="container">
            <p>#5</p>
            <input type="text"/>
            <div className={styles.words}>
                {data.words.map((w, i) => {
                    return <Word key={i} answer={w.answer} question={w.question} lettersMap={data.lettersMap} />;
                })}
            </div>
        </div>
    </section>
  );
}

export default App;
