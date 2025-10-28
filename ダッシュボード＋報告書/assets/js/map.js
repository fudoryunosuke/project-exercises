// ===== 道路損傷マップ（index.html用） =====

// 選択された損傷があればその位置を中心に、それ以外は相模原市中心
const selectedDamage = JSON.parse(localStorage.getItem("selectedDamage") || 'null');
const mapCenter = selectedDamage ? [selectedDamage.lat, selectedDamage.lng] : [35.5732, 139.3704];

// ===== Leaflet マップ初期化 =====
const map = L.map('map').setView(mapCenter, 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ===== マーカー管理 =====
let markers = {};
const monthFilter = document.getElementById("month-filter");
const severityFilter = document.getElementById("severity-filter");
const typeFilter = document.getElementById("type-filter");

// ===== フィルター選択肢自動生成（年月を整形） =====
[...new Set(damages.map(d => d.date.substr(0,7)))].forEach(m => { 
  const [year, month] = m.split('-');         // "2025-08" → ["2025","08"]
  const formatted = `${year}年${parseInt(month,10)}月`;  // "2025年8月"
  const o = document.createElement('option');
  o.value = m;       // valueは元の "YYYY-MM" を使う
  o.textContent = formatted; // 表示は整形済み
  monthFilter.appendChild(o); 
});
[...new Set(damages.map(d => d.severity))].forEach(s => {
  const o = document.createElement('option');
  o.textContent = s;
  severityFilter.appendChild(o);
});
[...new Set(damages.map(d => d.type))].forEach(t => {
  const o = document.createElement('option');
  o.textContent = t;
  typeFilter.appendChild(o);
});

// ===== マーカーを更新する関数 =====
function updateMarkers() {
  // 既存マーカーを削除
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};

  const month = monthFilter.value;
  const severity = severityFilter.value;
  const type = typeFilter.value;

  // フィルターに一致する損傷のみ表示
  damages.filter(d =>
    (month === '全て' || d.date.substr(0,7) === month) &&
    (severity === '全て' || d.severity === severity) &&
    (type === '全て' || d.type === type)
  ).forEach(d => {
    const marker = L.marker([d.lat,d.lng]).addTo(map);
    // マーカークリックで詳細ページに遷移
    marker.bindPopup(`<b>${d.type}</b><br>損傷度: ${d.severity}<br>日付: ${d.date}<br>
      <button onclick="selectDamage(${d.id})">詳細を見る</button>`);
    markers[d.id] = marker;
  });
}

// ===== 詳細ページへ遷移 =====
function selectDamage(id) {
  const d = damages.find(x => x.id === id);
  if (d) {
    localStorage.setItem("selectedDamage", JSON.stringify(d));
    window.location.href = "search.html";
  }
}

// ===== フィルター変更イベント =====
[monthFilter, severityFilter, typeFilter].forEach(el => {
  el.addEventListener("change", () => {
    localStorage.setItem("filterMonth", monthFilter.value);
    localStorage.setItem("filterSeverity", severityFilter.value);
    localStorage.setItem("filterType", typeFilter.value);
    updateMarkers();
  });
});

// ===== 保存されたフィルターを復元 =====
if(localStorage.getItem("filterMonth")) monthFilter.value = localStorage.getItem("filterMonth");
if(localStorage.getItem("filterSeverity")) severityFilter.value = localStorage.getItem("filterSeverity");
if(localStorage.getItem("filterType")) typeFilter.value = localStorage.getItem("filterType");

// ===== 初期マーカー表示 =====
updateMarkers();

// ===== サイドバー折りたたみ =====
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("toggleSidebar");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-collapsed");
  document.querySelectorAll(".sidebar-text").forEach(e => e.classList.toggle("hidden-text"));
});
