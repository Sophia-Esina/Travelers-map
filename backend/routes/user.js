const express = require("express");
const { getUser, updateUser } = require("../controllers/user");
const authenticated = require("../middlewares/authenticated");
const mapUser = require("../helpers/mapUser");

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, async (req, res) => {
  try {
    const user = await getUser(req.user);

    res.send({ data: mapUser(user) });
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

router.patch("/", authenticated, async (req, res) => {
  try {
    const updatedUser = await updateUser(req.user.id, req.body);

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ data: mapUser(updatedUser) });
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
