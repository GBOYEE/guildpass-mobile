module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: "#6366f1",
        secondary: "#4f46e5",
        background: "#f8fafc",
        card: "#ffffff",
        text: "#1e293b",
        "text-muted": "#64748b",
        border: "#e2e8f0",
        success: "#22c55e",
        error: "#ef4444",
        // Dark theme semantic colors
        "dark-background": "#0f172a",
        "dark-card": "#1e293b",
        "dark-text": "#f1f5f9",
        "dark-text-muted": "#94a3b8",
        "dark-border": "#334155",
      },
    },
  },
  plugins: [],
};
