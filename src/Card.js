import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {
  render() {
    // transform: translate(10px, 20px) rotate(20deg)
    let angle = Math.random() * 90 - 45;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 4 - 20;

    let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    // console.log(transform);
    const { name, image } = this.props;

    return (
      <img
        style={{ transform: transform }}
        className="Card"
        alt={name}
        src={image}
      />
    );
  }
}
