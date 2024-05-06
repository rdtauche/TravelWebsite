const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { getUsers, addUser } = require('./controllers/users');
const pool = require('./db/db');
require('dotenv').config();
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');

const routes = require ("./controllers");
const { url } = require('inspector');

app.use(express.json());
app.use(routes);

app.use(express.urlencoded({ extended: true }));
const hbs = exphbs.create();

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const user = await addUser(name, email, password);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
