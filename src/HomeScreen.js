import React, {Component} from 'react'



class HomeScreen extends Component {
    constructor () {
        super();
        this.clickMe = this.clickMe.bind(this);
    }

    clickMe() {
        //this will call shuffle cards
        this.props.clickEvent(this.props.clickEvent);
    }
    render() {
        return (
            <div className={this.props.gameOver ? "homescreen homescreen--visible" : "homescreen homescreen--hidden"}>
              <div className="homescreen__box">
                <h1 className="homescreen__title">Emoji&nbsp;  Match</h1>
                <div className="homescreen__stats">
                  Games Won: <strong className="homescreen__number" >{this.props.gamesWon}</strong>
                </div>
                <button className="homescreen__shuffle-button " onClick={this.clickMe} >Start!</button>
             </div>
            </div>
        );
    }
}

export  default HomeScreen;