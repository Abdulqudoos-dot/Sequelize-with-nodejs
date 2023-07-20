
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            defaultValue: 'default',
            unique: true,
            get() {
                const rawValue = this.getDataValue('firstName')
                return rawValue ? "Mr " + rawValue.toUpperCase() : null
            },
            set(value) {
                const Name = this.setDataValue('firstName', value + "Pakistani ")
            }
        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue: 'default'
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`
            },
            set() {
                throw new Error('Do not try to set the `fullName` value!')
            }
        }

    }, {
        tableName: 'users',
        // hooks: {
        //     beforeValidate: (user, options) => {
        //         user.lastName = 'name before validate'
        //     }
        // },
        // afterValidate: (user, options) => {
        //     user.firstName = 'name after validate'
        // }
    })



    // add hook bt name function add hook
    // User.addHook('beforeValidate', (user, options) => {
    //     user.lastName = 'name before validate'
    // })

    // User.addHook('afterValidate', (user, options) => {
    //     user.firstName = 'name after validate'
    // })





    // add hook with out addhook function

    User.beforeValidate(async (user, options) => {
        user.lastName = 'name before validate'
    })

    User.afterValidate(async (user, options) => {
        user.firstName = 'name after validate'
    })

    return User
    console.log(`user model : ${User === sequelize.models.User}`.bgYellow)
}