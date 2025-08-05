// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Tokens de Cores (exemplo Sportflix)
      colors: {
        brand: {
          primary: "#FF6B00", // Laranja
          secondary: "#2E2E2E", // Preto
          accent: "#FFA726", // Laranja claro
          error: "#EF4444", // Vermelho
        },
      },
      // Tokens de Tipografia
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Fonte principal
      },
      // Tokens de Espaçamento
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
    },
  },
  plugins: [],
};
