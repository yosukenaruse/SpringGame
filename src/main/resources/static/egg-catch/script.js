const { createApp, ref, onMounted } = Vue;

createApp({
    data() {
        return {
            title: '卵キャッチゲーム',
            score: 0,
            gameRunning: false,
            eggSpeed: 2,
            platePos: 175,
            eggLeft: 0,
            eggTop: 0,
            eggDisplay: 'block',
            eggWhiteDisplay: 'none',
            eggWhiteLeft: 0,
            eggWhiteTop: 0,
            eggWhiteWidth: 80,
            brokenEggDisplay: 'none',
            brokenEggLeft: 0,
            brokenEggTop: 0,
            startBtnText: 'スタート',
        }
    },
    computed: {
        eggStyle() {
            return {
                position: 'absolute',
                left: this.eggLeft + 'px',
                top: this.eggTop + 'px',
                display: this.eggDisplay
            }
        },
        eggWhiteStyle() {
            return {
                display: this.eggWhiteDisplay,
                position: 'absolute',
                left: this.eggWhiteLeft + 'px',
                top: this.eggWhiteTop + 'px',
                width: this.eggWhiteWidth + 'px'
            }
        },
        brokenEggStyle() {
            return {
                display: this.brokenEggDisplay,
                position: 'absolute',
                left: this.brokenEggLeft + 'px',
                top: this.brokenEggTop + 'px'
            }
        },
        plateStyle() {
            return {
                position: 'absolute',
                left: (this.platePos - 50) + 'px', // plateのwidth/2=50
                bottom: '0px'
            }
        }
    },
    methods: {
        resetGame() {
            const gameWidth = 400; // #gameのwidth
            this.eggLeft = Math.random() * (gameWidth - 30);
            this.eggTop = 0;
            this.eggDisplay = 'block';
            this.brokenEggDisplay = 'none';
            this.eggWhiteDisplay = 'none';
            this.platePos = 175;
            this.score = 0;
            this.eggSpeed = 2;
            this.startBtnText = 'スタート';
        },
        gameLoop() {
            if (!this.gameRunning) return;

            this.eggTop += this.eggSpeed;

            // 衝突判定
            const eggRight = this.eggLeft + 30;
            const eggBottom = this.eggTop + 40;
            const plateLeft = this.platePos - 50;
            const plateRight = this.platePos + 50;
            const plateTop = 500 - 20; // #game.height - #plate.height

            if (eggBottom >= plateTop) {
                if (eggRight > plateLeft && this.eggLeft < plateRight) {
                    // 成功
                    this.score++;
                    this.eggSpeed += 0.2;
                    const gameWidth = 400;
                    this.eggLeft = Math.random() * (gameWidth - 30);
                    this.eggTop = 0;
                } else {
                    // 失敗
                    this.gameRunning = false;
                    this.eggDisplay = 'none';
                    this.eggWhiteDisplay = 'block';
                    this.eggWhiteLeft = this.eggLeft - 25 + (Math.random() * 20 - 10);
                    this.eggWhiteTop = 500 - 20;
                    this.eggWhiteWidth = 70 + Math.random() * 30;
                    this.brokenEggDisplay = 'block';
                    this.brokenEggLeft = this.eggLeft - 15;
                    this.brokenEggTop = 500 - 15 - 3;
                    setTimeout(() => {
                        alert('ゲームオーバー！最終スコア: ' + this.score);
                        this.startBtnText = 'リスタート';

                        // スコアを保存
                        fetch('/api/game/score?userId=1&score=' + this.score, {
                            method: 'POST'
                        })
                            .then(response => response.text())
                            .then(result => console.log(result))
                            .catch(error => console.error('Error:', error));
                    }, 700);
                }
            }
            if (this.gameRunning) {
                requestAnimationFrame(this.gameLoop);
            }
        },
        movePlate(e) {
            if (!this.gameRunning) return;
            let clientX;
            if (e.type === 'mousemove') {
                clientX = e.clientX;
            } else if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            }
            const rect = this.$refs.game.getBoundingClientRect();
            let pos = clientX - rect.left;
            const minPos = 50;
            const maxPos = 400 - 50;
            if (pos < minPos) pos = minPos;
            if (pos > maxPos) pos = maxPos;
            this.platePos = pos;
        },
        movePlateTouch(e) {
            this.movePlate(e);
        },
        startGame() {
            this.resetGame();
            this.gameRunning = true;
            this.gameLoop();
        }
    },
    mounted() {
        this.resetGame();
    }
}).mount('#app');