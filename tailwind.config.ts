import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: "#333333",
          light: "#666666",
          dark: "#000000",
        },
        // Secondary Colors
        secondary: {
          DEFAULT: "#F8F8F8",
          light: "#FFFFFF",
          dark: "#EBEBEB",
        },
        // Accent Colors
        accent: {
          DEFAULT: "#FF4081",
          light: "#FF80AB",
          dark: "#F50057",
        },
        // Text Colors
        text: {
          primary: "#333333",
          secondary: "#666666",
          tertiary: "#999999",
          light: "#FFFFFF",
          link: "#0066CC",
          error: "#DC2626",
          success: "#059669",
        },
        // Gray Scale
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};

export default config;
