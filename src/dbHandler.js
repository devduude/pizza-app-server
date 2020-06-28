import { Sequelize } from 'sequelize';
import config from 'config';


const dbURL = process.env.DATABASE_URL || config.get('sequelize.url');

const sequelize = new Sequelize(
  dbURL,
  {
    dialect: 'postgres',
    dialectOptions: { ssl: { rejectUnauthorized: false } },
  }
);

const Orders = sequelize.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderID: {
    type: Sequelize.STRING,
    field: 'order_id',
  },
  orderDate: {
    type: Sequelize.DATE,
    field: 'order_date',
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
  },
  address: {
    type: Sequelize.STRING,
    field: 'address',
  },
  priceUSD: {
    type: Sequelize.INTEGER,
    field: 'price_usd',
  },
  priceEUR: {
    type: Sequelize.INTEGER,
    field: 'price_eur',
  },
  phone: {
    type: Sequelize.STRING,
    field: 'phone',
  },
});


class DBhandler {
  constructor () {
    this.client = sequelize;
    this.orders = Orders;

    this.init();
  }

  async init () {
    try {
      await this.client.sync();
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders () {
    try {
      const data = await this.orders.findAll();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrder (orderID) {
    try {
      const data = await this.orders.findOne({
        where: { orderID },
        raw: true,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addOrder (orderDetails) {
    try {
      const data = await this.orders.create(orderDetails);

      return data.orderID;
    } catch (error) {
      console.log(error);
    }
  }

  async removeOrder (orderID) {
    try {
      const data = await this.orders.destroy({
        where: { orderID },
        raw: true,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

const DB = new DBhandler();


export default DB;
