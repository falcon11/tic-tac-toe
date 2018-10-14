import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {

    renderSquare = (i) => {
        return (
            <Square
                key={`r${i}`}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }

    renderSquares = () => {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            let squares = [];
            for (let j = 0; j < 3; j++) {
                squares.push(this.renderSquare(i * 3 + j));
            }
            rows.push((
                <div key={`r-${i}`} className={'board-row'}>{squares}</div>
            ))
        }
        return rows;
    }

    render() {
        return (
            <div>
                {this.renderSquares()}
            </div>
        );
    }
}