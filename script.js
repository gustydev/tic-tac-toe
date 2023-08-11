const board = (() => {
    const rows = [[], [], []];
    const update = () => {    
        const rowsDisplay = document.querySelectorAll('div.row');
        rowsDisplay.forEach(row => {
        for (let i = 0; i < 3; i++) {
            row.children[i].textContent = rows[row.id][i]
        }
    })
    }
    const reset = () => {
        rows.map((row) => row.splice(0));
        update();
    }
    return {update, rows, reset};
})();

const newPlayer = (name) => {
    const sayName = () => console.log(`Hello there, ${name}!`)
    return {sayName, name};
}

// gameBoard.update([['X', '', 'X'], ['O', '', 'O'], ['X', 'O', 'X']]);
// Temporary, just to have something on the page

const game = (() => {
    const play = () => {
        const squares = document.querySelectorAll('div.square');
        squares.forEach(square => {
            square.addEventListener('click', () => {
                board.rows[square.parentElement.id][square.classList[1]] = 'X';
                board.update();
            })
        })
    }
    return {play};
})();