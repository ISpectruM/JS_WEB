const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports = {
  registerGet: (req, res) => {
    res.render('user/register')
  },
  registerPost: (req, res) => {
    const data = req.body
    let password = data.password
    let confirmedPassword = data.confirmedPassword

    let formData = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender
    }
    if (password !== confirmedPassword) {
      formData.error = 'Passwords do not match!'
      res.render('user/register', formData)
      return
    }

    let salt = encryption.generateSalt()
    data.salt = salt

    if (data.password) {
      let hashedPassword = encryption.generateHashedPassword(salt, data.password)
      data.password = hashedPassword
    }

    User.create(data)
      .then(user => {
        req.logIn(user, (err, user) => {
          if (err) {
            res.render('user/register', { error: 'Authentivation is not working!' })
            return
          }

          res.redirect('/')
        })
      })
      .catch(err => {
        data.error = err
        res.render('user/register', data)
      })
  },
  loginGet: (req, res) => {
    res.render('user/login')
  },
  loginPost: (req, res) => {
    let userData = req.body

    User.findOne({username: userData.username})
      .then(user => {
        if (!user || !user.authenticate(userData.password)) {
          res.render('user/login', {error: 'Wrong password!'})
        } else {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('user/login', {error: 'Authentication not working!'})
              return
            }
            res.redirect('/')
          })
        }
      })
      .catch(err => {
        res.render('user/login', {error: err})
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
