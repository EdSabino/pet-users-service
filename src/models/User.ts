import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
  permissions: Object;
  email_confirmed: boolean;
  superadmin: boolean;
}

const saltRounds = 10;

const userSchema = new Schema<User>({
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

export default model<User>('User', userSchema);  
