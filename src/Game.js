import React, { Component } from 'react';
import Board from './components/Board'

class Game extends Component {
  constructor(){
    super();
    let virtBoard = [];
		for (let i = 0; i < Math.pow(30, 2); i++) {
			virtBoard.push(Math.round(Math.random()-.4));
		}
    this.state = {
      generation: 1,
      boardSize: 30,
      virtBoard: virtBoard,
      playBtn: <button onClick={()=>this.play()}>Start</button>
    }
  }
  
  
  handleTileClick(i){
    let virtBoard = this.state.virtBoard;
    virtBoard[i] = (virtBoard[i] ? 0 : 1);
    this.setState({virtBoard: virtBoard})
  }
	
  
	
	interval(){}
  play(){
    this.setState({playBtn: <button onClick={()=>this.stop()}>Stop</button>});
    
    this.interval = setInterval(()=>{
			var newBoard = [];
			var size = this.state.boardSize;
      for (let i = 0; i < Math.pow(this.state.boardSize, 2); i++) {
        let aliveCount = 0;
        let nearbyTiles = [i-size-1, i-size, i-size+1,i-1, i+1,i+size-1, i+size, i+size+1];
        for (var n in nearbyTiles) {
          if (this.state.virtBoard[nearbyTiles[n]]) aliveCount++
        }
        if (this.state.virtBoard[i]) newBoard.push((aliveCount === 2 || aliveCount === 3) ? 1 : 0);
        else newBoard.push((aliveCount === 3) ? 1 : 0);
        }
			this.setState({
			  generation: this.state.generation+1,
        virtBoard: newBoard
			});
    }, 150)
  }
  
  stop(){
    this.setState({playBtn: <button onClick={()=>this.play()}>Start</button>});
		clearInterval(this.interval)
  }
  
  reset(){
    this.stop();
		let virtBoard = [];
		for (let i = 0; i < Math.pow(this.state.boardSize, 2); i++) {
			virtBoard.push(Math.round(Math.random()-.4));
		}
    this.setState({
      generation: 1,
      virtBoard: virtBoard
    })
  }
  
  clear(){
    this.stop();
    let virtBoard = [];
    for (let i = 0; i < Math.pow(this.state.boardSize, 2); i++) {
      virtBoard.push(0)
    }
    this.setState({
      generation: 1,
      virtBoard: virtBoard
    })
  }
  
  resize(){
    this.stop();
    let newSize = (this.state.boardSize === 30) ? 20 : 30;
		document.getElementById('board').style.width = newSize*10 + 'px';
		let virtBoard = [];
		for (let i = 0; i < Math.pow(newSize, 2); i++) {
			virtBoard.push(Math.round(Math.random()-.4));
		}
    this.setState({
      generation: 1,
      virtBoard: virtBoard,
      boardSize: newSize
    });
  }
  
  
  
  componentDidMount(){
    this.play()
  }
  
  render(){
    return(
      <div id="game-card">
        <h3 id="title">Game of Life</h3>
        <Board
          generation={this.state.generation}
          boardSize={this.state.boardSize}
          virtBoard={this.state.virtBoard}
          handleTileClick={(i)=>this.handleTileClick(i)}
        />
        <div className="center">Generation: {this.state.generation}</div>
        <div id="btn-row">
          {this.state.playBtn}
          <button onClick={()=>this.reset()}>Reset</button>
          <button onClick={()=>this.clear()}>Clear</button>
          <button onClick={()=>this.resize()}>Resize</button>
        </div>
        <div className="center">by Ethan Rose</div>
      </div>
    )
  }
}

export default Game;
