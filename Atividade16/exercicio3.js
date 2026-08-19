let valorFinal = 0;
for (let p = 2; p < process.argv.length; p++) {
    valorFinal = valorFinal + Number(process.argv[p]);
}
console.log("O total da soma dos argumentos é: " + valorFinal);