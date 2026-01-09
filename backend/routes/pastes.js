const express = require("express");
const Paste = require("../models/Paste");
const getNow = require("../utils/time");

const router = express.Router();

// CREATE PASTE
router.post("/", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Invalid content" });
  }

  let expiresAt = null;
  if (ttl_seconds) {
    expiresAt = new Date(Date.now() + ttl_seconds * 1000);
  }

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views ?? null
  });

  res.status(201).json({
    id: paste._id,
    url: `${req.protocol}://${req.get("host")}/p/${paste._id}`
  });
});

// FETCH PASTE (API)
router.get("/:id", async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).json({ error: "Not found" });

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt)
    return res.status(404).json({ error: "Expired" });

  if (paste.maxViews !== null && paste.views >= paste.maxViews)
    return res.status(404).json({ error: "View limit reached" });

  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views:
      paste.maxViews === null ? null : paste.maxViews - paste.views,
    expires_at: paste.expiresAt
  });
});

module.exports = router;

