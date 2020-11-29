const Collection = require('./Collection');
const collections = require('../const/collections');

class TensorBoards extends Collection {
    constructor(db, client) {
        super(db, client, collections.TensorBoards);
    }

    async create(tensorboard) {
        return super.create(tensorboard);
    }

    async fetch({ id }) {
        const entry = await super.fetch({ id }, { queryInnerId: false, excludeId: true });
        return entry;
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
        const result = await super.delete({ id }, { queryInnerId: false });
        return result;
    }

    async fetchAll({ query, fields, sort, limit } = {}) {
        const list = await super.fetchAll({ query, fields, sort, limit, excludeId: true });
        return list;
    }
}

module.exports = TensorBoards;