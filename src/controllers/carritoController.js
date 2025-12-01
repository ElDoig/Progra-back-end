import CarritoRepository from '../repositories/carritoRepository.js'
import ItemCarritoRepository from '../repositories/itemCarritoRepository.js'
import Producto from '../models/producto.js'
import ItemCarrito from '../models/itemCarrito.js'

const carritoRepo = new CarritoRepository()
const itemRepo = new ItemCarritoRepository()

export const agregarItem = async (req, res) => {
  try {
    const { idUsuario, idProducto, cantidad } = req.body

    let carrito = await carritoRepo.findOne({ where: { idUsuario } })
    if (!carrito)
      carrito = await carritoRepo.create({ idUsuario })

    const item = await itemRepo.create({
      idCarrito: carrito.id,
      idProducto,
      cantidad
    })

    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al agregar al carrito' })
  }
}

export const obtenerCarrito = async (req, res) => {
  try {
    const { idUsuario } = req.params

    const carrito = await carritoRepo.findOne({ where: { idUsuario } })
    if (!carrito) return res.json([])

    const items = await ItemCarrito.findAll({
      where: { idCarrito: carrito.id },
      include: Producto
    })

    res.json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener carrito' })
  }
}
