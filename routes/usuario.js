// CARREGANDO MÓDULOS
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
    // Usuarios
    require('../models/Usuario')
    const Usuario = mongoose.model('usuario')

// ROTAS
    // Registro
    router.get('/registro', (req, res) => {
        res.render('usuarios/registro')
    }) 
        // Direcionando para validação
        router.post('/registro', (req, res) => {
            debugger
            var erros = []

            // Validação
            if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
                erros.push({texto: 'Nome inválido'})
            } else if (req.body.nome.length < 3) {
                erros.push({texto: 'Nome muito pequeno'})
            }

                // Validações aprofundadas
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
                    erros.push({texto: 'Email inválido'})
                } else if (!emailRegex.test(req.body.email)){
                    erros.push({texto: 'Email inválido'})
                }

                if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
                    erros.push({texto: 'Senha inválida'})
                } else if (req.body.senha.length < 6) {
                    erros.push({texto: 'Senha muito pequena'})
                }

                if(req.body.senha != req.body.senhaConfirmar){
                    erros.push({texto: 'Senhas não coincidem'})
                }

                    // Mostrar erros
                    if(erros.length > 0) {
                        res.render('usuarios/registro', {erros: erros})
                    } else {

                    }
        })

module.exports = router