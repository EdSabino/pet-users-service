"use strict";

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name_required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email_required'],
    validate: {
      validator: (v) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(v).toLowerCase());
      },
      message: 'invalid_email'
    }
  },
  password: {
    type: String,
    required: [true, 'password_required']
  },
  permissions: {
    type: Object
  },
  email_confirmed: {
    type: Boolean,
    default: false
  },
  superadmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.statics.publicFields = () => {
  return '_id name email permissions email_confirmed superadmin';
}

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, saltRounds, function (err, hash) {
    this.password = hash;
    next();
  }.bind(this));
});

module.exports = mongoose.model('User', userSchema);  
