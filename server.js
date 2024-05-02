const express = require('express');
const routes = require('./controllers/API-route');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
// RDT:  import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// RDT:  sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening - good job Team!'));
});
