// Constantes
    // BodyParser
    const bodyParser = require('body-parser')
    // Engine
    const { engine } = require('express-handlebars')
    // Express
    var express =  require("express");
    const app = express();
    // Handlebars
    const handlebars = require('express-handlebars')
    // Admin (Routes)
    const admin = require("./routes/admin")

// Configurações
    // Host
    const PORT = 8081
    app.listen(PORT, () => {
        console.log("Servidor rodando na url http://localhost:8081")
    });
    // Handlebars
        // Template engine
        app.engine('handlebars', engine({defaultLayout: 'main', runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
            },
        }),
        ),
        app.set('view engine', 'handlebars')
    // Body-Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

// Rotas
    app.use('/admin', admin)
