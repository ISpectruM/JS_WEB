// const storage = require('./storage_sync.js')
const storageAsync = require('./storage_async.js')

storageAsync.clear((err) => {
  if (err) {
    throw new Error(err)
  }
  storageAsync.put('cat', 'dog', (err) => {
    if (err) {
      throw new Error(err)
    }
    storageAsync.get('cat', (err, data) => {
      if (err) {
        throw new Error(err)
      }
      console.log(data)
    })
  })
})
