const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  productid: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },  
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('shoppingcart', cartSchema);