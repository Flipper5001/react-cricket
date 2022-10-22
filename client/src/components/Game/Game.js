import React, { Component } from "react";
import css from './Game.module.css';
import bat from '../../assets/bat.png';
import ball from '../../assets/ball.png';

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
    }

    calculateScore(score) {
        // if(score === "out") {
        //     this.ball = this.ball + 1;
        //     console.log(score)
        //     console.log(this.ball)
        // } else if(score === "miss") {
        //     this.ball = this.ball + 1;
        //     console.log(score)
        //     console.log(this.ball)
        // } else {

            // this.prototype.ball = this.ball;

        let newBall = this.state.ball + 1;
        let newOver = this.state.over;
        if(newBall == 6){
            newBall = 0;
            newOver++;
        }

        this.setState({
            ball: newBall,
            over: newOver
        })
        
        if(score % 2 !== 0) {
            this.state.batter1OnStrike = !this.state.batter1OnStrike
            console.log(this.state.batter1OnStrike)
        }
    }

    render() {
        return (
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
                            <img src={bat} className={css.icon} style={{maxWidth: "20px"}} alt="bat_icon"></img>
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
                            {/* <img src={bat} className={css.icon} style={{maxWidth: "20px"}}></img>      show when odd number is rolled and players swap        */}
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
                            <p className={css.scoreboardFont}>Dummy Data Bowler Current</p>
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
        )
    }
}