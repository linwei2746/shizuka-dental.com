// 自動リビルド: src/ の変更を監視し、保存するたびに dist/ を再生成します。
// 使い方:  npm run watch   （別ターミナルで npm run serve を起動してブラウザ更新）
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const BUILD = path.join(SRC, 'build.js');

function build() {
  const t = Date.now();
  try {
    execFileSync('node', [BUILD], { stdio: 'inherit' });
    console.log(`   (${Date.now() - t}ms) ${new Date().toLocaleTimeString()}\n`);
  } catch (e) {
    console.error('build error:', e.message);
  }
}

build(); // 初回ビルド

let timer = null;
fs.watch(SRC, { recursive: true }, (evt, file) => {
  if (!file || file.startsWith('..')) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(`変更を検知: ${file} → 再ビルド`);
    build();
  }, 150);
});

console.log('👀 src/ を監視中… 編集して保存すると dist/ が自動更新されます（Ctrl+C で終了）\n');
