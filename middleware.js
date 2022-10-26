const { db } = require("./database");

const logger = (request, response, next) => {
  console.log(
    request.url,
    request.method,
    new Date().getMilliseconds()
  );
  next()
};

const authorize = (request, response, next) => {
  const { name, password } = request.body;
  const userDocument = db.users.find(user => user["name"] == name);
  if(name && password) {
    if (userDocument["password"] == password) next()
      else return response.status(401).send("Incorrect password")
  } else response.status(401).send("Incorrect login")
};

module.exports = {
  logger,
  authorize
}