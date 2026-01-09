
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", require("./routes/health"));
app.use("/api/pastes", require("./routes/pastes"));

/**
 * Redirect paste URLs to React UI
 * This ensures clicking ANY paste URL opens the same UI
 */
app.get("/p/:id", (req, res) => {
  const pasteId = req.params.id;
  res.redirect(`http://localhost:5173/p/${pasteId}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
