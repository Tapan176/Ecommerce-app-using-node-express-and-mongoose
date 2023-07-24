module.exports = {
  apps: [{
    script: 'app.js',
    watch: true,
    name: 'ecommerce',
  }],

  deploy: {
    production: {
      user: 'TAPAN_KHOKHARIYA',
      host: '192.168.1.157',
      ref: 'origin/master',
      repo: 'https://github.com/Tapan176/Ecommerce-app-using-node-express-and-mongoose.git',
      path: 'D:/ICT/ZuruTech/Practice/Ecommerce',
    },
  },
};
