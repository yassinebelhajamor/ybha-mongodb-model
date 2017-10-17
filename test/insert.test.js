const assert = require('assert');
const User = require('./models/User.model.js');

module.exports = function () {
    describe("Insert Tests", () => {
        it("Should insert 1 user", (done) => {
            User.insert({ firstName: "Yassine", lastName: "Bel Haj Amor", nickname: "yassine_bha" }).then((data) => {
                done();
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });
        it("Should insert 2 users", (done) => {
            User.insert([{ firstName: "Kais", lastName: "Bel Haj Amor", nickname: "kais_bha" },
            { firstName: "test", lastName: "test2", nickname: "testhhh" }
            ]).then((data) => {
                done();
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });
    });
}