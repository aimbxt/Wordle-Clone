import './MainGrid.css'
import { useState } from 'react'

export default function MainGrid({pastGuesses, guessIndex, currentGuess, invalidGuess}) {
    return (<>
    <div className="grid-container">
        <div className="main-grid">
            {pastGuesses.map((word, wordIndex) => (
              [...word].map((letter, letterIndex) => {
                if (wordIndex === guessIndex) {
                  const isLastLetter = letterIndex === currentGuess.length - 1 && currentGuess.length > 0
                  return (<div key={`${wordIndex}-${letterIndex}`} className={`letter-box currentGuess ${isLastLetter ? 'pop-animation': ''} ${invalidGuess ? 'shake': ''}`}>{[...currentGuess][letterIndex]}</div>)
                }
                else {
                  return (<div key={`${wordIndex}-${letterIndex}`} className={`letter-box ${letter.color}`}>{letter.letter.toUpperCase()}</div>);
                }
              })
            ))}
        </div>
    </div>
    </>)
}


