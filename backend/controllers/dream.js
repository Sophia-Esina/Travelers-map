const Dream = require("../models/Dream");

// Добавить мечту
async function addDream(dream) {
  return Dream.create(dream);
}

// Изменить мечту
async function editDream(id, dream) {
  return Dream.findByIdAndUpdate(id, dream, { new: true });
}

// Удалить мечту
function deleteDream(id) {
  return Dream.deleteOne({ _id: id });
}

// Получить список мечт пользователя
async function getDreams(userId, search = "", limit = 10, page = 1) {
  const filter = {
    user_id: userId,
    title: { $regex: search, $options: "i" },
  };

  const [dreams, count] = await Promise.all([
    Dream.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Dream.countDocuments(filter),
  ]);

  return {
    dreams,
    lastPage: Math.ceil(count / limit),
  };
}

// Получить конкретную мечту
function getDream(id) {
  return Dream.findById(id);
}

module.exports = {
  addDream,
  editDream,
  deleteDream,
  getDreams,
  getDream,
};
