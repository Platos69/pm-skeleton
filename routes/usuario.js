// CARREGANDO MÓDULOS
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
            var erros = []

            // Validação aprofundada
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            var senhaRegex = /^(?!.*\s).{8,}$/;
            var nomeRegex =  /^.{3,}$/;


            if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || !nomeRegex.test(req.body.nome)){
                erros.push({texto: 'Nome inválido'})
            } else if (req.body.nome.length < 3) {
                erros.push({texto: 'Nome muito pequeno'})
            } else if (req.body.nome.length > 20) {
                erros.push({texto: 'Nome muito grande'})
            }
 
            if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
                erros.push({texto: 'Email inválido'})
            } else if (!emailRegex.test(req.body.email)){
                erros.push({texto: 'Email inválido'})
            }

            if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null || !senhaRegex.test(req.body.senha)){
                erros.push({texto: 'Senha inválida'})
            } else if (req.body.senha.length < 6) {
                erros.push({texto: 'Senha muito pequena'})
            }

            if(req.body.senhaConfirmar != req.body.senha){
                erros.push({texto: 'Senhas não coincidem'})
            }

                // Mostrar erros
                if(erros.length > 0) {
                    res.render('usuarios/registro', {erros: erros})
                } else {
                    // Verificação de conta existente
                    Usuario.findOne({email: req.body.email}).then((usuario) => {
                        if(usuario){
                            req.flash('error_msg', 'Já existe uma conteúdo com esse email')
                            res.redirect('/usuarios/registro')
                        
                    } else {
                        // Criação de usuário
                        const novoUsuario = new Usuario ({
                            nome: req.body.nome,
                            email: req.body.email,
                            senha: req.body.senha,
                            IsAdmin: req.body.IsAdmin
                        })
                        
                            // Encriptação da senha
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(novoUsuario.senha, salt, (err, hash) => {
                                    if(err) {
                                        req.flash('error_msg', 'Houve um error durante o registro da conta, error: ' + err)
                                        res.redirect('/')
                                    } else {
                                        novoUsuario.senha = hash

                                        novoUsuario.save().then(() => {
                                            req.flash('success_msg', 'Conta criada com sucesso')
                                            res.redirect('/')
                                        }).catch((err) => {
                                            req.flash('error_msg', 'Houve um error ao criar a conta, error: ' + err)
                                            res.redirect('/')
                                        })
                                    }
                                })
                            })
                        }
                    })
                }
                        
        })

        // Login
        router.get('/login', (req, res) => {
            res.render('usuarios/login')
        })
            // Direcionamento para validação 
            router.post('login', (req, res) => {

            })

module.exports = router
