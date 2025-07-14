const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/travel", require("./travel"));
router.use("/dream", require("./dream"));
router.use("/user", require("./user"));

module.exports = router;
