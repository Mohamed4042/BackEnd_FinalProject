
const mongoose = require('mongoose');

// Rating Sub-schema
const ratingSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true,
        min: 0, 
        max: 5,
    },
    count: {
        type: Number,
        required: true,
        min: 0, 
    },
});

// Define the Product Schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$|\/uploads\/.+\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?)$/.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    rating: {
        type: ratingSchema,
        required: true,
    },
}, { timestamps: true }); 

// Create and Export the Product Model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
