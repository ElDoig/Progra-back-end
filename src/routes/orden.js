import express from 'express';
import { obtenerDetalleOrden , checkout , listarOrdenes } from '../controllers/orden.js';



const router = express.Router();
router.get('/', listarOrdenes);
// GET http://localhost:3005/ordenes/:id
// Ejemplo: /ordenes/1 -> Trae el detalle de la orden 1
router.get('/:id', obtenerDetalleOrden);
router.post('/checkout', checkout)

export default router;