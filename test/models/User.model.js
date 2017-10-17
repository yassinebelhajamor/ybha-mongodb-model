const Model = require('../../index.js').Model;

let User = new Model('User', {}, { collection: "users" });

module.exports = User;