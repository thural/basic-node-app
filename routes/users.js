const express = require('express');
const router = express.Router();
const {
  getUser,
  deleteUser,
  updateUser,
  getUserComment
} = require('../controller/users')


// router.post('/', getUser)
// router.delete('/', deleteUser)
// router.put('/:user', updateUser)
// router.get('/:name/comments/:commentID', getUserComment)

// Same funtionality but, cleaner
router.route('/').post(getUser).delete(deleteUser)
router.route('/:user').put(updateUser)
router.route('/:name/comments/:commentID').get(getUserComment)

module.exports = router