const { fetchProductData } = require('./productModel');

const testFetchProductData = async () => {
  try {
    const productNames = [
        { name: 'Ham', amount: '2-3 slices' },
        { name: 'Bread', amount: '2 slices' },
        { name: 'Lettuce', amount: 'A few leaves' },
        { name: 'Tomato', amount: '2 slices' },
        { name: 'Mayonnaise', amount: '1-2 tablespoons' },
        { name: 'Mustard', amount: '1-2 teaspoons' }
      ]
            const productData = await fetchProductData(productNames);
    console.log('Product Data:', productData);
  } catch (error) {
    console.error('Error in testFetchProductData:', error);
  }
};

testFetchProductData();
  
