module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing/index.html',
        permanent: true,
      },
    ]
  },
}