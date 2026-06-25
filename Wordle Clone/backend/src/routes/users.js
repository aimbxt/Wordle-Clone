const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {

})

router.post('/register', (req, res) => {

})

router.get('/', (req, res) => {
    res.send('got a GET USER request')
})

module.exports = router