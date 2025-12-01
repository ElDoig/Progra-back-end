import RepositoryBase from './RepositoryBase.js'
import ItemCarrito from '../models/itemCarrito.js'

class ItemCarritoRepository extends RepositoryBase {
  constructor() { super(ItemCarrito) }
}

export default ItemCarritoRepository
