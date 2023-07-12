const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  city:{ type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
