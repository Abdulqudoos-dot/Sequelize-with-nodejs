const express = require('express')
const { addUser, addUsers, getUsers, getUser, updateUser, deleteUser } = require('../controller/users')
const router = express.Router()

router.route('/').post(addUser).get(getUsers)
router.route('/addUsers').post(addUsers)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)


module.exports = router