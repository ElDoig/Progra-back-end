import RepositoryBase from './RepositoryBase.js'
import Carrito from '../models/carrito.js'

class CarritoRepository extends RepositoryBase {
  constructor() { super(Carrito) }
}

export default CarritoRepository
