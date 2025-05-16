import { useState } from "react";

export default function Player({ initialName , Symbol  , isActive , onChangeName}) {
  const [playerName , setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false);
  let editiblePlayerName = (
    <span className="player-name">
      {playerName}
    </span>
  );
  let btnName = "Edit";
  function handleChange(params) {
    setPlayerName(params.target.value)
    console.log(params);
  }
  function handleClick() {
    setIsEditing((editing) => !editing);
    if(isEditing)
      {
        onChangeName(Symbol , playerName)
      }
    
  }
  if (!isEditing) {
    {
      editiblePlayerName;
    }
  } else {
    editiblePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
    btnName = "Save";
  }
  
  return (
    <li className={isActive?"active":undefined}>
      <span >
        {editiblePlayerName}
        <span className="player-symbol">{Symbol}</span>
      </span>
      <button onClick={handleClick}>{btnName}</button>
    </li>
  );
}
