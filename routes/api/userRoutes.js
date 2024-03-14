const router = require('express').Router()

const{
  getUsers,
  getSingleUser,
  createUser
} = require('../../controllers/userController')

// /api/user
router.route('/').get(getUsers).post(createUser)

// /api/user/:userId
router.route('/:userId').get(getSingleUser)

module.exports = router;