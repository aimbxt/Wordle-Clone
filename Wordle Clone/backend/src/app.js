const express = require('express');
const cors = require('cors');
const session = require('express-session')
const app = express();
const port = 3000;
const usersRouter = require('./routes/users')
const guessRouter = require('./routes/guess')
const pool = require('./db/database')

app.use(cors({
  credentials: true
}))
app.use(express.json())
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60
  }
}))
app.use('/api/user', usersRouter)
app.use('/api/guess', guessRouter) 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});