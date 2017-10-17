const assert = require('assert');
const User = require('./models/User.model.js');

module.exports = function () {
    describe("Remove Tests", () => {
        it("Should remove { nickname: 'kais' } ", () => {
            User.remove({ nickname: "kais" }).then(() => {
                User.count({ nickname: "kais" }).then((data) => {
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
        it("Should remove everything", () => {
            User.remove({}).then((data) => {
                User.count({}).then((data) => {
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
    });
}