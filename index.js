const express = require('express');
const app = express();

const users = [
  {
    id: 0,
    name: "John",
    age: 33,
    comments: [
      {
        date: 01022020,
        postID: 316751,
        text: "lorem ipsum ..."
      }
    ]
  },
  {
    id: 1,
    name: "Lily",
    age: 30,
    comments: [
      {
        date: 03042020,
        postID: 314713,
        text: "lorem ipsum ..."
      }
    ]
  }
]

app.use(express.static('./public'))

app.get('/users/:userID', (request, response) => {
  const { userID } = request.params
  const document = users.find(user => user.id == +userID)
  if (!document) return response.status(404).send('error, document not found')
  response.json(document);
})

app.get('/users/:userID/comments/:postID', (request, response) => {
  const { userID, postID } = request.params
  const user = users.find(elem => elem.id == +userID)
  const comment = user.comments.find(elem => elem.postID == +postID)
  console.log(comment)
  if (!comment) return response.status(404).send('error, comment not found')
  response.json(comment);
})

app.listen(5000)