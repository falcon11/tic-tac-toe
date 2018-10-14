import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    handleClick = (i) => {
        const xIsNext = this.state.xIsNext;
        const squares = this.state.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({ squares, xIsNext: !xIsNext })
    }

    renderSquare = (i) => {
        return (
            <Square
                key={`r${i}`}
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
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

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
                return squares[a]
            }
        }
        return null;
    }

    render() {
        let status;
        let winner = this.calculateWinner(this.state.squares);
        if (winner) {
            status = 'Winner ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className={'status'}>
                    {status}
                </div>
                {this.renderSquares()}
            </div>
        );
    }
}