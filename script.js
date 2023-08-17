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
    const restart = document.querySelector('button#restart');
    restart.addEventListener('click', () => {
        reset();
    })
    const updateDisplay = () => {
        const status = document.querySelector('div.game-status');
        if (!win) {
            status.textContent = `Player ${currentPlayer}'s turn`;
        } else {
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
            const currentSquare = (value) => {
                if (value) {
                    return board.rows[square.parentElement.id][square.classList[1]] = value;
                }
                return board.rows[square.parentElement.id][square.classList[1]];
            }
            square.addEventListener('click', () => {
                if (!currentSquare() && !win) {
                    if (currentPlayer === 'X') {
                        currentSquare('X');
                        currentPlayer = 'O'
                        updateDisplay();
                    } else {
                        currentSquare('O');
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
            square.addEventListener('mouseenter', () => {
                if (!currentSquare() && !win) {
                    square.innerHTML = `<span style='opacity: 0.5;'>${currentPlayer}</span>`
                }
            })
            square.addEventListener('mouseleave', () => {
                if (!currentSquare()) {
                    square.textContent = '';
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
        if (board.rows.every(row => row.length === 3 && !row.includes(undefined)) && !win) {
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