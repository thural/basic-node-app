const express = require('express');
const app = express();

const users = [
  {name: "John", age:33},
  {name: "Lily", age:30}
]

app.get('/', (req, res) => {
  res.json(users);
})

app.listen(5000)