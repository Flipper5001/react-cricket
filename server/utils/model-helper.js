const { Score } = require("../models");

async function appendHighscoreFieldToUsers(users){

    // sort Score by score
    // group by user id

    const results = [];
    
    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        const currentUserScores =(await Score.find({user: user._id }));

        const highest = currentUserScores.reduce((carry, next) => {
            if(carry.score > next.score) {
                return carry;
            } else {
                return next;
            }
        });
        user._doc.highscore = highest;
        results.push(user);
    }
    return results
}

module.exports = {
    appendHighscoreFieldToUsers,
}