import express from "express";
import cors from "cors";

const app = express();

/**
 * CORS setup
 * In production, you can lock this down to your Vercel URL later
 */
app.use(cors());
app.use(express.json());

/**
 * HEALTH CHECK ROUTE
 * Useful for Render / debugging
 */
app.get("/", (req, res) => {
  res.json({
    status: "Investor Mtaani API is alive 🚀",
    time: new Date().toISOString()
  });
});

/**
 * LOGIN ROUTE
 * Simple demo authentication (no database yet)
 */
app.post("/api/login", (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        message: "Name and role are required"
      });
    }

    console.log("LOGIN HIT:", req.body);

    res.json({
      message: "Login successful 🚀",
      user: {
        name,
        role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login"
    });
  }
});

/**
 * STARTUPS ROUTE
 * Demo data for investors
 */
app.get("/api/startups", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Savanna Fresh",
      sector: "AgriTech",
      description: "Connecting farmers directly to buyers across East Africa.",
      ask: "$50K"
    },
    {
      id: 2,
      name: "MotoPay",
      sector: "Fintech",
      description: "Digital payments for informal businesses in Africa.",
      ask: "$120K"
    },
    {
      id: 3,
      name: "Solar Mtaani",
      sector: "Clean Energy",
      description: "Affordable solar systems for households off-grid.",
      ask: "$80K"
    }
  ]);
});

/**
 * DYNAMIC PORT (IMPORTANT FOR RENDER DEPLOYMENT)
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});