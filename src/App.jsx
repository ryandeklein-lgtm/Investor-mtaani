import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invested, setInvested] = useState([]);

  const startups = [
    {
      id: 1,
      name: "Savanna Fresh",
      sector: "AgriTech",
      description: "Direct farm-to-market supply chain across East Africa.",
      progress: 40,
      raise: "$50,000"
    },
    {
      id: 2,
      name: "MotoPay",
      sector: "FinTech",
      description: "Mobile payments for informal businesses in Africa.",
      progress: 65,
      raise: "$120,000"
    },
    {
      id: 3,
      name: "Solar Mtaani",
      sector: "Clean Energy",
      description: "Affordable solar energy for off-grid households.",
      progress: 25,
      raise: "$75,000"
    }
  ];

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      setUser(data.user || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const investInStartup = (startupName) => {
    if (!invested.includes(startupName)) {
      setInvested([...invested, startupName]);
    }
  };

  // ================= LOGIN =================
  if (!user) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginCard}>
          <h1 style={{ marginBottom: 5 }}>🚀 Investor Mtaani</h1>
          <p style={{ opacity: 0.6 }}>
            Access African startup deal flow
          </p>

          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Role</option>
            <option value="Investor">Investor</option>
            <option value="Startup">Startup</option>
          </select>

          <button onClick={handleLogin} style={styles.primaryBtn}>
            {loading ? "Connecting..." : "Enter Platform"}
          </button>

          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div style={styles.app}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>Investor Mtaani</h1>
          <p style={styles.subtext}>
            Deal flow for African innovation
          </p>
        </div>

        <button
          onClick={() => {
            setUser(null);
            setName("");
            setRole("");
            setInvested([]);
          }}
          style={styles.logout}
        >
          Logout
        </button>
      </div>

      {/* USER STRIP */}
      <div style={styles.userCard}>
        <h2 style={{ margin: 0 }}>Welcome, {user.name} 👋</h2>
        <p style={{ opacity: 0.7 }}>
          Role: <b>{user.role}</b>
        </p>
      </div>

      {/* INVESTOR VIEW */}
      {user.role === "Investor" && (
        <>
          <h2 style={{ marginTop: 25 }}>🔥 Live Deal Flow</h2>

          <div style={styles.grid}>
            {startups.map((s) => (
              <div key={s.id} style={styles.card}>
                <div style={styles.tag}>{s.sector}</div>

                <h3>{s.name}</h3>
                <p style={{ opacity: 0.7 }}>{s.description}</p>

                <p style={{ fontSize: 12, marginTop: 10 }}>
                  Raising: <b>{s.raise}</b>
                </p>

                <div style={styles.bar}>
                  <div
                    style={{
                      ...styles.fill,
                      width: `${s.progress}%`
                    }}
                  />
                </div>

                <p style={{ fontSize: 12, opacity: 0.6 }}>
                  {s.progress}% funded
                </p>

                <button
                  onClick={() => investInStartup(s.name)}
                  style={styles.investBtn}
                >
                  Commit Investment →
                </button>
              </div>
            ))}
          </div>

          {/* PORTFOLIO */}
          <div style={styles.portfolio}>
            <h3>Your Commitments</h3>

            {invested.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                No commitments yet. Explore deals above.
              </p>
            ) : (
              invested.map((i, idx) => (
                <div key={idx}>📌 {i}</div>
              ))
            )}
          </div>
        </>
      )}

      {/* STARTUP VIEW */}
      {user.role === "Startup" && (
        <div style={styles.card}>
          <h2>🏗 Startup Console</h2>
          <p><b>{user.name}</b></p>
          <p>Status: Raising capital 🚀</p>
          <p>Investors watching: 12</p>
        </div>
      )}
    </div>
  );
}

export default App;

/* ================= STYLES ================= */
const styles = {
  app: {
    minHeight: "100vh",
    padding: 30,
    fontFamily: "Arial",
    background: "radial-gradient(circle at top, #0b1220, #05070f)",
    color: "white"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  subtext: { opacity: 0.6, marginTop: 5 },
  logout: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer"
  },
  userCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 14,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 18,
    marginTop: 15
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: 18,
    borderRadius: 16
  },
  tag: {
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 8
  },
  bar: {
    height: 8,
    background: "#111827",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #22c55e, #16a34a)"
  },
  investBtn: {
    marginTop: 12,
    width: "100%",
    padding: 10,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #3b82f6, #2563eb)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },
  portfolio: {
    marginTop: 30,
    padding: 18,
    borderRadius: 14,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)"
  },
  loginWrap: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #0b1220, #05070f)"
  },
  loginCard: {
    width: 320,
    padding: 25,
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white"
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    border: "1px solid #333",
    background: "#0f172a",
    color: "white"
  },
  primaryBtn: {
    width: "100%",
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(90deg, #3b82f6, #2563eb)",
    color: "white",
    cursor: "pointer"
  },
  error: {
    color: "#ef4444",
    marginTop: 10
  }
};