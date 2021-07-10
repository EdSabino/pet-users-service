"use strict";

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.validUser = () => ({
  name: 'Eduardo Sabino',
  email: 'eduardoaikin@gmail.com',
  password: 'parameterst0re1324',
  permissions: [],
  lean () {
    return this;
  },
  async hashPassword () {
    this.password = await bcrypt.hash(this.password, saltRounds);
  },
  comparePassword (password) {
    return bcrypt.compare(password, this.password);
  },
  toObject() {
    return this;
  }
});
