import React from 'react';


function Tile(props) {
	return <div
		onClick={(i)=>props.handleTileClick(props.index)}
		className={(props.alive ? 'alive' : '') + ' tile'}></div>
}


export default Tile;
