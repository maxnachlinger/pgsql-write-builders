# pgsql-write-builders

Generates INSERT and UPDATE SQL statements for Postgres from JS objects and arrays

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![standard][standard-image]][standard-url]

[travis-image]: https://travis-ci.org/maxnachlinger/pgsql-write-builders.svg?branch=master
[travis-url]: https://travis-ci.org/maxnachlinger/pgsql-write-builders
[npm-image]: https://img.shields.io/npm/v/pgsql-write-builders.svg?style=flat
[npm-url]: https://npmjs.org/package/pgsql-write-builders
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/

### Installation:
```
npm i pgsql-write-builders
```
### Usage:
```javascript
'use strict'
const writeSql = require('pgsql-write-builders')

const thingsToInsert = [
  { name: 'Thing 1', color: 'Red' },
  { name: 'Thing 2', color: 'Blue' }
]

writeSql.insert({
  table: 'test',
  returningAll: true, // adds a RETURNING * clause to return inserted rows
  items: thingsToInsert
}, (err, result) => {
  if (err) { throw err }
  /*
   result: {
   sql: INSERT INTO test (name, color) VALUES ($1, $2), ($3, $4) RETURNING id;
   values: ['Thing 1', 'Red', 'Thing 2', 'Blue']
   }
   */
})

const thingToUpdate = { id: 100, name: 'Thing 1 (edited)', color: 'Green' }

writeSql.update({
  table: 'test',
  keyColumn: 'id',
  item: thingToUpdate
}, function (err, result) {
  if (err) { throw err }
  /*
   result: {
   sql: UPDATE test SET name = $1, color = $2 WHERE id = $3;
   values: ['Thing 1 (edited)', 'Green', 100]
   }
   */
})

// Promises are also supported

writeSql.insert({
    table: 'test',
    returningAll: true, // adds a RETURNING * clause to return inserted rows
    items: thingsToInsert
  })
  .then(result => {
    /*
     result: {
     sql: INSERT INTO test (name, color) VALUES ($1, $2), ($3, $4) RETURNING id;
     values: ['Thing 1', 'Red', 'Thing 2', 'Blue']
     }
     */
  })

writeSql.update({
    table: 'test',
    keyColumn: 'id',
    item: thingToUpdate
  })
  .then(result => {
    /*
     result: {
     sql: UPDATE test SET name = $1, color = $2 WHERE id = $3;
     values: ['Thing 1 (edited)', 'Green', 100]
     }
     */
  })
```

### Why:
Writing UPDATE and INSERT SQL statements isn't terribly fun, this helps a little with that :)
