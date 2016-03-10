'use strict'
const test = require('tape')
const lib = require('..')

test('Constructs a simple update using where', function (t) {
  const item = { name: 'Test', color: 'Blue' }
  const expectedSQL = 'UPDATE test SET name = $1, color = $2 WHERE id = 1;'
  const expectedValues = [ 'Test', 'Blue' ]

  lib.update({
    item: item,
    where: 'id = 1',
    table: 'test'
  }, (err, res) => {
    t.notOk(err, 'No error should have been returned, received: ' + (err && err.stack))
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  })
})

test('Constructs a simple update using keyColumn', function (t) {
  const item = { name: 'Test', color: 'Blue', id: 1 }
  const expectedSQL = 'UPDATE test SET name = $1, color = $2 WHERE id = $3;'
  const expectedValues = [ 'Test', 'Blue', 1 ]

  lib.update({
    item: item,
    table: 'test',
    keyColumn: 'id'
  }, (err, res) => {
    t.notOk(err, 'No error should have been returned, received: ' + (err && err.stack))
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  })
})
