const board = document.getElementById('board');
        const status = document.getElementById('status');
        let cells = [];
        let currentPlayer = 'X';
        let gameActive = true;

        function createBoard() {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i;
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
                cells.push(cell);
            }
        }

        function handleCellClick(e) {
            const cell = e.target;
            if (cell.textContent !== '' || !gameActive) return;
            cell.textContent = currentPlayer;
            cell.classList.add('taken');
            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                return;
            }
            if (cells.every(cell => cell.textContent !== '')) {
                status.textContent = 'Draw!';
                gameActive = false;
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }

        function checkWin() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return cells[a].textContent &&
                    cells[a].textContent === cells[b].textContent &&
                    cells[a].textContent === cells[c].textContent;
            });
        }

        function restartGame() {
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('taken');
            });
            currentPlayer = 'X';
            status.textContent = "Player X's turn";
            gameActive = true;
        }

        createBoard();