const errorResponse = require('../utils/errorResponse')
const db = require('../model')
const { Op, QueryTypes } = require("sequelize");
const User = db.User
const Contact = db.Contact
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


// validation

exports.validation = async (req, res, next) => {
    try {
        const users = await User.create({ firstName: 'umer', lastName: 'liaqat' }
        )
        // const users = await User.findAll(
        //     {}
        // )
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

// raw queries

exports.rawQueries = async (req, res, next) => {
    try {
        // const users = await sequelize.query('SELECT * FROM users', {
        //     type: QueryTypes.SELECT,
        //     model: User,
        //     mapToModel: true, //getter setter will work 
        //     plain: true, //only one record will show
        //     // raw: false

        // })
        // this is use to fech data with condition with ?
        // const users = await sequelize.query('SELECT * FROM users WHERE id= ?', {
        //     replacements: [
        //         2
        //     ],
        //     type: QueryTypes.SELECT

        // })
        // this is use to fech data with condition with id

        // const users = await sequelize.query('SELECT * FROM users WHERE id = :id', {
        //     replacements: {
        //         id: 2
        //     },
        //     type: QueryTypes.SELECT

        // })


        // // this is use to fech data with condition with in method


        // const users = await sequelize.query('SELECT * FROM users WHERE id IN(:id)', {
        //     replacements: {
        //         id: [1, 2, 3]
        //     },
        //     type: QueryTypes.SELECT

        // })



        // this is use to fech data with condition with $ and bind method

        const users = await sequelize.query('SELECT * FROM users WHERE id = $id', {
            bind: { id: 2 },
            type: QueryTypes.SELECT

        })


        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}



// one to one assocciation

exports.oneToOne = async (req, res, next) => {
    try {
        // making a relationship between user and contact
        // const user = await User.create({ firstName: 'ali', lastName: 'ahmer' }
        // )
        // if (user && user.id) {

        //     await Contact.create({
        //         permanentAddress: 'chack no 30 jb',
        //         currentAddress: 'faisalabad',
        //         userId: user.id
        //     })
        // }

        // getting a relationship betwween user and contact
        const user = await User.findAll(
            {
                attributes: ['firstName', 'lastName'],
                include: {
                    model: Contact,
                    attributes: ['permanentAddress', 'currentAddress', 'userId']
                }
            }
        )
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}


// one to many

exports.oneToMany = async (req, res, next) => {
    try {
        // making a relationship between user and contact
        // const user = await User.create({ firstName: 'ali', lastName: 'ahmad' }
        // )
        // if (user && user.id) {

        // const contact = await Contact.create({
        //     permanentAddress: 'chack no 5 jb',
        //     currentAddress: 'faisalabad',
        //     userId: 3
        // })
        // }

        // getting a relationship betwween user and contact
        const user = await User.findAll(
            {
                attributes: ['firstName', 'lastName'],
                include: {
                    model: Contact,
                    attributes: ['permanentAddress', 'currentAddress', 'userId']
                }
            }
        )
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}


// many to many

exports.manyToMany = async (req, res, next) => {
    try {
        // making a relationship between user and contact
        // const user = await User.create({ firstName: 'tasneem', lastName: 'abbas' }
        // )
        // if (user && user.id) {

        //     const contact = await Contact.create({
        //         permanentAddress: 'chack no 5 jb',
        //         currentAddress: 'faisalabad',
        //         userId: user.id
        //     })
        // }

        // getting a relationship betwween user and contact
        // const user = await User.findAll(
        //     {
        //         attributes: ['firstName', 'lastName'],
        //         include: {
        //             model: Contact,
        //             attributes: ['permanentAddress', 'currentAddress']
        //         }
        //     }
        // )

        const contact = await Contact.findAll(
            {
                attributes: ['permanentAddress', 'currentAddress'],
                include: {
                    model: User,
                    attributes: ['firstName', 'lastName']
                }
            }
        )
        res.status(201).json(contact)
    } catch (err) {
        next(err)
    }
}

// paranoid

exports.paranoid = async (req, res, next) => {
    try {
        // to drop query for check paranoid delete
        const users = await User.destroy({ where: { id: 1 } })

        // query for add user

        // const users = await User.create({ firstName: 'paranoid2', lastName: 'example2' }
        // )

        //query for find user
        // const users = await User.findAll(
        //     {}
        // )
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}
