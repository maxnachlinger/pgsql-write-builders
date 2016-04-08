'use strict'
const util = require('./util')

function insert (params, cb) {
  params = params || {}
  const returnError = util.returnError(cb)

  if (!params.items || params.items.length === 0) {
    return returnError('items parameter required.')
  }

  if (!params.table) {
    return returnError('table parameter required.')
  }

  const items = params.items
  const table = params.table
  const returningAll = params.returningAll

  // use the 1st item to get our fields
  const fields = Object.keys(items[ 0 ])

  if (!fields || fields.length === 0) {
    return returnError('An item was passed without fields.')
  }

  let sql = 'INSERT INTO ' + table + ' (' + fields.join(', ') + ') VALUES '

  // VALUES ($1, $2), ($3, $4) ... clause
  const amtItems = items.length
  const amtFields = fields.length

  const values = new Array(amtItems * amtFields)

  for (let i = 0, valueVarCounter = 0; i < amtItems; i++) {
    if (i > 0) sql += ', ' // comma before all items except first one
    sql += '('

    for (let j = 0; j < amtFields; j++, valueVarCounter++) {
      values[ valueVarCounter ] = items[ i ][ fields[ j ] ]

      if (j > 0) sql += ', ' // comma before all $vars except first one
      sql += '$' + (valueVarCounter + 1)
    }

    sql += ')'
  }

  // RETURNING clause to get newly INSERTed rows
  if (returningAll) {
    sql += ' RETURNING *'
  }

  const ret = {
    sql: sql + ';',
    values: values
  }

  if (cb) {
    return cb(null, ret)
  }
  return Promise.resolve(ret)
}

module.exports = insert
