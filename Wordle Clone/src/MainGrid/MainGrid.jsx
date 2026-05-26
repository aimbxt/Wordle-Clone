import './MainGrid.css'
import { useState } from 'react'

export default function MainGrid({pastGuesses, solution}) {
    const solutionArray = [...solution];
    return (<>
    <div className="grid-container">
        <div className="main-grid">
            {pastGuesses.map((word, wordIndex) => (
              [...word].map((letter, letterIndex) => {
                return (<div key={`${wordIndex}-${letterIndex}`} className={`letter-box ${letter.color}`}>{letter.letter}</div>);
              })
            ))}
        </div>
    </div>
    </>)
}


