import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f4f4f2",
        "on-tertiary-fixed-variant": "#2e4d3d",
        "on-secondary-container": "#6f6146",
        "inverse-primary": "#adceb8",
        "tertiary-container": "#5b7c69",
        "on-surface-variant": "#424843",
        "secondary-container": "#f1ddbc",
        "outline-variant": "#c2c8c1",
        "on-error-container": "#93000a",
        "on-error": "#ffffff",
        "surface-container-high": "#e8e8e6",
        "surface-container": "#eeeeec",
        "primary-container": "#5c7c68",
        "on-primary-fixed-variant": "#2f4d3c",
        "inverse-on-surface": "#f1f1ef",
        "primary-fixed": "#c8ebd4",
        "on-background": "#1a1c1b",
        "on-tertiary-container": "#f5fff6",
        "inverse-surface": "#2f3130",
        "on-secondary": "#ffffff",
        "background": "#f9f9f7",
        "on-tertiary-fixed": "#012113",
        "on-primary-fixed": "#022113",
        "surface-dim": "#dadad8",
        "on-primary-container": "#f6fff6",
        "tertiary-fixed-dim": "#accfb9",
        "surface-tint": "#466553",
        "on-tertiary": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container-highest": "#e2e3e1",
        "secondary-fixed": "#f4e0bf",
        "outline": "#727973",
        "secondary-fixed-dim": "#d7c4a4",
        "surface-bright": "#f9f9f7",
        "tertiary": "#436351",
        "primary-fixed-dim": "#adceb8",
        "on-primary": "#ffffff",
        "on-secondary-fixed": "#241a06",
        "error": "#ba1a1a",
        "on-secondary-fixed-variant": "#52452d",
        "primary": "#446351",
        "surface": "#f9f9f7",
        "surface-variant": "#e2e3e1",
        "on-surface": "#1a1c1b",
        "secondary": "#6b5d42",
        "tertiary-fixed": "#c7ebd4"
      },
      fontFamily: {
        "headline": ["Noto Serif", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      },
      borderRadius: {"DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"},
    },
  },
  plugins: [
    forms,
    containerQueries
  ],
}
