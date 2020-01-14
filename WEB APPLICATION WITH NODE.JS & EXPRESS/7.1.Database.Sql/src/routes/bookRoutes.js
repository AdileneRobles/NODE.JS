const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const sql = require('mssql');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      /* (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: recordset
          }
        );
      }()); */

      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      /* (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } =
          await request.input('id', sql.Int, id)
            .query('select * from books where id = @id');
        res.render(
          'bookView',
          {
            nav,
            title: 'Library',
            book: recordset[0]
          }
        );
      }()); */

      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}


module.exports = router;
