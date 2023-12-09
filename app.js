// CARREGANDO MODULOS
    // Modulos principais
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const { engine } = require('express-handlebars')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')
    const passport = require('passport')
        // Models
        require('./models/Postagem')
        const Postagem = mongoose.model('postagens')
        require('./models/Categoria')
        const Categoria = mongoose.model('categorias')
        // Definição de rotas
        const admin = require('./routes/admin.js')  
        const usuarios = require('./routes/usuario.js') 
        // Configurações
        require('./config/auth')(passport)

// CONFIGURAÇÕES
        // Sessão
            app.use(session({
                secret: '9de7faa8',
                resave: true,
                saveUninitialized: false}))
                // Passport
                app.use(passport.initialize())
                app.use(passport.session())
            app.use(flash())
        // Global var
            app.use((req, res, next) => {
                res.locals.success_msg = req.flash('success_msg')
                res.locals.error_msg = req.flash('error_msg')
                res.locals.error = req.flash('error')
                next()
            })
        // Body-Parser
            app.use(bodyParser.urlencoded({extended: true}))
            app.use(bodyParser.json())
        // Handlebars
            app.engine('handlebars', engine({defaultLayout: 'main', runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
                },
            }),
            ),
            app.set('view engine', 'handlebars')
            // Mongoose
            mongoose.Promise = global.Promise
            mongoose.connect('mongodb://127.0.0.1:27017/blogapp').then(() => {
                console.log('[BLOGAPP] Conectado ao banco com sucesso!')
            }).catch((err) => {
                console.log(`[BLOGAPP] Erro ao conectar no Banco!\n Erro: ${err}`)
            })
        // Public
            app.use(express.static(path.join(__dirname + '/public')))
            // Middleware    
                app.use((req, res, next) => {
                    console.log('OI EU SOU UM MIDDLEWARE')
                    next()
                })
// ROTAS
    // Cliente
        // 404
        app.get('/404', (req, res) => {
            res.send('Erro 404!')
        })

        // Home
        app.get('/', (req, res) => {
            Postagem.find().populate('categoria').sort({data: 'desc'}).then((postagens) => {
                res.render('index', {postagens: postagens})
            }).catch((err) => {
                req.flash('error_msg', 'Houve um error interno, error: ' + err)
                res.redirect('/404')
            })
        })
        
        // Postagem (lista)
        app.get('/postagem/:slug', (req, res) => {
            Postagem.findOne({slug: req.params.slug}).then((postagem) => {
                if(postagem){
                    res.render('postagem/index', {postagem: postagem})
                } else {
                    req.flash('error_msg', 'Esta postagem não existe')
                    res.redirect('/')
                }
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao carregar a postagem, error: ' + err)
            })
        })

        // Categoria (página)
        app.get('/categorias', (req, res) => {
            Categoria.find().then((categorias) => {
                res.render('categorias/index', {categorias: categorias})
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao carregar a lista de categorias, error: ' + err)
            })
        })
            // Categoria (lista)
            app.get('/categorias/:slug', (req, res) => {
                Categoria.findOne({slug: req.params.slug}).then((categoria) => {
                    if(categoria) {
                        Postagem.find({categoria: categoria._id}).then((postagens) => {
                            res.render('categorias/postagens', {postagens: postagens, categoria: categoria})
                        }).catch((err) => {
                            req.flash('error_msg', 'Houve um error ao listar as postagens')
                            res.redirect('/categorias')
                        })

                    } else {
                        req.flash('error_msg', 'Esta categoria não existe')
                        res.redirect('/categorias')
                    }
                }).catch((err) => {
                    req.flash('error_msg', 'Houve um erro interno ao carregar a lista de postagens desta categoria, error: ' + err)
                })
            })

    // Admin
    app.use('/admin', admin)
    // Usuarios
    app.use('/usuarios', usuarios)

// OUTROS
const PORT = 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})