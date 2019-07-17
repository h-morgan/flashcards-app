import React, { Component } from 'react';
import './App.css';
import Card from './card/card';
import DrawButton from './drawbutton/drawbutton';
import firebase from 'firebase/app';
import 'firebase/database';

import { DB_CONFIG } from './Config/Firebase/db_config';

class App extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards');

    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {}
    }
  }

  componentWillMount() {
    const currentCards = this.state.cards;
    
    this.database.on('child_added', snap => {
      currentCards.push({
        id: snap.key, // uses key firebase provides us with
        que: snap.val().que,
        a: snap.val().a,
        b: snap.val().b,
        c: snap.val().c,
        d: snap.val().d,
        ans: snap.val().ans
      })

      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards)
      })
    })
  }

  getRandomCard(currentCards) {
    let card = currentCards[Math.floor(Math.random() * currentCards.length)]
    return card;
  }

  updateCard(){
    const currentCards = this.state.cards;
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards)
    })
  }


  render () {
    return (
      <div className="App">
      <div className="title">
        <h1 className="cardsTitle">CISSP Exam Flashcards</h1>
      </div>
        <div className="cardRow">
          <Card que={this.state.currentCard.que}
                a={this.state.currentCard.a}
                b={this.state.currentCard.b}
                c={this.state.currentCard.c}
                d={this.state.currentCard.d}
                ans={this.state.currentCard.ans}/>
        </div>

        <div className="buttonRow">
          <DrawButton drawCard={this.updateCard}/>
        </div>
      </div>
    );
  }
}

export default App;
