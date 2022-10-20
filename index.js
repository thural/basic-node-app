const express = require('express');
const app = express();

app.use(express.static('./public'));

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
})

app.listen(5000)