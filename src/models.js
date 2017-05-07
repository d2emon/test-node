var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
