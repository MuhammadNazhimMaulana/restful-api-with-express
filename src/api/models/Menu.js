module.exports = (sequelize, DataTypes) => {

    const Menu = sequelize.define('tbl_menu', {
        nama_menu: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jumlah_menu: {
            type: DataTypes.INTEGER
        },
        deskripsi_menu: {
            type: DataTypes.STRING,
        },
    })

    return Menu
}