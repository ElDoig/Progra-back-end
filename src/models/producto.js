import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Producto = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type:DataTypes.STRING,
        allowNull: false
    }},
    {
    tableName: "producto",
    timestamps: false,
    }
)

export default Producto;