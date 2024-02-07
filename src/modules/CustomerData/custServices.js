
const custQueries = require('../../interfaces/custQuery');
exports.getCustomerById = async (customerId) => {
  try {
    return await custQueries.getCustomerById(customerId);
  } catch (error) {
    throw error;
  }
};

exports.getAllCustomers = async () => {
  try {
    const allCustomers = await custQueries.getAllCustomers();

    // Calculate GST and total amount for each purchase for all customers
    allCustomers.forEach(customer => {
      customer.purchaseHistory.forEach(purchase => {
        // Assuming GST rate is determined based on product price ranges
        const productPrice = purchase.productPrice;
        const gstRate = calculateGSTRate(productPrice);
        purchase.gstRate = gstRate;

        // Calculate GST amount
        purchase.gstAmount = productPrice * gstRate;

        // Calculate total amount including GST
        purchase.totalAmount = productPrice + purchase.gstAmount;
      });
    });

    return allCustomers;
  } catch (error) {
    throw error;
  }
};

// Function to calculate GST rate based on product price range
function calculateGSTRate(productPrice) {
  // Define GST rate ranges and their corresponding rates
  const GST_RATE_RANGES = [
    { minPrice: 0, maxPrice: 100, rate: 0.05 },   // Example: 5% GST for products priced between 0 and 100
    { minPrice: 101, maxPrice: 500, rate: 0.1 },  // Example: 10% GST for products priced between 101 and 500
    { minPrice: 501, maxPrice: 1000, rate: 0.15 },// Example: 15% GST for products priced between 501 and 1000
    // Add more ranges as needed
  ];

  // Find the applicable GST rate based on product price
  const applicableRange = GST_RATE_RANGES.find(range => productPrice >= range.minPrice && productPrice <= range.maxPrice);
  if (applicableRange) {
    return applicableRange.rate;
  } else {
    // Default GST rate if no applicable range is found
    return 0.18; // Example: Default 18% GST if product price doesn't fall into any defined range
  }
}
exports.createCustomer = async (customerData) => {
  try {
    const { firstName, lastName, email, phone, address, preferences, purchaseHistory } = customerData;

    // Calculate GST and total amount for each purchase
    purchaseHistory.forEach(purchase => {
      // Assuming GST rate is determined based on product price ranges
      const productPrice = purchase.productPrice;
      const quantity = purchase.quantity;
      const gstRate = calculateGSTRate(productPrice);
      purchase.gstRate = gstRate;

      // Calculate GST amount
      purchase.gstAmount = productPrice * gstRate * quantity;

      // Calculate total amount including GST
      purchase.totalAmount = (productPrice + purchase.gstAmount) * quantity;
    });

    // Create the customer with the updated purchase details
    const newCustomer = await custQueries.createCustomer({ firstName, lastName, email, phone, address, preferences, purchaseHistory });

    return newCustomer;
  } catch (error) {
    throw error;
  }
};

exports.updateCustomerDetails = async (customerId, updatedData) => {
  try {
    const updatedCustomer = await custQueries.updateCustomerById(customerId, updatedData);
    if (!updatedCustomer) {
      throw new Error('Customer not found');
    }
    return updatedCustomer;
  } catch (error) {
    throw error;
  }
};

exports.softDeleteCustomer = async (customerId) => {
  try {
    const updatedCustomer = await custQueries.updateCustomerById(customerId, { isActive: false });
    if (!updatedCustomer) {
      throw new Error('Customer not found');
    }
    return updatedCustomer;
  } catch (error) {
    throw error;
  }
};
