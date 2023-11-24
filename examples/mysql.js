// Constantes
const Sequelize = require('sequelize')

    // Configuração de conexão Mysql
    const sequelize = new Sequelize('test', 'root', '29052007', {
        host: "localhost",
        dialect: "mysql"
    })

// Feedback de conexão
sequelize.authenticate().then((result) => {
    console.log('Conexão com o banco de dados com sucesso')
}).catch((err) => {
    console.log('Tentativa de conexão com o banco de dados falhou, error: ' + err)
});

// Configuração da tabela "postagens"
const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

    // Postagem.sync({force: true})

// Configuração da tabela "usuarios"    
const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

    // Usuario.sync({force: true})