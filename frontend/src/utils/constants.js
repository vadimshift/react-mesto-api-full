const apiOptions = {
  userUrl: "http://localhost:3000/users/me",
  userAvatar: "http://localhost:3000/users/me/avatar",
  cardsUrl: "http://localhost:3000/cards",
  cardsUrlLike: "http://localhost:3000/cards/likes",
  //cardsUrlLike: "http://localhost:3000/cards/:cardId/likes",
  /* headers: {
    authorization: "35068309-e434-48d0-a214-95dc9b740ad7",
    "Content-Type": "application/json; charset=UTF-8",
  }, */
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  credentials: 'include',
};

export {apiOptions};
