console.log('--- Etapa 1 ---');
agendarEtapaDois();
console.log('--- Etapa 3 ---');

function agendarEtapaDois() {
    setTimeout(function() {
        console.log('--- Etapa 2 (Atrasada) ---');
    }, 20);
}