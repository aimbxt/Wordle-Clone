import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

import MainGrid from './MainGrid/MainGrid.jsx'
import Keyboard from './Keyboard/Keyboard.jsx'
import PopUp from './PopUp/PopUp.jsx'

function App() {
  const emptyBoard = [[{letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}],
                      [{letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}],
                      [{letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}],
                      [{letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}],
                      [{letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}],
                      [{letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}, {letter: '', color: 'gray'}]]

  const [pastGuesses, setPastGuesses] = useState(emptyBoard)
  const [currentGuess, setCurrentGuess] = useState("")
  const [solution, setSolution] = useState(["L", "I", "G", "H", "T"])
  const [guessCount, setGuessCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  

  const isWin = () => {
    if (guessCount === 0) {
      return false
    }
    const guess = pastGuesses[guessCount - 1]
    return guess.every((object, i) => (object.letter === solution[i]))
  }
  
  useEffect(() => {
    let temp = Math.max(0, guessCount - 1)
    console.log(currentGuess)
    console.log(pastGuesses)
    console.log(`isOpen: ${isOpen}`)
    console.log(`isWin: ${isWin()}`)
    console.log(pastGuesses[temp])
  }, [currentGuess, pastGuesses, isOpen, isWin])

  useEffect(() => {
    if (guessCount === 6 || isWin()) {
      setIsOpen(true);
    }
    else {
      setIsOpen(false);
    }
  }, [guessCount, pastGuesses]);

  useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.repeat) return
    const key = event.key.toUpperCase()
    // letters
    if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        editGuess(key)
      }
    }
    // backspace
    else if (event.key === "Backspace") {
      editGuess("BACKSPACE")
    }
    // enter
    else if (event.key === "Enter") {
      editGuess("ENTER")
    }
  }

  window.addEventListener("keydown", handleKeyDown)

  return () => {
    window.removeEventListener("keydown", handleKeyDown)
  }
}, [currentGuess])
  
  const editGuess = (input) => {
    if (input !== "BACKSPACE" && input !== "ENTER" && !isWin()) {
      if (currentGuess.length < 5) {
      setCurrentGuess((currentGuess) => currentGuess + input)
      }
    }
    else if (input === "BACKSPACE" && !isWin()) {
      setCurrentGuess((currentGuess) => currentGuess.substring(0, currentGuess.length - 1))
    }
    else if (input === "ENTER" && currentGuess.length === 5 && !isWin()) {
        setCurrentGuess("")
        enterWord(currentGuess)
    }
  }
  
  //guess = [{letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}]
  const enterWord = (guess) => {
    if (guessCount === 6 || isWin()) {
      return
    }
    const normalizedGuess = [...guess];
    const letterArray = normalizedGuess.map((letter) => ({ letter, color: 'gray' }))

    // letter count registry
    const wordMap = new Map()
    for (let i = 0; i < 5; i++) {
      let letter = solution[i]
      if (!wordMap.has(letter)) {
        wordMap.set(letter, 1)
      }
      else {
        wordMap.set(letter, wordMap.get(letter) + 1)
      }
      console.log(wordMap)
    }
    //first loop to check for greens
    for (let i = 0; i < 5; i++) {
      let letter = letterArray[i].letter
      console.log(`Letter: ${letter} solution letter: ${solution[i]}`)
      if (letter === solution[i] && wordMap.get(letter) > 0) {
        wordMap.set(letter, wordMap.get(letter) - 1)
        letterArray[i] = {letter, color: "green"}
      }
    }
    //second loop to check for yellows
    console.log(wordMap)
    for (let i = 0; i < 5; i++) {
      let letter = letterArray[i].letter
      if (letterArray[i].color === "green") {
        continue;
      }
      else if (solution.includes(letter) && wordMap.get(letter) > 0) {
        wordMap.set(letter, wordMap.get(letter) - 1)
        letterArray[i] = {letter, color: "yellow"}
      }
    }
    setPastGuesses((currentHistory) => (
      currentHistory.map((array, index) => index === guessCount ? letterArray : array)
    ))
    setGuessCount((currentGuessCount) => currentGuessCount + 1)
  }



  return (
    <>
      <MainGrid pastGuesses={pastGuesses} solution={solution} guessIndex={guessCount} currentGuess={currentGuess}/>
      <Keyboard onKeyPress={editGuess}/>
      <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)} >
        {isWin() ? <h1>You won! <br /><br /><br /> Guesses: {guessCount}</h1>: <h1>Try again!</h1>}
      </PopUp>
    </>
  )
}

export default App
