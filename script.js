let playerScore = 0;
let cpuScore = 0;
let kicks = 0;
const maxKicks = 5;

const ball = document.getElementById('ball');
const keeper = document.getElementById('keeper');
const resultText = document.getElementById('result');
const scoreText = document.getElementById('score');
const resetBtn = document.getElementById('resetBtn');

const goalSound = new Audio('sounds/goal.mp3');
const missSound = new Audio('sounds/miss.mp3');

// キーパーの位置（左=0%, 中央=50%, 右=100%）
const keeperPos = { 左: 0, 中央: 50, 右: 100 };

// ゴール確率（戦略性アップ用）
const goalChance = { 左: 0.7, 中央: 0.8, 右: 0.6 };

function shoot(direction) {
    if(kicks >= maxKicks) return;

    // キーパーランダム
    const choices = ['左','中央','右'];
    const keeperChoice = choices[Math.floor(Math.random() * 3)];

    // キーパー移動
    keeper.style.left = keeperPos[keeperChoice] + '%';

    // ボール飛ばす
    let ballTarget = keeperPos[direction];
    ball.style.transition = 'bottom 0.8s ease, left 0.8s ease';
    ball.style.left = ballTarget + '%';
    ball.style.bottom = '100%';

    setTimeout(() => {
        // 成否判定（確率）
        if(keeperChoice === direction && Math.random() > goalChance[direction]) {
            cpuScore++;
            resultText.innerText = `失敗！キーパーが止めた！`;
            missSound.play();
        } else {
            playerScore++;
            resultText.innerText = `成功！ゴール！`;
            goalSound.play();
        }

        scoreText.innerText = `あなた: ${playerScore} | CPU: ${cpuScore}`;
        kicks++;

        // ボールリセット
        ball.style.transition = 'none';
        ball.style.bottom = '0';
        ball.style.left = '50%';

        // ゲーム終了判定
        if(kicks === maxKicks) {
            let finalResult = '';
            if(playerScore > cpuScore) finalResult = 'あなたの勝ち！🎉';
            else if(playerScore < cpuScore) finalResult = 'あなたの負け…😢';
            else finalResult = '引き分け！';
            resultText.innerText += `\n${finalResult}`;
            resetBtn.style.display = 'inline-block';
        }
    }, 800);
}

function resetGame() {
    playerScore = 0;
    cpuScore = 0;
    kicks = 0;
    scoreText.innerText = `あなた: 0 | CPU: 0`;
    resultText.innerText = '';
    resetBtn.style.display = 'none';
}
