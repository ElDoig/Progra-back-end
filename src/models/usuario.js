import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100), 
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: { 
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, 
    },
    
   
    usuario: { 
      type: DataTypes.STRING(255),
      allowNull: false, 
      unique: true, 
    },
    
   
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },


    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "cliente",
    },
  },
  {
    tableName: "usuario",
    timestamps: true,
    createdAt: "createdAt",  
    updatedAt: "updatedAt"
  }
);

export default Usuario;