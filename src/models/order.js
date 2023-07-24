const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      itemPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

orderSchema.virtual('totalAmount').get(function () {
  return this.items.reduce((total, item) => total + (item.itemPrice * item.quantity), 0);
});

module.exports = mongoose.model('Order', orderSchema);
