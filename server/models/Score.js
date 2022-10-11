const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({

  user_id: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  team_id: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  score: 
    {
      type: String,
      required: false,
    },
});

const Score = model('Score', scoreSchema);

module.exports = Score;
