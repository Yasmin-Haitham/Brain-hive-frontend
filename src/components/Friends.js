import React from "react";
import { useNavigate } from "react-router-dom";
import "../CoursesProfile.css";

import FriendList from "./FriendList";
import * as api from "./API";
function Friends() {

  return (
    <div className='Friends-container'>
      <div className='FriendsTitle'>Friends</div>
      
      <div>
        <FriendList />
      </div>
    </div>
  );
}
export default Friends;
