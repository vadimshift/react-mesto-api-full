const apiOptions = {
  userUrl: "http://api.vadim-21.nomoredomains.club/users/me",
  userAvatar: "http://api.vadim-21.nomoredomains.club/users/me/avatar",
  cardsUrl: "http://api.vadim-21.nomoredomains.club/cards",
  cardsUrlLike: "http://api.vadim-21.nomoredomains.club/cards/likes",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  credentials: 'include',
};

export {apiOptions};
