
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        },
        deleted: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0,
        }

    }, {
        tableName: 'users'
    })


    return User
    console.log(`user model : ${User === sequelize.models.User}`.bgYellow)
}