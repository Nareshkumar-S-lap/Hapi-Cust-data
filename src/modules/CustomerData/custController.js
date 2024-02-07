const custServices = require('./custServices');
// const CustomerQueries = require('../../interfaces/custQuery');
const Boom = require('@hapi/boom');
exports.getCustomerById = async (request, h) => {
  try {
    const customerId = request.params.customerId;
    const customer = await custServices.getCustomerById(customerId);

    if (!customer) {
      throw Boom.notFound("errorConst.ERROR_MESSAGES.NOT_FOUND");
    }

    return customer;
  } catch (error) {
    throw Boom.badRequest("piConst.ERROR_MESSAGES.BAD_REQUEST");
  }
};


exports.getAllCustomers = async (request, h) => {
  try {
    const allCustomers = await custServices.getAllCustomers();
    return allCustomers;
  } catch (error) {
    console.error('Error getting all customers:', error);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};

exports.createCustomer = async (request, h) => {
  try {
    const customerData = request.payload;
    const newCustomer = await custServices.createCustomer(customerData);
    return newCustomer;
  } catch (error) {
    console.error('Error creating customer:', error);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};
exports.updateCustomerDetails = async (request, h) => {
  try {
    const customerId = request.params.customerId;
    const updatedData = request.payload;
    const updatedCustomer = await custServices.updateCustomerDetails(customerId, updatedData);
    return updatedCustomer;
  } catch (error) {
    console.error('Error updating customer details:', error);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};
exports.softDeleteCustomer = async (request, h) => {
  try {
    const customerId = request.params.customerId;
    const updatedCustomer = await custServices.softDeleteCustomer(customerId);

    if (!updatedCustomer) {
      throw new Error('Customer not found');
    }

    if (!updatedCustomer.isActive) {
      return { message: 'Customer is already inactive' }; // Or you can return an appropriate response
    } else {
      return { message: 'Customer soft deleted successfully' };
    } // Closing brace moved to correct position
  } catch (error) {
    console.error('Error soft deleting customer:', error);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};