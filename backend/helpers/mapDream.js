module.exports = function (dream) {
  return {
    id: dream._id,
    title: dream.title,
    coordinates: dream.coordinates,
    country: dream.country,
    city: dream.city,
    date: dream.date?.toLocaleDateString("ru-RU"),
    imageUrl: dream.image,
    notes: dream.notes,
  };
};
