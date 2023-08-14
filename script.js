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
        let currentPlayer = 'X';
        const currentDisplay = document.querySelector('div.current-player');
        const updateDisplay = () => {
            currentDisplay.textContent = `Player ${currentPlayer}'s turn`;
        };
        updateDisplay();
        const squares = document.querySelectorAll('div.square');
        squares.forEach(square => {
            square.addEventListener('click', () => {
                if (!square.textContent) {
                    if (currentPlayer === 'X') {
                        board.rows[square.parentElement.id][square.classList[1]] = 'X';
                        currentPlayer = 'O'
                        updateDisplay();
                    } else {
                        board.rows[square.parentElement.id][square.classList[1]] = 'O';
                        currentPlayer = 'X'
                        updateDisplay();
                    }
                }
                board.update();
                checkWin();
            })
        })
    }
    const checkWin = () => {
        board.rows.forEach(row => {
            if (!row.includes(undefined) && row.length === 3) {
                if (row.every((element) => element === 'X')) {
                    alert('Player X wins!');
                    // board.reset();
                } else if (row.every((element) => element === 'O')) {
                    alert('Player O wins!');
                }
            }
        })
        let column = [];
        for (let i = 0; i < 3; i++) {
            for (let z = 0; z < 3; z++) {
                column.push(board.rows[z][i]);
            }
            if (column.join('') === 'XXX') {
                alert('Player X wins!')
            } else if (column.join('') === 'OOO') {
                alert('Player O wins!')
            }
            column.splice(0);
        }
        const diagonals = [[board.rows[0][0], board.rows[1][1], board.rows[2][2]], [board.rows[0][2], board.rows[1][1], board.rows[2][0]]];
        diagonals.forEach(diagonal => {
            if (diagonal.join('') === 'XXX') {
                alert('Player X wins!')
            } else if (diagonal.join('') === 'OOO') {
                alert('Player O wins!')
            }
        });
    }
    return {play, checkWin};
})();

game.play();

// 0[0] 1[1] 2[2]
// 0[2] 1[1] 2[0]

// board.rows[0][0], board.rows[1][1], board.rows[2][2] === 'X'


