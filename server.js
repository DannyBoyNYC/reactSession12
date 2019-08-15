const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const recipeModel = require('./api/recipe.model');
const recipeControllers = require('./api/recipe.controllers');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(express.static('public'));

const dataBaseURL = process.env.DATABASE;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/recipes', recipeControllers.findAll);
app.get('/api/recipes/:id', recipeControllers.findById);
app.post('/api/recipes', recipeControllers.add);
app.put('/api/recipes/:id', recipeControllers.update);
app.delete('/api/recipes/:id', recipeControllers.delete);
app.get('/api/import', recipeControllers.import);
app.get('/api/killall', recipeControllers.killall);
app.post('/api/upload', recipeControllers.upload);

const PORT = process.env.PORT || 5000;

// process.on('SIGINT', shutdown);

// function shutdown() {
//   console.log('graceful shutdown express');
//   server.close(function() {
//     console.log('closed express');
//   });
// }

// Serve static files in prod
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.warn(err));

const server = app.listen(PORT, () =>
  console.log(`Server running at port ${PORT}`)
);
