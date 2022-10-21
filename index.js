const { db } = require('./database');
const express = require('express');
const app = express();

app.use(express.static('./public'))

// Get a collection using a hardcoded directory
app.get('/api', (request, response) => {
  const collections = db;
  if (!collections) return response.status(404).send('Error, collections not found')
  response.json(collections);
})

// Get a collection dynamically using :param
app.get('/api/:collection', (request, response) => {
  const { collection } = request.params;
  const data = db[collection];
  if (!data) return response.status(404).send('Error, collection not found')
  response.json(data);
})

// Get documents using nested directory and :params
app.get('/api/users/:userID/comments/:commentID', (request, response) => {
  const { userID, commentID } = request.params
  const user = db.users.find(elem => elem.id == +userID)
  const comment = user.comments.find(elem => elem.commentID == +commentID)
  if (!comment) return response.status(404).send('Error, comment not found')
  response.json(comment);
})

// Get data using a query?
app.get('/api/:collection/query?', (request, response) => {
  const query = request.query;
  const { collection } = request.params;
  const documents = db[collection].filter(elem => {
    return (Object.keys(query)).every(tag => query[tag] == elem[tag])
  });
  response.json(documents);
})

app.all('*', (req, res) => {
  res.status(404).send('Error 404, Page not found');
})

app.listen(5000);