const { clinic, treatments } = require('./data');

// depth = number of directory levels below root (0 for root pages, 1 for /medical/*)
const rel = (depth) => '../'.repeat(depth);

// Primary navigation definition
const navMain = [
  { label: 'ホーム', href: 'index.html' },
  { label: '医院案内', href: 'clinic.html' },
  { label: 'スタッフ紹介', href: 'doctor.html' },
  { label: '診療案内', href: 'medical/index.html' },
  { label: '料金表', href: 'price.html' },
  { label: 'アクセス', href: 'access.html' },
  { label: 'お知らせ', href: 'news.html' },
  { label: '採用情報', href: 'recruit.html' },
];

function renderHead({ title, description, depth, ogType = 'website', canonical }) {
  const r = rel(depth);
  const url = canonical ? `${clinic.baseUrl}/${canonical}` : clinic.baseUrl + '/';
  return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">

    <link rel="icon" href="${r}assets/images/logo_icon_favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="${r}assets/images/logo_icon_favicon.png">

    <meta property="og:site_name" content="${clinic.name}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${clinic.baseUrl}/assets/images/hero_bg_favicon.png">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="${ogType}">
    <meta name="twitter:card" content="summary_large_image">

    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@500;600;700&family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${r}assets/css/style.css">
</head>`;
}

function renderStructuredData() {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "${clinic.name}",
  "alternateName": "${clinic.nameEn}",
  "image": "${clinic.baseUrl}/assets/images/hero_bg_favicon.png",
  "@id": "${clinic.baseUrl}/#dentist",
  "url": "${clinic.baseUrl}/",
  "telephone": "${clinic.tel}",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "上大崎2丁目17-6 千里馬ビル2F",
    "addressLocality": "品川区",
    "addressRegion": "東京都",
    "postalCode": "141-0021",
    "addressCountry": "JP"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 35.6341, "longitude": 139.7156 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "10:00", "closes": "13:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Wednesday","Thursday","Friday","Saturday"], "opens": "14:30", "closes": "19:00" }
  ]
}
</script>`;
}

function renderHeader(depth, active) {
  const r = rel(depth);
  const link = (item) => {
    const isActive = active === item.href ? ' aria-current="page"' : '';
    return `<a href="${r}${item.href}"${isActive}>${item.label}</a>`;
  };
  // 診療案内 dropdown
  const dropItems = treatments.map(t =>
    `<a href="${r}medical/${t.slug}.html"><span class="drop-ja">${t.ja}</span><span class="drop-en">${t.en}</span></a>`
  ).join('\n');

  const navItems = navMain.map(item => {
    if (item.children) {
      return `<li class="has-drop">
        ${link(item)}
        <div class="mega-drop">
          <div class="mega-inner">${dropItems}</div>
        </div>
      </li>`;
    }
    return `<li>${link(item)}</li>`;
  }).join('\n');

  return `<header class="site-header" id="siteHeader">
  <div class="header-inner">
    <a href="${r}index.html" class="brand">
      <img src="${r}assets/images/logo_icon.png" alt="${clinic.name}" class="brand-mark">
      <span class="brand-text">
        <span class="brand-ja">${clinic.name}</span>
        <span class="brand-en">${clinic.nameEn}</span>
      </span>
    </a>
    <nav class="gnav" id="gnav" aria-label="メインナビゲーション">
      <ul class="gnav-list">
        ${navItems}
      </ul>
      <div class="drawer-cta">
        <a href="tel:${clinic.telHref}" class="drawer-tel"><span>☎</span>${clinic.tel}</a>
        <a href="${r}${clinic.reserveUrl}" class="drawer-web">WEB予約・お問い合わせ</a>
      </div>
    </nav>
    <div class="gnav-cta">
      <a href="tel:${clinic.telHref}" class="head-btn head-btn-tel">
        <span class="head-btn-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></span>
        <span class="head-btn-content">
          <span class="head-btn-sub">お電話でのご予約</span>
          <span class="head-btn-title">${clinic.tel}</span>
        </span>
      </a>
      <a href="${r}${clinic.reserveUrl}" class="head-btn head-btn-web">
        <span class="head-btn-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg></span>
        <span class="head-btn-content">
          <span class="head-btn-sub">＼24時間受付／</span>
          <span class="head-btn-title">WEB予約</span>
        </span>
      </a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="メニューを開く" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<div class="nav-overlay" id="navOverlay"></div>`;
}

function renderFloatCta(depth) {
  const r = rel(depth);
  return `<div class="float-cta" id="floatCta">
    <a href="tel:${clinic.telHref}" class="float-btn float-tel">
      <span class="ic">☎</span><span class="tx">電話予約</span>
    </a>
    <a href="${r}${clinic.reserveUrl}" class="float-btn float-reserve">
      <span class="ic"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg></span>
      <span class="tx">WEB予約</span>
    </a>
    <button type="button" class="float-btn float-top" id="floatTop" aria-label="ページの先頭へ戻る">
      <span class="ic">↑</span><span class="tx">TOP</span>
    </button>
  </div>`;
}

function renderFooter(depth) {
  const r = rel(depth);
  const medicalLinks = treatments.map(t => `<li><a href="${r}medical/${t.slug}.html">${t.ja}</a></li>`).join('\n');
  return `<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-container">
      <div class="footer-brand">
        <a href="${r}index.html" class="footer-logo">
          <img src="${r}assets/images/logo_icon.png" alt="${clinic.name}">
          <span>
            <span class="f-ja">${clinic.name}</span>
            <span class="f-en">${clinic.nameEn}</span>
          </span>
        </a>
        <p class="footer-address">
          ${clinic.zip}<br>
          ${clinic.addressLine1}<br>${clinic.addressLine2}<br>
          <span class="footer-access">${clinic.station}</span>
        </p>
        <a href="tel:${clinic.telHref}" class="footer-tel"><span class="tel-ico"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></span>${clinic.tel}</a>
      </div>
      <div class="footer-nav">
        <div class="footer-col">
          <h4>診療案内</h4>
          <ul>${medicalLinks}
            <li><a href="${r}medical/index.html#first">初診の方へ</a></li></ul>
        </div>
        <div class="footer-col">
          <h4>クリニック</h4>
          <ul>
            <li><a href="${r}index.html">ホーム</a></li>
            <li><a href="${r}clinic.html">医院案内</a></li>
            <li><a href="${r}doctor.html">スタッフ紹介</a></li>
            <li><a href="${r}price.html">料金表</a></li>
            <li><a href="${r}access.html">アクセス</a></li>
            <li><a href="${r}news.html">お知らせ</a></li>
            <li><a href="${r}recruit.html">採用情報</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} ${clinic.nameEn}. All Rights Reserved.</p>
  </div>
</footer>`;
}

// Reusable: reservation / contact band used at the bottom of most pages
function renderContactBand(depth) {
  const r = rel(depth);
  return `<section class="cta-band">
  <div class="cta-band-inner">
    <p class="cta-band-en">Contact / Reservation</p>
    <h2 class="cta-band-title">ご予約・お問い合わせ</h2>
    <p class="cta-band-lead">お口のお悩みやご不明な点は、お気軽にご相談ください。</p>
    <div class="cta-band-actions">
      <a href="tel:${clinic.telHref}" class="cta-tel-box">
        <span class="cta-tel-label">お電話でのご予約・お問い合わせ</span>
        <span class="cta-tel-num">${clinic.tel}</span>
        <span class="cta-tel-hours">診療時間 10:00-13:00 / 14:30-19:00（休診：${clinic.closed}）</span>
      </a>
      <a href="${r}contact.html" class="cta-web-box">
        <span class="cta-web-main">WEB予約・お問い合わせ</span>
        <span class="cta-web-sub">24時間受付フォームはこちら →</span>
      </a>
    </div>
  </div>
</section>`;
}

// Reusable: page hero header (for sub-pages) — background image + breadcrumb below
function renderPageHero(enTitle, jaTitle, sub, { depth = 0, crumbs = [], image = 'assets/images/hero_bg_new.png' } = {}) {
  const r = rel(depth);
  return `<section class="page-hero" style="background-image:url('${r}${image}')">
  <div class="page-hero-inner">
    <p class="page-hero-en">${enTitle}</p>
    <h1 class="page-hero-ja">${jaTitle}</h1>
    ${sub ? `<p class="page-hero-sub">${sub}</p>` : ''}
  </div>
</section>
${crumbs.length ? renderBreadcrumb(depth, crumbs) : ''}`;
}

// Breadcrumb
function renderBreadcrumb(depth, items) {
  const r = rel(depth);
  const parts = [`<a href="${r}index.html">ホーム</a>`];
  items.forEach((it, i) => {
    if (i === items.length - 1) parts.push(`<span>${it.label}</span>`);
    else parts.push(`<a href="${r}${it.href}">${it.label}</a>`);
  });
  return `<nav class="breadcrumb" aria-label="パンくずリスト"><div class="breadcrumb-inner">${parts.join('<span class="bc-sep">›</span>')}</div></nav>`;
}

function renderPage({ title, description, depth = 0, ogType, canonical, active, body, jsonLd = false }) {
  return `${renderHead({ title, description, depth, ogType, canonical })}
<body>
${renderHeader(depth, active)}
<main>
${body}
</main>
${renderFooter(depth)}
${renderFloatCta(depth)}
${jsonLd ? renderStructuredData() : ''}
<script src="${rel(depth)}assets/js/main.js"></script>
</body>
</html>`;
}

module.exports = {
  rel, renderPage, renderPageHero, renderBreadcrumb, renderContactBand,
};
