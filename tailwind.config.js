/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Define primary color */ 
        primary: {
          DEFAULT: '#f37121', // 500
          light: '#f68e41',   // 400 You can choose a lighter shade for hover/focus effects
          dark: '#e45412'     // 600 You can choose a darker shade for active states
        },

        /* Define secondary color */
        secondary: {
          DEFAULT: '#fcd5ac', // 200
          lighter: '#fff6ed',  // 50
          light: '#feecd6',   // 100 You can choose a lighter shade for hover/focus effects
          dark: '#f9b678'     // 300 You can choose a darker shade for active states
        },

        // Define tertiary color
        tertiary: {
          DEFAULT: '#963216',
          light: '#bd3e11',
          dark: '#792b15',
          darker: '#411309'
        },

        black: {
          DEFAULT: "#000",
          light: "#1E1E2D",
          dark: "#232533",
        },

        gray: {
          100: "#CDCDE0",
        }
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      dropShadow: {
        'custom': 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
      }
    },
  },
  plugins: [],
}

