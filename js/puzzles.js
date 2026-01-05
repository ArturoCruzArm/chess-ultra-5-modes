// Base de datos de puzzles tácticos
var PUZZLES_DATABASE = [
    {
        id: 1,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
        solution: ['Qxf7+'],
        theme: 'Mate en 1',
        difficulty: 1,
        hint: 'La dama puede dar jaque mate capturando en f7'
    },
    {
        id: 2,
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
        solution: ['Qxf7+'],
        theme: 'Mate del pastor',
        difficulty: 1,
        hint: 'Jaque mate capturando el peón f7'
    },
    {
        id: 3,
        fen: 'rnbqkb1r/pppp1ppp/5n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
        solution: ['Qxf7+'],
        theme: 'Mate en 1',
        difficulty: 1,
        hint: 'Captura en f7 con jaque mate'
    },
    {
        id: 4,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 6 5',
        solution: ['Qxf7+', 'Kxf7', 'Bxf7'],
        theme: 'Sacrificio de dama',
        difficulty: 2,
        hint: 'Sacrifica la dama para ganar material'
    },
    {
        id: 5,
        fen: 'r1bqkbnr/pppp1Qpp/2n5/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
        solution: [],
        theme: 'Mate en 0 (ya está mate)',
        difficulty: 1,
        hint: 'La posición ya es jaque mate'
    },
    {
        id: 6,
        fen: 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3',
        solution: [],
        theme: 'Mate del loco (ya hecho)',
        difficulty: 1,
        hint: 'Las negras ya han dado mate'
    },
    {
        id: 7,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 6 4',
        solution: ['Ng5'],
        theme: 'Amenaza de mate',
        difficulty: 2,
        hint: 'Mueve el caballo para amenazar f7'
    },
    {
        id: 8,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
        solution: ['Bxf7+'],
        theme: 'Jaque descubierto',
        difficulty: 2,
        hint: 'Captura el peón con jaque'
    },
    {
        id: 9,
        fen: '2kr3r/ppp2ppp/2n5/2b1p3/2B1P1bq/3P1N1P/PPP2PP1/RNBQ1RK1 w - - 0 9',
        solution: ['Nxe5'],
        theme: 'Táctica de doble ataque',
        difficulty: 3,
        hint: 'Captura el peón central'
    },
    {
        id: 10,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 5',
        solution: ['Bxf2+', 'Kxf2', 'Nxe4+'],
        theme: 'Combinación táctica',
        difficulty: 3,
        hint: 'Sacrifica el alfil para ganar el peón e4'
    }
];

var currentPuzzle = null;
var puzzleIndex = 0;
var puzzleSolutionIndex = 0;

function loadPuzzle(index) {
    if (index < 0 || index >= PUZZLES_DATABASE.length) {
        index = 0;
    }
    puzzleIndex = index;
    currentPuzzle = PUZZLES_DATABASE[index];
    puzzleSolutionIndex = 0;
    return currentPuzzle;
}

function getNextPuzzle() {
    puzzleIndex = (puzzleIndex + 1) % PUZZLES_DATABASE.length;
    return loadPuzzle(puzzleIndex);
}

function checkPuzzleMove(move) {
    if (!currentPuzzle || !currentPuzzle.solution || currentPuzzle.solution.length === 0) {
        return { correct: true, complete: true, message: 'Puzzle completado (sin solución)' };
    }

    var expectedMove = currentPuzzle.solution[puzzleSolutionIndex];

    if (move.san === expectedMove) {
        puzzleSolutionIndex++;

        if (puzzleSolutionIndex >= currentPuzzle.solution.length) {
            return { correct: true, complete: true, message: 'Puzzle resuelto correctamente!' };
        }
        return { correct: true, complete: false, message: 'Correcto! Continúa...' };
    }

    return { correct: false, complete: false, message: 'Incorrecto. Intenta de nuevo.' };
}

function getPuzzleHint() {
    return currentPuzzle ? currentPuzzle.hint : 'No hay pista disponible';
}
