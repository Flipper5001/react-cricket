import React, { Component } from "react";
import css from './Game.module.css';
import bat from '../../assets/bat.png';
import ball from '../../assets/ball.png';
import EndGame from '../EndGame';

// TODO: CSS animations for hit, miss and out
// TODO: when animation is playing hide button temporary???

const hr = {
    marginTop: "10px",
    marginBottom: "10px"
}

const shot = {
    block: [0,0,1,0,1,1,0],
    drive: [0,1,2,3,1,2,9],
    random: [0,1,2,3,4,6,9],
    scoop: [0,1,2,4,6,9,9],
    swing: [0,4,4,6,6,9,9]
}

export default class Game extends Component {

    constructor() {
        super(); 

        this.state = {
            batter1: 0,
            batter2: 0,
            bowlerWickets: 0,
            bowlerRuns: 0,
            totalWickets: 0,
            totalScore: 0,
            ball: 0,
            over: 0,
            batter1OnStrike: true,
            gameOver: false,
            hitClass: "hide",
        }
    }

    shot(shot) {
        const score = shot[Math.floor((Math.random()*shot.length))];

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

        const { classNames } = this.state;

        if(action === "out") {

            this.setState({classNames: classNames ? "" : "animation"})

        }


    }
    
    calculateScore(score) {
        let newBowlerRuns = this.state.bowlerRuns + score
        let newBowlerWickets = this.state.bowlerWickets + 1;
        let newBatter1 = this.state.batter1 + score
        let newBatter2 = this.state.batter2 + score
        let newBall = this.state.ball + 1;
        let newOver = this.state.over;
        
        if(score === "out")
        {
            let newTotalWickets = this.state.totalWickets + 1;

            if(this.state.totalWickets === 9){
                this.setState({
                    gameOver: true
                })
            }

            if(this.state.batter1OnStrike){
                this.setState({
                    batter1: 0
                })
            } else {
                this.setState({
                    batter2: 0
                })
            }
            
            this.setState({
                bowlerWickets: newBowlerWickets,
                totalWickets: newTotalWickets,
            })
        }

        if(!isNaN(score))
        {
            let newTotalScore = this.state.totalScore + score
            if(this.state.batter1OnStrike){
                this.setState({
                    batter1: newBatter1
                })
            } else {
                this.setState({
                    batter2: newBatter2
                })
            }

            if(score % 2 !== 0 ) {
                this.setState({
                    batter1OnStrike: !this.state.batter1OnStrike
                })
            }

            this.setState({
                totalScore: newTotalScore,
                bowlerRuns: newBowlerRuns
            })
        }
        
        if(newBall === 6){
            newBall = 0;
            newOver++;
            this.setState({
                batter1OnStrike: !this.state.batter1OnStrike,
                bowlerRuns: 0,
                bowlerWickets: 0
            })
        }
        
        if(this.state.over === 19 && this.state.ball === 5){
            this.setState({
                gameOver: true
            })
        }

        this.setState({
            ball: newBall,
            over: newOver
        })

        if(this.state.batter1OnStrike){
            this.onStrike(true)
        } else {
            this.offStrike(true)
        }
    }

    onStrike(strike) {
        if(!strike){
            return;
        } else {
        this.offStrike(false)
        return (
            <img src={bat} className={css.icon} style={{maxWidth: "20px"}} alt="bat_icon"></img>
            )
        }
    }

    offStrike(strike) {
        if(!strike){
            return;
        } else {
        this.onStrike(false)
        return (
            <img src={bat} className={css.icon} style={{maxWidth: "20px"}} alt="bat_icon"></img>
            )
        }
    }

    render() {
        return (
            <>
            {this.state.gameOver ?  (
                <EndGame score={this.state.totalScore.toString()} />
            ) : (
            <>
            <div className='d-flex justify-center mb-3'>
                <div className={css.scoreboard}>
                    <div className={css.interface}>
                        <div className={css.homeHeader}>
                            <div className='flex-row align-center'>
                                <h2 className={css.teamName} style={{paddingLeft: "10px"}}>Dummy Team Name</h2>
                            </div>
                        </div>
                        <div className={css.homeHeader} style={{marginTop: "5px"}}>
                            <div className='flex-row align-center'>
                            <div className='col-9'>
                                <div className='flex-row'>
                                    <h2 className={css.teamName} style={{paddingRight: "10px"}}>Over</h2>
                                    <h2 className={css.teamName} >{this.state.over}</h2>
                                    <h2 className={css.teamName} >.</h2>
                                    <h2 className={css.teamName} >{this.state.ball}</h2>
                                </div>
                            </div>
                        <div className='col-3' style={{paddingRight: "5px"}}>
                            <div className={css.scoreCombo}>
                                <h2 className={css.teamName} style={{paddingRight: "5px"}}>{this.state.totalWickets}</h2>
                                <h2 className={css.teamName} >|</h2>
                                <h2 className={css.teamName} style={{paddingLeft: "5px"}}>{this.state.totalScore}</h2>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='flex-row align-center mt-2'>
                        <div className='col-9'>
                        <div className='flex-row'>
                            <p className={css.scoreboardFont}>Dummy Data Batter 1</p>
                            {this.state.batter1OnStrike && this.onStrike(true)}
                        </div>
                        </div>
                        <div className='col-3'>
                        <p className={css.scoreboardFont} style={{textAlign: "end"}}>{this.state.batter1}</p>
                        </div>
                    </div>
                    <hr style={hr}/>
                    <div className='flex-row align-center'>
                        <div className='col-9'>
                        <div className='flex-row'>
                            <p className={css.scoreboardFont}>Dummy Data Batter 2</p>   
                            {!this.state.batter1OnStrike && this.offStrike(true)}   
                        </div>
                        </div>
                        <div className='col-3'>
                        <p className={css.scoreboardFont} style={{textAlign: "end"}}>{this.state.batter2}</p>
                        </div>
                    </div>
                    <hr style={hr}/>
                    <div className='flex-row align-center pb-2'>
                        <div className='col-9'>
                        <div className='flex-row'>
                            <p className={css.scoreboardFont}>Current Bowler</p>
                            <img src={ball} className={css.icon} style={{maxWidth: "15px"}} alt="ball_icon"></img>
                        </div>
                        </div>
                        <div className='col-3'>
                        <div className={css.scoreCombo}>
                            <p style={{fontWeight: 500, marginBottom: 0, paddingRight: "5px"}}>{this.state.bowlerWickets}</p>
                            <p style={{fontWeight: 500, marginBottom: 0}}>|</p>
                            <p style={{fontWeight: 500, marginBottom: 0, paddingLeft: "5px"}}>{this.state.bowlerRuns}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className={css.animations}>
                    <div className={this.state.hitClass}>
                        {console.log(this.state.hitClass)}

                        <div className={css.batContainer}>
                            <img src="./assets/bat.png" className={css.batImg}/>
                        </div>
                        <div className={css.ballHit}>

                        </div>
                    </div>
                </div>
                <div className={css.playground}>
                <div className={css.choices}>
                    <button type='button' className={css.choiceButton} onClick={() => {this.shot(shot.block)}}>Block</button>
                    <button type='button' className={css.choiceButton} onClick={() => {this.shot(shot.drive)}}>Drive</button>
                    <button type='button' className={css.choiceButton} onClick={() => {this.shot(shot.random)}}>Random</button>
                    <button type='button' className={css.choiceButton} onClick={() => {this.shot(shot.scoop)}}>Scoop</button>
                    <button type='button' className={css.choiceButton} onClick={() => {this.shot(shot.swing)}}>Big Swing</button>
                </div>
            </div>
        </>
        )}
        </>
        )
    }
}