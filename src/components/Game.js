import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick = (i) => {
        let { history, stepNumber } = this.state;
        history = history.slice(0, stepNumber + 1);
        const current = history[stepNumber];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
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

    jumpTo = (index) => {
        this.setState({
            stepNumber: index,
            xIsNext: (index % 2) === 0,
        })
    }

    renderMovesList = () => {
        const { history } = this.state;
        const moves = history.map((item, index) => {
            const desc = index ?
                ('Go to move #' + index) :
                ('Go to start');
            return (
                <li key={`r${index}`}>
                    <button onClick={() => this.jumpTo(index)}>{desc}</button>
                </li>
            )
        })
        return moves;
    }

    render() {
        const { history, stepNumber } = this.state;
        const current = history[stepNumber];
        const winner = this.calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner ' + winner;
        } else {
            status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={this.handleClick}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{this.renderMovesList()}</ol>
                </div>
            </div>
        );
    }
}