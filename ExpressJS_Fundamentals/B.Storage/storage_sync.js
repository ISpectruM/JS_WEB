const messages = require('./messages')
const storage = {}
const fs = require('fs')

function put (key, value) {
  if (!isAString(key)) {
    throw new Error(messages.notAString)
  }
  if (isExisting(key)) {
    throw new Error(messages.alreadyIn)
  }

  storage[key] = value
}

function get (key) {
  if (!isAString(key)) {
    throw new Error(messages.notAString)
  }
  if (!isExisting(key)) {
    throw new Error(messages.notExist)
  }
  return storage[key]
}

function getAll () {
  if (isEmpty(storage)) {
    return messages.empty
  }
  return storage
}

function update (key, newValue) {
  if (!isAString(key)) {
    throw new Error(messages.notAString)
  }
  if (!isExisting(key)) {
    throw new Error(messages.notExist)
  }

  storage[key] = newValue
}

function deleteEntry (key) {
  if (!isAString(key)) {
    throw new Error(messages.notAString)
  }
  if (!isExisting(key)) {
    throw new Error(messages.notExist)
  }
  delete storage[key]
}

function clear () {
  for (const key in storage) {
    delete storage[key]
  }
}

function save () {
  fs.writeFileSync('storage.json', JSON.stringify(storage))
}

function load () {
  let data = {}
  try {
    data = JSON.parse(fs.readFileSync('storage.json'))
    for (const key in data) {
      storage[key] = data[key]
    }
  } catch (err) {

  }
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
  deleteEntry,
  clear,
  save,
  load
}
