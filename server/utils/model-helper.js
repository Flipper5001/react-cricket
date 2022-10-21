const { Score } = require("../models");

async function appendHighscoreFieldToUsers(users) {
  // sort Score by score
  // group by user id

  const results = [];

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    const currentUserScores = await Score.find({ user: user._id });
    // max query
    // could be agg or reduce - max

    const highestScore = currentUserScores.reduce((carry, next) => {
      if (carry.score > next.score) {
        return carry;
      } else {
        return next;
      }
    });
    // const userScores= currentUserScores.map(({score, _id}) => ({score, _id}))
    user._doc.highscore = highestScore.score;

    // console.log({user})
    results.push(user);
  }
  console.log(results)
  // const orderedScores = currentUserScores.sort((b, a) => a - b);
  // const topFive = orderedScores.slice(0, 5);
  return results;
}

async function appendHighscoreFieldToUser(user) {
  const currentUserScores = await Score.find({ user: user._id });


  if(currentUserScores.length == 0 ) {
    return user;
  }


  if (currentUserScores.length >= 2) {
    const highestScore = currentUserScores.reduce((carry, next) => {
      if (carry.score > next.score) {
        return carry;
      } else {
        return next;
      }
    });
    user._doc.highscore = highestScore.score;


  } else {
    highestScore = currentUserScores[0];
    user._doc.highscore = highestScore.score;
  }
  return user;
}
async function orderScores(scores) {
  const sortedScores =  scores.sort((b,a) => a.score - b.score);
  const topFiveScores = sortedScores.slice(0,5)
  return topFiveScores;
}

module.exports = {
  orderScores,
  appendHighscoreFieldToUsers,
  appendHighscoreFieldToUser
};

