const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/user', (req, res) => {
    res.send('got a GET USER request')
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post('/api/guess', (req, res) => {
    const { guess } = req.body
    const solution = ["A", "P", "P", "L", "E"]
    const letterArray = guess.map((letter) => ({ letter, color: 'gray' }))
    const isWin = letterArray.every((object, i) => (object.letter === solution[i]))

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

    res.json({letterArray, isWin})
})