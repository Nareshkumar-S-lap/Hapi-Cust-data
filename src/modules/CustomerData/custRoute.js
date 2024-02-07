const custController = require('./custController');
const { API_ROUTES } = require('../../common/constants/apiConst');
const { API_METHODS } = require('../../common/constants/apiConst');

module.exports = [
    {
        method: API_METHODS.GET,
        path: API_ROUTES.GET_CUSTOMER,
        handler: custController.getCustomerById
    },
    {
        method: API_METHODS.POST,
        path: API_ROUTES.CREATE_CUSTOMER,
        handler: custController.createCustomer
    },
    {
        method: API_METHODS.PUT,
        path: API_ROUTES.UPDATE_CUSTOMER,
        handler: custController.updateCustomerDetails
    },
    {
        method: API_METHODS.DELETE,
        path: API_ROUTES.DELETE_CUSTOMER,
        handler: custController.softDeleteCustomer
    },
    // Optionally, you can add a route for getting all customers
    {
        method: API_METHODS.GET,
        path: API_ROUTES.GET_ALL_CUSTOMERS,
        handler: custController.getAllCustomers
    }
];

