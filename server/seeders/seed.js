const db = require('../config/connection');
const { User, Team, Score } = require('../models');
const userSeeds = require('./userSeeds.json');
const teamSeeds = require('./teamSeeds.json');
const scoreSeeds = require('./scoreSeeds.json')

db.once('open', async () => {
  try {
    await Team.deleteMany({});
    await User.deleteMany({});
    await Score.deleteMany({});

    await User.create(userSeeds);
    
    for (let i = 0; i < teamSeeds.length; i++) {
      await Team.create(teamSeeds[i]);
    }
    await Score.create(scoreSeeds);

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  
  console.log('all done!');
  process.exit(0);
});
