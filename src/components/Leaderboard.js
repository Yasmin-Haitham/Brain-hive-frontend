import React, { useState } from "react";
import "../Leaderboard.css";
import down from "../images/down.png";
import up from "../images/dbl-arrow.png";

const Leaderboard = () => {
  const [showMore, setShowMore] = useState(false);
  const users = [
    { rank: 1, name: "John", score: 78 },
    { rank: 2, name: "Jane", score: 76 },
    { rank: 3, name: "Bob", score: 75 },
    { rank: 4, name: "Alice", score: 74 },
    { rank: 5, name: "Mike", score: 74 },
    { rank: 6, name: "Sara", score: 74 },
    { rank: 7, name: "Tom", score: 74 },
    { rank: 8, name: "Kate", score: 74 },
    { rank: 9, name: "David", score: 74 },
    { rank: 10, name: "Emily", score: 74 },
  ];

  const getText = () => {
    if (users.length <= 5) {
      return users.map((user) => (
        <tr key={user.rank}>
          <td>{user.rank}</td>
          <td>{user.name}</td>
          <td>{user.score}</td>
        </tr>
      ));
    }

    if (showMore) {
      return users.map((user) => (
        <tr key={user.rank}>
          <td>{user.rank}</td>
          <td>{user.name}</td>
          <td>{user.score}</td>
        </tr>
      ));
    }

    return users.slice(0, 5).map((user) => (
      <tr key={user.rank}>
        <td>{user.rank}</td>
        <td>{user.name}</td>
        <td>{user.score}</td>
      </tr>
    ));
  };

  return (
    <div className='leaderboard-container' style={{ float: "left" }}>
      {" "}
      <div className='leaderboard-content'>
        {" "}
        <h2 className="leaderboardtitle">Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{getText()}</tbody>
        </table>
        <div style={{ display: "flex" }}>
          {users.length > 5 && (
            <button
              className='showbtn'
              onClick={() => setShowMore(!showMore)}
              style={{ backgroundColor: "#333333" }}>
              {showMore ? (
                <img className='arrow' src={up} alt='Profile Pic' />
              ) : (
                <img className='arrow' src={down} alt='Profile Pic' />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
