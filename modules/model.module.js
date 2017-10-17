const registry = require('./registry.module.js');
const ObjectId = require('mongodb').ObjectID;
function _formatFindOptions(options) {
    if (!options.limit) {
        options.limit = 0;
    }
    if (!options.skip) {
        options.skip = 0;
    }
    return options;
}

function _formatUpdateOptions(options) {
    if (!options.upsert) {
        options.upsert = false;
    }
    if (!options.multi) {
        options.multi = false;
    }
    return options;
}


class Model {
    constructor(name, Schema, options) {
        this.name = name;
        this.Schema = Schema;
        this.options = new Object();
        Object.assign(this.options, options);
        if (this.options.collection) {
            this.collection = this.options.collection;
        } else {
            this.collection = name.toLowerCase() + "s";
        }
        registry.register(name, this);
    }
    /////////////////////////////////////////////////////////////
    ////////Find Function
    /////////////////////////////////////////////////////////////
    find(query, field, options) {
        let _options = new Object();
        Object.assign(_options, options);
        _options = _formatFindOptions(_options);
        return new Promise((resolve, reject) => {
            global._db.collection(this.collection)
                .find(query, field)
                .limit(_options.limit)
                .skip(_options.skip).toArray(function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
        });
    }
    /////////////////////////////////////////////////////////////
    ////////Find By Id Function
    /////////////////////////////////////////////////////////////
    findById(id, field, options) {
        let _options = new Object();
        Object.assign(_options, options);
        _options = _formatFindOptions(_options);
        return new Promise((resolve, reject) => {
            global._db.collection(this.collection)
                .find({ _id: ObjectId(id) }, field)
                .limit(_options.limit)
                .skip(_options.skip).toArray(function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        resolve({});
                    }
                });
        });
    }
    /////////////////////////////////////////////////////////////
    ////////Insert Function
    /////////////////////////////////////////////////////////////
    insert(document) {
        return new Promise((resolve, reject) => {
            global._db.collection(this.collection).insert(document, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    /////////////////////////////////////////////////////////////
    ////////update Function
    /////////////////////////////////////////////////////////////
    update(query, document, options) {
        let _options = new Object();
        Object.assign(_options, options);
        _options = _formatUpdateOptions(_options);
        return new Promise((resolve, reject) => {
            global._db.collection(this.collection).update(query, document, _options, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    /////////////////////////////////////////////////////////////
    ////////update by Id Function
    /////////////////////////////////////////////////////////////
    updateById(id, document) {
        return new Promise((resolve, reject) => {
            global._db.collection(this.collection).update({ _id: ObjectId(id) }, document, { multi: false, upsert: false }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    /////////////////////////////////////////////////////////////
    ////////remove Function
    /////////////////////////////////////////////////////////////
    remove(query) {
        return new Promise((resolve, reject) => {
            global._db.collection(this.collection).remove(query, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    /////////////////////////////////////////////////////////////
    ////////remove by Id Function
    /////////////////////////////////////////////////////////////
    removeById(id) {
        return new Promise((resolve, reject) => {
            global._db.collection(this.collection).remove({ _id: ObjectId(id) }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    /////////////////////////////////////////////////////////////
    ////////Count Function
    /////////////////////////////////////////////////////////////
    count(query) {
        return new Promise((resolve, reject) => {
            global._db.collection(this.collection).count(query, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
        });
    }
}


module.exports = Model;