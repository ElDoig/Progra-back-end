import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Orden from './orden.js'
import Producto from './producto.js'

const ItemOrden = sequelize.define('ItemOrden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    precioUnitario: { 
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'ItemDeLaOrden', 
    timestamps: false
});

Orden.hasMany(ItemOrden, { foreignKey: 'idOrden' })
ItemOrden.belongsTo(Orden, { foreignKey: 'idOrden' })

Producto.hasMany(ItemOrden, { foreignKey: 'idProducto' })
ItemOrden.belongsTo(Producto, { foreignKey: 'idProducto' })

export default ItemOrden;