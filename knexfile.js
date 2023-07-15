require('dotenv').config();
const knex = require('knex');
const fs = require('fs');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'dpg-cipae55gkuvrtocj27fg-a.oregon-postgres.render.com',
      user: 'root',
      password: 'iIDWbUaRMPYFaBnkvl7KSaPZoDKXXwGC',
      database: 'product_4xmo',
      ssl: {
        ca: fs.readFileSync('./selfsigned.crt'),
        rejectUnauthorized: false,

      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
  // Add more configurations for different environments if needed
  // ...
};
