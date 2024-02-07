const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    customerId: { type: String, default: uuidv4(), unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
    },
    preferences: { type: [String] },
    purchaseHistory: [
      {
         orderId: { type: String, default: uuidv4(), unique: true },
        date: { type: Date },
        productName: { type: String, required: true },
        productPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        gstRate: { type: Number },
        gstAmount: { type: Number },
        totalAmount: { type: Number },
      },
    ],
    isActive: { type: Boolean, default: true }, // Active flag
  },
  {
    timestamps: true,
    // Specify the fields to exclude from the response
  }
);

module.exports = mongoose.model('CustomerDetails', customerSchema);
