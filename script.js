const gameBoard = (() => {
    const rowsDisplay = document.querySelectorAll('div.row');
    let rows = [['X', 'O', 'X'], ['', 'X', ''], ['O', 'O', '']];
    rowsDisplay.forEach(row => {
        for (let i = 0; i < 3; i++) {
            row.children[i].textContent = rows[row.id][i]
        }
    })
    return {rows};
})();
// Arguments should be the 3 rows (updated in "update game" function)

