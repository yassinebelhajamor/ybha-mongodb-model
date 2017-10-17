const assert = require('assert');
const User = require('./models/User.model.js');

module.exports = function () {
    describe("Update Tests", () => {
        it("Should update { nickname: 'yassine' } to { nickname: 'bha' } ", () => {
            User.update({ nickname: "yassine" }, { $set: { nickname: "bha" } }).then(() => {
                User.count({ nickname: "yassine" }).then((data) => {
                    assert.equal(data, 0);
                }).catch((err) => {
                    console.log(err);
                    assert.fail(true);
                });
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });
        it("Should update all nicknames to 'kais'", () => {
            User.update({}, { $set: { nickname: "kais" } }, { multi: true }).then(() => {
                User.count({ nickname: "kais" }).then((data) => {
                    assert.equal(data, 3);
                }).catch((err) => {
                    console.log(err);
                    assert.fail(false);
                });
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });
    });
}