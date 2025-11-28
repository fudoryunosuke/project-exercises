/* ===================================================
 * damages.js
 * 概要: アプリケーション全体で使用する静的なダミーデータ
 * =================================================== */

const damages = [
  {
    // --- 基本情報 ---
    "id": 1,
    "type": "縦状亀裂",
    "severity": "中", // 損傷範囲 (大/中/小)
    "inspectionTime": "2025-08-05 09:30",
    
    // --- 位置情報 ---
    "lat": 35.5720,
    "lng": 139.3680,
    "gps": "35.5720, 139.3680",
    
    // --- 詳細・添付 ---
    "voice": "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
    "voiceText": "今すぐ補修が必要。通学路で通行量が多い。",
    "image": "assets/images/hibiware1.jpg",
    
    // --- 管理情報 ---
    "patrolTeam": "田中・佐藤",
    "vehicle": "A号車",
    "weather": "晴れ",
    "status": "pending", // pending / in-progress / completed / cancelled
    
    // --- 対応記録 (初期値は空) ---
    "responseDate": "",
    "responseDetails": "",
    "responseNotes": ""
  },
  {
    "id": 2,
    "type": "ポットホール",
    "severity": "大",
    "inspectionTime": "2025-08-12 14:00",
    "lat": 35.5970,
    "lng": 139.3470,
    "gps": "35.5970, 139.3470",
    "voice": "",
    "voiceText": "穴が深く危険。",
    "image": "assets/images/pottoho-ru1.jpg",
    "patrolTeam": "鈴木・高橋",
    "vehicle": "B号車",
    "weather": "雨",
    "status": "pending",
    "responseDate": "",
    "responseDetails": "",
    "responseNotes": ""
  },
  {
    "id": 3,
    "type": "横状亀裂",
    "severity": "小",
    "inspectionTime": "2025-09-03 10:15",
    "lat": 35.5610,
    "lng": 139.3930,
    "gps": "35.5610, 139.3930",
    "voice": "",
    "voiceText": "通行には影響なし。",
    "image": "assets/images/wadatibore1.jpg",
    "patrolTeam": "佐藤・小林",
    "vehicle": "C号車",
    "weather": "曇り",
    "status": "pending",
    "responseDate": "",
    "responseDetails": "",
    "responseNotes": ""
  },
  {
    "id": 4,
    "type": "網状亀裂",
    "severity": "中",
    "inspectionTime": "2025-09-18 13:30",
    "lat": 35.5360,
    "lng": 139.4350,
    "gps": "35.5360, 139.4350",
    "voice": "",
    "voiceText": "排水対策が必要。",
    "image": "assets/images/anaboko1.jpg",
    "patrolTeam": "高橋・田中",
    "vehicle": "D号車",
    "weather": "曇り",
    "status": "pending",
    "responseDate": "",
    "responseDetails": "",
    "responseNotes": ""
  },
  {
    "id": 5,
    "type": "縦状亀裂",
    "severity": "小",
    "inspectionTime": "2025-10-02 11:00",
    "lat": 35.5790,
    "lng": 139.3620,
    "gps": "35.5790, 139.3620",
    "voice": "",
    "voiceText": "歩行者には影響なし。",
    "image": "assets/images/hibiware2.jpg",
    "patrolTeam": "小林・鈴木",
    "vehicle": "E号車",
    "weather": "晴れ",
    "status": "pending",
    "responseDate": "",
    "responseDetails": "",
    "responseNotes": ""
  },
  {
    "id": 6,
    "type": "ポットホール",
    "severity": "中",
    "inspectionTime": "2025-10-08 15:45",
    "lat": 35.5920,
    "lng": 139.3820,
    "gps": "35.5920, 139.3820",
    "voice": "",
    "voiceText": "雨天時に水たまりができる。",
    "image": "assets/images/pottoho-ru2.jpg",
    "patrolTeam": "田中・佐藤",
    "vehicle": "F号車",
    "weather": "雨",
    "status": "pending",
    "responseDate": "",
    "responseDetails": "",
    "responseNotes": ""
  },
  {
    "id": 7,
    "type": "横状亀裂",
    "severity": "中",
    "inspectionTime": "2025-10-15 09:45",
    "lat": 35.5665,
    "lng": 139.3980,
    "gps": "35.5665, 139.3980",
    "voice": "",
    "voiceText": "通行に注意。",
    "image": "assets/images/wadatibore2.jpg",
    "patrolTeam": "鈴木・小林",
    "vehicle": "G号車",
    "weather": "曇り",
    "status": "pending",
    "responseDate": "",
    "responseDetails": "",
    "responseNotes": ""
  }
];