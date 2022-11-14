const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  address: { type: String, require: true },
  phone: { type: String, require: true },
  age: { type: Number, require: true },
  role: {
    type: String,
    enum: {
      values: ['admin', 'client'],
      message: '{VALUE} no es un role valido',
      default: 'client',
      required: true
    }
  }
}, {
  timestamps: true
})

const usersModel = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = usersModel