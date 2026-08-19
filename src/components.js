const { clinic, treatments, features } = require('./data');
const { rel } = require('./layout');

function sectionHead(en, ja, align = 'center') {
  return `<div class="sec-head ${align === 'left' ? 'sec-head-left' : ''}">
    <span class="sec-en">${en}</span>
    <h2 class="sec-ja">${ja}</h2>
  </div>`;
}

function hoursTable() {
  const cell = (v) => v === '●'
    ? '<td class="on">●</td>'
    : '<td class="off">／</td>';
  const week = clinic.weekLabels.map((d, i) => {
    const cls = (d === '火') ? ' class="th-off"' : (d === '日' ? ' class="th-sun"' : (d === '土' ? ' class="th-sat"' : ''));
    return `<th${cls}>${d}</th>`;
  }).join('');
  return `<div class="hours-wrap">
    <table class="hours-table">
      <thead><tr><th class="hours-corner">診療時間</th>${week}</tr></thead>
      <tbody>
        <tr><th>${clinic.hours.am.label}</th>${clinic.hours.am.days.map(cell).join('')}</tr>
        <tr><th>${clinic.hours.pm.label}</th>${clinic.hours.pm.days.map(cell).join('')}</tr>
      </tbody>
    </table>
    <p class="hours-note">休診日：${clinic.closed}<br>最終受付は18時30分です</p>
  </div>`;
}

function infoTable() {
  return `<table class="info-table">
    <tr><th>医院名</th><td>${clinic.name}<br><span class="info-en">${clinic.nameEn}</span></td></tr>
    <tr><th>院長</th><td>${clinic.director}</td></tr>
    <tr><th>住所</th><td>${clinic.zip}<br>${clinic.addressLine1}<br>${clinic.addressLine2}</td></tr>
    <tr><th>電話番号</th><td><a href="tel:${clinic.telHref}" class="tel-link">${clinic.tel}</a></td></tr>
    <tr><th>アクセス</th><td>${clinic.access}</td></tr>
    <tr><th>休診日</th><td>${clinic.closed}</td></tr>
  </table>`;
}

function mapEmbed() {
  return `<div class="map-embed">
    <img src="assets/images/map/access-map.png" alt="${clinic.name} アクセスマップ" loading="lazy">
  </div>`;
}

// Grid of all treatments (used on home + medical index)
function treatmentGrid(depth) {
  const r = rel(depth);
  return `<div class="med-grid">
    ${treatments.map(t => `<a href="${r}medical/${t.slug}.html" class="med-card">
      <div class="med-icon"><img src="${r}assets/images/icons-med-grid/${t.slug}.png" alt=""></div>
      <span class="med-ja">${t.ja}</span>
      <span class="med-en">${t.en}</span>
    </a>`).join('\n')}
  </div>`;
}

function featureList(depth) {
  return `<div class="feature-list">
    ${features.map((f) => `<div class="feature-card">
      <span class="feature-tag">Feature ${f.num}</span>
      <h3 class="feature-title">${f.title}</h3>
      <p>${f.body}</p>
    </div>`).join('\n')}
  </div>`;
}

module.exports = { sectionHead, hoursTable, infoTable, mapEmbed, treatmentGrid, featureList };
