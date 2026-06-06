import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import './App.css'

import MainGrid from './MainGrid/MainGrid.jsx'
import Keyboard from './Keyboard/Keyboard.jsx'
import PopUp from './PopUp/PopUp.jsx'

function App() {
  const emptyBoard = [[{letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}],
                      [{letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}],
                      [{letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}],
                      [{letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}],
                      [{letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}],
                      [{letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}, {letter: '', color: 'lightgray'}]]

  const [pastGuesses, setPastGuesses] = useState(emptyBoard)
  const [currentGuess, setCurrentGuess] = useState("")
  const [isWin, setIsWin] = useState(false)
  const [guessCount, setGuessCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  

  
  
  

  useEffect(() => {
    if (guessCount === 6 || isWin) {
      setIsOpen(true);
    }
    else {
      setIsOpen(false);
    }
  }, [guessCount, isWin]);

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

  const letterStatus = useMemo(() => {
    const status = {}
    pastGuesses.forEach((word) => {
      word.forEach((letter) => {
        const currentStatus = status[letter.letter]
        if (letter.color === "green") {
          status[letter.letter] = "green"
        }
        else if (letter.color === "yellow" && currentStatus !== "green") {
          status[letter.letter] = "yellow"
        }
        else if (letter.color === "gray" && currentStatus !== "green" && currentStatus !== "yellow") {
          status[letter.letter] = "gray"
        }
      })
    })

    return status
  }, [pastGuesses])

  useEffect(() => {
    let temp = Math.max(0, guessCount - 1)
    console.log(currentGuess)
    console.log(pastGuesses)
    console.log(`isOpen: ${isOpen}`)
    console.log(`isWin: ${isWin}`)
    console.log(pastGuesses[temp])
    console.log(letterStatus)
  }, [currentGuess, pastGuesses, isOpen, isWin, letterStatus])
  
  const editGuess = (input) => {
    if (input !== "BACKSPACE" && input !== "ENTER" && !isWin) {
      if (currentGuess.length < 5) {
      setCurrentGuess((currentGuess) => currentGuess + input)
      }
    }
    else if (input === "BACKSPACE" && !isWin) {
      setCurrentGuess((currentGuess) => currentGuess.substring(0, currentGuess.length - 1))
    }
    else if (input === "ENTER" && currentGuess.length === 5 && !isWin) {
        setCurrentGuess("")
        enterWord(currentGuess)
    }
  }
  
  //guess = [{letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}, {letter: 'A', color: 'gray'}]
  const enterWord = async (guess) => {
    if (guessCount === 6 || isWin) {
      return
    }

    try {
      const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({guess : [...guess]})
      })

      const {letterArray, isWin: guessIsWin} = await response.json()
      setIsWin(guessIsWin)
      setPastGuesses((currentHistory) => (
        currentHistory.map((array, index) => index === guessCount ? letterArray : array)
      ))
      setGuessCount((currentGuessCount) => currentGuessCount + 1)
  
    } catch (error) {
      console.error('Error submitting guess')
    }
  }



  return (
    <>
      <MainGrid pastGuesses={pastGuesses} guessIndex={guessCount} currentGuess={currentGuess}/>
      <Keyboard onKeyPress={editGuess} letterStatus={letterStatus}/>
      <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)} >
        {isWin ? <h1>You won! <br /><br /><br /> Guesses: {guessCount}</h1>: <h1>Try again!</h1>}
      </PopUp>
    </>
  )
}

export default App
