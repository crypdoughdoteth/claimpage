/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/_app.tsx",
    "./pages/index.tsx"
],
  theme: {
    extend:{
      backgroundImage: theme => ({
        'background': "url('https://chapter8ccc.com/wp-content/uploads/2022/07/youtube-backdrop.jpg')"
      })
    }
  },

  plugins: [],
}
