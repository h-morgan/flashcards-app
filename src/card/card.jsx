import React from 'react';
import './card.css';

const Card = (props) => (
    <div className="card-container">
        <div className="card">
            <div className="front">
                <div className="que">{props.que}</div>
                <div className="a">{props.a}</div>
                <div className="b">{props.b}</div>
                <div className="c">{props.c}</div>
                <div className="d">{props.d}</div>
            </div>
            <div className="back">
                <div className="ans">{props.ans}</div>
            </div>
        </div>
    </div>
)

export default Card;