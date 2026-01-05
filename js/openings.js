// Base de datos de aperturas de ajedrez
var OPENINGS_DATABASE = [
    { moves: 'e4', name: 'Apertura del Peón de Rey' },
    { moves: 'd4', name: 'Apertura del Peón de Dama' },
    { moves: 'e4 e5', name: 'Apertura Abierta' },
    { moves: 'e4 e5 Nf3', name: 'Apertura Italiana/Española (preparación)' },
    { moves: 'e4 e5 Nf3 Nc6 Bb5', name: 'Apertura Española (Ruy López)' },
    { moves: 'e4 e5 Nf3 Nc6 Bc4', name: 'Apertura Italiana' },
    { moves: 'e4 e5 Nf3 Nc6 d4', name: 'Gambito Escocés' },
    { moves: 'e4 e5 Nf3 Nf6', name: 'Defensa Petrov' },
    { moves: 'e4 e5 Nf3 f5', name: 'Contragambito Letón' },
    { moves: 'e4 e5 f4', name: 'Gambito de Rey' },
    { moves: 'e4 e5 Nc3', name: 'Apertura Vienesa' },
    { moves: 'e4 c5', name: 'Defensa Siciliana' },
    { moves: 'e4 c5 Nf3', name: 'Siciliana Abierta' },
    { moves: 'e4 c5 Nf3 d6', name: 'Siciliana Najdorf (preparación)' },
    { moves: 'e4 c5 Nf3 Nc6', name: 'Siciliana Sveshnikov/Acelerada' },
    { moves: 'e4 c6', name: 'Defensa Caro-Kann' },
    { moves: 'e4 e6', name: 'Defensa Francesa' },
    { moves: 'e4 d5', name: 'Defensa Escandinava' },
    { moves: 'e4 Nf6', name: 'Defensa Alekhine' },
    { moves: 'e4 g6', name: 'Defensa Moderna' },
    { moves: 'd4 d5', name: 'Apertura Cerrada' },
    { moves: 'd4 Nf6', name: 'Defensa India' },
    { moves: 'd4 Nf6 c4', name: 'Apertura India (preparación)' },
    { moves: 'd4 Nf6 c4 e6', name: 'Defensa India de Rey/Nimzoindia' },
    { moves: 'd4 Nf6 c4 g6', name: 'Defensa India de Rey' },
    { moves: 'd4 d5 c4', name: 'Gambito de Dama' },
    { moves: 'd4 d5 c4 e6', name: 'Gambito de Dama Rehusado' },
    { moves: 'd4 d5 c4 dxc4', name: 'Gambito de Dama Aceptado' },
    { moves: 'd4 d5 c4 c6', name: 'Defensa Eslava' },
    { moves: 'd4 f5', name: 'Apertura Holandesa' },
    { moves: 'Nf3', name: 'Apertura Réti/Zukertort' },
    { moves: 'c4', name: 'Apertura Inglesa' },
    { moves: 'c4 e5', name: 'Inglesa Invertida' },
    { moves: 'f4', name: 'Apertura Bird' },
    { moves: 'e4 e5 Nf3 Nc6 Bb5 a6', name: 'Española: Variante Morphy' },
    { moves: 'e4 e5 Nf3 Nc6 Bc4 Bc5', name: 'Giuoco Piano' },
    { moves: 'e4 e5 Nf3 Nc6 Bc4 Nf6', name: 'Defensa de los Dos Caballos' }
];

function detectOpening(moveHistory) {
    if (!moveHistory || moveHistory.length === 0) {
        return 'Posición inicial';
    }

    var movesString = moveHistory.map(function(m) { return m.san; }).join(' ');

    // Buscar la apertura más larga que coincida
    var longestMatch = null;
    var maxLength = 0;

    for (var i = 0; i < OPENINGS_DATABASE.length; i++) {
        var opening = OPENINGS_DATABASE[i];
        if (movesString.indexOf(opening.moves) === 0 && opening.moves.length > maxLength) {
            longestMatch = opening;
            maxLength = opening.moves.length;
        }
    }

    return longestMatch ? longestMatch.name : 'Posición no catalogada';
}
