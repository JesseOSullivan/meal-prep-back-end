const knex = require('knex');
const fs = require('fs');


const db = knex({
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
});

const product = {
  name: 'Example Product',
  price: 9.99,
};

db('product')
  .insert(product)
  .then(() => {
    console.log('Data inserted successfully.');
  })
  .catch((error) => {
    console.error('Error inserting data:', error);
  });

db('product')
  .select()
  .then((rows) => {
    console.log('Products:', rows);
  })
  .catch((error) => {
    console.error('Error retrieving data:', error);
  });
