const pool = require('../db/db');

async function getUsers() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    client.release();
    return result.rows;
  } catch (err) {
    throw new Error('Error fetching users from the database');
  }
}

async function addUser(name, email, password) {
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
    client.release();
    return result.rows[0];
  } catch (err) {
    throw new Error('Error adding user to the database');
  }
}

module.exports = { getUsers, addUser };
