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

const game = (() => {
    let win = '';
    let currentPlayer = 'X';
    const resetButton = document.querySelector('button#reset');
    resetButton.addEventListener('click', () => {
        reset();
    })
    const updateDisplay = () => {
        const status = document.querySelector('div.game-status');
        if (!win) {
            status.textContent = `Player ${currentPlayer}'s turn`;
        } else {
            const newGame = document.querySelector('button#new-game');
            newGame.style = 'display: flex;'
            resetButton.style = 'display: none;';
            newGame.addEventListener('click', () => {
                reset();
                newGame.style = 'display: none;';
                resetButton.style = 'display: flex;'
            })
            if (!(win === 'tie')) {
                status.textContent = `Player ${win} wins!`
            } else if (win === 'tie') {
                status.textContent = `It's a tie!`
            }
        };
    };
    const play = () => {
        updateDisplay();
        const squares = document.querySelectorAll('div.square');
        squares.forEach(square => {
            square.addEventListener('click', () => {
                if (!square.textContent && !win) {
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
                if (win) {
                    updateDisplay();
                }
            })
        })
    }
    const checkWin = () => {
        board.rows.forEach(row => {
            if (!row.includes(undefined) && row.length === 3) {
                if (row.every((element) => element === 'X')) {
                    return win = 'X';
                } else if (row.every((element) => element === 'O')) {
                    return win = 'O';
                }
            }
        })
        let column = [];
        for (let i = 0; i < 3; i++) {
            for (let z = 0; z < 3; z++) {
                column.push(board.rows[z][i]);
            }
            if (column.join('') === 'XXX') {
                return win = 'X';
            } else if (column.join('') === 'OOO') {
                return win = 'O';
            }
            column.splice(0);
        }
        const diagonals = [[board.rows[0][0], board.rows[1][1], board.rows[2][2]], [board.rows[0][2], board.rows[1][1], board.rows[2][0]]];
        diagonals.forEach(diagonal => {
            if (diagonal.join('') === 'XXX') {
                return win = 'X';
            } else if (diagonal.join('') === 'OOO') {
                return win = 'O';
            }
        });
        if (board.rows.every(row => row.length === 3 && !row.includes(undefined))) {
            return win = 'tie';
        }
    }
    const reset = () => {
        board.reset();
        win = '';
        currentPlayer = 'X';
        updateDisplay();
    }
    return {play, reset};
})();

game.play();


