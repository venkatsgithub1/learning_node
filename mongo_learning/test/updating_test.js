const assert = require('assert');
const marioChar = require('../models/marioChar');

describe('updating records', () => {
    // create tests        assert        assert        assert        assert

    let myChar;

    beforeEach((done) => {
        let char = new marioChar({
            name: 'Mario',
            weight: 50
        });
        myChar = char;

        char.save().then(() => {
            assert(char.isNew === false);
            done();
        });
    });


    it('updates one record in the database', (done) => {
        marioChar.findOneAndUpdate({ name: 'Mario' }, { name: 'Luigi' }).then(() => {
            marioChar.findOne({ '_id': myChar._id }).then((result) => {
                assert(result.name === 'Luigi');
                done();
            });
        });
    });

    it('increments weight by 1 in the database', (done) => {
        marioChar.update({}, { $inc: { weight: 1 } }).then(() => {
            marioChar.findOne({ name: 'Mario' }).then((result) => {
                assert(result.weight === 51);
                done();
            });
        });
    });
});