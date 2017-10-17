const connect = require('./modules/db.module.js').connect;
const Model = require('./modules/model.module.js');


module.exports.connect = connect;
module.exports.Model = Model;