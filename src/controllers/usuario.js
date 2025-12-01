import usuarioService from "../services/usuario.js";
import repository from "../repositories/usuario.js";

const registrar = async (req,res) => {
    try {
        
        const { nombre, apellido, email, usuario, password, direccion, ciudad, telefono, rol} = req.body;

       

        const response = await usuarioService.registrar({nombre, apellido, email, usuario, password, direccion, ciudad, telefono, rol});

        if (response.success)
            return res.status(201).json(response);
        else
           
            return res.status(400).json(response); 
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error inesperado en el controlador de registro", error})
    }
}

const login = async(req,res) => {
    try {
       
        const { email, password } = req.body; 

      
        const result = await usuarioService.login({ email, password});

    if (result.success)
        return res.status(200).json(result);
    else
       
        return res.status(401).json(result);
    
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Error inesperado en el controlador de login", error: err})
    }
}


const recuperarPassword = async (req, res) => {
    try {

        const { email, newPassword } = req.body;
        
        const response = await usuarioService.recuperarPassword({ email, newPassword });

        if (response.success) {

            return res.status(200).json(response);
        } else {

            return res.status(404).json(response); 
        }
    } catch (error) {
        console.error("Error en el controlador de recuperación de password:", error);
   
        return res.status(500).json({ success: false, message: "Error inesperado en el servidor." });
    }
};
const findAll = async (req, res) => {
    try {
        const usuarios = await repository.findAll();
        return res.status(200).json(usuarios ?? []);
    } catch (error) {
        console.error('Error al listar usuarios:', error);
        return res.status(500).json({ message: 'Error al listar usuarios' });
    }
}

// En src/controllers/usuario.js

import Usuario from '../models/usuario.js'; 

export const updateProfile = async (req, res) => {
    
    // ⚠️ Esta variable debe venir de la decodificación del JWT (middleware)
    const userEmail = req.usuario.email; // Asumimos que el middleware ya puso el ID en req.user
    
    try {
        const { name, lastName, email } = req.body;
        
        const [updatedRows] = await Usuario.update(
            { 
                nombre: name, 
                apellido: lastName, 
                email: email 
            },
            { 
                where: { email: userEmail } 
            }
        );

        if (updatedRows === 0) {
      
            return res.status(404).json({ success: false, message: 'Usuario no encontrado o sin cambios.' });
        }
        
    
        return res.json({ 
            success: true, 
            message: 'Datos actualizados en la base de datos.' 
        });

    } catch (error) {
        console.error("Error al actualizar perfil en DB:", error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
};


const controller = { registrar, login , recuperarPassword, findAll, updateProfile}

export default controller