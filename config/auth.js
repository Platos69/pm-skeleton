// CARREGANDO MÓDULOS
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
    // Model usuários
    require('../models/Usuario')
    const Usuario = mongoose.model('usuario')

module.exports = function(passport) {

    // COMPARAÇÕES
        // Verificação email/email
        passport.use(new localStrategy({usernameField: 'email'}, (email, senha, done) => {
            Usuario.findOne({email: email}).then((usuario) => {
                if(!usuario){
                    return done(null, false, {message: 'Esta conta não existe'})
                }
                
                // Comparar hash com a a senha
                bcrypt.compare(senha, usuario.senha, (err, condiz) => {
                    if(condiz){
                        return done(null, user)
                    } else {
                        return done(null, false, {message: 'Senha incorreta'})
                    }
                })
            })
        }))
        
        // Salvar dados na sessão/middlewares
        passport.serializeUser((usuario, done) => {
            done(null, usuario.id)
        })

        passport.deserializeUser((id, done) => {
            UserActivation.findById(id, (err, usuario) => {
                done(err, user)
            })
        })
            
}

        
       