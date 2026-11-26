import React, { useState, useEffect } from "react";
import CandidateService from "../../services/CandidateService";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
    resumeUrl: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Pre-fill form with existing profile data
  useEffect(() => {
    if (!userId) {
      setError("No userId found. Please login first.");
      setFetching(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await CandidateService.getProfile(userId);
        const data = response.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "",
          experience: data.experience || "",
          education: data.education || "",
          resumeUrl: data.resumeUrl || "",
        });
      } catch (err) {
        console.log("Could not pre-fill profile:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const response = await CandidateService.updateProfile(userId, payload);
      console.log("Update response:", response.data);
      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || err.response?.data || "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={{ textAlign: "center" }}>⏳ Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>✏️ Update Profile</h2>

        {message && <div style={styles.success}>{message}</div>}
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Your full name" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="Your email" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Phone</label>
            <input type="text" name="phone" value={formData.phone}
              onChange={handleChange} placeholder="Your phone number" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Skills (comma-separated)</label>
            <input type="text" name="skills" value={formData.skills}
              onChange={handleChange} placeholder="e.g. Java, React, Python" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Experience</label>
            <textarea name="experience" value={formData.experience}
              onChange={handleChange} placeholder="Describe your work experience"
              rows="3" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Education</label>
            <input type="text" name="education" value={formData.education}
              onChange={handleChange} placeholder="Your education details" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Resume URL</label>
            <input type="url" name="resumeUrl" value={formData.resumeUrl}
              onChange={handleChange} placeholder="https://link-to-your-resume.pdf" style={styles.input} />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button type="button" onClick={() => navigate("/profile")}
              style={{ ...styles.button, backgroundColor: "#6c757d" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", justifyContent: "center", alignItems: "center",
    minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px",
  },
  card: {
    backgroundColor: "#fff", padding: "40px", borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "100%", maxWidth: "520px",
  },
  title: { textAlign: "center", marginBottom: "24px", color: "#1a1a2e" },
  field: { marginBottom: "16px" },
  label: { display: "block", marginBottom: "6px", fontWeight: "600", color: "#333", fontSize: "14px" },
  input: {
    width: "100%", padding: "10px 12px", border: "1px solid #ddd",
    borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", fontFamily: "inherit",
  },
  buttonGroup: { display: "flex", gap: "12px", marginTop: "8px" },
  button: {
    flex: 1, padding: "12px", backgroundColor: "#4361ee", color: "#fff",
    border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: "600",
  },
  success: {
    backgroundColor: "#d4edda", color: "#155724", padding: "10px",
    borderRadius: "8px", marginBottom: "16px", textAlign: "center",
  },
  error: {
    backgroundColor: "#f8d7da", color: "#721c24", padding: "10px",
    borderRadius: "8px", marginBottom: "16px", textAlign: "center",
  },
};

export default UpdateProfile;