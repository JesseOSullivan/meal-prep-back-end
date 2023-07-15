const { fetchProductData } = require('./productModel');
const testFetchProductData = async () => {
    try {
        const productName = 'Example Product';

        const productNames = [productName, 'Product B', 'Product C'];
      const productData = await fetchProductData(productNames);
      console.log('Product Data:', productData);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  
  testFetchProductData();
  