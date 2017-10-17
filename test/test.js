const assert = require('assert');
const connect = require('../index.js').connect;
const User = require('./models/User.model.js');

describe("Mongo Interraction", () => {
    it("Should connect", (done) => {
        connect("mongodb://localhost:27017/_test").then((db) => {
            done();
        }).catch((err) => {
            console.log(err);
            assert.fail(true);
        });
    });
});

require('./insert.test.js')();
require('./find.test.js')();
require('./update.test.js')();
require('./remove.test.js')();
