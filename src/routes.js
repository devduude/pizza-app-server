import DB from './dbHandler.js';


const getOrders = {
  method: 'GET',
  path: '/orders',
  handler: async (request, hapi) => {
    const orderData = await DB.getOrders();

    if (!orderData) return hapi.response({ statusCode: 500, message: 'Couldn\'t get the orders' }).code(500);

    return hapi.response({ statusCode: 200, payload: orderData, message: 'Success' }).code(200);
  },
};

const getOrder = {
  method: 'GET',
  path: '/order/{id}',
  handler: async (request, hapi) => {
    const orderID = request.params.id;

    const orderData = await DB.getOrder(orderID);

    if (!orderData) return hapi.response({ statusCode: 500, message: 'The order was not found!' }).code(500);

    return hapi.response({ statusCode: 200, payload: orderData, message: 'Success' }).code(200);
  },
};

const removeOrder = {
  method: 'POST',
  path: '/order/delete',
  handler: async (request, hapi) => {
    const { orderID } = request.payload;

    const orderData = await DB.removeOrder(orderID);

    if (!orderData) return hapi.response({ statusCode: 500, message: 'The order was not found!' }).code(500);

    return hapi.response({ statusCode: 200, payload: 'The order was removed!', message: 'Success' }).code(200);
  },
};

const addOrder = {
  method: 'POST',
  path: '/order/insert',
  handler: async (request, hapi) => {
    const orderData = request.payload;

    const orderID = await DB.addOrder(orderData);

    if (!orderID) return hapi.response({ statusCode: 500, message: 'The order was not created' }).code(500);

    return hapi.response({ statusCode: 200, message: `The order with id: ${orderID} was created!` }).code(200);
  },
};

const getPizzas = {
  method: 'GET',
  path: '/pizza',
  handler: async (request, hapi) => {
    const pizzaData = await DB.getPizzas();

    if (!pizzaData) return hapi.response({ statusCode: 500, message: 'Couldn\'t get the pizzas' }).code(500);

    return hapi.response({ statusCode: 200, payload: pizzaData, message: 'Success' }).code(200);
  },
};

const addPizza = {
  method: 'POST',
  path: '/pizza/insert',
  handler: async (request, hapi) => {
    const pizzaData = request.payload;

    const pizzaTitle = await DB.addPizza(pizzaData);

    if (!pizzaTitle) return hapi.response({ statusCode: 500, message: 'The pizza was not added' }).code(500);

    return hapi.response({ statusCode: 200, message: `The pizza: ${pizzaTitle} was added!` }).code(200);
  },
};


export default [
  getOrders,
  getOrder,
  addOrder,
  removeOrder,
  getPizzas,
  addPizza,
];
