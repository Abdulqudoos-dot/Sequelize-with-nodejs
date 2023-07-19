module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contact', {
        permanentAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentAddress: {
            type: DataTypes.STRING,
            defaultValue: 'Faisalabad'
        }
    }, {
        tableName: 'contacts'
    })
    return Contact
    // console.log(`contact model : ${Contact === sequelize.models.Contact}`.bgYellow)
}