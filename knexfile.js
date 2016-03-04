module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'springtik'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  }
};
