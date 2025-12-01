import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import Carrito from './carrito.js'
import Producto from './producto.js'

const ItemCarrito = sequelize.define('itemCarrito', {
    id: { type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    cantidad: { type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 1 
    }
})

Carrito.hasMany(ItemCarrito, { foreignKey: 'idCarrito' })
ItemCarrito.belongsTo(Carrito, { foreignKey: 'idCarrito' })

Producto.hasMany(ItemCarrito, { foreignKey: 'idProducto' })
ItemCarrito.belongsTo(Producto, { foreignKey: 'idProducto' })

export default ItemCarrito
