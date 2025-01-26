const mongoose = require('mongoose');
 
 
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        default: 1,
       
    },
    status: {
        type: String,
        default: 'active'
    },
    total: {
        type: Number,
        default: 100
    },  
   
});
 
const Cart = mongoose.model('Cart', cartSchema);
 
module.exports = Cart;
 
