import model from '../models/usuario.js'
import RepositoryBase from './RepositoryBase.js'

const repository = new RepositoryBase(model);


repository.findByEmail = async function (email) {
    try {
        return await model.findOne({
            where: { email: email } 
        })
    } catch(err){
        console.log('error en findByEmail')
        console.log(err)
        return null
    }
}




export default repository;