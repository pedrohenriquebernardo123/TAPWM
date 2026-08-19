const moduloFS = require('fs');
const textoLido = moduloFS.readFileSync('file.txt');

console.log("== Lendo arquivo de texto ==");
console.log(textoLido.toString());
