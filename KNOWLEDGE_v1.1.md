# 豊橋まちあるきスタンプ ルートメーカー — ナレッジ v1.1

**作成日**: 2026-04-23
**最終更新**: 2026-04-23（v1.1）
**プロジェクト場所**: `/Users/ust/Desktop/toyo/`
**制作者クレジット**: DAX_ST50_LINE（https://x.com/DAX_ST50_LINE）
**ステータス**: デプロイ待ち（本番URL未定）

---

## 🆕 v1.1 変更履歴（2026-04-23）

### シェアボタンの不具合修正
**症状**: 「📣 ルートメーカーをシェア」ボタンを1回クリックしても正常にXシェアが開かず、2回目のクリックで初めて機能していた。

**原因候補**:
1. `window.open()` がブラウザのpopup blockerに引っかかる
2. X未ログイン時のIntent URLはログイン画面に飛ばされ、再度クリックが必要
3. JS実行タイミングのブレ

**修正方針**: `<button>` + `window.open()` を廃止し、`<a target="_blank">` のネイティブ遷移に変更。

**具体的変更**:
- `index.html`: `<button id="shareBtn">` → `<a id="shareBtn" href="#" target="_blank" rel="noopener noreferrer">`
- `app.js`:
  - `shareApp()` 関数を削除
  - `buildShareUrl()` 関数を追加（`new URL()` + `searchParams.set()` でX Intent URL生成）
  - ページ読み込み時に `shareBtn.href = buildShareUrl()` で href を確定
  - `shareBtn.addEventListener("click", ...)` 削除（anchor 要素なのでJS不要）
- `style.css`: `.btn-share` に `text-decoration: none` 追加（anchorの下線消し）

**結果**:
- 1回クリックで確実にX投稿画面が開く
- popup blockerの影響を受けない
- X未ログイン時もブラウザ標準の挙動でログイン→投稿フローになる

---

## 1. 成果物

| ファイル | サイズ | 用途 | デプロイ対象 |
|---|---|---|---|
| `index.html` | 8.1K | メインHTML（SEO/OGP/構造化データ/favicon込み） | ✅ |
| `style.css` | 11K | ポップデザインCSS | ✅ |
| `app.js` | 16K | ルート最適化・UI制御 | ✅ |
| `hero.jpg` | 372K | ヒーロー画像（1600×840, JPEG q75） | ✅ |
| `ogp.jpg` | 295K | SNSシェア用OGP画像（1200×630） | ✅ |
| `toyohashi_stamp_route_app_spec.md` | 18K | 元仕様書 | ❌ 開発用 |
| `KNOWLEDGE_v1.md` | - | 旧ナレッジ（履歴用に保管） | ❌ 開発用 |
| `KNOWLEDGE_v1.1.md` | - | このファイル（最新） | ❌ 開発用 |

---

## 2. 技術スタック

- **フロントエンドのみ**: HTML/CSS/JS の静的3ファイル
- **ビルドプロセスなし**: そのままブラウザで動作
- **外部依存**: Google Fonts（M PLUS Rounded 1c / Fredoka）のみ
- **バックエンド不要**: 全処理はクライアント側で完結

---

## 3. 主要機能

### ルート最適化
- **対象データ**: 38施設の座標（元仕様書に記載）
- **アルゴリズム**: Nearest Neighbor（近似TSP）
- **距離計算**: ハーバーサイン公式（球面距離）
- **出力**: Google Maps Directions URL → 「Googleマップで開く」ボタンで別タブ起動

### UI機能
- 開始地点・終了地点のセレクト
- 中継地点のチェックボックス（最大10件）
- スポット名・住所での絞り込み検索
- 徒歩 / 車 の2モード切替
- おまかせ選択（ランダム3〜6件）
- 全解除
- 総直線距離・施設数の表示
- Googleマップ URLコピー
- ルートメーカーのXシェア（v1.1で `<a>` 実装に変更）

### 同座標施設の自動排他
- ID 1 ↔ 13（JR豊橋駅構内、同一座標）
- ID 33 ↔ 34（中央図書館、同一座標）
- 片方を選択するともう片方は自動でdisable

---

## 4. 仕様決定事項（重要）

### ❌ 電車・自転車モード廃止
Google Maps Directions URLの仕様上、`travelmode=transit` は `waypoints` パラメータを**無視する**。つまり電車モードで経由地を指定しても、origin→destination の一区間しか描画されず中継スポットが反映されない。電車＋複数スポット巡回は原理的に実装不可のため廃止。徒歩/車の2モードのみ。

### ❌ ルート作成ボタンでのマップ自動起動を廃止
当初は「ルート作成」押下で即Googleマップが別タブ起動する仕様だったが、ユーザー要望で撤去。「🗺️ Googleマップで開く」ボタン押下時のみ開く。

### 🆕 v1.1 シェアボタン方式変更
`<button>` + `window.open()` は popup blocker / X intent認証フローで1クリック目が吸われる問題があったため、`<a target="_blank">` でネイティブ遷移する方式に変更。ページ読み込み時に href を生成してセット。

### 制約理由まとめ
- **中継地点の上限10件**: Google Maps URLは経由地が多すぎるとクラッシュ/切り捨て
- **同座標施設の排他**: Google Mapsが同一座標を経由地として受け付けない挙動回避
- **travelmode=walking をデフォルト**: まちあるき想定のため

---

## 5. SEO設計

### ターゲットキーワード
- 第1: 「豊橋まちあるきスタンプ」
- 第2群: 「豊橋 スタンプラリー」「豊橋 まちあるき」「豊橋観光 ルート」

### 実装済み
- `<title>`: 45字、キーワード先頭配置
- `<meta name="description">`: 具体数字（38施設）込み
- `<h1>`: `visually-hidden` でDOMに存在、画面からは非表示（画像にテキスト焼き込み済みのため）
- **OGP**: `og:title` / `og:description` / `og:image` / `og:url` / `og:site_name` / `og:locale`
- **Twitter Card**: `summary_large_image`, `@DAX_ST50_LINE` creator
- **構造化データ**: JSON-LD で `WebApplication` + 関連 `Event`「豊橋まちあるきスタンプ」
- **favicon**: 🚋 絵文字をSVGデータURIで埋め込み（外部ファイル不要）
- `<img>` に `fetchpriority="high"` 指定（LCP最適化）

---

## 6. デザイン方針

### 配色
- ミント `#7ee8c6` / `#27c49a`
- ピンク `#ff7aa8` / `#ff4f88`
- レモン `#ffe066`
- スカイ `#9fd6ff`
- バイオレット `#b69cff`
- 紙 `#fffaf3`
- インク `#2a2148`

### フォント
- 本文: **M PLUS Rounded 1c**（Google Fonts、丸ゴシック）
- アクセント英数: **Fredoka**（Google Fonts）

### ビジュアル特徴
- 背景にふわふわブロブ3つ（ピンク/ミント/バイオレット、blur+float animation）
- パネルは白地、角丸22px、上辺にグラデーションライン
- ピルバッジ（START/VIA/GOAL/MODE/ROUTE）で各セクションを色分け
- ボタンは大きめ角丸14px、押下時に微スケール
- ルート結果は番号付きリスト、開始・途中・終了で色分け

---

## 7. デプロイ前チェックリスト

### ✅ 完了済み
- [x] 画像圧縮（PNG 2.2MB → JPEG 372KB）
- [x] OGP画像生成（1200×630）
- [x] SEOメタタグ全配置
- [x] 絵文字favicon
- [x] JSON-LD構造化データ
- [x] 元画像 `image.png` を削除
- [x] **v1.1: シェアボタンの1クリック問題を修正**

### 🔨 デプロイ後に必須
本番ドメイン確定後、`index.html` の以下4行を絶対URLに書き換え：

```html
<link rel="canonical" href="./" />
<meta property="og:url" content="./" />
<meta property="og:image" content="ogp.jpg" />
<meta name="twitter:image" content="ogp.jpg" />
```

↓

```html
<link rel="canonical" href="https://本番ドメイン/" />
<meta property="og:url" content="https://本番ドメイン/" />
<meta property="og:image" content="https://本番ドメイン/ogp.jpg" />
<meta name="twitter:image" content="https://本番ドメイン/ogp.jpg" />
```

**理由**: X / LINE / Slack / Discord は相対URLのOGP画像を取得しないプラットフォームが約半数。絶対URL必須。

### 推奨デプロイ先
1. **Cloudflare Pages**（無料・爆速・独自ドメイン無料、おすすめ）
2. **Vercel**（無料、UI親切）
3. **Netlify**（無料、ドラッグ＆ドロップ可）

---

## 8. デプロイ後の確認手順

1. **OGPカード確認**: [opengraph.xyz](https://www.opengraph.xyz/) に本番URLを入れてカードが正しく出るかチェック
2. **実機シェアテスト**: X・LINE・Slackにシェアして画像・タイトル・説明文が出るか目視
3. **シェアボタン動作確認**: 「📣 ルートメーカーをシェア」を1クリックでX投稿画面が開くか確認（v1.1で修正）
4. **Google Search Console登録**: 「豊橋まちあるきスタンプ」でインデックスされるまで待つ（通常数日〜2週間）
5. **PageSpeed Insights**: 95点以上出るはず（静的・画像1枚のみの軽量構成）

---

## 9. 今後の拡張候補（未実装）

元仕様書の「今後の拡張」に記載：
- 地図プレビュー表示（Leaflet or Google Maps JS API）
- 現在地から最寄り施設順の提案
- 所要時間概算
- スタンプ取得済みチェックの永続化（localStorage）
- PWA化（オフライン対応）

拡張時の見積感：
- 地図プレビュー: +10〜20万円
- スタンプ取得済み保存: +3〜5万円
- PWA化: +10〜15万円

---

## 10. 補足：シェアボタン仕様（v1.1で更新）

「📣 ルートメーカーをシェア」ボタン押下時の挙動：
- X（Twitter）の投稿画面を直接開く（`<a target="_blank">` ネイティブ遷移）
- 投稿文: `🚋 豊橋まちあるきスタンプ ルートメーカー ⭐️\n寄りたいスポットを選ぶだけで最短ルートを自動生成！`
- URL: 現在のページURL（自動挿入）
- ハッシュタグ: `#豊橋まちあるきスタンプ` `#豊橋観光`

**実装方針**:
- `navigator.share` API は使用しない（直接Xへ誘導）
- `window.open()` も使用しない（popup blocker / X認証リダイレクト対策）
- ページ読み込み時に `shareBtn.href = buildShareUrl()` で Intent URL を静的確定
- 以後の遷移はブラウザのネイティブ挙動に委ねる

**URL構築**:
```js
const intent = new URL("https://x.com/intent/tweet");
intent.searchParams.set("text", text);
intent.searchParams.set("url", location.href);
intent.searchParams.set("hashtags", "豊橋まちあるきスタンプ,豊橋観光");
```

---

## 11. 次回作業の引き継ぎ

**最優先タスク**: 本番URL確定後、`index.html` の4行（canonical / og:url / og:image / twitter:image）を絶対URL化

**その後**: opengraph.xyz 目視 → Search Console 登録

**注意**: ブラウザキャッシュが v1 の `app.js` を掴んでいる可能性があるので、動作確認時はハードリロード（`⌘+Shift+R` / `Ctrl+F5`）を忘れずに。

以上、ver1.1 ナレッジとして保管。次回はこのファイル（または v1.md も併読）で即復帰可能。
