const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "wordle_db",
    password: "260272Postgres", 
    port: 5432,
})

module.exports = pool