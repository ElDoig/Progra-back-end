import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Orden = sequelize.define('Orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: { // Relación con el Usuario
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    metodoDeEntrega: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nroTarjeta: { // Solo últimos 4 dígitos por seguridad
        type: DataTypes.STRING,
        allowNull: true
    },
    tipoTarjeta: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Orden',
    timestamps: false
});

export default Orden;