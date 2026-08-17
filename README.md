# 目黒しずか歯科クリニック 公式サイト

ar-dc.com の構成を参考にした、正式開業後のコーポレートサイト（静的HTML）。
小さな静的サイトジェネレーターで `src/` から `dist/` を生成し、`dist/` をそのまま Nginx 等で配信します。

## ディレクトリ構成

```
02.静-new/
├── src/                      ← ★ ソース（ここを編集する）
│   ├── data.js               … クリニック情報・診療内容・お知らせ 等のデータ
│   ├── layout.js             … 共通レイアウト（head / ヘッダー / フッター / CTA）
│   ├── components.js         … 共通パーツ（診療時間表・診療グリッド 等）
│   ├── build.js              … 生成スクリプト（dist/ へ出力）
│   └── content/
│       └── index.js          … トップページの中身
│
├── dist/                     ← ★ 配信する完成サイト（Nginx の公開ディレクトリ）
│   ├── index.html / *.html   … 生成物（手で編集しない）
│   ├── medical/*.html        … 診療案内（生成物）
│   ├── assets/               … css / js / images（★ここは手編集OK。生成対象外）
│   │   ├── css/style.css
│   │   ├── js/main.js
│   │   └── images/…
│   ├── sitemap.xml / robots.txt … 生成物
│
├── reference/                … 参考資料（配信されない・サイトには含めない）
├── package.json              … npm スクリプト
├── .gitignore
└── README.md
```

**考え方**：`src/` は「設計図」、`dist/` は「完成品（配信物）」。
HTML は生成物なので直接編集しない。CSS/JS/画像（`dist/assets/`）は静的パススルーなので直接編集してよい。

## 編集・ビルド・プレビュー

内容（テキスト・構成）を変えたら `src/` を編集し、再ビルドして全ページへ反映します：

```bash
npm run build          # = node src/build.js  → dist/ を再生成
```

ローカルで確認（`dist/` を配信）：

```bash
npm run serve          # = cd dist && python -m http.server 8000
```

→ ブラウザで http://localhost:8000/ を開く（`npm run dev` はビルド＋起動を一括実行）。

- **テキスト/データ**（診療内容・料金・お知らせ・院長情報など）… `src/data.js`
- **ヘッダー/フッター/共通CTA** … `src/layout.js`
- **色・フォント・レイアウト** … `dist/assets/css/style.css`（`:root` の変数で配色を一括変更可・即反映）
- **ページの並びや文章** … トップは `src/content/index.js`、その他は `src/build.js`

## デプロイ

`dist/` の中身をそのまま公開ディレクトリに配置します（Nginx の `root` を `.../dist` に向ける）。
`src/` や `reference/` は配信対象に含めません。

## 配色（ロゴのネイビー＋ゴールドを軸に、旧サイトのオレンジ／グリーンをアクセントに）

| 用途 | 変数 | 色 |
|---|---|---|
| 構造・見出し・フッター | `--navy` | `#1d3252` |
| 上品なアクセント（ロゴ由来）| `--gold` | `#b8975a` |
| CTA・ボタン | `--orange` | `#f39800` |
| 予約・自然のアクセント | `--green` | `#7aa332` |
| 背景（ベース）| `--cream` | `#f8f4ed` |

## 未確定・要差し替え項目

- 院内ギャラリー・設備など一部の**写真**はプレースホルダー表示（`dist/assets/images/` に実写を追加して差し替え）。
- `dist/contact.html` のフォームは**デモ表示**。実送信はサーバー側（メール送信 or フォームサービス）の設定が必要。
- `src/data.js` の**料金・お知らせ**の内容はサンプル。実情報に更新してください。
