'use strict'
module.exports.returnError = (cb) => (message) => {
  if (cb) {
    return setImmediate(() => cb(new Error(message)))
  }
  return Promise.reject(new Error(message))
}
