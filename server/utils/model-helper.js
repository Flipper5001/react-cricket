const { Score } = require("../models");

async function appendHighscoreFieldToUsers(users){

    // sort Score by score
    // group by user id

    const results = [];
    
    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        const currentUserScores =(await Score.find({user_id: user._id })).map(score => score.score);
        const sum = currentUserScores.reduce((acc, next) => acc + next);
        user._doc.highscore = sum;
        results.push(user);
    }
    return results
}

module.exports = {
    appendHighscoreFieldToUsers,
}