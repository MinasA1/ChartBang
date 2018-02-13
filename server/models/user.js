const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  databases:[{
    type: Schema.Types.ObjectId,
    ref: 'Database'
  }
  ]
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.addDb = async function(db) {
  await this.databases.push(db._id)
  this.save()
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
