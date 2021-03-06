const Collection = require('./Collection');
const collections = require('./collections');
const Query = require('./Query');

class TensorBoards extends Collection {
    constructor(db, client) {
        super(db, client, collections.TensorBoards);
    }

    async create(tensorboard) {
        return super.create(tensorboard);
    }

    async fetch({ id }) {
        const entry = await super.fetch(
            { id },
            {
                queryInnerId: false,
                excludeId: true,
            }
        );
        return entry;
    }

    async search({ status, fields = {}, sort = null, limit = 0 }) {
        const query = new Query().addParam('status', status).create();
        const entries = await super.fetchAll({
            query,
            sort,
            limit,
            fields,
            excludeId: true,
        });
        return entries;
    }

    async update(tensorboard) {
        const { id } = tensorboard;
        await super.updateOne({
            filter: { id },
            query: { $set: tensorboard },
        });
        return tensorboard;
    }

    async patch(tensorboard) {
        const entry = await super.patch({
            query: { id: tensorboard.id },
            data: tensorboard,
        });
        return entry;
    }

    async delete({ id }) {
        const result = await super.delete(
            { id },
            { queryInnerId: false, allowNotFound: true }
        );
        return result;
    }

    async fetchAll({ query = {}, fields = {}, sort = null, limit = 0 } = {}) {
        const list = await super.fetchAll({
            query,
            fields,
            sort,
            limit,
            excludeId: true,
        });
        return list;
    }
}

module.exports = TensorBoards;
