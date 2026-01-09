const express = require("express");
const router = express.Router();

router.get("/healthz", async (req, res) => {
  res.status(200).json({ ok: true });
});

module.exports = router;
