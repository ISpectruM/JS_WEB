const messages = require('./messages')
const storage = {}
const fs = require('fs')

function put (key, value, callback) {
  let err
  if (!isAString(key)) {
    err = messages.notAString
  }
  if (isExisting(key)) {
    err = messages.alreadyIn
  }

  storage[key] = value
  callback(err)
}

function get (key, callback) {
  let err
  if (!isAString(key)) {
    err = messages.notAString
  }
  if (!isExisting(key)) {
    err = messages.notExist
  }
  callback(err, storage[key])
}

function getAll (callback) {
  let err
  if (isEmpty(storage)) {
    err = messages.empty
  }
  callback(err, storage)
}

function update (key, newValue, callback) {
  let err
  if (!isAString(key)) {
    err = messages.notAString
  }
  if (!isExisting(key)) {
    err = messages.notExist
  }

  storage[key] = newValue
  callback(err)
}

function deleteEntry (key, callback) {
  let err
  if (!isAString(key)) {
    err = messages.notAString
  }
  if (!isExisting(key)) {
    err = messages.notExist
  }
  delete storage[key]
  callback(err)
}

function clear (callback) {
  for (const key in storage) {
    delete storage[key]
  }
  callback()
}

function save (callback) {
  callback(fs.writeFile('storage.json', JSON.stringify(storage)))
}

function load (callback) {
  fs.readFile('storage.json', (err, data) => {
    data = JSON.parse(data)
    for (const key in data) {
      storage[key] = data[key]
    }
    callback(err)
  })
}

function isEmpty (storage) {
  for (const key in storage) {
    if (storage.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

function isAString (string) {
  if (typeof string !== 'string') {
    return false
  }
  return true
}

function isExisting (key) {
  return storage.hasOwnProperty(key)
}

module.exports = {
  put,
  get,
  getAll,
  update,
  delete: deleteEntry,
  clear,
  save,
  load
}
