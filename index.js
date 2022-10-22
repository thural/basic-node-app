const { logger, authorize } = require('./middleware');
const { db } = require('./database');
const express = require('express');
const { request, response } = require('express');
const app = express();

// serve files from public folder
app.use(express.static('./public'))

// parse form data
app.use(express.urlencoded({extended:false}))

// use a middleware on all routes
app.use(logger);

// use a middleware on a route
app.use('/login', authorize);

// Get collections using a hardcoded directory
app.get('/api', (request, response) => {
  const collections = db;
  if (!collections) return response.status(200).send('Error, collections not found')
  response.status(200).json(collections);
})

// Get documents using nested (virtual) directory and :params
app.get('/api/users/:name/comments/:commentID', (request, response) => {
  const { name, commentID } = request.params;
  const user = db.users.find(elem => elem["name"] == name);
  const comment = user.comments.find(elem => elem.commentID == +commentID);
  if (!comment) return response.status(200).json({ success: true, data: [] });
  response.status(200).json(comment);
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

// repond to a post method from a form submission
app.post('/login', (request, response) => {
  //const {name, password} = request.body;
  //response.status(401).send('Please provide credentials')
})

app.all('*', (req, res) => {
  res.status(404).send('Error 404, Page not found');
})

app.listen(5000);