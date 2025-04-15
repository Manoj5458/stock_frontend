
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    // rest of the code
    extend: {
       colors: {
        primary: '#090C9B',
        secondary: '#FB8B24',
        warning:'#4F3824',
        info:'#D0E37F',
        success:'#F7F06D',
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [],
};
