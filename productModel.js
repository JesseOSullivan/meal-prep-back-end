const db = require('./db'); 

const fetchProductData = async (names) => {
    try {
      let query = db.select('product.id', 'product.name', 'product.price').from('product');
      
      names.forEach((name, index) => {
        if (index === 0) {
          query = query.where('product.name', 'LIKE', `%${name}%`);
        } else {
          query = query.orWhere('product.name', 'LIKE', `%${name}%`);
        }
      });
  
      const productData = await query;
    
      return productData;
    } catch (error) {
      console.error('Error in fetchProductData:', error);
      throw error;
    }
  };
  
module.exports = { fetchProductData };
