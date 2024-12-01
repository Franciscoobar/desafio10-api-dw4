const express = require('express');
const mongoose = require('mongoose');
const Product = require('./Product.js');

const app = express();
const port = 3000;


app.use(express.json());

app.get('/productos', async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(productos); 
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});


app.post('/agregar-producto', async (req, res) => {
    const { nombre, precio, descripcion } = req.body;

    try {
        const producto = new Product({ nombre, precio, descripcion });
        await producto.save();
    res.status(201).send('Producto agregado');
    } catch (error) {
    res.status(500).send('Error al agregar el producto');
    }
});


app.put('/actualizar-producto/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;

    try {
    const producto = await Product.findByIdAndUpdate(id, { nombre, precio, descripcion }, { new: true });
        res.json(producto);
    } catch (error) {
        res.status(500).send('Error al actualizar el producto');
    }
});


app.delete('/eliminar-producto/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.send('Producto eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar el producto');
    }
});

const mongoURI = 'mongodb+srv://franciscoagustinbar9:5IKxR7aBpwKO1jqO@mibasededatos.1tgkd.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.log('Error de conexión a MongoDB Atlas:', err));



app.get('/', (req, res) => {
res.send('Servidor funcionando');
});


app.listen(port, () => {
console.log(`Servidor corriendo en http://localhost:${port}`);
});

