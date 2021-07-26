const { ObjectId } = require('mongodb');
var mongoose = require('../../database/db');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    belong: {
        type: ObjectId,
        required: true,
    },
    creator: {
        type: ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    quantitySold: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
