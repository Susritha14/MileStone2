const API_URL = "http://localhost:5000/api/friends";

// src/services/FriendService.js
const friends = [];

const FriendService = {
  getFriends: () => friends,
  addFriend: (name) => {
    friends.push({ id: Date.now(), name });
    return [...friends];
  },
  removeFriend: (id) => {
    return friends.filter(friend => friend.id !== id);
  },

  getFriends: async () => {
    const res = await fetch(API_URL);
    return res.json();
  },

  addFriend: async (name) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    return res.json();
  },

  removeFriend: async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  }
};

export default FriendService;
