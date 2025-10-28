// ===== 道路損傷検索マップ（search.html用） =====
const selectedDamage = JSON.parse(localStorage.getItem("selectedDamage") || 'null');
const mapCenter = selectedDamage ? [selectedDamage.lat, selectedDamage.lng] : [35.5732, 139.3704];

const map = L.map('map').setView(mapCenter, 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = {};
const monthFilter = document.getElementById("month-filter");
const severityFilter = document.getElementById("severity-filter");
const typeFilter = document.getElementById("type-filter");
const resultList = document.getElementById("result-list");

// ===== フィルター選択肢自動生成 =====
[...new Set(damages.map(d => d.date.substr(0,7)))].forEach(m => { 
  const [year, month] = m.split('-');
  const formatted = `${year}年${parseInt(month,10)}月`;
  const o = document.createElement('option');
  o.value = m;       
  o.textContent = formatted; 
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

// ===== 詳細表示関数 =====
function showDetail(d) {
  document.getElementById("damage-card").classList.remove("hidden");
  document.getElementById("no-selection").classList.add("hidden");
  document.getElementById("type").textContent = d.type;
  document.getElementById("severity").textContent = d.severity;
  document.getElementById("date").textContent = d.date;
  document.getElementById("gps").textContent = d.gps;
  document.getElementById("size").textContent = d.size;
  document.getElementById("damage-image").src = d.image;

  const voice = document.getElementById("voice");
  if(d.voice) { voice.src = d.voice; voice.style.display = 'block'; }
  else { voice.style.display = 'none'; }

  document.getElementById("voice-text").textContent = d.voiceText;

  // ===== 報告書作成ボタン追加 =====
  const btn = document.getElementById("toReportBtn");
  btn.classList.remove("hidden");  // hidden を外す
  btn.onclick = () => {
    localStorage.setItem("selectedDamage", JSON.stringify(d));
    window.location.href = "report.html";
  };
}

// ===== マーカー表示 & 検索結果リスト =====
function updateDisplay() {
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};
  resultList.innerHTML = '';

  const month = monthFilter.value;
  const severity = severityFilter.value;
  const type = typeFilter.value;

  damages.filter(d =>
    (month === '全て' || d.date.substr(0,7) === month) &&
    (severity === '全て' || d.severity === severity) &&
    (type === '全て' || d.type === type)
  ).forEach(d => {
    const marker = L.marker([d.lat,d.lng]).addTo(map);
    marker.on('click', () => showDetail(d));
    markers[d.id] = marker;

    const div = document.createElement('div');
    div.className = 'result-item';
    div.textContent = `${d.type} / ${d.severity} / ${d.date}`;
    div.onclick = () => { showDetail(d); map.setView([d.lat,d.lng],14); };
    resultList.appendChild(div);
  });
}

// ===== イベント =====
[monthFilter, severityFilter, typeFilter].forEach(el => {
  el.addEventListener("change", () => {
    localStorage.setItem("filterMonth", monthFilter.value);
    localStorage.setItem("filterSeverity", severityFilter.value);
    localStorage.setItem("filterType", typeFilter.value);
    updateDisplay();
  });
});

// 保存されたフィルター復元
if(localStorage.getItem("filterMonth")) monthFilter.value = localStorage.getItem("filterMonth");
if(localStorage.getItem("filterSeverity")) severityFilter.value = localStorage.getItem("filterSeverity");
if(localStorage.getItem("filterType")) typeFilter.value = localStorage.getItem("filterType");

// 初回表示
if(selectedDamage) showDetail(selectedDamage);
updateDisplay();

// ===== サイドバー折りたたみ =====
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("toggleSidebar");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-collapsed");
  document.querySelectorAll(".sidebar-text").forEach(e => e.classList.toggle("hidden-text"));
});

