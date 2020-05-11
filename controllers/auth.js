const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')


module.exports.login = async function (req, res) {
  const candidate = await User.findOne({email: req.body.email})
  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      //generate token
      const token = jsonWebToken.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.JsonWebToken, {expiresIn: 60 * 60})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Wrong password, please try again.'
      })
    }
  } else {
    //user not found
    res.status(404).json({
      message: "User not found"
    })
  }
}

module.exports.register = async function (req, res) {
  // email
  //password
  const candidate = await User.findOne({email: req.body.email})



  if (candidate) {
    // if user exist
    res.status(409).json({
      message: "This e-mail address is using by another user "
    })
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()

      res.status(201).json(user)
    } catch (e) {
      // serve ex
      errorHandler(res, e)
    }
  }
}
