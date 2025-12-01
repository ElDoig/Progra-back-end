import express from 'express';
import { listarCategorias, agregarCategoria } from '../controllers/categoria.js';

const router = express.Router();

// GET http://localhost:3005/categorias
router.get('/', listarCategorias); 

// POST http://localhost:3005/categorias
router.post('/', agregarCategoria);

export default router;