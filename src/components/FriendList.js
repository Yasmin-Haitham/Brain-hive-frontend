import React, { useState, useEffect } from "react";
import "../FriendListItem.css"; // Make sure this path matches your CSS file's location
import logo from "../images/logo.png";
import * as api from "./API";

function FriendList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchFriends = async () => {
    try {
      // Fetch friends and update the state
      const friendsData = await api.getFriends(setFriends);
      console.log("Fetched friends:", friendsData);
      // setFriends(friendsData || []); // Provide a default empty array
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const handleAddFriendClick = async () => {
    try {
      // Implement the logic to handle adding a friend
      await api.addFriend(searchTerm);
      // Fetch and update the friends list after adding a friend
      await fetchFriends();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  useEffect(() => {
    // Fetch friends when the component mounts
    fetchFriends();
  }, []);

  return (
    <div className='friend-list-container'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='search user by email'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleAddFriendClick}>Add Friend</button>
      </div>
      {/* Render friends */}
      {friends.map((friend) => (
        <FriendListItem
          key={friend._id}
          profilePic={friend.ProfilePicturePath}
          friendName={friend.Name}
          score={friend.totalScore}
        />
      ))}
    </div>
  );
}

function FriendListItem({ profilePic, friendName, score }) {
  return (
    <div className='friend-list-item'>
      <div className='profile-pic'>
        <img src={process.env.PUBLIC_URL + `/${profilePic}.png`} alt={`${friendName}'s profile`} />
      </div>
      <div className='friend-name'>{friendName}</div>
      <div className='friend-score'>{score}</div>
    </div>
  );
}

export default FriendList;
