// CARREGANDO MÓDULOS
    // Módulos principais
    const mongoose = require('mongoose')
    const Schema  = mongoose.Schema

// MODELO
const Categoria = new Schema({
    nome: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

// EXPORTANDO
mongoose.model('categorias', Categoria)