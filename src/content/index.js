const { clinic, news, symptoms } = require('../data');
const { sectionHead, hoursTable, treatmentGrid, featureList } = require('../components');

const depth = 0;

const newsRows = news.slice(0, 4).map(n => `
  <li class="news-row">
    <a href="news.html">
      <span class="news-date">${n.date}</span>
      <span class="news-cat">${n.cat}</span>
      <span class="news-title">${n.title}</span>
    </a>
  </li>`).join('');

const symptomChips = symptoms.map(s => `<a href="${s.to}" class="symptom-chip">${s.label}</a>`).join('\n');

const body = `
<!-- HERO -->
<section class="home-hero">
  <div class="home-hero-media">
    <img src="assets/images/hero_bg_new.png" alt="${clinic.name}の受付" fetchpriority="high">
  </div>
  <div class="home-hero-copy">
    <p class="hero-badge">目黒駅前・徒歩3分の歯科</p>
    <h1 class="hero-catch">やさしい治療で、<br>笑顔あふれる毎日を。</h1>
    <p class="hero-lead">
      痛みの少ない、丁寧な歯科治療を。<br>
      地域の皆様のお口の健康を支えます。
    </p>
  </div>
  <div class="hero-wave">
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,90L0,90Z"></path></svg>
  </div>
</section>

<!-- CLINIC INFO BAR -->
<section class="info-bar">
  <div class="info-bar-inner">
    <div class="info-bar-left">
      <p class="info-bar-name">${clinic.name}</p>
      <p class="info-bar-addr">${clinic.zip}<br>${clinic.addressLine1} ${clinic.addressLine2}</p>
      <a href="tel:${clinic.telHref}" class="info-bar-tel"><span class="tel-ico"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></span>${clinic.tel}</a>
      <div class="info-bar-actions">
        <a href="contact.html" class="ib-btn ib-reserve"><small>＼24時間受付／</small>WEB予約・お問い合わせ</a>
        <a href="access.html" class="ib-btn ib-map">アクセス・地図を見る</a>
      </div>
    </div>
    <div class="info-bar-right">
      <p class="info-bar-sub">診療科目：歯科・小児歯科・矯正歯科・口腔外科</p>
      ${hoursTable()}
      <p class="info-bar-access">${clinic.access}</p>
    </div>
  </div>
</section>

<!-- NEWS -->
<section class="section section-news">
  <span class="news-deco-word" aria-hidden="true">News</span>
  <span class="news-deco-circle" aria-hidden="true"></span>
  <div class="container narrow">
    <div class="news-flex">
      <div class="news-head">
        ${sectionHead('News', 'お知らせ', 'left')}
        <a href="news.html" class="news-all">お知らせ一覧 →</a>
      </div>
      <ul class="news-list">${newsRows}</ul>
    </div>
  </div>
</section>

<!-- GREETING -->
<section class="section section-greeting">
  <div class="container">
    ${sectionHead('Greeting', 'ごあいさつ')}
    <div class="greeting-grid">
      <div class="greeting-visual">
        <div class="greeting-photo">
          <img src="assets/images/staff/staff-001.png" alt="院長">
        </div>
      </div>
      <div class="greeting-text">
        <p class="greeting-lead">地域の皆様の健康な毎日を<br>支えるパートナーとして。</p>
        <p>この度、目黒駅前にて「${clinic.name}（${clinic.nameEn}）」を開院いたしました。地域の皆様の健康な毎日を支えるパートナーとして、この地で診療をスタートできることを大変嬉しく思っております。</p>
        <p>当院では『痛みの少ない、丁寧な治療』を心がけ、小さなお子様からご高齢の方まで安心して通っていただける環境づくりを大切にしています。お口のことで気になることがあれば、どんな些細なことでもお気軽にご相談ください。皆様のご来院を、スタッフ一同心よりお待ちしております。</p>
        <p class="greeting-sign"><span class="sign-title">院長</span><span class="sign-name">${clinic.director}</span></p>
        <a href="doctor.html" class="link-arrow">スタッフ紹介を見る</a>
      </div>
    </div>
  </div>
</section>

<!-- PICK UP -->
<section class="section section-pickup">
  <div class="container">
    ${sectionHead('Pick up', '当院のこだわり')}
    <div class="pickup-grid">
      <article class="pickup-card">
        <div class="pickup-thumb pickup-thumb-1"><span>Precision</span></div>
        <div class="pickup-body">
          <h3>精密な診査・診断にこだわる</h3>
          <p>肉眼では確認しきれない細部にまでこだわり、正確な診断を大切にしています。一つひとつの治療を丁寧に行うことで、より長持ちする結果を目指します。</p>
          <a href="clinic.html" class="link-arrow">詳しくはこちら</a>
        </div>
      </article>
      <article class="pickup-card">
        <div class="pickup-thumb pickup-thumb-2"><span>Gentle</span></div>
        <div class="pickup-body">
          <h3>痛みに配慮した、やさしい治療</h3>
          <p>「歯医者は痛い」というイメージを変えるために、麻酔の工夫をはじめ、あらゆる場面で痛みに最大限配慮しています。不安な方も安心してご相談ください。</p>
          <a href="medical/cavities.html" class="link-arrow">詳しくはこちら</a>
        </div>
      </article>
    </div>
  </div>
</section>

`;

module.exports = {
  slug: 'index.html',
  title: `${clinic.name}｜目黒駅前・徒歩3分の歯科`,
  description: '目黒駅前・徒歩3分の歯科医院「目黒しずか歯科クリニック」。痛みの少ない丁寧な治療で、むし歯・予防歯科・小児歯科・矯正・ホワイトニングなど幅広く対応。土日診療。',
  canonical: '',
  active: 'index.html',
  depth,
  jsonLd: true,
  body,
};
