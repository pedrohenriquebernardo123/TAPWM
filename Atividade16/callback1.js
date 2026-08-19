const lerTerminal = require('prompt-sync')();

function darOi(pessoa) {
    console.log('=> Olá, ' + pessoa + ' <=');
}

function perguntarNome(cb) {
    let digitado = lerTerminal('Qual é o seu nome? ');
    cb(digitado);
}

perguntarNome(darOi);