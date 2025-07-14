const express = require("express");
const {
  addDream,
  editDream,
  deleteDream,
  getDreams,
  getDream,
} = require("../controllers/dream");
const authenticated = require("../middlewares/authenticated");
const mapDream = require("../helpers/mapDream");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
  const { dreams, lastPage } = await getDreams(
    req.user.id,
    req.query.search,
    parseInt(req.query.limit) || 10,
    parseInt(req.query.page) || 1
  );

  res.send({ data: { lastPage, dreams: dreams.map(mapDream) } });
});

router.get("/:id", authenticated, async (req, res) => {
  const dream = await getDream(req.params.id);

  if (!dream || dream.user_id.toString() !== req.user.id) {
    return res.status(403).send({ error: "Access denied" });
  }

  res.send({ data: mapDream(dream) });
});

router.post("/", authenticated, async (req, res) => {
  const newDream = await addDream({
    user_id: req.user.id,
    coordinates: req.body.coordinates,
    title: req.body.title,
    country: req.body.country,
    city: req.body.city,
    notes: req.body.notes,
    image: req.body.image,
    date: req.body.date,
  });

  res.send({ data: newDream });
});

router.patch("/:id", authenticated, async (req, res) => {
  const dream = await getDream(req.params.id);

  if (!dream || dream.user_id.toString() !== req.user.id) {
    return res.status(403).send({ error: "Access denied" });
  }

  const updatedDream = await editDream(req.params.id, req.body);

  res.send({ data: mapDream(updatedDream) });
});

router.delete("/:id", authenticated, async (req, res) => {
  const dream = await getDream(req.params.id);

  if (!dream || dream.user_id.toString() !== req.user.id) {
    return res.status(403).send({ error: "Access denied" });
  }

  await deleteDream(req.params.id);

  res.send({ error: null });
});

module.exports = router;
