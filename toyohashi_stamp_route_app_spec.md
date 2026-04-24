# 豊橋まちあるきスタンプ ルート最適化Webアプリ実装.md

## 概要

上記38施設を対象に、

- 開始地点
- 中継地点（任意・複数可）
- 終了地点

を選択し、`ルート作成` ボタン押下で、

- 選択施設のみを対象に
- 効率の良い巡回順へ並び替え
- GoogleマップのルートURLを生成
- そのままGoogleマップで開ける

Webアプリを実装する。

---

## 実装方針

### 1. ルート最適化の考え方

Google Maps Directions URL 自体には、厳密な「自動巡回最適化」機能は期待しづらいため、
アプリ側で施設の並び順を決めてから Google マップへ渡す。

### 2. 最適化ロジック

まずは軽量で実装が簡単な **Nearest Neighbor法** を採用する。

- 開始地点から最も近い未訪問地点を選ぶ
- 次にその地点から最も近い未訪問地点を選ぶ
- 最後に終了地点へ接続

38件全探索は不要。
ユーザーが選ぶ件数は通常少数のため、これで実用十分。

### 3. 距離計算

座標ベースでハーバーサイン距離を使う。
道路距離ではないが、街歩き用途ならまず十分。

---

## 機能要件

### 必須機能

- 38施設一覧を保持
- 開始地点を1件選択
- 中継地点を0件以上選択
- 終了地点を1件選択
- 同一施設の重複選択防止
- ルート最適化
- Google Maps URL生成
- 別タブでGoogleマップを開く
- 最適化後の巡回順をテキスト表示

### あると良い機能

- ランダム選択ボタン
- 全解除ボタン
- 現在地を開始地点にする
- 選択件数表示
- Google Maps URLをコピー

---

## データ構造

```js
const spots = [
  {
    id: 1,
    name: "PLUSTA Gift豊橋観光案内所横",
    lat: 34.7634615,
    lng: 137.3824531,
    address: "愛知県豊橋市花田町西宿無番地 JR豊橋駅構内"
  },
  {
    id: 2,
    name: "花職人 和び咲び",
    lat: 34.7619159,
    lng: 137.3871764,
    address: "愛知県豊橋市駅前大通2丁目 大豊ビルC-1"
  }
  // ...以下38件
]
```

---

## Google Maps URL仕様

### 方式

`https://www.google.com/maps/dir/?api=1`

使用パラメータ:

- `origin` 開始地点
- `destination` 終了地点
- `waypoints` 中継地点（`|`区切り）
- `travelmode=walking`

### 例

```txt
https://www.google.com/maps/dir/?api=1&origin=34.7634615,137.3824531&destination=34.7540098,137.3760184&waypoints=34.7619159,137.3871764|34.7645477,137.3837600&travelmode=walking
```

---

## アルゴリズム

### 手順

1. 開始地点を固定
2. 終了地点を固定
3. 中継地点群だけを最適化対象にする
4. 開始地点から最も近い中継地点を選ぶ
5. 残り中継地点から同様に繰り返す
6. 最後に終了地点を接続

### 実装コード

```js
function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function haversineDistance(a, b) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) *
      Math.cos(lat1) * Math.cos(lat2);

  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * y;
}

function optimizeRoute(start, waypoints, end) {
  const remaining = [...waypoints];
  const ordered = [];
  let current = start;

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = haversineDistance(current, remaining[0]);

    for (let i = 1; i < remaining.length; i++) {
      const dist = haversineDistance(current, remaining[i]);
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestIndex = i;
      }
    }

    const next = remaining.splice(nearestIndex, 1)[0];
    ordered.push(next);
    current = next;
  }

  return [start, ...ordered, end];
}
```

---

## 最小構成ファイル

```txt
/project
  ├─ index.html
  ├─ style.css
  └─ app.js
```

---

## index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>豊橋まちあるきスタンプ ルート作成</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>豊橋まちあるきスタンプ ルート作成</h1>

    <div class="panel">
      <label>開始地点</label>
      <select id="startSelect"></select>
    </div>

    <div class="panel">
      <label>中継地点（複数選択可）</label>
      <div id="waypointList" class="checkbox-list"></div>
    </div>

    <div class="panel">
      <label>終了地点</label>
      <select id="endSelect"></select>
    </div>

    <div class="button-row">
      <button id="randomBtn">無作為に選択</button>
      <button id="buildBtn">ルート作成</button>
      <button id="resetBtn">全解除</button>
    </div>

    <div class="panel">
      <h2>最適化ルート</h2>
      <ol id="routeResult"></ol>
    </div>

    <div class="panel">
      <a id="mapLink" href="#" target="_blank" rel="noopener noreferrer">Googleマップで開く</a>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

---

## style.css

```css
body {
  margin: 0;
  font-family: sans-serif;
  background: #f7f7f7;
  color: #222;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 24px;
}

.panel {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

select,
button {
  font-size: 16px;
}

select {
  width: 100%;
  padding: 10px;
}

.checkbox-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.checkbox-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #fafafa;
  padding: 8px;
  border-radius: 8px;
}

.button-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

button {
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

#mapLink {
  display: inline-block;
  padding: 12px 16px;
  background: #1a73e8;
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
}
```

---

## app.js

```js
const spots = [
  { id: 1, name: "PLUSTA Gift豊橋観光案内所横", lat: 34.7634615, lng: 137.3824531, address: "愛知県豊橋市花田町西宿無番地 JR豊橋駅構内" },
  { id: 2, name: "花職人 和び咲び", lat: 34.7619159, lng: 137.3871764, address: "愛知県豊橋市駅前大通2丁目 大豊ビルC-1" },
  { id: 3, name: "ボンとらや", lat: 34.7640164, lng: 137.3779452, address: "愛知県豊橋市羽田町66" },
  { id: 4, name: "精文館書店本店", lat: 34.7645477, lng: 137.38376, address: "愛知県豊橋市広小路1丁目6" },
  { id: 5, name: "三河屋", lat: 34.7643893, lng: 137.3841879, address: "愛知県豊橋市広小路1丁目11" },
  { id: 6, name: "道の駅とよはし", lat: 34.6956503, lng: 137.4147297, address: "愛知県豊橋市東七根町一の沢113-2" },
  { id: 7, name: "豊橋市視聴覚教育センター・地下資源館", lat: 34.7294635, lng: 137.4316179, address: "愛知県豊橋市大岩町字火打坂19-16" },
  { id: 8, name: "吉田城鉄櫓内", lat: 34.7707281, lng: 137.3929656, address: "愛知県豊橋市今橋町3番地（豊橋公園内）" },
  { id: 9, name: "お仕事ありますプラザ", lat: 34.7472605, lng: 137.3743147, address: "愛知県豊橋市柱六番町128" },
  { id: 10, name: "時計・宝飾品・メガネ 太陽堂", lat: 34.76526, lng: 137.3835256, address: "愛知県豊橋市松葉町1丁目7" },
  { id: 11, name: "ワルツ豊橋トキワ店", lat: 34.7648316, lng: 137.3836375, address: "愛知県豊橋市松葉町1丁目17" },
  { id: 12, name: "豊橋鉄道 市内線営業所", lat: 34.7652792, lng: 137.4168706, address: "愛知県豊橋市東田町1番地" },
  { id: 13, name: "JR豊橋駅×豊橋市", lat: 34.7634615, lng: 137.3824531, address: "愛知県豊橋市花田町西宿無番地 JR豊橋駅構内" },
  { id: 14, name: "道の駅もっくる新城", lat: 34.9171426, lng: 137.5333104, address: "愛知県新城市八束穂五反田329-7" },
  { id: 15, name: "モカとチャイ", lat: 34.7483083, lng: 137.4102347, address: "愛知県豊橋市三ノ輪町本興寺3-57" },
  { id: 16, name: "豊橋鉄道 渥美線高師駅", lat: 34.7272322, lng: 137.3814753, address: "愛知県豊橋市高師町字北新切116番地の6" },
  { id: 17, name: "八町もちや", lat: 34.7656223, lng: 137.399433, address: "愛知県豊橋市八町通5丁目73" },
  { id: 18, name: "お亀堂", lat: 34.7457434, lng: 137.3879909, address: "愛知県豊橋市南小池164番地" },
  { id: 19, name: "TORINGO（トリンゴ）", lat: 34.7239358, lng: 137.3943409, address: "愛知県豊橋市三本木町元三本19" },
  { id: 20, name: "珈琲とカヌレ 豊橋本店", lat: 34.7616309, lng: 137.3854608, address: "愛知県豊橋市駅前大通1丁目114 豊橋ビル1階116号" },
  { id: 21, name: "ソラカナホビー", lat: 34.7378064, lng: 137.3790521, address: "愛知県豊橋市草間町平東130 東和プラザ3階" },
  { id: 22, name: "ジャストインプレミアム豊橋駅新幹線口", lat: 34.7614801, lng: 137.3811212, address: "愛知県豊橋市白河町31-2" },
  { id: 23, name: "ゆーもあねっと（臨時営業中）", lat: 34.74956, lng: 137.3958982, address: "愛知県豊橋市東小池町151-2" },
  { id: 24, name: "キッチンにんじん", lat: 34.7771879, lng: 137.4218712, address: "愛知県豊橋市牛川通一丁目19-1 A号" },
  { id: 25, name: "蕎麦匠まつや", lat: 34.7672247, lng: 137.383808, address: "愛知県豊橋市松葉町3-63-4" },
  { id: 26, name: "炎の祭典実行委員会×豊橋商工会議所", lat: 34.7673083, lng: 137.3826078, address: "愛知県豊橋市花田町字石塚42-1" },
  { id: 27, name: "ひとひとCAFE", lat: 34.7623852, lng: 137.3872992, address: "愛知県豊橋市駅前大通2丁目81 emCAMPUS EAST 2F まちなか図書館内" },
  { id: 28, name: "八雲だんご直売所", lat: 34.7210875, lng: 137.4168012, address: "愛知県豊橋市高田町字下地25番地1" },
  { id: 29, name: "こすたりかシティガーデン", lat: 34.7692877, lng: 137.3922776, address: "愛知県豊橋市今橋町1 豊橋市役所13F" },
  { id: 30, name: "お亀堂 岩田店", lat: 34.7539904, lng: 137.4191756, address: "愛知県豊橋市西岩田4丁目3-17" },
  { id: 31, name: "精文館書店 三ノ輪店", lat: 34.7476068, lng: 137.4092259, address: "愛知県豊橋市三ノ輪町字本興寺16-1" },
  { id: 32, name: "豊橋総合動植物公園のんほいパーク 東門前", lat: 34.7203106, lng: 137.4321545, address: "愛知県豊橋市大岩町字大穴1-238" },
  { id: 33, name: "豊橋市中央図書館", lat: 34.7540098, lng: 137.3760184, address: "愛知県豊橋市羽根井町48" },
  { id: 34, name: "豊橋市中央図書館（まちなか図書館移設先）", lat: 34.7540098, lng: 137.3760184, address: "愛知県豊橋市羽根井町48" },
  { id: 35, name: "株式会社ヤマウチ建材", lat: 34.7528718, lng: 137.4116413, address: "愛知県豊橋市三ノ輪町4丁目22-1" },
  { id: 36, name: "Wien Cafe BrÜder", lat: 34.7378681, lng: 137.3790188, address: "愛知県豊橋市草間町平東130 東和プラザ1-8号" },
  { id: 37, name: "焼芋専門 芋ひさ 岩田店", lat: 34.7595576, lng: 137.4225157, address: "愛知県豊橋市平川本町1-3-9" },
  { id: 38, name: "やぶ寅", lat: 34.7608313, lng: 137.3916511, address: "愛知県豊橋市大国町52 西山ビル1階" }
];

const startSelect = document.getElementById("startSelect");
const endSelect = document.getElementById("endSelect");
const waypointList = document.getElementById("waypointList");
const routeResult = document.getElementById("routeResult");
const mapLink = document.getElementById("mapLink");
const randomBtn = document.getElementById("randomBtn");
const buildBtn = document.getElementById("buildBtn");
const resetBtn = document.getElementById("resetBtn");

function createOption(spot) {
  const option = document.createElement("option");
  option.value = String(spot.id);
  option.textContent = spot.name;
  return option;
}

function renderSelects() {
  spots.forEach((spot) => {
    startSelect.appendChild(createOption(spot));
    endSelect.appendChild(createOption(spot));
  });

  startSelect.value = "1";
  endSelect.value = "33";
}

function renderWaypoints() {
  spots.forEach((spot) => {
    const wrapper = document.createElement("label");
    wrapper.className = "checkbox-item";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = String(spot.id);

    const text = document.createElement("span");
    text.textContent = `${spot.name} / ${spot.address}`;

    wrapper.appendChild(input);
    wrapper.appendChild(text);
    waypointList.appendChild(wrapper);
  });
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function haversineDistance(a, b) {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * y;
}

function optimizeRoute(start, waypoints, end) {
  const remaining = [...waypoints];
  const ordered = [];
  let current = start;

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = haversineDistance(current, remaining[0]);

    for (let i = 1; i < remaining.length; i++) {
      const dist = haversineDistance(current, remaining[i]);
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestIndex = i;
      }
    }

    const next = remaining.splice(nearestIndex, 1)[0];
    ordered.push(next);
    current = next;
  }

  return [start, ...ordered, end];
}

function buildGoogleMapsUrl(route) {
  const origin = `${route[0].lat},${route[0].lng}`;
  const destination = `${route[route.length - 1].lat},${route[route.length - 1].lng}`;
  const middle = route.slice(1, -1).map((s) => `${s.lat},${s.lng}`).join("|");

  const url = new URL("https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("travelmode", "walking");

  if (middle) {
    url.searchParams.set("waypoints", middle);
  }

  return url.toString();
}

function getSpotById(id) {
  return spots.find((spot) => spot.id === Number(id));
}

function getCheckedWaypointIds() {
  return [...waypointList.querySelectorAll('input[type="checkbox"]:checked')].map(
    (input) => Number(input.value)
  );
}

function validateSelection(startId, endId, waypointIds) {
  const all = [startId, endId, ...waypointIds];
  const unique = new Set(all);
  return all.length === unique.size;
}

function renderRoute(route) {
  routeResult.innerHTML = "";
  route.forEach((spot) => {
    const li = document.createElement("li");
    li.textContent = `${spot.name} / ${spot.address}`;
    routeResult.appendChild(li);
  });
}

function buildRoute() {
  const startId = Number(startSelect.value);
  const endId = Number(endSelect.value);
  const waypointIds = getCheckedWaypointIds();

  if (!validateSelection(startId, endId, waypointIds)) {
    alert("開始地点・中継地点・終了地点に同じ施設は選べません。");
    return;
  }

  const start = getSpotById(startId);
  const end = getSpotById(endId);
  const waypoints = waypointIds.map(getSpotById);

  const route = optimizeRoute(start, waypoints, end);
  const url = buildGoogleMapsUrl(route);

  renderRoute(route);
  mapLink.href = url;
  window.open(url, "_blank", "noopener,noreferrer");
}

function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function randomSelect() {
  resetSelections();

  const shuffled = shuffle(spots);
  const count = Math.floor(Math.random() * 4) + 2;
  const selected = shuffled.slice(0, count + 2);

  startSelect.value = String(selected[0].id);
  endSelect.value = String(selected[selected.length - 1].id);

  const waypointIds = selected.slice(1, -1).map((s) => s.id);
  waypointIds.forEach((id) => {
    const input = waypointList.querySelector(`input[value="${id}"]`);
    if (input) input.checked = true;
  });
}

function resetSelections() {
  startSelect.value = "1";
  endSelect.value = "33";
  waypointList.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
  });
  routeResult.innerHTML = "";
  mapLink.href = "#";
}

renderSelects();
renderWaypoints();

buildBtn.addEventListener("click", buildRoute);
randomBtn.addEventListener("click", randomSelect);
resetBtn.addEventListener("click", resetSelections);
```

---

## 実装時の注意

### 1. Google Maps waypoint数上限
Google Maps URLは経由地数が多すぎると扱いづらい。
そのため実運用では、

- 中継地点は最大8〜10件程度に制限

がおすすめ。

### 2. 同座標施設
以下は実質同地点扱いになる。

- 1 と 13
- 33 と 34

UI上で片方を選ぶともう片方を選べないようにしてもよい。

### 3. 徒歩以外切替
必要なら `travelmode` を切り替え可能にする。

- `walking`
- `driving`
- `bicycling`
- `transit`

---

## 今後の拡張

- 地図プレビュー表示（Google Maps JavaScript API or Leaflet）
- 現在地から最寄り施設順で提案
- 所要時間概算
- スタンプ取得済みチェック保存
- localStorage保存
- PWA化

---

## 結論

最短で作るなら、

- フロントのみ
- HTML / CSS / JavaScript
- 座標ベース最適化
- Google Maps URL生成

この構成で十分実装可能。

まずは上記3ファイルで動く。
