import React from "react";

export default function Log({ reseivePlayerTurns }) {
  return (
    <ol id="log">
      {reseivePlayerTurns.length === 0 ? (
        <li>No moves yet</li> 
      ) : (
        reseivePlayerTurns.map((turn, index) => (
          <li key={index} >
            player {turn.player} selected square {turn.square.row}.
            {turn.square.col}
          </li>
        ))
      )}
    </ol>
  );
}
