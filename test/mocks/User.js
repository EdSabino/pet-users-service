"use strict";

const bcrypt = require('bcrypt');
const saltRounds = 10;

const validUser = () => ({
  name: 'Eduardo Sabino',
  email: 'eduardoaikin@gmail.com',
  password: '$2b$10$DPtaucbLO6nIltVKQBQhFOEhIeCPidTVDc5/1cf68RWh8b0vXIIya',
  permissions: [],
  lean () {
    return this;
  },
  comparePassword (password) {
    return bcrypt.compare(password, this.password);
  },
  toObject() {
    return this;
  }
});

exports.loginUser = () => {
  const user = validUser();
  user.password = 'parameterst0re1324';
  return user;
}

exports.validUser = validUser;
