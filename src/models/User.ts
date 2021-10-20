import { compare, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';
import { User } from './User.interface';
import AnimalSchema from './Animal';

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
  },
  animals: {
    type: Array,
    default: [],
    items: {
      type: AnimalSchema
    }
  }
});

userSchema.methods.comparePassword = function (password) {
  return compare(password, this.password);
}

userSchema.statics.publicFields = () => {
  return '_id name email permissions email_confirmed superadmin';
}

userSchema.pre('save', function(next) {
  hash(this.password, saltRounds, function (err, hash) {
    this.password = hash;
    next();
  }.bind(this));
});

export default model<User>('User', userSchema);  
