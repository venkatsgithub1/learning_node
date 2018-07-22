const assert = require('assert');
const marioChar = require('../models/marioChar');

describe('saving records', () => {
    // create tests        assert        assert        assert        assert
    it('saves a record to the database', (done) => {

        let char = new marioChar({
            name: 'Mario'
        });

        char.save().then(() =>{
            assert(char.isNew === false);
            done();
        });
    });
});