const mongoose = require("mongoose");

module.exports = function (travel) {
  return {
    id: travel._id,
    user: travel.user_id?.login,
    title: travel.title,
    coordinates: travel.coordinates,
    country: travel.country,
    city: travel.city,
    date: travel.date?.toLocaleDateString("ru-RU"),
    imageUrl: travel.image,
    notes: travel.notes,
    published: travel.published,
  };
};
