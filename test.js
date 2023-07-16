const { fetchProductData } = require('./productModel');

const testFetchProductData = async () => {
  try {
    const productNames = [
        { id: 22, name: 'Bread Mix 1kg', price: 3 },
        { id: 102, name: 'Gluten Free Bread 500g', price: 5 },
        { id: 106, name: 'Vegan Cheese 200g', price: 4.5 },
        { id: 118, name: 'Cheddar Cheese 200g', price: 3.5 },
        { id: 119, name: 'Smoked Ham 500g', price: 5 },
        { id: 120, name: 'Whole Grain Bread 500g', price: 2.5 },
        { id: 121, name: 'Mozzarella Cheese 200g', price: 3.75 },
        { id: 122, name: 'Honey Roasted Ham 500g', price: 5.5 },
        { id: 123, name: 'Sourdough Bread 500g', price: 3 },
        { id: 124, name: 'Swiss Cheese 200g', price: 4 },
        { id: 125, name: 'Black Forest Ham 500g', price: 6 },
        { id: 126, name: 'Rye Bread 500g', price: 2.75 },
        { id: 127, name: 'Gouda Cheese 200g', price: 3.8 },
        { id: 128, name: 'Prosciutto Ham 200g', price: 7 },
        { id: 129, name: 'Multigrain Bread 500g', price: 2.8 },
        { id: 130, name: 'Blue Cheese 200g', price: 4.5 },
        { id: 131, name: 'Turkey Ham 500g', price: 5.5 },
        { id: 132, name: 'Gluten Free Bread 500g', price: 4 },
        { id: 133, name: 'Feta Cheese 200g', price: 3.9 },
        { id: 134, name: 'Cheddar Cheese 200g', price: 3.5 },
        { id: 135, name: 'Smoked Ham 500g', price: 5 },
        { id: 136, name: 'Whole Grain Bread 500g', price: 2.5 },
        { id: 137, name: 'Mozzarella Cheese 200g', price: 3.75 },
        { id: 138, name: 'Honey Roasted Ham 500g', price: 5.5 },
        { id: 139, name: 'Sourdough Bread 500g', price: 3 },
        { id: 140, name: 'Swiss Cheese 200g', price: 4 },
        { id: 141, name: 'Black Forest Ham 500g', price: 6 },
        { id: 142, name: 'Rye Bread 500g', price: 2.75 },
        { id: 143, name: 'Gouda Cheese 200g', price: 3.8 },
        { id: 144, name: 'Prosciutto Ham 200g', price: 7 },
        { id: 145, name: 'Multigrain Bread 500g', price: 2.8 },
        { id: 147, name: 'Turkey Ham 500g', price: 5.5 },
        { id: 149, name: 'Feta Cheese 200g', price: 3.9 }
      ];
    const productData = await fetchProductData(productNames);
    console.log('Product Data:', productData);
  } catch (error) {
    console.error('Error in testFetchProductData:', error);
  }
};

testFetchProductData();
  
