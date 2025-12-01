import Orden from '../models/orden.js';
import ItemOrden from '../models/itemOrden.js';
import Producto from '../models/producto.js'; // Asumimos que existe para mostrar nombres
import OrdenRepository from '../repositories/ordenRepository.js'
import ItemOrdenRepository from '../repositories/itemOrdenRepository.js'
import ItemCarrito from '../models/itemCarrito.js'

const ordenRepo = new OrdenRepository()
const itemOrdenRepo = new ItemOrdenRepository()



export const obtenerDetalleOrden = async (req, res) => {
    const { id } = req.params; // El ID vendrá en la URL (ej: /ordenes/5)

    try {
        // 1. Buscamos la información general de la orden
        const orden = await Orden.findByPk(id);

        if (!orden) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // 2. Buscamos los productos que pertenecen a esa orden
        // (Buscamos en la tabla ItemOrden donde idOrden coincida)
        const items = await ItemOrden.findAll({ 
            where: { idOrden: id } 
        });

        // 3. (Opcional) Intentamos obtener nombres de productos si es posible,
        // sino enviamos solo los items con sus IDs
        const detalleCompleto = {
            infoOrden: orden,
            productos: items
        };

        res.status(200).json(detalleCompleto);


        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el detalle de la orden' });
    }
};


export const checkout = async (req, res) => {
  try {
    const { idUsuario } = req.body

    const items = await ItemCarrito.findAll()
    if (!items.length)
      return res.status(400).json({ error: 'Carrito vacío' })

    const total = items.reduce((t, i) => t + (i.cantidad * i.precioUnit), 0)

    const orden = await ordenRepo.create({ idUsuario, total })

    for (const item of items) {
      await itemOrdenRepo.create({
        idOrden: orden.id,
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        precioUnit: item.precioUnit
      })
      await item.destroy()
    }

    res.json({ mensaje: 'Orden creada', orden })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error en checkout' })
  }
}
export const listarOrdenes = async (req, res) => {
    try {
        const ordenes = await ordenRepo.findAll();
        return res.status(200).json(ordenes ?? []);
    } catch (error) {
        console.error('Error al listar ordenes:', error);
        return res.status(500).json({ message: 'Error al listar ordenes' });
    }
}