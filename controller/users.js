const errorResponse = require('../utils/errorResponse')

const User = require('../model').User

// @route api/v1/users
// @desc add a user 

exports.addUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}


// @route api/v1/addusers
// @desc add a user 

exports.addUsers = async (req, res, next) => {
    try {
        let user;
        const postData = req.body
        if (postData.length > 1) {
            user = await User.bulkCreate(req.body)
        } else {
            user = await User.create(req.body)
        }
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}


// @route api/v1/users
// @desc get all users

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({})
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

// @route api/v1/users
// @desc get one user

exports.getUser = async (req, res, next) => {
    try {
        let user = await User.findOne({ where: { id: req.params.id } })
        if (!user) {
            return next(new errorResponse(`No user found with ID of ${req.params.id}`, 404))
        }
        user = await User.findOne({ where: { id: req.params.id } })
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

// @route api/v1/users
// @desc update one user


exports.updateUser = async (req, res, next) => {
    try {
        let user = await User.findOne({ where: { id: req.params.id } })
        if (!user) {
            return next(new errorResponse(`No user found with ID of ${req.params.id}`, 404))
        }
        user = await User.update(req.body, { where: { id: req.params.id } })
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

// @route api/v1/users
// @desc update one user


exports.deleteUser = async (req, res, next) => {
    try {
        let user = await User.findOne({ where: { id: req.params.id } })
        if (!user) {
            return next(new errorResponse(`No user found with ID of ${req.params.id}`, 404))
        }
        user = await User.destroy({ where: { id: req.params.id } })
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}


