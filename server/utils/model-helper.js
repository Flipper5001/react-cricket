const { Score } = require("../models");

async function appendHighscoreFieldToUsers(users){

    // sort Score by score
    // group by user id

    const results = [];
    


    for (let index = 0; index < users.length; index++) {
        const user = users[index];
        const currentUserScores =(await Score.find({user: user._id }));
        console.log(currentUserScores)
        // max query 
        // could be agg or reduce - max

        const highestScore = currentUserScores.reduce((carry, next ) => {

            if(carry.score > next.score){
                return carry;
            }else{
                return next;
            }

        })
        console.log('hsss', highestScore);
        // const userScores= currentUserScores.map(({score, _id}) => ({score, _id}))
        user._doc.highscore = highestScore.score;
        results.push(user)
        console.log(results)
    }
    
    // const orderedScores = currentUserScores.sort((b, a) => a - b);
    // const topFive = orderedScores.slice(0, 5);
    return results
}

module.exports = {
    appendHighscoreFieldToUsers,
}