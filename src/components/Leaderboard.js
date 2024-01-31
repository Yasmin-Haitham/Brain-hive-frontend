import React, { useState, useEffect } from "react";
import "../Leaderboard.css";
import down from "../images/down.png";
import up from "../images/dbl-arrow.png";
import * as api from "./API.js";

const Leaderboard = () => {
  const [showMore, setShowMore] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch friends and update the state
    api.getFriends(setFriends);
  }, []);

  // Sort friends based on their scores in descending order
  const sortedFriends = friends.sort((a, b) => b.totalScore - a.totalScore);

  const getText = () => {
    if (sortedFriends.length <= 5) {
      return sortedFriends.map((friend, index) => (
        <tr key={friend._id}>
          <td>{index + 1}</td>
          <td>{friend.Name}</td>
          <td>{friend.totalScore}</td>
        </tr>
      ));
    }

    if (showMore) {
      return sortedFriends.map((friend, index) => (
        <tr key={friend._id}>
          <td>{index + 1}</td>
          <td>{friend.Name}</td>
          <td>{friend.totalScore}</td>
        </tr>
      ));
    }

    return sortedFriends.slice(0, 5).map((friend, index) => (
      <tr key={friend._id}>
        <td>{index + 1}</td>
        <td>{friend.Name}</td>
        <td>{friend.totalScore}</td>
      </tr>
    ));
  };

  return (
    <div className='leaderboard-container' style={{ float: "left" }}>
      <div className='leaderboard-content'>
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
          {sortedFriends.length > 5 && (
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
