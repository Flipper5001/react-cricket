const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  team_id: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },

}, 
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema
  .virtual('Highscore')
  // Getter
  .get(function () {
    return this.username;
  })
  // TODO Setter to query the database to pull highscore from username / user id
  .set(function (user) {
    // TODO code here
    this.set({  }); // TODO highscore here
  });

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
