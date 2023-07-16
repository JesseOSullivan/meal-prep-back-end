const db = require('./db'); 

const fetchProductData = async (products) => {
    try {
      let query = db.select('product.id', 'product.name', 'product.price', 'product.link')
                    .from('product');
      
      products.forEach((product, index) => {
        if (index === 0) {
          query = query.where(db.raw('to_tsvector(product.name) @@ plainto_tsquery(?)', product.name));
        } else {
          query = query.orWhere(db.raw('to_tsvector(product.name) @@ plainto_tsquery(?)', product.name));
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
