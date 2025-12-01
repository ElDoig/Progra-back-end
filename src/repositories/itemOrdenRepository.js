import RepositoryBase from './RepositoryBase.js'
import ItemOrden from '../models/itemOrden.js'

class ItemOrdenRepository extends RepositoryBase {
  constructor() { super(ItemOrden) }
}

export default ItemOrdenRepository
