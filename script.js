const chars = ['う', 'の', 'ゆ', 'り'];
let intervals = [];
let loopIndices = [0, 0, 0, 0]; // 各リールごとの現在の表示位置

function getRandomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function getLoopChar(index, reelIndex) {
  // index: ルーレット中に使うループ番号（0〜3）
  // reelIndex: reel1〜4 のインデックス（0〜3）
  const char = chars[loopIndices[reelIndex] % chars.length];
  loopIndices[reelIndex]++;
  return char;
}

function startRolling() {
  stopRolling();

  // メッセージ非表示とループインデックス初期化
  document.getElementById('win-message').style.display = 'none';
  loopIndices = [0, 1, 2, 3]; // ずらしておくと「う・の・ゆ・り」から順に見える

  for (let i = 0; i < 4; i++) {
    const reel = document.getElementById(`reel${i + 1}`);
    intervals[i] = setInterval(() => {
      reel.textContent = getLoopChar(i, i);
    }, 100);
  }

  setTimeout(() => {
    stopRolling();
    const result = [];

    for (let i = 0; i < 4; i++) {
      const reel = document.getElementById(`reel${i + 1}`);
      const char = getRandomChar(); // ← 決定時はランダム
      reel.textContent = char;
      result.push(char);
    }

    if (result.join('') === 'うのゆり') {
      triggerWinAnimation();
    }
  }, 5000);
}

function stopRolling() {
  for (let i = 0; i < 4; i++) {
    clearInterval(intervals[i]);
  }
}

function triggerWinAnimation() {
  const message = document.getElementById('win-message');
  message.style.display = 'block';
  message.classList.add('animate');
}