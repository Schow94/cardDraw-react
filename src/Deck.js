import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
    // console.log(this.state.deck);
  }

  async getCard() {
    let id = this.state.deck.deck_id;

    try {
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        //creates a new err is success === false
        //err msg shown in catch if sucess === false
        throw new Error('No cards remaining!!!');
      }
      let card = cardRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.suit} ${card.value}`
          }
        ]
      }));
      // console.log(cardRes.data.remaining);
    } catch (err) {
      //catch - runs if err
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map(card => (
      <Card key={card.id} image={card.image} name={card.name} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">♦️ Draw a Card ♦️</h1>
        <h2 className="Deck-title subtitle">
          ♦️ A little demo made with React ♦️
        </h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Draw Card
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}
