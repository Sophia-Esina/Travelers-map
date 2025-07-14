const express = require("express");
const {
  addTravel,
  editTravel,
  deleteTravel,
  getTravels,
  getTravel,
} = require("../controllers/travel");
const { getDream, deleteDream } = require("../controllers/dream");
const authenticated = require("../middlewares/authenticated");
const mapTravel = require("../helpers/mapTravel");

const router = express.Router({ mergeParams: true });

router.get("/public", async (req, res) => {
  const { travels } = await getTravels(undefined, "", 1000, 1, true); // важно: publishedOnly = true
  res.send({ data: { travels: travels.map(mapTravel) } });
});

router.get("/", authenticated, async (req, res) => {
  const { travels, lastPage } = await getTravels(
    req.user.id,
    req.query.search,
    parseInt(req.query.limit) || 10,
    parseInt(req.query.page) || 1
  );

  res.send({ data: { lastPage, travels: travels.map(mapTravel) } });
});

router.get("/:id", authenticated, async (req, res) => {
  const travel = await getTravel(req.params.id);

  if (!travel || travel.user_id.toString() !== req.user.id) {
    return res.status(403).send({ error: "Access denied" });
  }

  res.send({ data: mapTravel(travel) });
});

// Добавить путешествие
router.post("/", authenticated, async (req, res) => {
  const newTravel = await addTravel({
    user_id: req.user.id,
    coordinates: req.body.coordinates,
    title: req.body.title,
    country: req.body.country,
    city: req.body.city,
    notes: req.body.notes,
    image: req.body.imageUrl,
    date: req.body.date,
    published: req.body.published || false,
  });

  res.send({ data: newTravel });
});

// Обновить путешествие
router.patch("/:id", authenticated, async (req, res) => {
  const travel = await getTravel(req.params.id);

  if (!travel || travel.user_id.toString() !== req.user.id) {
    return res.status(403).send({ error: "Access denied" });
  }

  const updatedTravel = await editTravel(req.params.id, req.body);

  res.send({ data: mapTravel(updatedTravel) });
});

// Опубликовать путешествие
router.patch("/:id/publish", authenticated, async (req, res) => {
  const travel = await getTravel(req.params.id);

  if (!travel || travel.user_id.toString() !== req.user.id) {
    return res.status(403).send({ error: "Access denied" });
  }

  travel.published = req.body.published;
  await travel.save();

  res.send({ data: mapTravel(travel) });
});

// Удалить путешествие
router.delete("/:id", authenticated, async (req, res) => {
  const travel = await getTravel(req.params.id);

  if (!travel || travel.user_id.toString() !== req.user.id) {
    return res.status(403).send({ error: "Access denied" });
  }

  await deleteTravel(req.params.id);

  res.send({ error: null });
});

router.post("/from-dream", authenticated, async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;

    const dream = await getDream(id);
    if (!dream || dream.user_id.toString() !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const newTravel = await addTravel({
      user_id: userId,
      coordinates: dream.coordinates,
      title: dream.title,
      country: dream.country,
      city: dream.city,
      notes: dream.notes,
      image: dream.image,
      date: dream.date,
      published: false,
    });

    await deleteDream(id);
    res.json({ data: mapTravel(newTravel) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
