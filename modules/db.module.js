const MongoClient = require('mongodb').MongoClient;

global._db = {
    collection() {
        throw "Mongo Still didn't connect when you called a request to the database";
    }   
}

connect = (url) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, dbInstance) => {
            if (err) {
                reject(err);
            }
            global._db = dbInstance;
            resolve(dbInstance);
        });
    });
}


module.exports.connect = connect;