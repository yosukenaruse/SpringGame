const app = Vue.createApp({
    data() {
        return {
            board: Array(9).fill(''),
            currentPlayer: 'X',
            winner: null,
            gameOver: false,
            userId: 1 // 仮のユーザーID
        }
    },
    computed: {
        status() {
            if (this.winner) {
                return `勝者: ${this.winner}`;
            } else if (this.gameOver) {
                return '引き分けです！';
            } else {
                return `次のプレイヤー: ${this.currentPlayer}`;
            }
        }
    },
    methods: {
        makeMove(index) {
            if (this.board[index] === '' && !this.winner && !this.gameOver) {
                this.board[index] = this.currentPlayer;
                this.checkWinner();
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        },
        checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦
                [0, 4, 8], [2, 4, 6] // 斜め
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (
                    this.board[a] &&
                    this.board[a] === this.board[b] &&
                    this.board[a] === this.board[c]
                ) {
                    this.winner = this.board[a];
                    this.saveGameResult();
                    return;
                }
            }

            if (!this.board.includes('')) {
                this.gameOver = true;
                this.saveGameResult();
            }
        },
        async saveGameResult() {
            try {
                const response = await fetch('/api/game/tic-tac-toe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: this.userId,
                        boardResult: JSON.stringify({
                            board: this.board,
                            winner: this.winner,
                            gameOver: this.gameOver
                        })
                    })
                });

                if (!response.ok) {
                    throw new Error('結果の保存に失敗しました');
                }

                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error('エラー:', error);
            }
        },
        resetGame() {
            this.board = Array(9).fill('');
            this.currentPlayer = 'X';
            this.winner = null;
            this.gameOver = false;
        }
    }
});

app.mount('#app'); 