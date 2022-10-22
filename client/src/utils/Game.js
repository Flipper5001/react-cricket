export default class Game {

    constructor(ongoingGame) {
        this.batter1 = ongoingGame.batter1 || 0;
        this.batter2 = ongoingGame.batter2 || 0;
        this.bowlerWickets = ongoingGame.bowlerWickets || 0;
        this.bowlerRuns = ongoingGame.bowlerRuns || 0;
        this.totalWickets = ongoingGame.totalWickets || 0;
        this.totalScore = ongoingGame.totalScore || 0;
        this.ball = ongoingGame.ball || 0;
        this.over = Math.round(this.ball/6);
        this.batter1OnStrike = ongoingGame.batter1OnStrike || true;
        this.block = this.block.bind(this);
    }

    block() {
        const runs = [0,0,1,0,1,1,0]
        this.score(runs)
        
    }
    
    drive() {
        const runs = [0,1,2,3,1,2,9]
        this.score(runs)

    }
    
    random() {
        const runs = [0,1,2,3,4,6,9]
        this.score(runs)
        
    }
    
    scoop() {
        const runs = [0,1,2,4,6,9,9]
        this.score(runs)
        
    }
    
    swing() {
        const runs = [0,4,4,6,6,9,9]
        this.score(runs)
    }

    score(runs){
        const score = runs[Math.floor((Math.random()*runs.length))];
        this.checkIfOut(score)
    }

    checkIfOut(score){
        if(score === 9){
            this.showAnimation("out")
        } else if(score === 0) {
            this.showAnimation("miss")
        } else {
            this.showAnimation(score)
        }
    }

    showAnimation(action) {
        
        this.calculateScore(action)
    }

    calculateScore(score) {
        if(score === "out") {
            this.ball = this.ball + 1;
            console.log(score)
            console.log(this.ball)
        } else if(score === "miss") {
            this.ball = this.ball + 1;
            console.log(score)
            console.log(this.ball)
        } else {

            Game.prototype.ball = this.ball;

            console.log(this.ball)
            this.ball = this.ball + 1;
            console.log(score)
            if(score % 2 === 0) {
                console.log(this.batter1OnStrike)
            } 
            if(score % 2 !== 0) {
                this.batter1OnStrike = !this.batter1OnStrike
                console.log(this.batter1OnStrike)
            }
        }

    }
}