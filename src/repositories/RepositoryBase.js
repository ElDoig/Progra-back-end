class RepositoryBase {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        try {
            return await this.model.findAll();
        } catch(err) {
            console.log(err);
            return null;
        }
    }

    async create(entity) {
        try {
            return await this.model.create(entity);
        } catch (error) {
            console.debug(error);
            return null;
        }
    }

    async findOne(id) {
        try {
            return await this.model.findOne({
                where : { id: id}
            })
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async update(entity) {
        try {
            if (!entity || !entity.id) return null;
            const [affectedRows] = await this.model.update(entity, {
                where : { id: entity.id }
            });

            if (affectedRows > 0) {
                return await this.findOne(entity.id);
            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async remove(id) {
        try {
            return await this.model.destroy({
                where : { id: id}
            })
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}

export default RepositoryBase;