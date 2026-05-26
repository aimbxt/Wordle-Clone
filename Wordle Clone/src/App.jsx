import { useState } from 'react'
import './App.css'

import MainGrid from './MainGrid/MainGrid.jsx'
import Keyboard from './Keyboard/Keyboard.jsx'

function App() {
  const [pastGuesses, setPastGuesses] = useState([[{letter: "A", color: "gray"}, {letter: "P", color: "gray"}, {letter: "P", color: "gray"}, {letter: "L", color: "gray"}, {letter: "E", color: "gray"}], [{letter: "W", color: "green"}, {letter: "O", color: "green"}, {letter: "R", color: "green"}, {letter: "D", color: "green"}, {letter: "S", color: "yellow"}]])
  const [currentGuess, setCurrentGuess] = useState([])
  const [solution, setSolution] = useState(["j", "e", "n", "n", "a"])
  
  //guess = [{letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}]
  const enterWord = (guess) => {
    //ai code check make sure u understand it
    if (!guess || guess.length !== 5) {
      return
    }
    const normalizedGuess = [...guess].map((item) => (
      typeof item === 'object' && item !== null ? item.letter : item
    ))
    // initialize object array
    const letterArray = normalizedGuess.map((letter) => ({ letter, color: 'gray' }))
    //end ai code
    // letter count registry
    const wordMap = new Map()
    for (let i = 0; i < 5; i++) {
      let letter = letterArray[i].letter
      if (!wordMap.has(letter)) {
        wordMap.set(letter, 1)
      }
      else {
        wordMap.set(letter, wordMap.get(letter) + 1)
      }
    }
    //first loop to check for greens
    for (let i = 0; i < 5; i++) {
      let letter = letterArray[i].letter
      if (letter === solution[i]) {
        wordMap.set(letter, wordMap.get(letter) - 1)
        letterArray[i] = {letter: letter, color: "green"}
      }
    }
    //second loop to check for yellows
    for (let i = 0; i < 5; i++) {
      let letter = letterArray[i].letter
      if (letterArray[i].color === "green") {
        continue;
      }
      else if (solution.includes(letter) && wordMap.get(letter) > 0) {
        wordMap.set(letter, wordMap.get(letter) - 1)
        letterArray[i] = {letter: letter, color: "yellow"}
      }
    }

    setPastGuesses((currentHistory) => [...currentHistory, letterArray])
  }

  return (
    <>
      <MainGrid pastGuesses={pastGuesses} solution={solution}/>
      <Keyboard currentGuess={"jenan"} onEnter={enterWord}/>
    </>
  )
}

export default App
