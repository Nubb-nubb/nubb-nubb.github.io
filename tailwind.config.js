export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#F5F0E8',
        'surface': '#FAF7F2',
        'wood-light': '#C4A77D',
        'wood-dark': '#6B4F3A',
        'text-primary': '#2A2520',
        'text-secondary': '#6B6560',
        'accent-red': '#B85450',
        'plant-green': '#5E7A5E',
        'ambient-glow': '#F4E4C1',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  },
  plugins: [],
}
