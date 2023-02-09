const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
// ...

// Add the route handlers here:

app.get('/', (request, response) => {
  response.render('index', { title: 'home' });
});

app.get('/beers', async (req, res, next) => {
  try {
    const allBeers = await punkAPI.getBeers();

    res.render('beers', { allBeers, title: 'All Beers' });
  } catch (error) {
    next(error);
  }
});

app.get('/random-beer', async (request, response) => {
  try {
    const random = await punkAPI.getRandom();
    response.render('random-beer', { random: random[0], title: 'Random Beer' });
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => console.log('🏃‍ http://localhost:3000'));

//test commit
