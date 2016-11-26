import React, { Component } from 'react';
import Tile from './Tile';

class Board extends Component {
	render(){
		let grid = []
		for (let i = 0; i < this.props.boardSize; i++) {
			let row = [];
			for (let j = 0; j < this.props.boardSize; j++) {
				let index = j + i * this.props.boardSize;
				row.push(<Tile
					handleTileClick={(i) => this.props.handleTileClick(i)}
					alive={this.props.virtBoard[index]}
					index={index}
					key={index}
				/>)
			}
			grid.push(<div key={i}>{row}</div>);
		}
		return (<div id="board">{grid}</div>)
	}
}

export default Board;