import React, { useState, useEffect } from "react";
import CandidateService from "../../services/CandidateService";
import { useNavigate } from "react-router-dom";

const CandidateProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("No userId found. Please login first.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await CandidateService.getProfile(userId);
        console.log("Profile response:", response.data);
        setProfile(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || err.response?.data || "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={{ textAlign: "center" }}>⏳ Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.error}>{error}</div>
          <button onClick={() => navigate("/login")} style={styles.button}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Candidate Profile</h2>

        <div style={styles.infoRow}>
          <strong>Name:</strong>
          <span>{profile?.name || "N/A"}</span>
        </div>
        <div style={styles.infoRow}>
          <strong>Email:</strong>
          <span>{profile?.email || "N/A"}</span>
        </div>
        <div style={styles.infoRow}>
          <strong>Phone:</strong>
          <span>{profile?.phone || "N/A"}</span>
        </div>
        <div style={styles.infoRow}>
          <strong>Skills:</strong>
          <span>
            {Array.isArray(profile?.skills)
              ? profile.skills.join(", ")
              : profile?.skills || "N/A"}
          </span>
        </div>
        <div style={styles.infoRow}>
          <strong>Experience:</strong>
          <span>{profile?.experience || "N/A"}</span>
        </div>
        <div style={styles.infoRow}>
          <strong>Education:</strong>
          <span>{profile?.education || "N/A"}</span>
        </div>
        <div style={styles.infoRow}>
          <strong>Resume:</strong>
          <span>
            {profile?.resumeUrl ? (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                View Resume
              </a>
            ) : (
              "N/A"
            )}
          </span>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={() => navigate("/update-profile")} style={styles.button}>
            ✏️ Edit Profile
          </button>
          <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: "#e74c3c" }}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", justifyContent: "center", alignItems: "center",
    minHeight: "100vh", backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "#fff", padding: "40px", borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "100%", maxWidth: "520px",
  },
  title: { textAlign: "center", marginBottom: "24px", color: "#1a1a2e" },
  infoRow: {
    display: "flex", justifyContent: "space-between", padding: "10px 0",
    borderBottom: "1px solid #eee", fontSize: "14px",
  },
  buttonGroup: { display: "flex", gap: "12px", marginTop: "24px" },
  button: {
    flex: 1, padding: "12px", backgroundColor: "#4361ee", color: "#fff",
    border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer",
    fontWeight: "600",
  },
  error: {
    backgroundColor: "#f8d7da", color: "#721c24", padding: "10px",
    borderRadius: "8px", marginBottom: "16px", textAlign: "center",
  },
};

export default CandidateProfile;