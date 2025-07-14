module.exports = function (user) {
  return {
    id: user.id || user._id.toString(),
    login: user.login,
    photo: user.photo || "",
    country: user.country || "",
    registeredAt: user.createdAt.toLocaleDateString("ru-RU"),
    biography: user.biography || "",
  };
};
