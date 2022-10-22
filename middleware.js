const logger = (request, response, next) => {
  console.log(
    request.url,
    request.method,
    new Date().getFullYear()
  );
  next()
};

const authorize = (request, response, next) => {
  const { name } = request.query;
  console.log('name: ', name, 'random ', Math.random());
  if (name === "John" || name === "Lily") {
    request.user = { name, "id": 1 }
    next()
  } else {
    response.status(401).send("Unauthorized")
  }
};

module.exports = {
  logger,
  authorize
}