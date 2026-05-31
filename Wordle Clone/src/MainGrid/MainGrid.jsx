import './MainGrid.css'
import { useState } from 'react'

export default function MainGrid({pastGuesses, solution, guessIndex, currentGuess}) {
    const solutionArray = [...solution];
    return (<>
    <div className="grid-container">
        <div className="main-grid">
            {pastGuesses.map((word, wordIndex) => (
              [...word].map((letter, letterIndex) => {
                if (wordIndex === guessIndex) {
                  return (<div key={`${wordIndex}-${letterIndex}`} className={`letter-box gray`}>{[...currentGuess][letterIndex]}</div>)
                }
                else {
                  return (<div key={`${wordIndex}-${letterIndex}`} className={`letter-box ${letter.color}`}>{letter.letter}</div>);
                }
              })
            ))}
        </div>
    </div>
    </>)
}


