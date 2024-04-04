import React, { useState } from 'react';

const MultiSelectList = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const players = [
    {
      id: 3,
      name: 'player 3',
      stats: {
        power: '100',
        speed: { distance: '20', time: '5' },
        passes: '50'
      }
    },
    {
      id: 4,
      name: 'player 4',
      stats: {
        power: '400',
        speed: { distance: '40', time: '2' },
        passes: '25'
      }
    }
  ];

  const [editedValue, setEditedValue] = useState({});

  const handleSelectPlayer = (playerId) => {
    const player = players.find(player => player.id === playerId);

    if (!selectedPlayers.some(selectedPlayer => selectedPlayer.id === playerId)) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      const updatedPlayers = selectedPlayers.filter(player => player.id !== playerId);
      setSelectedPlayers(updatedPlayers);
    }
  };

  const handleEdit = (playerId, field, value) => {
    setEditedValue({ playerId, field, value });

    const updatedPlayers = selectedPlayers.map(player => {
      if (player.id === playerId) {
        return {
          ...player,
          stats: {
            ...player.stats,
            [field]: value
          }
        };
      }
      return player;
    });

    setSelectedPlayers(updatedPlayers);
  };

  const handleSubmit = () => {
    console.log({ players: selectedPlayers });
  };

  return (
    <div>
      <h2>Select players:</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Power</th>
            <th>Distance</th>
            <th>Time</th>
            <th>Passes</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPlayers.some(selectedPlayer => selectedPlayer.id === player.id)}
                    onChange={() => handleSelectPlayer(player.id)}
                  />
                  {player.name}
                </label>
              </td>
              <td><input type="text" value={player.stats.power} onChange={(e) => handleEdit(player.id, 'power', e.target.value)} /></td>
              <td><input type="text" value={player.stats.speed.distance} onChange={(e) => handleEdit(player.id, 'distance', e.target.value)} /></td>
              <td><input type="text" value={player.stats.speed.time} onChange={(e) => handleEdit(player.id, 'time', e.target.value)} /></td>
              <td><input type="text" value={player.stats.passes} onChange={(e) => handleEdit(player.id, 'passes', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MultiSelectList;