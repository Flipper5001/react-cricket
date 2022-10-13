const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  teamName: {
    type: String,
    required: 'You need to have a team name!',
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  players: [
    {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20,
    }
  ],
});

const Team = model('Team', teamSchema);

module.exports = Team;
