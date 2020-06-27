const getOrders = {
  method: 'GET',
  path: '/orders',
  handler: async (request, hapi) => {
    // const orderData = await DB.getOrders();
    const orderData = 'Nice stuff';

    if (!orderData) return hapi.response({ statusCode: 500, message: 'Failure' }).code(500);

    return hapi.response({ statusCode: 200, payload: orderData, message: 'Success' }).code(200);
  },
};

const getOrderById = {
  method: 'GET',
  path: '/order/{id}',
  handler: async (request, hapi) => {
    const orderID = request.params.id;

    // const orderData = await DB.getOrderById(orderID);
    const orderData = `Nice stuff, ${orderID}`;

    if (!orderData) return hapi.response({ statusCode: 500, message: 'Failure' }).code(500);

    return hapi.response({ statusCode: 200, payload: orderData, message: 'Success' }).code(200);
  },
};

const postOrder = {
  method: 'POST',
  path: '/order',
  handler: async (request, hapi) => {
    const orderData = request.payload;

    // const dbResponse = await DB.addOrder(orderData);
    console.log(orderData);

    const dbResponse = 21312;

    if (dbResponse == 'fail') return hapi.response({ statusCode: 500, message: 'Failure' }).code(500);

    return hapi.response({ statusCode: 200, message: 'Order was successful' }).code(200);
  },
};


export default [
  getOrders,
  getOrderById,
  postOrder,
];
