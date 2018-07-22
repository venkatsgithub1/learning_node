const assert = require('assert');
const marioChar = require('../models/marioChar');

describe('deleting records', () => {
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


    it('deletes one record from the database', (done) => {
        marioChar.findOneAndRemove({name:'Mario'}).then(() => {
            marioChar.findOne({'name':'Mario'}).then((result) => {
                 assert(result === null);
                 done();
            });
        });
    });
});