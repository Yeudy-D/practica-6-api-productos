const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body

    // TODO: PUT /productos/:id - Actualizar producto

    // Validar que vengan los tres campos obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({
            mensaje: 'Los campos nombre, descripcion y precio son obligatorios'
        })
    }

    // Convertir precio a número y validar que sea un número mayor que 0
    const precioNumerico = parseFloat(precio)
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un numero mayor que cero'
        })
    }

    // Generar un id único que no se repita con los productos existentes
    const nuevoId = productos.length > 0
        ? Math.max(...productos.map(p => p.id)) + 1
        : 1

    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio: precioNumerico
    }

    productos.push(nuevoProducto)
    return res.status(201).json(nuevoProducto)
})

// PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // Verificar si el producto existe
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    const { nombre, descripcion, precio } = req.body

    // Validar campos obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({
            mensaje: 'Los campos nombre, descripcion y precio son obligatorios'
        })
    }

    // Convertir precio a número y validar que sea mayor que 0
    const precioNumerico = parseFloat(precio)
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un numero mayor que cero'
        })
    }

    // Actualizar conservando el mismo id
    const productoActualizado = {
        id: productos[indice].id,
        nombre,
        descripcion,
        precio: precioNumerico
    }

    productos[indice] = productoActualizado
    return res.status(200).json(productoActualizado)
})


// TODO: DELETE /productos/:id - Eliminar producto

app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // Verificar si el producto existe
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    // Eliminar el producto del arreglo usando splice()
    const [productoEliminado] = productos.splice(indice, 1)

    return res.status(200).json({
        mensaje: 'Producto eliminado',
        producto: productoEliminado
    })
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
