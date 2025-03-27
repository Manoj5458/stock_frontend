module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This ensures Tailwind scans the correct files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#090C9B',
        secondary: '#FB8B24',
        warning:'4F3824',
        info:'D0E37F',
        success:'F7F06D',
      },
    },
  },
  plugins: [],
}
