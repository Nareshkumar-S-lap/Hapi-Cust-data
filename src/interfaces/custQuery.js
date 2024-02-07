const Customer = require('../models/custSchema');

exports.getAllCustomers = async () => {
  try {
    const allCustomers = await Customer.find().lean();
    return allCustomers;
  } catch (error) {
    throw error;
  }
}
exports.getCustomerById = async (customerId) => {
  try {
      const customer = await Customer.findOne({ customerId }).lean();
      return customer;
  } catch (error) {
      throw error;
  }
};

exports.createCustomer = async (customerData) => {
  try {
    const newCustomer = await Customer.create(customerData);
    return newCustomer;
  } catch (error) {
    throw error;
  }
};

exports.updateCustomerById = async (customerId, updatedData) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate({ customerId }, updatedData, { new: true });
    return updatedCustomer;
  } catch (error) {
    throw error;
  }
};

exports.deleteCustomerById = async (customerId) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({ customerId });
    return deletedCustomer;
  } catch (error) {
    throw error;
  }
};
