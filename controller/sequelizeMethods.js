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



// lazyEagerLoading
exports.lazyEagerLoading = async (req, res, next) => {
    try {
        // making a relationship between user and contact
        // const user = await User.create({ firstName: 'ali2', lastName: 'ahmad 2' }
        // )
        // if (user && user.id) {

        //     const contact = await Contact.create({
        //         permanentAddress: 'chack no 5 jb',
        //         currentAddress: 'faisalabad',
        //         userId: user.id
        //     })
        // }

        // // query for find user with eager loading
        // const user = await User.findAll(
        //     {
        //         include: {
        //             model: Contact,
        //             attributes: ['permanentAddress']
        //         }
        //     }
        // )


        // query for find user with lazy loading
        const user = await User.findOne({
            where: { id: 1 }
        })
        const contact = await user.getContacts()
        res.status(200).json({ user, contact })
    } catch (err) {
        next(err)
    }
}


// advance eager loading

exports.advEagerLod = async (req, res, next) => {
    try {
        //query for find user
        const users = await User.findAll(
            {
                where: { id: 2 },
                include: {
                    model: Contact,
                    require: false,
                    right: true
                }
            }
        )
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

// advance eager loading

exports.creatWithAsso = async (req, res, next) => {
    try {

        // // to creat one data in two assocciated models with create with assocciate

        // const data = await Contact.create({
        //     permanentAddress: 'chack no 5 jb',
        //     currentAddress: 'faisalabad',
        //     user: {
        //         firstName: 'create2',
        //         lastName: 'assocciation2'
        //     }
        // }, {
        //     include: db.contactUser
        // })


        // to creat bulk data in two assocciated models with create with assocciate

        // const data = await Contact.bulkCreate([{
        //     permanentAddress: 'chack no 6 jb',
        //     currentAddress: 'faisalabad6',
        //     user: {
        //         firstName: 'create3',
        //         lastName: 'assocciation3'
        //     }
        // },
        // {
        //     permanentAddress: 'chack no 7 jb',
        //     currentAddress: 'faisalabad7',
        //     user: {
        //         firstName: 'create4',
        //         lastName: 'assocciation4'
        //     }
        // }], {
        //     include: db.contactUser
        // })




        //query for find user
        const data = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            include: {
                model: Contact,
                attributes: ['permanentAddress', 'currentAddress', 'userId'],
                require: false,
                right: true
            }
        }
        )
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}


exports.M_n_Asso = async (req, res, next) => {
    try {

        // creating data in all of three tables

        // const data = User.create({
        //     firstName: 'abdullah7',
        //     lastName: 'jutt7',
        //     contacts: [{
        //         permanentAddress: 'abdullah town',
        //         currentAddress: 'faisalabad',
        //         UserContact: {
        //             selfGranted: false
        //         }
        //     }]
        // }, {
        //     include: Contact
        // })

        // // making user for many to many
        // const user = await User.create({
        //     firstName: 'name1',
        //     lastName: 'name1',
        // })

        // // making contact for many to many
        // const contact = await Contact.create({
        //     permanentAddress: 'chack no 57 jb',
        //     currentAddress: 'faisalabad',
        // })

        // entring data in third model wich is made up by many to many assocciaion
        // await user.addContact(contact, { through: { selfGranted: true } })
        // query for find user

        // if we have super manty to many realation ship then we can access nested tebles and we can access through tables 

        // access contact aand userContact table by user
        // const data = await User.findAll({
        //     // include: {
        //     //     model: Contact
        //     // },
        //     include: {
        //         model: db.UserContact
        //     }
        // }
        // )

        // access user aand userContact table by contact
        // const data = await Contact.findAll({
        //     include: {
        //         model: User
        //     },
        //     // include: {
        //     //     model: db.UserContact
        //     // }
        // }
        // )


        // access user aand contact  table by userContact
        const data = await db.User.findAll({
            // include: {
            //     model: User
            // },
            include: {
                model: Contact
            }
        }
        )



        res.status(200).json({ data })
    } catch (err) {
        next(err)
    }
}



// mmany to many to many eager loading

exports.m__2_m_2_m = async (req, res, next) => {
    try {
        //query for bulk creat in many to mant any  
        // await User.bulkCreate([
        //     {
        //         firstName: 'name1',
        //         lastName: 'name1',
        //     },
        //     {
        //         firstName: 'name2',
        //         lastName: 'name2',
        //     },
        //     {
        //         firstName: 'name3',
        //         lastName: 'name3',
        //     },
        //     {
        //         firstName: 'name4',
        //         lastName: 'name4',
        //     },
        // ])

        // await db.Player.bulkCreate([
        //     { name: 's0me0ne' },
        //     { name: 'empty' },
        //     { name: 'greenhead' },
        //     { name: 'not_spock' },
        //     { name: 'bowl_of_petunias' }
        // ]);
        // await Contact.bulkCreate([
        //     { name: 'The Big Clash' },
        //     { name: 'Winter Showdown' },
        //     { name: 'Summer Beatdown' }
        // ]);
        // await db.UserContact.bulkCreate([
        //     { contactId: 1, userId: 1 },   // this GameTeam will get id 1
        //     { contactId: 1, userId: 2 },   // this GameTeam will get id 2
        //     { contactId: 2, userId: 1 },   // this GameTeam will get id 3
        //     { contactId: 2, userId: 3 },   // this GameTeam will get id 4
        //     { contactId: 3, userId: 2 },   // this GameTeam will get id 5
        //     { contactId: 3, userId: 3 }    // this GameTeam will get id 6
        // ]);

        // await db.PlayerUserContact.bulkCreate([
        //     // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
        //     { playerId: 1, usercontactId: 3 },   // s0me0ne played for The Martians
        //     { playerId: 3, usercontactId: 3 },   // greenhead played for The Martians
        //     { playerId: 4, usercontactId: 4 },   // not_spock played for The Plutonians
        //     { playerId: 5, usercontactId: 4 }    // bowl_of_petunias played for The Plutonians
        // ]);

        // find in mant to many to many
        const user = await User.findOne({
            where: {
                id: 1
            },
            include: {
                model: db.UserContact,
                include: [
                    {
                        model: db.Player,
                        through: { attributes: [] } // Hide unwanted `PlayerGameTeam` nested object from results
                    },
                    Contact
                ]
            }
        });
        res.status(200).json({ user })
    } catch (err) {
        next(err)
        console.log(err)
    }
}



// advance eager loading

exports.scope = async (req, res, next) => {
    try {
        //query for find user without scope
        // const users = await User.findAll(
        //     {
        //         where: { id: 2 }
        //     }
        // )

        // with scope
        // definnig scope for reuse of queries

        User.addScope('findWithId', {
            where: { id: 3 }
        })

        User.addScope('includeContact', {
            include: {
                model: Contact
            }
        })
        const users = await User.scope('includeContact').findAll()




        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}
