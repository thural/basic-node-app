const { db } = require("./database");

const logger = (request, response, next) => {
  console.log(
    request.url,
    request.method,
    new Date().getFullYear()
  );
  next()
};

const authorize = (request, response, next) => {
  const { name, password } = request.body;
  const userDocument = db.users.find(user => user["name"] == name);
  if(name && password) {
    if (userDocument["password"] == password) {
      //response.status(201).send(`Welcome ${name}`);
      const options = {
        root: __dirname + "/public",
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    
      const fileName = "query.html";
      response.sendFile(fileName, options, err => {
        if (err) next(err)
        else console.log('Sent:', fileName)
      })
      next()
    } else return response.status(401).send("Incorrect password")
  } else response.status(401).send("Incorrect login")
};

module.exports = {
  logger,
  authorize
}