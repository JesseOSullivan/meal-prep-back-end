const { fetchProductData } = require('./productModel');

const testFetchProductData = async () => {
  try {
    const productNames = [
        'pasta',
        'olive oil',
        'garlic',
        'cherry tomatoes',
        'sun-dried tomatoes',
        'black olives',
        'fresh basil',
        'fresh parsley',
        'grated Parmesan cheese',
        'Salt and pepper'
      ]
            const productData = await fetchProductData(productNames);
    console.log('Product Data:', productData);
  } catch (error) {
    console.error('Error in testFetchProductData:', error);
  }
};

testFetchProductData();
  
