const spots = [
  { id: 2, name: "花職人 和び咲び", lat: 34.7619159, lng: 137.3871764, address: "愛知県豊橋市駅前大通2丁目 大豊ビルC-1" },
  { id: 3, name: "ボンとらや", lat: 34.7640164, lng: 137.3779452, address: "愛知県豊橋市羽田町66" },
  { id: 4, name: "精文館書店本店", lat: 34.7645477, lng: 137.38376, address: "愛知県豊橋市広小路1丁目6" },
  { id: 5, name: "三河屋", lat: 34.7643893, lng: 137.3841879, address: "愛知県豊橋市広小路1丁目11" },
  { id: 6, name: "道の駅とよはし", lat: 34.6956503, lng: 137.4147297, address: "愛知県豊橋市東七根町一の沢113-2" },
  { id: 7, name: "豊橋市視聴覚教育センター・地下資源館", lat: 34.7294635, lng: 137.4316179, address: "愛知県豊橋市大岩町字火打坂19-16" },
  { id: 8, name: "吉田城鉄櫓（ココニコ臨時設置）", lat: 34.770591, lng: 137.392732, address: "愛知県豊橋市今橋町3番地（豊橋公園内）" },
  { id: 9, name: "お仕事ありますプラザ", lat: 34.7472605, lng: 137.3743147, address: "愛知県豊橋市柱六番町128" },
  { id: 39, name: "ヤマサちくわ 本店", lat: 34.76575, lng: 137.389415, address: "愛知県豊橋市魚町97" },
  { id: 10, name: "時計・宝飾品・メガネ 太陽堂", lat: 34.76526, lng: 137.3835256, address: "愛知県豊橋市松葉町1丁目7" },
  { id: 11, name: "ワルツ豊橋トキワ店", lat: 34.7648316, lng: 137.3836375, address: "愛知県豊橋市松葉町1丁目17" },
  { id: 12, name: "豊橋鉄道 市内線営業所", lat: 34.7652792, lng: 137.4168706, address: "愛知県豊橋市東田町1番地" },
  { id: 13, name: "JR豊橋駅", lat: 34.7634615, lng: 137.3824531, address: "愛知県豊橋市花田町西宿無番地 JR豊橋駅構内" },
  { id: 14, name: "道の駅もっくる新城", lat: 34.9171426, lng: 137.5333104, address: "愛知県新城市八束穂五反田329-7" },
  { id: 15, name: "モカとチャイ", lat: 34.7483083, lng: 137.4102347, address: "愛知県豊橋市三ノ輪町本興寺3-57" },
  { id: 16, name: "渥美線高師駅", lat: 34.7272322, lng: 137.3814753, address: "愛知県豊橋市高師町字北新切116番地の6" },
  { id: 17, name: "八町もちや", lat: 34.7656223, lng: 137.399433, address: "愛知県豊橋市八町通5丁目73" },
  { id: 18, name: "お亀堂", lat: 34.7457434, lng: 137.3879909, address: "愛知県豊橋市南小池164番地" },
  { id: 19, name: "TORINGO（トリンゴ）", lat: 34.7239358, lng: 137.3943409, address: "愛知県豊橋市三本木町元三本19" },
  { id: 20, name: "珈琲とカヌレ 豊橋本店", lat: 34.7616309, lng: 137.3854608, address: "愛知県豊橋市駅前大通1丁目114 豊橋ビル1階116号" },
  { id: 21, name: "ソラカナホビー", lat: 34.7378064, lng: 137.3790521, address: "愛知県豊橋市草間町平東130 東和プラザ3階" },
  { id: 22, name: "ジャストインプレミアム豊橋駅新幹線口", lat: 34.7614801, lng: 137.3811212, address: "愛知県豊橋市白河町31-2" },
  { id: 23, name: "ゆーもあねっと", lat: 34.74956, lng: 137.3958982, address: "愛知県豊橋市東小池町151-2" },
  { id: 24, name: "キッチンにんじん", lat: 34.7771879, lng: 137.4218712, address: "愛知県豊橋市牛川通一丁目19-1 A号" },
  { id: 25, name: "蕎麦匠まつや", lat: 34.7672247, lng: 137.383808, address: "愛知県豊橋市松葉町3-63-4" },
  { id: 26, name: "豊橋商工会議所", lat: 34.7673083, lng: 137.3826078, address: "愛知県豊橋市花田町字石塚42-1" },
  { id: 27, name: "ひとひとCAFE", lat: 34.7623852, lng: 137.3872992, address: "愛知県豊橋市駅前大通2丁目81 emCAMPUS EAST 2F まちなか図書館内" },
  { id: 28, name: "八雲だんご直売所", lat: 34.7210875, lng: 137.4168012, address: "愛知県豊橋市高田町字下地25番地1" },
  { id: 29, name: "こすたりかシティガーデン", lat: 34.7692877, lng: 137.3922776, address: "愛知県豊橋市今橋町1 豊橋市役所13F" },
  { id: 30, name: "お亀堂 岩田店", lat: 34.7539904, lng: 137.4191756, address: "愛知県豊橋市西岩田4丁目3-17" },
  { id: 31, name: "精文館書店 三ノ輪店", lat: 34.7476068, lng: 137.4092259, address: "愛知県豊橋市三ノ輪町字本興寺16-1" },
  { id: 32, name: "豊橋総合動植物公園のんほいパーク 東門前", lat: 34.7203106, lng: 137.4321545, address: "愛知県豊橋市大岩町字大穴1-238" },
  { id: 34, name: "豊橋市中央図書館（まちなか図書館移設先）", lat: 34.7540098, lng: 137.3760184, address: "愛知県豊橋市羽根井町48" },
  { id: 35, name: "株式会社ヤマウチ建材", lat: 34.7528718, lng: 137.4116413, address: "愛知県豊橋市三ノ輪町4丁目22-1" },
  { id: 36, name: "Wien Cafe BrÜder", lat: 34.7378681, lng: 137.3790188, address: "愛知県豊橋市草間町平東130 東和プラザ1-8号" },
  { id: 37, name: "焼芋専門 芋ひさ 岩田店", lat: 34.7595576, lng: 137.4225157, address: "愛知県豊橋市平川本町1-3-9" },
  { id: 38, name: "やぶ寅", lat: 34.7608313, lng: 137.3916511, address: "愛知県豊橋市大国町52 西山ビル1階" }
];

const MAX_WAYPOINTS = 10;

const startSelect   = document.getElementById("startSelect");
const endSelect     = document.getElementById("endSelect");
const waypointList  = document.getElementById("waypointList");
const filterInput   = document.getElementById("filterInput");
const waypointCounter = document.getElementById("waypointCounter");
const routeResult   = document.getElementById("routeResult");
const resultPanel   = document.getElementById("resultPanel");
const mapLink       = document.getElementById("mapLink");
const copyBtn       = document.getElementById("copyBtn");
const shareBtn      = document.getElementById("shareBtn");
const copyToast     = document.getElementById("copyToast");
const distanceCounter = document.getElementById("distanceCounter");
const modeRow       = document.getElementById("modeRow");
const randomBtn     = document.getElementById("randomBtn");
const buildBtn      = document.getElementById("buildBtn");
const resetBtn      = document.getElementById("resetBtn");

let currentMode = "walking";
let lastUrl = "";

const sameLocationPairs = [];

function sameLocationOf(id) {
  for (const pair of sameLocationPairs) {
    if (pair[0] === id) return pair[1];
    if (pair[1] === id) return pair[0];
  }
  return null;
}

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
  startSelect.value = "13";
  endSelect.value = "34";
}

function renderWaypoints() {
  spots.forEach((spot) => {
    const wrapper = document.createElement("label");
    wrapper.className = "checkbox-item";
    wrapper.dataset.id = String(spot.id);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = String(spot.id);
    input.addEventListener("change", () => onWaypointToggle(input, wrapper));

    const meta = document.createElement("span");
    meta.className = "spot-meta";
    const name = document.createElement("span");
    name.className = "spot-name";
    name.textContent = spot.name;
    const addr = document.createElement("span");
    addr.className = "spot-addr";
    addr.textContent = spot.address;
    meta.appendChild(name);
    meta.appendChild(addr);

    wrapper.appendChild(input);
    wrapper.appendChild(meta);
    waypointList.appendChild(wrapper);
  });
}

function onWaypointToggle(input, wrapper) {
  const checked = getCheckedWaypointIds();
  if (input.checked && checked.length > MAX_WAYPOINTS) {
    input.checked = false;
    flashMessage(`中継地点は最大${MAX_WAYPOINTS}件までです`);
    return;
  }
  wrapper.classList.toggle("is-checked", input.checked);
  updateCounter();
  updateExclusions();
}

function updateCounter() {
  const n = getCheckedWaypointIds().length;
  waypointCounter.textContent = `${n} / ${MAX_WAYPOINTS}`;
}

function updateExclusions() {
  const startId = Number(startSelect.value);
  const endId   = Number(endSelect.value);
  const checked = new Set(getCheckedWaypointIds());

  const blocked = new Set();
  [startId, endId, ...checked].forEach((id) => {
    blocked.add(id);
    const twin = sameLocationOf(id);
    if (twin) blocked.add(twin);
  });

  waypointList.querySelectorAll(".checkbox-item").forEach((item) => {
    const id = Number(item.dataset.id);
    const input = item.querySelector("input");
    const disable = (blocked.has(id) && !checked.has(id));
    item.classList.toggle("is-disabled", disable);
    if (disable) input.checked = false;
  });
}

function flashMessage(msg) {
  copyToast.textContent = msg;
  copyToast.hidden = false;
  setTimeout(() => { copyToast.hidden = true; copyToast.textContent = "コピーしました ✓"; }, 1800);
}

function toRad(deg) { return (deg * Math.PI) / 180; }

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

function totalDistanceKm(route) {
  let sum = 0;
  for (let i = 0; i < route.length - 1; i++) {
    sum += haversineDistance(route[i], route[i + 1]);
  }
  return sum;
}

function buildGoogleMapsUrl(route) {
  const origin = `${route[0].lat},${route[0].lng}`;
  const destination = `${route[route.length - 1].lat},${route[route.length - 1].lng}`;
  const middle = route.slice(1, -1).map((s) => `${s.lat},${s.lng}`).join("|");

  const url = new URL("https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("travelmode", currentMode);
  if (middle) url.searchParams.set("waypoints", middle);
  return url.toString();
}

function getSpotById(id) {
  return spots.find((spot) => spot.id === Number(id));
}

function getCheckedWaypointIds() {
  return [...waypointList.querySelectorAll('input[type="checkbox"]:checked')]
    .map((input) => Number(input.value));
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
    const name = document.createElement("div");
    name.className = "r-name";
    name.textContent = spot.name;
    const addr = document.createElement("div");
    addr.className = "r-addr";
    addr.textContent = spot.address;
    const wrap = document.createElement("div");
    wrap.appendChild(name);
    wrap.appendChild(addr);
    li.appendChild(wrap);
    routeResult.appendChild(li);
  });
}

function buildRoute() {
  const startId = Number(startSelect.value);
  const endId   = Number(endSelect.value);
  const waypointIds = getCheckedWaypointIds();

  if (!validateSelection(startId, endId, waypointIds)) {
    alert("開始地点・中継地点・終了地点に同じ施設は選べません。");
    return;
  }

  const start = getSpotById(startId);
  const end   = getSpotById(endId);
  const waypoints = waypointIds.map(getSpotById);

  const route = optimizeRoute(start, waypoints, end);
  const url = buildGoogleMapsUrl(route);
  lastUrl = url;

  renderRoute(route);
  mapLink.href = url;
  resultPanel.hidden = false;
  const km = totalDistanceKm(route);
  distanceCounter.textContent = `直線距離 約 ${km.toFixed(1)} km · ${route.length} 施設`;

  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const count = Math.floor(Math.random() * 4) + 3;
  const selected = shuffled.slice(0, count);

  startSelect.value = String(selected[0].id);
  endSelect.value   = String(selected[selected.length - 1].id);

  const waypointIds = selected.slice(1, -1).map((s) => s.id);
  waypointIds.forEach((id) => {
    const input = waypointList.querySelector(`input[value="${id}"]`);
    if (input) {
      input.checked = true;
      input.closest(".checkbox-item").classList.add("is-checked");
    }
  });
  updateCounter();
  updateExclusions();
}

function resetSelections() {
  startSelect.value = "13";
  endSelect.value = "34";
  waypointList.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.checked = false;
    input.closest(".checkbox-item").classList.remove("is-checked");
  });
  routeResult.innerHTML = "";
  mapLink.href = "#";
  lastUrl = "";
  resultPanel.hidden = true;
  updateCounter();
  updateExclusions();
}

function filterWaypoints() {
  const q = filterInput.value.trim().toLowerCase();
  waypointList.querySelectorAll(".checkbox-item").forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = !q || text.includes(q) ? "" : "none";
  });
}

function setMode(mode) {
  currentMode = mode;
  modeRow.querySelectorAll(".mode-chip").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.mode === mode);
  });
  if (lastUrl) {
    const updated = buildGoogleMapsUrl(
      [...routeResult.children].map((_, i) => {
        const name = routeResult.children[i].querySelector(".r-name").textContent;
        return spots.find((s) => s.name === name);
      }).filter(Boolean)
    );
    lastUrl = updated;
    mapLink.href = updated;
  }
}

async function copyUrl() {
  if (!lastUrl) return;
  try {
    await navigator.clipboard.writeText(lastUrl);
    copyToast.hidden = false;
    setTimeout(() => { copyToast.hidden = true; }, 1800);
  } catch {
    window.prompt("このURLをコピーしてください", lastUrl);
  }
}

function buildShareUrl() {
  const text = "🚋 豊橋まちあるきスタンプ ルートメーカー ⭐️\n寄りたいスポットを選ぶだけで最短ルートを自動生成！\n";
  const intent = new URL("https://x.com/intent/tweet");
  intent.searchParams.set("text", text);
  intent.searchParams.set("url", location.href);
  intent.searchParams.set("hashtags", "豊橋まちあるきスタンプ,豊橋観光");
  return intent.toString();
}

function openShare(event) {
  event.preventDefault();
  event.stopPropagation();

  const shareUrl = buildShareUrl();
  shareBtn.href = shareUrl;

  const shareWindow = window.open(shareUrl, "_blank");
  if (shareWindow) {
    shareWindow.opener = null;
  } else {
    window.location.assign(shareUrl);
  }
}

renderSelects();
renderWaypoints();
updateCounter();
updateExclusions();
shareBtn.href = buildShareUrl();

buildBtn.addEventListener("click", buildRoute);
randomBtn.addEventListener("click", randomSelect);
resetBtn.addEventListener("click", resetSelections);
startSelect.addEventListener("change", updateExclusions);
endSelect.addEventListener("change", updateExclusions);
filterInput.addEventListener("input", filterWaypoints);
copyBtn.addEventListener("click", copyUrl);
shareBtn.addEventListener("click", openShare);
modeRow.addEventListener("click", (e) => {
  const chip = e.target.closest(".mode-chip");
  if (chip) setMode(chip.dataset.mode);
});
