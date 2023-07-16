const { fetchProductData } = require('./productModel');

const testFetchProductData = async () => {
  try {
    const productNames = ['Ham', 'Bread', 'Cheese'];
    const productData = await fetchProductData(productNames);
    console.log('Product Data:', productData);
  } catch (error) {
    console.error('Error in testFetchProductData:', error);
  }
};

testFetchProductData();
  
