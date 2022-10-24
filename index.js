const express = require('express');
const { logger, authorize } = require('./middleware');
const { db } = require('./database');
const users = require('./routes/users');

// the Express server app
const app = express();

// serve files from public folder
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({extended:false}))
// parse json
app.use(express.json())
// use users router for /api/users
app.use('/api/users', users)
// use a middleware on all routes
app.use(logger);
// use a middleware on a route
//app.use('/login', authorize);

// serve a single file
app.get('/file/:name', (reqest, response, next) => {
  const options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  const fileName = reqest.params.name
  response.sendFile(fileName, options, err => {
    if (err) next(err)
    else console.log('Sent:', fileName)
  })
})

// repond to a post method from a form submission
app.post('/login', authorize, (request, response) => {
  // response is handled by authorize middleware
})

// Get collections using a hardcoded directory
app.get('/api', (request, response) => {
  const collections = db;
  if (!collections) return response.status(200).send('Error, collections not found')
  response.status(200).json(collections);
})

// Get a collection using :param
app.get('/api/:collection', (request, response) => {
  const { collection } = request.params;
  const data = db[collection];
  if (!data) return response.status(200).json({ success: true, data: [] })
  response.status(200).json(data);
})

// Get data using a query
app.get('/api/:collection/query?', (request, response) => {
  const query = request.query;
  const { collection } = request.params;
  const documents = db[collection].filter(elem => {
    return (Object.keys(query)).every(tag => query[tag] == elem[tag])
  });
  if (!documents.length) return response.status(200).json({ success: true, data: [] });
  response.status(200).json(documents);
})

app.all('*', (req, res) => {
  res.status(404).send('Error 404, Page not found');
})

app.listen(5000);