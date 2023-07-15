const db = require('./db'); 

const fetchProductData = async (names) => {
    const productData = await db
      .select('product.id', 'product.name', 'product.price')
      .from('product')
      .whereIn('product.name', names);
  
    return productData;
  };
  

module.exports = { fetchProductData };
