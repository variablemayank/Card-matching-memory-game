import React ,{Component} from 'react';
import './App.css';
import _ from 'lodash'
import ReactDom from 'react-dom'
import HomeScreen from './HomeScreen.js';
import Card from './Card.js'

const uniqueCards  = ['pig','fish','cactus','corn','shroom'];
const numCardsToMatch = 2;

class MatchingGame extends Component {
    constructor() {
        super();
      this.shuffleCards = this.shuffleCards.bind(this);
      this.pickCard = this.pickCard.bind(this);
      this.addWin = this.addWin.bind(this);
      this.ignoreCardClicks =false;
      this.state = {
        cards : [],
        gamesWon: 0,
        selectedCards: [],
        gameOver: 1
      };
  }
  // Here we are performing multiplication
  // for making two instance of cards 
   multiplyCards(cards,multiplier) {
    let loopsTimes = 1;
    let afterMulti = cards;
      afterMulti = _.concat(afterMulti,cards);
    return afterMulti;
  }

  shuffleCards () {
    // multiplying cards so that we can match cards
    let multipliedCards = this.multiplyCards(uniqueCards,numCardsToMatch);
    // shuffling cards so that no cards with same color occurs adjacently
    let shuffled = _.shuffle(multipliedCards);

    // making each cards as an object with its own states values such that
    // containing type and position that means whether that card is selected
    // or not
    // mapping every value and making it as objects 
    let cards = shuffled.map(function(val){
      return {
        type:val,
        position:'unselected'
      }
    });

    this.setState({
      cards:cards,
      gameOver:0
    });
  }

  addWin(){
    console.log("games won "+this.state.gamesWon);
    let newGamesWon = this.state.gamesWon + 1;
    this.setState({ 
      gamesWon: newGamesWon, 
      gameOver: 1 
    });
  }

  selectedHasSameAttribute(allCards,selectedCards,attribute){
    //console.log('hasSameAttribute '+attribute);
    let eq = allCards[selectedCards[0]][attribute];
    console.log("eq is " + eq);
    for (var v of selectedCards) {
      if(allCards[v][attribute] !== eq) { return false; }
    }
    return true;
  }

  changeAllPositionsOfSelected(allCards,selectedCards,newPosition) {
    for (var v of selectedCards) {
      allCards[v].position=newPosition;
    }
    return allCards;
  }

  


  checkForMatch(curCards, curSelectedCards){
      // console.log('checkForMatch');
      // console.log("curCards" +curCards);
      // console.log("curSelectedCard"+curSelectedCards);
      // 2 cards selected for the match 
    // if the cards are matched 
    // we perform a check whether the game is over 
    // means all the 10 cards are matched
     if( this.selectedHasSameAttribute(curCards,curSelectedCards,'type') ){
        curCards = this.changeAllPositionsOfSelected(curCards,curSelectedCards,"removed");
        //check if won game!

       let winTest =  _.reduce(curCards, function(result, value, key) {
          // console.log('value.position='+value.position);
          // console.log('result='+result);

    
      if(result === value.position){
            // console.log("when result is equal to value.position it returned the value result "+result);
            return result;
            
          }else{
            return false;
          }
         //return true;

        }, curCards[0].position);

      //  console.log('WINTEST='+winTest);
       if(winTest !== false){
         this.addWin();
       }

      }else{
        curCards = this.changeAllPositionsOfSelected(curCards,curSelectedCards,"unselected");
      }

      //only curCards is transformed
      // console.log("curCards is ")
      // console.log(curCards);
      return curCards;
  }


  pickCard(index) {
    if(this.ignoreCardClicks!==true) {
      let curSelectedCards = _.concat(this.state.selectedCards,index);

      let curCards = this.state.cards;

      curCards[curSelectedCards[curSelectedCards.length-1]].position = "selected";

      if(curSelectedCards.length === numCardsToMatch) {
        // if the cards are matched
        this.setState({
          cards:curCards
        })
        let _this = this;
        this.ignoreCardClicks = true;

        let pauseGame = setTimeout(function(){
          curCards = _this.checkForMatch(curCards,curSelectedCards);
          curSelectedCards = [];

          _this.ignoreCardClicks = false;

          _this.setState({
            selectedCards:curSelectedCards,
            cards:curCards
          })
        },750);
      }
      else{
        curCards[curSelectedCards[0]].position="selected";
        this.setState({
          selectedCards:curSelectedCards,
          cards:curCards
        })
      }

    }
  }


    
  render() {
    let clickEvent = this.pickCard;
   let cardIndex = 0;
    return(
    <div className="memory-app">

      <HomeScreen gameOver={this.state.gameOver} gamesWon={this.state.gamesWon} clickEvent={this.shuffleCards} />
      <div className="cards">
          {this.state.cards.map(function(thisCard) {
           return <Card index={cardIndex++} clickEvent={clickEvent} position={thisCard.position} type={thisCard.type}/>
           })
          }
      </div>

     </div>
    )
 }
}


ReactDom.render(<MatchingGame/>,document.getElementById('root'));

export default MatchingGame;

