const app = Vue.createApp({
    data() {
        return {
            SIZE: 5,
            board: [],
            emptyPosition: 24,
            moveCount: 0,
            isSolved: false,
            userId: 1  // デフォルトのユーザーID
        }
    },
    computed: {
        TOTAL_TILES() {
            return this.SIZE * this.SIZE;
        }
    },
    methods: {
        initializePuzzle() {
            this.board = [];
            this.moveCount = 0;
            this.isSolved = false;
            
            // 論理的なボードを初期化
            for (let i = 0; i < this.TOTAL_TILES; i++) {
                this.board.push(i < this.TOTAL_TILES - 1 ? i + 1 : 0);
            }
            
            this.emptyPosition = this.TOTAL_TILES - 1;
            this.shufflePuzzle();
        },
        handleTileClick(position) {
            if (this.isSolved) return;
            
            if (this.canMove(position)) {
                this.moveTile(position);
                this.checkWin();
            }
        },
        canMove(position) {
            const row = Math.floor(position / this.SIZE);
            const col = position % this.SIZE;
            const emptyRow = Math.floor(this.emptyPosition / this.SIZE);
            const emptyCol = this.emptyPosition % this.SIZE;
            
            return (row === emptyRow && Math.abs(col - emptyCol) === 1) || 
                   (col === emptyCol && Math.abs(row - emptyRow) === 1);
        },
        moveTile(position) {
            const temp = this.board[position];
            this.board[position] = this.board[this.emptyPosition];
            this.board[this.emptyPosition] = temp;
            
            this.emptyPosition = position;
            this.moveCount++;
        },
        getValidMoves() {
            const row = Math.floor(this.emptyPosition / this.SIZE);
            const col = this.emptyPosition % this.SIZE;
            const validMoves = [];
            
            if (row > 0) validMoves.push(this.emptyPosition - this.SIZE);
            if (row < this.SIZE - 1) validMoves.push(this.emptyPosition + this.SIZE);
            if (col > 0) validMoves.push(this.emptyPosition - 1);
            if (col < this.SIZE - 1) validMoves.push(this.emptyPosition + 1);
            
            return validMoves;
        },
        shufflePuzzle() {
            for (let i = 0; i < 10; i++) {
                const possibleMoves = this.getValidMoves();
                if (possibleMoves.length > 0) {
                    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                    const temp = this.board[randomMove];
                    this.board[randomMove] = this.board[this.emptyPosition];
                    this.board[this.emptyPosition] = temp;
                    this.emptyPosition = randomMove;
                }
            }
            
            this.moveCount = 0;
        },
        async saveScore() {
            try {
                const response = await fetch('/api/game/score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: this.userId,
                        score: this.moveCount,
                        gameType: 'SLIDE_PUZZLE'
                    })
                });

                if (!response.ok) {
                    throw new Error('スコアの保存に失敗しました');
                }

                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error('エラー:', error);
                alert('スコアの保存に失敗しました');
            }
        },
        checkWin() {
            for (let i = 0; i < this.TOTAL_TILES - 1; i++) {
                if (this.board[i] !== i + 1) {
                    return false;
                }
            }
            
            if (this.board[this.TOTAL_TILES - 1] === 0) {
                this.isSolved = true;
                this.saveScore();  // スコアを保存
                setTimeout(() => {
                    alert(`おめでとうございます！${this.moveCount}手でクリアしました！`);
                }, 100);
            }
        },
        solvePuzzle() {
            this.board = [];
            for (let i = 0; i < this.TOTAL_TILES; i++) {
                this.board.push(i < this.TOTAL_TILES - 1 ? i + 1 : 0);
            }
            this.emptyPosition = this.TOTAL_TILES - 1;
            this.moveCount = 0;
            this.isSolved = true;
        }
    },
    mounted() {
        this.initializePuzzle();
    }
});

app.mount('#app'); 