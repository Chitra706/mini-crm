const mongoose = require('mongoose');
const amqp = require('amqplib/callback_api');

mongoose.connect('mongodb://localhost:27017/mini-crm', { useNewUrlParser: true, useUnifiedTopology: true });

const Customer = require('./models/Customer');
const Order = require('./models/Order');

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, channel) => {
    if (err) throw err;
    
    channel.consume('customer_queue', (msg) => {
      const customer = JSON.parse(msg.content.toString());
      Customer.create(customer).then(() => {
        channel.ack(msg);
      });
    }, { noAck: false });

    channel.consume('order_queue', (msg) => {
      const order = JSON.parse(msg.content.toString());
      Order.create(order).then(() => {
        channel.ack(msg);
      });
    }, { noAck: false });
  });
});
