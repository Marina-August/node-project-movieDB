const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  totalPrice:{ type: Number, required: true }
});

const OrderProduct = mongoose.model('OrderProduct', orderProductSchema);

module.exports = OrderProduct;