'use strict'
const test = require('tape')
const lib = require('..')

test('Constructs a simple INSERT', function (t) {
  const items = [
    { id: 1, name: 'Test 1', color: 'Blue' }
  ]
  const expectedValues = [ 1, 'Test 1', 'Blue' ]
  const expectedSQL = 'INSERT INTO test (id, name, color) VALUES ($1, $2, $3);'

  lib.insert({
    items: items,
    table: 'test'
  }, (err, res) => {
    t.notOk(err, 'No error should have been returned, received: ' + (err && err.stack))
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  })
})

test('Constructs a simple INSERT (promise)', function (t) {
  const items = [
    { id: 1, name: 'Test 1', color: 'Blue' }
  ]
  const expectedValues = [ 1, 'Test 1', 'Blue' ]
  const expectedSQL = 'INSERT INTO test (id, name, color) VALUES ($1, $2, $3);'

  lib.insert({
    items: items,
    table: 'test'
  }).then((res) => {
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  }).catch((err) => t.fail(err, 'No error should have been returned, received: ' + (err && err.stack)))
})

test('Constructs a simple INSERT with a RETURNING clause', function (t) {
  const items = [
    { name: 'Test 1', color: 'Blue' }
  ]
  const expectedValues = [ 'Test 1', 'Blue' ]
  const expectedSQL = 'INSERT INTO test (name, color) VALUES ($1, $2) RETURNING *;'

  lib.insert({
    items: items,
    returningAll: true,
    table: 'test'
  }, (err, res) => {
    t.notOk(err, 'No error should have been returned, received: ' + (err && err.stack))
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  })
})

test('Constructs a simple INSERT with a RETURNING clause (promise)', function (t) {
  const items = [
    { name: 'Test 1', color: 'Blue' }
  ]
  const expectedValues = [ 'Test 1', 'Blue' ]
  const expectedSQL = 'INSERT INTO test (name, color) VALUES ($1, $2) RETURNING *;'

  lib.insert({
    items: items,
    returningAll: true,
    table: 'test'
  }).then((res) => {
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  }).catch((err) => t.fail(err, 'No error should have been returned, received: ' + (err && err.stack)))
})

test('Constructs a simple bulk INSERT', function (t) {
  const items = [
    { id: 1, name: 'Test 1', color: 'Blue' },
    { id: 2, name: 'Test 2', color: 'Red' }
  ]
  const expectedValues = [ 1, 'Test 1', 'Blue', 2, 'Test 2', 'Red' ]
  const expectedSQL = 'INSERT INTO test (id, name, color) VALUES ($1, $2, $3), ($4, $5, $6);'

  lib.insert({
    items: items,
    table: 'test'
  }, (err, res) => {
    t.notOk(err, 'No error should have been returned, received: ' + (err && err.stack))
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  })
})

test('Constructs a simple bulk INSERT (promise)', function (t) {
  const items = [
    { id: 1, name: 'Test 1', color: 'Blue' },
    { id: 2, name: 'Test 2', color: 'Red' }
  ]
  const expectedValues = [ 1, 'Test 1', 'Blue', 2, 'Test 2', 'Red' ]
  const expectedSQL = 'INSERT INTO test (id, name, color) VALUES ($1, $2, $3), ($4, $5, $6);'

  lib.insert({
    items: items,
    table: 'test'
  }).then((res) => {
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  }).catch((err) => t.fail(err, 'No error should have been returned, received: ' + (err && err.stack)))
})

test('Constructs a simple bulk INSERT with a RETURNING clause', function (t) {
  const items = [
    { name: 'Test 1', color: 'Blue' },
    { name: 'Test 2', color: 'Red' }
  ]
  const expectedValues = [ 'Test 1', 'Blue', 'Test 2', 'Red' ]
  const expectedSQL = 'INSERT INTO test (name, color) VALUES ($1, $2), ($3, $4) RETURNING *;'

  lib.insert({
    items: items,
    returningAll: true,
    table: 'test'
  }, (err, res) => {
    t.notOk(err, 'No error should have been returned, received: ' + (err && err.stack))
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  })
})

test('Constructs a simple bulk INSERT with a RETURNING clause (promise)', function (t) {
  const items = [
    { name: 'Test 1', color: 'Blue' },
    { name: 'Test 2', color: 'Red' }
  ]
  const expectedValues = [ 'Test 1', 'Blue', 'Test 2', 'Red' ]
  const expectedSQL = 'INSERT INTO test (name, color) VALUES ($1, $2), ($3, $4) RETURNING *;'

  lib.insert({
    items: items,
    returningAll: true,
    table: 'test'
  }).then((res) => {
    t.equal(res.sql, expectedSQL, 'Returns the expected SQL: ' + res.sql)
    t.deepEqual(res.values, expectedValues, 'Return the expected values: ' + JSON.stringify(res.values))
    t.end()
  }).catch((err) => t.fail(err, 'No error should have been returned, received: ' + (err && err.stack)))
})
