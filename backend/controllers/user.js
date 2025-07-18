const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");

//register
async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });

  return { user, token };
}

//login
async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

//get user
function getUser(currentUser) {
  return User.findById(currentUser.id);
}

//update user
async function updateUser(userId, data) {
  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

  return updatedUser;
}

module.exports = {
  register,
  login,
  getUser,
  updateUser,
};
