'use strict'
const insert = require('./lib/insert')
const update = require('./lib/update')
const util = require('./lib/util')

module.exports = {
  insert: insert,
  update: update,
  promise: {
    insert: util.promisify(insert),
    update: util.promisify(update)
  }
}
