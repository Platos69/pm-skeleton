// CARREGANDO MÓDULOS
    // Módulos principais
    const express = require('express')
    const router = express.Router()
    const mongoose = require('mongoose')
        // Categorias    
        require('../models/Categoria')
        const Categoria = mongoose.model('categorias')
        // Postagens
        require('../models/Postagem')
        const Postagem = mongoose.model('postagens')

// ROTAS
    // Principal admin
    router.get('/', (req, res) => {
        // res.render('index')
    })

    // Categorias
    router.get('/categorias', (req, res) => {
        Categoria.find().sort({ data: 'desc' }).then((categorias) => {
            res.render('admin/categorias', { categorias: categorias })
        }).catch((err) => {
            req.flash('error_msg', 'Houve um error ao listar as categorias,, error: '  + err)
            res.redirect('/admin')
        })
    })
        // Página de adição de nova categoria
        router.get('/categorias/add', (req, res) => {
            res.render('admin/addcategorias')
        })

            // Direcionamento para validação
            router.post('/categorias/nova', (req, res) => {

                var erros = []

                // Validações
                if (!req.body.nome || typeof req.body.nome == undefined || typeof req.body.nome == null) {
                    erros.push({ texto: 'Nome da categoria inválido' })
                } else if (req.body.nome.length < 2) {
                    erros.push({ texto: 'O nome da categoria muito pequeno' })
                }

                if (!req.body.slug || typeof req.body.slug == undefined || typeof req.body.slug == null) {
                    erros.push({ texto: 'Slug inválido' })
                } else if (req.body.slug.length < 2) {
                    erros.push({ texto: 'Slug muito pequeno' })
                }

                    // Mostrar erros
                    if (erros.length > 0) {
                        res.render('admin/addcategorias', { erros: erros })
                    } else {
                        // Criação da categoria
                        const novaCategoria = {
                            nome: req.body.nome,
                            slug: req.body.slug
                        }

                        new Categoria(novaCategoria).save().then(() => {
                            req.flash('success_msg', 'Categoria criada com sucesso')
                            res.redirect('/admin/categorias')
                        }).catch((err) => {
                            req.flash('error_msg', 'Falha na criação da categoria, error: '  + err)
                            res.redirect('/admin/categorias')
                        })
                    }
            })

        // Página de edição de categoria
        router.get('/categorias/edit/:id', (req, res) => {
            Categoria.findOne({ _id: req.params.id }).then((categoria) => {
                res.render('admin/editcategorias', { categoria: categoria })
            }).catch((err) => {
                req.flash('error_msg', 'Essa categoria não existe')
                res.redirect('/admin/categorias')
            })
        })
            // Direcionamento para validação
            router.post('/categorias/edit', (req, res) => {
                Categoria.findOne({ _id: req.body.id }).then((categoria) => {

                    let erros = []
                    
                    // Validações
                    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
                        erros.push({ texto: 'Nome inválido' })
                    }
                    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
                        erros.push({ texto: 'Slug inválido' })
                    }
                    if (req.body.nome.length < 2) {
                        erros.push({ texto: 'Nome da categoria muito pequeno' })
                    }

                        // Mostrar erros                    
                        if (erros.length > 0) {
                            res.render('admin/editcategorias', { categoria: categoria, erros: erros })
                        } else {
                            // Atualiza banco de dados
                            categoria.nome = req.body.nome
                            categoria.slug = req.body.slug

                            categoria.save().then(() => {
                                req.flash('success_msg', 'Categoria editada com sucesso')
                                res.redirect('/admin/categorias')
                            }).catch((err) => {
                                req.flash('error_msg', 'Erro ao salvar a edição da categoria, error: '  + err)
                                res.redirect('/admin/categorias')
                            })
                        }
                }).catch((err) => {
                    req.flash('error_msg', 'Erro ao editar a categoria, error: '  + err)
                    res.redirect('/admin/categorias')
                })
            })

        // Deletar categoria
        router.post('/categorias/deletar', (req, res) => {
            Categoria.deleteOne({ _id: req.body.id }).then(() => {
                req.flash('success_msg', 'Categoria deletada com sucesso')
                res.redirect('/admin/categorias')
            }).catch((err) => {
                req.flash('error_msg', 'Falha na exclusão da categoria, error: '  + err)
                res.redirect('/admin/categorias')
            })
        })

    //Postagens
    router.get('/postagens', ((req, res) => {

        Postagem.find().populate('categoria').sort({ data: 'desc' }).then((postagens) => {
            res.render('admin/postagens', { postagens: postagens })
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao listar as postagens, error: '  + err)
            res.redirect('/admin')
        })
    }))
        // Página de adição
        router.get('/postagens/add', ((req, res) => {
            Categoria.find().then((categorias) => {
                res.render('admin/addpostagens', { categorias: categorias })
            }).catch((erro) => {
                req.flash('error_msg', 'Houve um error ao carregar o formulário')
                res.render('admin/postagens')
            })
        }))
            // Direcionamento para validação
            router.post('/postagens/nova', ((req, res) => {
                var erros = []

                // Validações
                if (!req.body.titulo || typeof req.body.titulo == undefined || typeof req.body.titulo == null) {
                    erros.push({ texto: 'Nome inválido' })
                } else if (req.body.titulo.length < 2) {
                    erros.push({ texto: 'Título da postagem muito pequeno' })
                }

                if (!req.body.slug || typeof req.body.slug == undefined || typeof req.body.slug == null) {
                    erros.push({ texto: 'Slug inválido' })
                } else if (req.body.slug.length < 2) {
                    erros.push({ texto: 'Slug muito pequeno' })
                }

                if (!req.body.conteudo || typeof req.body.conteudo == undefined || typeof req.body.conteudo == null) {
                    erros.push({ texto: 'Conteúdo inválido' })
                } else if (req.body.slug.length < 2) {
                    erros.push({ texto: 'Conteúdo muito pequeno' })
                }

                if (!req.body.descricao || typeof req.body.descricao == undefined || typeof req.body.descricao == null) {
                    erros.push({ texto: 'Descrição inválida' })
                } else if (req.body.descricao.length < 2) {
                    erros.push({ texto: 'Descrição muito pequena' })
                }

                if (req.body.categoria == '0') {
                    erros.push({ texto: 'Não há categorias criadas' })
                }
                    // Mostra erros
                    if (erros.length > 0) {
                        res.render('admin/addpostagens', { erros: erros })
                    } else {

                        // Adiciona ao banco de dados
                        const novaPostagem = {
                            titulo: req.body.titulo,
                            slug: req.body.slug,
                            descricao: req.body.descricao,
                            conteudo: req.body.conteudo,
                            categoria: req.body.categoria
                        }

                        new Postagem(novaPostagem).save().then(() => {
                            req.flash('success_msg', 'Postagem criada com sucesso')
                            res.redirect('/admin/postagens')
                        }).catch((err) => {
                            req.flash('error_msg', 'Falha na criação da postagem, error: '  + err)
                            res.redirect('/admin/postagens')
                        })
                }
        }))

        // Editar postagens
        router.get('/postagens/edit/:id', (req, res) => {
            Postagem.findOne({_id: req.params.id}).then((postagem) => {
                Categoria.find().then((categorias) => {
                    res.render('admin/editpostagens', {categorias: categorias, postagem: postagem})
                }).catch((err) => {
                    req.flash('error_msg', 'Houve um error ao listar as categorias, error: '  + err)
                    req.redirect('/admin/postagens')
                })
            }).catch((err) => {
                req.flash('error_msg', 'Houve um error ao carregar o formulário de edição, error: '  + err)
                req.redirect('/admin/postagens')
            })
        })
            // Direcionamento para edição
            router.post('/postagens/edit', (req, res) => {
                Postagem.findOne({_id: req.body.id}).then((postagem) => {
                var erros = []

                // Validações
                if (!req.body.titulo || typeof req.body.titulo == undefined || typeof req.body.titulo == null) {
                    erros.push({ texto: "Nome inválido" })
                } else if (req.body.titulo.length < 2) {
                    erros.push({ texto: "Título da postagem muito pequeno" })
                }

                if (!req.body.slug || typeof req.body.slug == undefined || typeof req.body.slug == null) {
                    erros.push({ texto: "Slug inválido" })
                } else if (req.body.slug.length < 2) {
                    erros.push({ texto: "Slug muito pequeno" })
                }

                if (!req.body.conteudo || typeof req.body.conteudo == undefined || typeof req.body.conteudo == null) {
                    erros.push({ texto: "Conteúdo inválido" })
                } else if (req.body.slug.length < 2) {
                    erros.push({ texto: "Conteúdo muito pequeno" })
                }

                if (!req.body.descricao || typeof req.body.descricao == undefined || typeof req.body.descricao == null) {
                    erros.push({ texto: "Descrição inválida" })
                } else if (req.body.descricao.length < 2) {
                    erros.push({ texto: "Descrição muito pequena" })
                }

                if (req.body.categoria == '0') {
                    erros.push({ texto: 'Não há categorias criadas' })
                }

                // Mostra erros
                if (erros.length > 0) {
                    res.render('admin/editpostagens', { postagens: postagem, erros: erros })
                } else {

                    // Atualiza ao banco de dados
                    postagem.titulo = req.body.titulo
                    postagem.slug = req.body.slug
                    postagem.descricao = req.body.descricao
                    postagem.conteudo = req.body.conteudo
                    postagem.categoria = req.body.categoria
                
                    postagem.save().then(() => {
                        req.flash('success_msg', 'Postagem editada com sucesso')
                        res.redirect('/admin/postagens')
                    }).catch((err) => {
                        req.flash('error_msg', 'Error na edição da postagem, error: '  + err)
                        res.redirect('/admin/postagens')
                    })
                    
                }
                }).catch((err) => {
                    req.flash('error_msg', 'Houve um error ao salvar a edição, error: '  + err)
                    res.redirect('/admin/postagens')
                })
            })

        // Deletar Postagem
        router.post('/postagens/deletar', (req, res) => {
            Postagem.deleteOne({ _id: req.body.id }).then(() => {
                req.flash('success_msg', 'Postagem deletada com sucesso')
                res.redirect('/admin/postagens')
            }).catch((err) => {
                req.flash('error_msg', 'Falha na exclusão da postagem, error: '  + err)
                res.redirect('/admin/postagens')
            })
        })

module.exports = router