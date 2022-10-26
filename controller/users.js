const { db } = require('../database');

const getUser = (request, response) => {
  const { name } = request.body;
  const user = db["users"].find(elem => elem["name"] == name);
  if (!user) return response.status(400).json({ success: false, msg: "user not found" });
  response.status(201).json(user)
}

const deleteUser = (request, response) => {
  const { id } = request.body
  const indexOfUser = db.users.findIndex(user => user["id"] == +id);
  if (indexOfUser !== -1) {
    db.users.splice(indexOfUser, 1)
    response.status(410).json({ success: true, msg: `deleted user with id: ${id}` });
  } else return response.status(404).json({ success: false, msg: `no user with id: ${id}` })
}

const updateUser = (request, response) => {
  const { ...fields } = request.body;
  const { id } = request.params;
  const entries = Object.entries(fields);
  const indexOfUser = db.users.findIndex(user => user["name"] == +id);
  if (indexOfUser !== -1) {
    entries.forEach(([key, value]) => db.users[indexOfUser][key] = value);
    response.status(201).send('success')
  } else return response.status(404).json({ success: false, msg: "user not found" })
}

const getUserComment = (request, response) => {
  const { name, commentID } = request.params;
  const user = db.users.find(elem => elem["name"] == name);
  const comment = user.comments.find(elem => elem["commentID"] == +commentID);
  if (!comment) return response.status(200).json({ success: true, data: [] });
  response.status(200).json(comment)
}

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  getUserComment
}