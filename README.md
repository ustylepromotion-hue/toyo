# 豊橋まちあるきスタンプ ルートメーカー

豊橋まちあるきスタンプの対象スポットから、開始地点・中継地点・終了地点を選ぶだけで、巡回順を自動で並び替えて Google マップで開ける静的 Web アプリです。

## 構成

- `index.html`: メタ情報、UI 構造、OGP 設定
- `style.css`: 画面デザインとレスポンシブ対応
- `app.js`: スポット定義、ルート最適化、共有・コピー処理
- `toyohashi_stamp_route_app_spec.md`: 要件・仕様メモ
- `KNOWLEDGE_v1.1.md`: 運用・背景情報

## ローカル確認

ビルドは不要です。静的ファイルをそのまま配信できます。

```bash
cd /Users/ust/Desktop/toyo
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080/` を開いて確認します。

## 更新ポイント

### スポットを追加・修正する

- `app.js` の `spots` 配列を更新します
- 初期選択を変える場合は `renderSelects()` と `resetSelections()` も合わせて更新します
- 同一地点を排他にしたい場合は `sameLocationPairs` を使います

### 文言や SNS 共有を変える

- 画面文言は `index.html` を更新します
- シェア文言は `app.js` の `buildShareUrl()` を更新します

### 公開 URL が決まったあとにやること

- `index.html` の `canonical`
- `index.html` の `og:url`
- 必要に応じて `og:image` / `twitter:image` を絶対 URL に変更

## 動作確認チェック

- 開始地点と終了地点が選べる
- 中継地点を複数選んでルート生成できる
- 徒歩 / 車の切り替えで Google マップ URL が変わる
- URL コピーが動く
- シェアボタンから X 投稿画面を開ける

## Git 運用

```bash
git status
git add .
git commit -m "Describe change"
git push
```
