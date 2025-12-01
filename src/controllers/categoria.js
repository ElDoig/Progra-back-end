import categoriaRepository from '../repositories/categoria.js';

export const listarCategorias = async (req, res) => {
    try {
        const categorias = await categoriaRepository.getAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

export const agregarCategoria = async (req, res) => {
    try {
        const nuevaCategoria = await categoriaRepository.create(req.body);
        res.status(201).json({ 
            message: 'Categoría creada exitosamente', 
            categoria: nuevaCategoria 
        });
    } catch (error) {
        console.error(error);
        // Código de error Postgres para duplicados
        if (error.original && error.original.code === '23505') {
            return res.status(409).json({ message: 'El nombre de la categoría ya existe.' });
        }
        res.status(500).json({ message: 'Error al crear categoría' });
    }
};