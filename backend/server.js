import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Investor Mtaani API is alive");
});

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  console.log("LOGIN HIT:", req.body);

  const { name, role } = req.body;

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

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});