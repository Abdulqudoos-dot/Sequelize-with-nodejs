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
// find all queries with respect of operands
exports.findAllWithOp = async (req, res, next) => {
    try {
        const users = await User.findAll(
            {

                where: {


                    // in operator 
                    id: {
                        [Op.gt]: 2
                    }


                    // in operator 
                    // id: {
                    //     [Op.in]: [1, 2]
                    // }


                    // equal to operator 
                    // id: {
                    //     [Op.eq]: 2
                    // }

                    // and operator
                    // [Op.and]: {
                    //     id: 2,
                    //     firstName: 'Talha'
                    // }


                    // or operator
                    // [Op.or]: {
                    //     id: 2,
                    //     firstName: 'Talha'
                    // }
                }
            }
        )
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

// find all queries with respect of orders and limit the page 

exports.findAllWithorders = async (req, res, next) => {
    try {
        const users = await User.findAll(
            {
                order: [
                    ['id', 'DESC']
                ],

                group: 'id',
                limit: 2,
                offset: 1
            }
        )
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

// find all queries with respect of findrs

exports.findAllWithFinders = async (req, res, next) => {
    try {



        // find all data with findAndCountAll method and ount
        // const users = await User.findAndCountAll(
        //     {}
        // )



        // find  data with findOrCreate method to find the query if not found it will create
        const users = await User.findOrCreate(
            {
                where: { firstName: 'meer', lastName: 'ali' }
            }
        )


        //    find  data with findByPk method to find one query
        // const users = await User.findByPk(5)


        // find  data with findOne method to find one query
        // const users = await User.findOne(
        // {
        // where: { id: 2 }
        // where: { firstName: 'Talha' }

        // }
        // )

        // find all data with findAll method
        // const users = await User.findAll(
        //     {}
        // )


        res.status(200).json({ users })
    } catch (err) {
        next(err)
    }
}



// find with getters and creat with setters and virtuals

exports.findAndCreateWithGetterSetter = async (req, res, next) => {
    try {
        // const users = await User.findOrCreate(
        //     {
        //         where: { firstName: 'tamoor', lastName: 'ali' }
        //     }
        // )
        const users = await User.findAll(
            {}
        )
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}



