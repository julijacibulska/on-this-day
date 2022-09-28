export type ColorKey = keyof typeof styledTheme["colors"];

export const styledTheme = {
  colors: {
    primary: "#0984e3",
    primaryDark: "#0770c0",
    purple: "#6c5ce7",
    pink: "#e84393",
    orange: "#e17055",
    cyan: "#00cec9",
    success: "#00b894",
    danger: "#d63031",
    warning: "#fdcb6e",
    grey: "#636e72",
    surfaceBg: "#fff",
    surfaceBgDark: "#f8f9fa",
    surfaceBorder: "#dfe6e9",
    text: "#2d3436",
    textOnDark: "#fff",
  },
  fontSize: {
    s: "16px",
    m: "24px",
    l: "32px",
  },
  spacings: {
    xs: "10px",
    s: "15px",
    m: "30px",
    l: "40px",
  },
  borderRadius: {
    s: "7px",
    m: "14px",
    l: "50%",
  },
} as const;