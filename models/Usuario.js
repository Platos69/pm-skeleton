const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema ({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    IsAdmin: {
        type: Number,
        default: 0
    },
    senha: {
        type: String,
        require: true
    }
})

mongoose.model('usuario', Usuario)