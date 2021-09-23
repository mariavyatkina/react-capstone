const mongoose5 = require('mongoose');

const UserSessionSchema1 = new mongoose5.Schema({
  userId: {
      type: String,
      default: ''
  },
  timestamp: {
      type: Date,
      default: Date.now()
  },
  isDeleted: {
      type: Boolean,
      default: false
  }
});

module.exports = mongoose5.model('UserSession', UserSessionSchema1);

