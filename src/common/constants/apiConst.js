exports.API_ROUTES = {
    GET_CUSTOMER: '/api/customers/{customerId}',
    CREATE_CUSTOMER: '/api/customers',
    UPDATE_CUSTOMER: '/api/customers/{customerId}',
    DELETE_CUSTOMER: '/api/customerFs/{customerId}',
    GET_ALL_CUSTOMERS: '/api/customers' // Add a route for getting all customers
};
// constApi.js

exports.API_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
