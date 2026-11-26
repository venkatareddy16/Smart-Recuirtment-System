import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>🤖 AI Recruitment</h2>
        <div style={styles.navLinks}>
          <button onClick={() => navigate("/login")} style={styles.navBtn}>
            Login
          </button>
          <button onClick={() => navigate("/register")} style={styles.navBtnPrimary}>
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          AI-Powered Smart Recruitment <br />& Talent Management System
        </h1>
        <p style={styles.heroSubtitle}>
          VCUBE Hack Quest 1.0 — Automate candidate screening, resume analysis,
          job matching, and interview preparation using Generative AI.
        </p>
        <div style={styles.heroBtns}>
          <button onClick={() => navigate("/register")} style={styles.ctaBtn}>
            🚀 Get Started
          </button>
          <button onClick={() => navigate("/login")} style={styles.ctaBtnOutline}>
            🔐 Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>✨ Core Features</h2>
        <div style={styles.featureGrid}>
          {featuresData.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <span style={styles.featureIcon}>{feature.icon}</span>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Section */}
      <section style={styles.aiSection}>
        <h2 style={styles.sectionTitle}>🧠 Mandatory AI Features</h2>
        <div style={styles.aiGrid}>
          {aiFeatures.map((feature, index) => (
            <div key={index} style={styles.aiCard}>
              <span style={styles.aiIcon}>{feature.icon}</span>
              <h3 style={styles.aiCardTitle}>{feature.title}</h3>
              <p style={styles.aiCardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={styles.techSection}>
        <h2 style={styles.sectionTitle}>🛠️ Technology Stack</h2>
        <div style={styles.techGrid}>
          {techStack.map((tech, index) => (
            <span key={index} style={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 VCUBE Hack Quest 1.0 | AI-Powered Smart Recruitment System</p>
        <p style={{ fontSize: "12px", marginTop: "4px", color: "#aaa" }}>
          Learn · Build · Innovate
        </p>
      </footer>
    </div>
  );
};

// ─── Data ──────────────────────────────────────────────────────────
const featuresData = [
  { icon: "👤", title: "Registration", description: "Recruiter and candidate registration with role-based access." },
  { icon: "📄", title: "Job Posting", description: "Post jobs and manage applications seamlessly." },
  { icon: "📎", title: "Resume Upload", description: "Upload resumes and get AI-powered analysis instantly." },
  { icon: "🎯", title: "Job Matching", description: "AI matches candidates to the best-fit job descriptions." },
  { icon: "❓", title: "Interview Prep", description: "AI generates tailored interview questions for each role." },
  { icon: "📊", title: "Analytics", description: "Recruitment analytics and insights at your fingertips." },
];

const aiFeatures = [
  { icon: "📄", title: "Resume Analyzer", description: "AI analyzes resumes to extract skills, experience, and key insights." },
  { icon: "🎯", title: "Job Matching AI", description: "Intelligent matching between candidate profiles and job descriptions." },
  { icon: "❓", title: "Interview Question Generator", description: "Auto-generates relevant interview questions based on the job role." },
  { icon: "✏️", title: "Resume Improvement Assistant", description: "AI suggests improvements to make your resume stand out." },
];

const techStack = [
  "Java", "Spring Boot", "Spring Data JPA", "Spring Security",
  "REST APIs", "MySQL", "React.js", "Spring AI / LLM API",
];

// ─── Styles ────────────────────────────────────────────────────────
const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f8f9fb" },
  navbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 40px", backgroundColor: "#1a1a2e", color: "#fff",
  },
  logo: { margin: 0, fontSize: "20px" },
  navLinks: { display: "flex", gap: "12px" },
  navBtn: {
    padding: "8px 20px", border: "1px solid #fff", backgroundColor: "transparent",
    color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "14px",
  },
  navBtnPrimary: {
    padding: "8px 20px", border: "none", backgroundColor: "#4361ee",
    color: "#fff", borderRadius: "8px", cursor: "pointer", fontSize: "14px",
  },
  hero: {
    textAlign: "center", padding: "80px 20px",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff",
  },
  heroTitle: { fontSize: "36px", marginBottom: "16px", lineHeight: "1.3" },
  heroSubtitle: { fontSize: "16px", color: "#ccc", maxWidth: "650px", margin: "0 auto 32px" },
  heroBtns: { display: "flex", justifyContent: "center", gap: "16px" },
  ctaBtn: {
    padding: "14px 32px", backgroundColor: "#4361ee", color: "#fff",
    border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer", fontWeight: "600",
  },
  ctaBtnOutline: {
    padding: "14px 32px", backgroundColor: "transparent", color: "#fff",
    border: "2px solid #fff", borderRadius: "10px", fontSize: "16px", cursor: "pointer", fontWeight: "600",
  },
  features: { padding: "60px 40px", textAlign: "center" },
  sectionTitle: { fontSize: "28px", marginBottom: "40px", color: "#1a1a2e" },
  featureGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px", maxWidth: "900px", margin: "0 auto",
  },
  featureCard: {
    backgroundColor: "#fff", padding: "30px", borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)", textAlign: "center",
  },
  featureIcon: { fontSize: "36px" },
  featureTitle: { fontSize: "18px", margin: "12px 0 8px", color: "#1a1a2e" },
  featureDesc: { fontSize: "14px", color: "#666", lineHeight: "1.5" },
  aiSection: { padding: "60px 40px", backgroundColor: "#1a1a2e", textAlign: "center", color: "#fff" },
  aiGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px", maxWidth: "950px", margin: "0 auto",
  },
  aiCard: {
    backgroundColor: "rgba(255,255,255,0.08)", padding: "30px",
    borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)",
  },
  aiIcon: { fontSize: "32px" },
  aiCardTitle: { fontSize: "16px", margin: "12px 0 8px" },
  aiCardDesc: { fontSize: "13px", color: "#bbb", lineHeight: "1.5" },
  techSection: { padding: "60px 40px", textAlign: "center" },
  techGrid: {
    display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px",
    maxWidth: "700px", margin: "0 auto",
  },
  techBadge: {
    padding: "10px 20px", backgroundColor: "#e8eaff", color: "#4361ee",
    borderRadius: "20px", fontSize: "14px", fontWeight: "600",
  },
  footer: {
    textAlign: "center", padding: "24px", backgroundColor: "#1a1a2e",
    color: "#ccc", fontSize: "14px",
  },
};

export default Home;