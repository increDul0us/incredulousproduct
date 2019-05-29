const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    product_name: {
        type: String
    },
    product_description: {
        type: String
    },
    product_category: {
        type: String
    },
    product_color: {
        type: String
    },
    product_image: { 
        data: Buffer, 
        contentType: String
    },
    product_price: {
        type: Number
    }
}, 
{   
    timestamps: true
});

module.exports = mongoose.model('Product', Product);