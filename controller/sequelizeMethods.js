const db = require('../model')
const { Op } = require("sequelize");
const User = db.User
const sequelize = db.sequelize
// create query with feild option that will allow insert data in db that is defined in fields array
exports.createQueryFeilds = async (req, res, next) => {
    try {
        const users = await User.create({
            firstName: 'muzammil',
            lastName: 'ali'
        }, {
            fields: ['firstName']
        })
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

// findAll with attributes query will find all tables in db with given attributes and we can change the name of attributes and give funtions in array in attribute and we can use include and exclude  to count the number of entries

exports.findAllWithAttributeIncExc = async (req, res, next) => {
    try {
        const users = await User.findAll(
            {
                attributes: {
                    include: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                    exclude: ['createdAt', 'updatedAt']
                },
                group: ['User.id']

            }
        )
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}



