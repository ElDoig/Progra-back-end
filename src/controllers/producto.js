import repository from "../repositories/producto.js";

const findAll = async (req, res) => {
    const respuesta = await repository.findAll();

    return sendResults(respuesta, res, "No se han encontrado registros.")

}

const findOne = async (req,res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);

    return sendResults(result, res, "No se han encontrado registros.")
}

const create = async (req,res) => {
    try {
        const object = req.body;
        const createdObj = await repository.create(object)

        if (!createdObj) {
            return res.status(400).json({ message: "Error al crear el objeto. Revisa la consola del servidor para más detalles." })
        }

        return res.status(201).json(createdObj)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message || "Error interno al crear" })
    }
}

const update = async (req,res) => {
    const id = Number(req.params.id);
    const object = { ...req.body, id }; 
    const updatedObj = await repository.update(object)

    return sendResults(updatedObj, res, "Error al actualizar el objeto.")
}

const remove = async (req,res) => {
    const id = req.params.id;
    const result = await repository.remove(id)

    return sendResults(result,res,"Error al eliminar el objeto.")
}

const sendResults = (result, res, message) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message })
}

const controller = { findAll,findOne, create,update,remove }

export default controller;   