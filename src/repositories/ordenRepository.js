import RepositoryBase from './RepositoryBase.js'
import Orden from '../models/orden.js'

class OrdenRepository extends RepositoryBase {
  constructor() { super(Orden) }
}

export default OrdenRepository
