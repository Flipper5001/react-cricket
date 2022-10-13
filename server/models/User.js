const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Score = require('./Score');

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

// userSchema
//   .virtual('Highscore')
//   // Getter
//   .get(async function () {
//   });
  
//   userSchema.post('find', async function(results){

//     for (let index = 0; index < results.length; index++) {
//       const user = results[index];

//       const currentUserScores =(await Score.find({user_id: user._id })).map(score => score.score);
//       console.log({currentUserScores})
//       const sum = currentUserScores.reduce((acc, next) => acc + next);
//       console.log({sum})
//       user.Highscore = sum;
      
//     }
// })

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
