const mongoose = require('mongoose');

// ES6 promises.
mongoose.Promise = global.Promise;

// connect to db before test
before((done) => {
    // connect to mongo db.
    mongoose.connect('mongodb://localhost:27017/testaroo', { useNewUrlParser: true });

    mongoose.connection.once('open', () => {
        console.log('connection is made.');
        done();
    }).on('error', (err) => {
        console.log('error:', err);
    });
});

// drop the characters collection before each test.
beforeEach((done) => {
    // drop the collection.
    mongoose.connection.collections.mariochars.drop(() => {
        done();
    });
});
