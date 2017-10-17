const assert = require('assert');
const User = require('./models/User.model.js');
module.exports = function () {

    console.log("please read over the console logs for any errors in the data, the test suit just tests the funcionnality");

    describe("find Tests", () => {
        it("Should find all users with all fields", (done) => {
            User.find().then((data) => {
                console.log(data);
                done();
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });
        it("Should find all users with the nickname field only", (done) => {
            User.find({}, { nickname: 1, _id: 0 }).then((data) => {
                console.log(data);
                done();
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });
        it("Should find the first user only", (done) => {
            let options = {
                limit: 1
            }
            User.find({}, { nickname: 1, _id: 0 }, options).then((data) => {
                console.log(data);
                done();
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });

        it("Should Skip the first user", (done) => {
            let options = {
                skip: 1
            }
            User.find({}, { nickname: 1, _id: 0 }, options).then((data) => {
                console.log(data);
                done();
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });

        it("Should return the number of users", () => {
            User.count({}).then((data) => {
                assert.equal(data, 3);
            }).catch((err) => {
                console.log(err);
                assert.fail(true);
            });
        });


    });
}