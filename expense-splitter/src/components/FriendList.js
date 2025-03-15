// src/components/FriendList.js
import React, { useState } from "react";
import FriendService from "../services/FriendService";
import "./FriendList.css";

const FriendList = () => {
  const [friends, setFriends] = useState(FriendService.getFriends() || []);
  const [name, setName] = useState("");

  const addFriend = () => {
    if (name.trim() === "") return;
    setFriends(FriendService.addFriend(name));
    setName("");
  };

  const removeFriend = (id) => {
    setFriends(FriendService.removeFriend(id));
  };

  return (
    <div className="friend-list">
      <h2>Friends</h2>
      <input 
        type="text" 
        placeholder="Enter friend’s name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addFriend}>Add Friend</button>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            {friend.name} 
            <button onClick={() => removeFriend(friend.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
