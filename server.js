/*
    RESTFULL COM EXPRESS
 */
const express = require('express');
const app = express();
const path = require('path');

var strFile = __dirname + '/base.json';
var detalhes = require(strFile);

app.use(express.json());

/*
    app.get '/' resp.send vai enviar apenas uma mensagem quando a url for /
 */
app.get('/', function (req, res)
{
    res.send('TESTANDO SERVIÇOS REST');
});
/*
    Essa rota faz o envio de um arquivo .html para browser passando a path do arquivo
 */
app.get('/ramal', function (req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
});
/*
    Essa rota faz um GET e retorna todas as pessoas de nossa base.json
 */
app.get('/pessoas', function (req, res) {
    res.json(detalhes);
});
/*
    Essa também faz um GET, mas se especifica um id para pesquisa apenas de um registro
 */
app.get('/pessoas/:id', function (req, res)
{
    const pessoa =  detalhes.find(pessoa => pessoa.id === parseInt(req.params.id));
    if(!pessoa) res.status(404).send('Nada encontrado');
    res.json(pessoa);
});
/*
    Esse eu faço uma requisição do tipo POST, para inserir mais um objeto na minha lista de pessoas
 */
app.post('/pessoas', function (req, res) {
    const pessoa = {
        id : detalhes.length + 1,
        nome : req.body.nome,
        idade : req.body.idade,
        cidade : req.body.cidade
    };
    if(req.body.nome === '' || req.body.idade === '' || req.body.cidade === ''){
        res.send("DADOS INVALIDOS");
    }else {
        detalhes.push(pessoa);
        res.send(pessoa);
        res.end();
    }
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening Server ' + port));