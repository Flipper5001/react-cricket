const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({

  user: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  team: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
  score: 
    {
      type: Number,
      required: false,
    },
});

const Score = model('Score', scoreSchema);

module.exports = Score;
