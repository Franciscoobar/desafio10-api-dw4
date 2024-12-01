const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;