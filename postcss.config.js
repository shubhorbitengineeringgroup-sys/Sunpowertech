export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {}, // autoprefixer is still good to keep for other CSS if needed, though Tailwind handles its own. But usually safe to keep or remove. The error message specifically asked for @tailwindcss/postcss
  },
};
