import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import repository from '../repositories/usuario.js' 
const generarToken = (nombre, email, rol) => {
    return jwt.sign({nombre, email, rol}, 
    'zMxNgV1cjUcjKnSCOZykseZaoYvUVPBtYqBOTZmJW2P',
    { expiresIn: '7d'}
    )
}

const registrar = async ({ nombre, apellido, email, usuario, password, direccion, ciudad, telefono, rol = 'cliente' }) => { 
    try {
       
    
        if (!nombre || !email || !usuario || !password || !telefono) {
            return {
                success: false,
                message: 'Proporcione al menos Nombre, Email, Usuario, Contraseña y Teléfono.' 
            }
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
       
        const nuevoUsuario = {
            nombre,
            apellido, 
            email,
            usuario, 
            password: hashedPassword,
            rol,
            direccion, 
            ciudad,  
            telefono, 
            createdAt: new Date()
        }

        console.log(nuevoUsuario)
    
        const usuarioCreado = await repository.create(nuevoUsuario)

        const token = generarToken(nombre, email, usuarioCreado.rol); 
    
        return {
            success: true,
            message: "Usuario creado exitosamente",
            token,
            usuario: usuarioCreado
        }
    } catch (error) {
        console.log('error al registrar usuario')
        console.debug(error)
        return {
            success: false,
            message: 'Error al crear el usuario. Probablemente el email o usuario ya existen.'
        };
    }
}



const login = async ({email, password}) => { 

    console.log({email, password})

    if (!email || !password) { 
        return {
            success: false,
            message: "Correo o password incorrectos." 
        }
    }

    
    const usr = await repository.findByEmail(email); 

    console.log('USR:')
    console.log(usr)
    if (!usr) {
        return {
            success: false,
            message: "Correo o password incorrectos."
        }
    }

    console.log({ password, op: usr.password })

    const isPasswordValid = await bcrypt.compare(password, usr.password);

    console.log(isPasswordValid) 

    if (!isPasswordValid) {
        return {
            success: false,
            message: "Correo o password incorrectos."
        }
    }


    const token = generarToken(usr.nombre, usr.email, usr.rol); 

    return {
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        usuario: {...usr}
    }
}


const recuperarPassword = async ({ email, newPassword }) => {
   
   const usuario = await repository.findByEmail(email); 
    
    if (!usuario) {
        return { success: false, message: "Correo electrónico no registrado." };
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10); 

   

        const entityToUpdate = {
            id: usuario.id, 
            password: hashedPassword 

        };


        const updatedUser = await repository.update(entityToUpdate);

        if (!updatedUser) {
            return { success: false, message: "No se pudo actualizar la contraseña. Inténtalo de nuevo." };
        }

        return { success: true, message: "Contraseña actualizada exitosamente." };

    } catch (error) {
        console.error("Error al hashear o actualizar password:", error);
        return { success: false, message: "Error interno del servidor al actualizar." };
    }
};

const usuarioService = { registrar, login, recuperarPassword }

export default usuarioService;