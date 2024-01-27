import React, { useState } from "react";
import "../FriendListItem.css"; // Make sure this path matches your CSS file's location
import logo from "../images/logo.png";
import * as api from "./API";

function FriendList({ friends, onAddFriend }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddFriendClick = () => {
    // Implement the logic to handle adding a friend
    onAddFriend(searchTerm);
  };

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
      <div className='friend-list-item'>
        <div className='profile-pic'>
          <img src={logo} alt='course' />
        </div>
        <div className='friend-name'>yasmin haitham</div>
        <div className='friend-score'> 1000000</div>
      </div>
      <div className='friend-list-item'>
        <div className='profile-pic'>
          <img src={logo} alt='course' />
        </div>
        <div className='friend-name'>yasmin haitham</div>
        <div className='friend-score'> 1000000</div>
      </div>
      {/* {friends.map((friend) => (
        <FriendListItem
          key={friend.id}
          profilePic={friend.profilePic}
          friendName={friend.name}
          score={friend.score}
        />
      ))} */}
    </div>
  );
}

// function FriendListItem({ profilePic, friendName, score }) {
//   return (
//     <div className='friend-list-item'>
//       <div className='profile-pic'>
//         <img src={profilePic} alt={`${friendName}'s profile`} />
//       </div>
//       <div className='friend-name'>{friendName}</div>
//       <div className='friend-score'>{score}</div>
//     </div>
//   );
// }

export default FriendList;
