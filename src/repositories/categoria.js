import Categoria from '../models/categoria.js';

class CategoriaRepository {
    async getAll() {
        return await Categoria.findAll();
    }

    async create(data) {
        return await Categoria.create(data);
    }
}

export default new CategoriaRepository();