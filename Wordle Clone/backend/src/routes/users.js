const express = require('express');
const router = express.Router();
const pool = require('../db/database')
const bcrypt = require('bcrypt')

router.get('/test', async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
        console.log(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Database error'});
    }
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({error: 'Username and password required'});
    }

    try {
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE username = $1',
            [username]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({error: 'Username already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );

        res.status(201).json({ user: result.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({error: 'Username and password required'});
    }

    try {
        const existingUser = await pool.query(
            "SELECT id, password_hash FROM users WHERE username = $1",
            [username]
        );

        if (existingUser.rows.length === 0) {
            return res.status(400).json({ error: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, existingUser.rows[0].password_hash);

        if (isMatch) {
            return res.status(200).json({ authenticated: true, message: "Login successful"});
        } else {
            return res.status(401).json({ authenticated: false, message: "Invalid username or password"});
        }
    } catch (err) {
        console.error("Login route error: ", err);
        return res.status(500).json({
            authenticated: false,
            message: "An internal server error occured."
        })
    }
})

router.get('/', (req, res) => {
    res.send('got a GET USER request')
})

module.exports = router