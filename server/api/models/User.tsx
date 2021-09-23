const mongoose1 = require('mongoose')
const bcrypt = require('bcrypt');
const UserSchema = new mongoose1.Schema({
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  isDeleted: {
      type: Boolean,
      default: false
  }
});
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose1.model('User', UserSchema);


