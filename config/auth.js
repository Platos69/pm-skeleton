// CARREGANDO MÓDULOS
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
    // Model usuários
    require('../models/Usuario')
    const Usuario = mongoose.model('usuario')

module.exports = function(passport) {

// COMPARAÇÕES
    // Verificação email/senha
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario || typeof usuario == undefined || usuario == null){
                return done(null, false, {message: 'Esta conta não existe'})
            }
            
            // Comparar hash com a a senha
            bcrypt.compare(senha, usuario.senha, (err, condiz) => {
                if(condiz){
                    return done(null, usuario)
                } else {
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })
        })
    }))
    // Salvar dados na sessão/middlewares
    passport.serializeUser((usuario,done)=>{
        done(null,usuario.id)
    })
    
    passport.deserializeUser((id,done)=>{
        Usuario.findById(id).then((usuario)=>{
            done(null,usuario)
        }).catch((err)=>{
             done (null,false,{message:'algo deu errado'})
        })
    })
}

        
       