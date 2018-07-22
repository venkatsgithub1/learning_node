const assert = require("assert");
const mongoose = require("mongoose");
const Author = require("../models/author");

// Describe tests
describe("Nesting records", () => {

    beforeEach((done) => {
        mongoose.connection.collections.authors.drop(() => {
            done();
        });
    });

    // create tests
    it("create an author with sub-documents", (done) => {
        let pauloCoelho = new Author({
            name: 'Paulo Coelho',
            age: 70,
            books: [{ title: 'The alchemist', pages: 197 },
            { title: 'Veronica Decides to Die', pages: 210 }]
        });

        pauloCoelho.save().then(() => {
            Author.findOne({ name: 'Paulo Coelho' }).then((record) => {
                assert(record.books.length === 2);
                done();
            });
        });
    });

    it('adds a book to an author', (done) => {
        let pauloCoelho = new Author({
            name: 'Paulo Coelho',
            age: 70,
            books: [{ title: 'The alchemist', pages: 197 },
            { title: 'Veronica Decides to Die', pages: 210 }]
        });

        pauloCoelho.save().then(() => {
            Author.findOne({ name: 'Paulo Coelho' }).then((record) => {
                // add a new books to the books collection
                record.books.push({ title: 'Eleven Minutes', pages: 273 });
                record.save().then(() => {
                    Author.findOne({ name: 'Paulo Coelho' }).then((record) => {
                        assert(record.books.length == 3);
                        done();
                    });
                })
            });
        });
    });
});