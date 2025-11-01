module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: '#e11d48',
        darkBg: '#070606',
        lightText: '#e6e6e6'
      },
      boxShadow: {
        'neon-lg': '0 10px 30px rgba(77, 71, 255, 0.12), 0 0 20px rgba(73,240,255,0.08)'
      }
    }
  },
  plugins: []
}
