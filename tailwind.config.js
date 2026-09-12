/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        thinnayi: {
          terra: '#e87549',
          terradark: '#df7046',
          deepgreen: '#173f30',
          forest: '#0d3024',
          cream: '#f3e4cb',
          warmwhite: '#fff8ec',
          sand: '#f7e7cf',
          muted: '#214c3b'
        }
      },
      fontFamily: {
        headline: ['Syne', 'Impact', 'sans-serif'],
        malayalam: ['Anek Malayalam', 'sans-serif']
      }
    },
  },
  plugins: [],
}
