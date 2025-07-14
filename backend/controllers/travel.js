const Travel = require("../models/Travel");
const { createTravel } = require("../models/Travel");
const { deleteDream, getDream } = require("../models/Dream");

// Добавить путешествие
async function addTravel(travel) {
  return Travel.create(travel);
}

// Изменить путешествие
async function editTravel(id, travel) {
  return Travel.findByIdAndUpdate(id, travel, { new: true });
}

// Удалить путешествие
function deleteTravel(id) {
  return Travel.deleteOne({ _id: id });
}

// Получить список путешествий пользователя
async function getTravels(
  userId,
  search = "",
  limit = 10,
  page = 1,
  publishedOnly = false
) {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  if (userId) {
    filter.user_id = userId;
  }

  if (publishedOnly) {
    filter.published = true;
  }

  const [travels, count] = await Promise.all([
    Travel.find(filter)
      .populate("user_id", "login")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Travel.countDocuments(filter),
  ]);

  return {
    travels,
    lastPage: Math.ceil(count / limit),
  };
}

// Получить одно путешествие
function getTravel(id) {
  return Travel.findById(id);
}

// Перенести мечту в путешетвя
async function moveDreamToTravel({ user_id, dream_id, ...dreamData }) {
  const existingDream = await getDream(dream_id);

  if (!existingDream || existingDream.user_id.toString() !== user_id) {
    throw new Error("Access denied");
  }

  const newTravel = await createTravel({ ...dreamData, user_id });

  await deleteDream(dream_id);

  return newTravel;
}

module.exports = {
  addTravel,
  editTravel,
  deleteTravel,
  getTravels,
  getTravel,
  moveDreamToTravel,
};
