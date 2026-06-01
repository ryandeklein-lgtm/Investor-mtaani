import express from "express";
import cors from "cors";

const app = express();

// ✅ IMPORTANT: allow production frontend
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({
    status: "Investor Mtaani API is alive 🚀",
    time: new Date()
  });
});

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({
      message: "Name and role required"
    });
  }

  res.json({
    message: "Login successful 🚀",
    user: { name, role }
  });
});

// STARTUPS ROUTE
app.get("/api/startups", (req, res) => {
  res.json([
    { id: 1, name: "Savanna Fresh", sector: "AgriTech", ask: "$50K" },
    { id: 2, name: "MotoPay", sector: "Fintech", ask: "$120K" }
  ]);
});

// ✅ CRITICAL FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});