const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

/*conexão com o HANDLEBARS*/
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/dadovaci/insertdadovaci', (req, res) => {
    
    /*DADOS INSERIDOS*/
    const idade = req.body.idade
    const local = req.body.local
    const quantvac = req.body.quantvac
    const datanasc = req.body.datanasc
    const cpf = req.body.cpf
    const nome = req.body.nome


/*SELECT DAS INFORMAÇÕES ABAIXO:*/
    const sql = `INSERT INTO dadovaci (idade,local,quantvac,datanasc,cpf,nome) VALUES ('${idade}','${local}','${quantvac}','${datanasc}','${cpf}','${nome}')`
    conn.query(sql, function(err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/')
    })

})

/*rota para outro lugar*/
app.get('/dadovaci', (req, res) => {
    const sql = "SELECT*FROM  dadovaci "
    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const dadovaci = data
        console.log(dadovaci)
        res.render('dadovaci', { dadovaci })
    })
})


/*Const que busca os dados : */
app.get('/dadovaci/:id', (req,res) =>{
   
    const id = req.params.id

    const sql = `SELECT * FROM dadovaci WHERE id = ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)

        }
       
        const dadovac = data[0]

        res.render('dadovac',{dadovac})

    })
})


/*CRIAÇÃO DA CONEXÃO COM O MYSQL*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jandefake3',
    database: 'nodemysql3',

})

/*CASO OCORRA ERRO VAI EXIBIR NO LOG*/
conn.connect(function(err) {
    if (err) {
        console.log(err)
    }
    console.log('banco conectado')

    app.listen(3000)
})