'use strict'
const util = require('./util')

module.exports = function (params, cb) {
  params = params || {}
  const returnError = util.returnError(cb)

  if (!params.item) {
    return returnError('item parameter required')
  }
  if (!params.table) {
    return returnError('table parameter required')
  }
  if (!params.where && !params.keyColumn) {
    return returnError('Either keyColumn parameter or where parameter is required')
  }
  if (params.keyColumn && !params.item[ params.keyColumn ]) {
    return returnError(`The keyColumn parameter value [${params.keyColumn}] was not found in the item`)
  }

  const keyColumn = params.keyColumn
  const item = params.item
  const table = params.table
  let where = params.where

  const keys = Object.keys(item)

  let sql = 'UPDATE ' + table + ' SET '
  const values = []
  let valueVarCounter = -1

  // SET col = value clause
  let key = ''
  for (let i = 0; i < keys.length; i++) {
    key = keys[ i ]
    if (keyColumn && key === keyColumn) {
      continue // PK doesn't get assigned to
    }

    ++valueVarCounter
    if (valueVarCounter > 0) {
      sql += ', '
    }

    sql += key + ' = $' + (valueVarCounter + 1)
    values[ valueVarCounter ] = item[ key ]
  }

  // WHERE clause
  sql += ' WHERE '

  if (!where) {
    ++valueVarCounter
    where = keyColumn + ' = $' + (valueVarCounter + 1)
    values[ valueVarCounter ] = item[ keyColumn ]
  }

  sql += where

  return cb(null, {
    sql: sql + ';',
    values: values
  })
}
