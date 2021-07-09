"use strict";

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 10;
const VALID_PERMISSIONS = [];

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
    type: Array,
    items: String,
    validate: {
      validator: (v) => v.every(elem => VALID_PERMISSIONS.includes(elem)),
      message: 'invalid_permission'
    }
  },
  email_confirmed: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema)
