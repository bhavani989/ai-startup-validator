const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

console.log("🔥 BACKEND RUNNING (FINAL VERSION)");

app.use(cors());
app.use(express.json());

// ===== DB =====
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// ===== MODEL =====
const Idea = mongoose.model("Idea", {
  title: String,
  description: String,
  report: Object
});

// ===== FALLBACK AI =====
async function analyzeIdea(title, description) {
  console.log("✅ USING FALLBACK AI");

  return {
    problem: `The idea "${title}" addresses inefficiency in current solutions.`,
    customer: "Target users include general consumers and businesses.",
    market: "The market is growing with increasing demand.",
    competitor: [
      "Competitor A - limited scalability",
      "Competitor B - expensive solution",
      "Competitor C - lacks automation"
    ],
    tech_stack: ["React", "Node.js", "MongoDB", "Express"],
    risk_level: "Medium",
    profitability_score: 75,
    justification: "The idea has strong potential with moderate execution risk."
  };
}

// ===== ROUTES =====

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// POST
app.post("/ideas", async (req, res) => {
  console.log("REQUEST:", req.body);

  try {
    const { title, description } = req.body;

    const report = await analyzeIdea(title, description);

    const idea = new Idea({ title, description, report });
    await idea.save();

    console.log("💾 SAVED");

    res.json(idea);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ALL
app.get("/ideas", async (req, res) => {
  const ideas = await Idea.find();
  res.json(ideas);
});

// GET ONE
app.get("/ideas/:id", async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  res.json(idea);
});


// DELETE
app.delete("/ideas/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedIdea = await Idea.findByIdAndDelete(id);

    if (!deletedIdea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    console.log("🗑️ Deleted:", id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));
