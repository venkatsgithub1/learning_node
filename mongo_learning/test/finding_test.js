const assert = require('assert');
const marioChar = require('../models/marioChar');

describe('finding records', () => {
    // create tests        assert        assert        assert        assert

    let myChar;

    beforeEach((done) => {
        let char = new marioChar({
            name: 'Mario'
        });
        myChar = char;

        char.save().then(() => {
            assert(char.isNew === false);
            done();
        });
    });


    it('finds one record from the database', (done) => {
        marioChar.findOne({name:'Mario'}).then((result) => {
            assert(result.name === 'Mario');
            done();
        })
    });

    it('finds one record by id from the database', (done) => {
        marioChar.findOne({_id:myChar._id}).then((result) => {
            assert(result._id.toString() === myChar._id.toString());
            done();
        })
    });
});