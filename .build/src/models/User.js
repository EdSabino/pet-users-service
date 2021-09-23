"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = require("bcrypt");
var mongoose_1 = require("mongoose");
var saltRounds = 10;
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name_required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email_required'],
        validate: {
            validator: function (v) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    return bcrypt_1.default.compare(password, this.password);
};
userSchema.statics.publicFields = function () {
    return '_id name email permissions email_confirmed superadmin';
};
userSchema.pre('save', function (next) {
    bcrypt_1.default.hash(this.password, saltRounds, function (err, hash) {
        this.password = hash;
        next();
    }.bind(this));
});
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=User.js.map