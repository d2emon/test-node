var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var DocumentSchema = new Schema({
  title: {type: String, index: true},
  data: String,
  tags: [String],
  /*
   * id: {
   *   type: mongoose.String,
   *   get: function() {
   *     return this._id.toHexString();
   *   }
   * }
   */
});
DocumentSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
mongoose.model('Document', DocumentSchema);
exports.Document = function(db) {
  return db.model('Document');
};

var UserSchema = new Schema({
  email: {type: String, unique: true},
  hashed_password: String,
  salt: String,
});
UserSchema.methods.authenticate = function(plainText) {
  return this.encryptPassword(plainText) === this.hashed_password;
};
UserSchema.methods.makeSalt = function() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
};
UserSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
UserSchema.methods.isValid = function() {
  return this.email && this.email.length > 0 && this.email.length < 255
    && this.password && this.password.length > 0 && this.password.length < 255;
};
UserSchema.methods.save = function(okFn, failFn) {
  if (this.isValid()) {
    this.__super__(okFn);
  } else {
    failFn();
  }
};
UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
UserSchema.virtual('password')
  .get(function() {
    return this._password;
  })
  .set(function(v) {
    this._password = v;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(v);
  });

mongoose.model('User', UserSchema);
exports.User = function(db) {
  return db.model('User');
};
