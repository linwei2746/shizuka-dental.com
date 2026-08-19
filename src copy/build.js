const fs = require('fs');
const path = require('path');
const { clinic, treatments, features, symptoms, news, priceList } = require('./data');
const { renderPage, renderPageHero, renderBreadcrumb } = require('./layout');
const { sectionHead, hoursTable, infoTable, mapEmbed, treatmentGrid, featureList } = require('./components');

// Output goes to dist/ (the deployable site). ALL source lives in src/.
const ROOT = path.resolve(__dirname, '../dist');
const SRC_ASSETS = path.resolve(__dirname, 'assets');
const DIST_ASSETS = path.join(ROOT, 'assets');

// Copy src/assets → dist/assets so dist/ is a complete, self-contained site.
function copyAssets() {
  fs.rmSync(DIST_ASSETS, { recursive: true, force: true });
  fs.cpSync(SRC_ASSETS, DIST_ASSETS, { recursive: true });
  console.log('  ✓ assets/ (copied from src)');
}
const write = (rel, html) => {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, 'utf8');
  console.log('  ✓', rel);
};

// ============================================================
//  HOME
// ============================================================
const home = require('./content/index');
write('index.html', renderPage(home));

// ============================================================
//  医院案内  clinic.html
// ============================================================
{
  const depth = 0;
  const body = `
${renderPageHero('Clinic', '医院案内', 'リラックスして通える、清潔で心地よい空間づくりを大切にしています。', { depth, crumbs: [{ label: '医院案内' }] })}
<section class="section">
  <div class="container">
    <div class="lead-block">
      <p class="lead-title">「通いたくなる」歯科医院を目指して</p>
      <p>歯科医院に対して「怖い」「痛い」というイメージをお持ちの方は少なくありません。当院では、できる限りリラックスした状態で治療を受けていただけるよう、木のぬくもりを感じる落ち着いた空間づくりと、清潔で快適な院内環境にこだわっています。</p>
    </div>
    <div class="clinic-gallery">
      <figure class="cg-item cg-large">
        <img src="assets/images/clinic/reception.jpg" alt="受付・待合室" class="cg-img">
        <figcaption>清潔感のある明るい受付・待合室</figcaption>
      </figure>
      <figure class="cg-item">
        <div class="cg-ph" style="position: relative; overflow: hidden;">
          <img src="assets/images/clinic/medical-room.png" alt="" class="cg-img" style="position: absolute; inset: 0;">
        </div>
        <figcaption>プライバシーに配慮した診療室</figcaption>
      </figure>
      <figure class="cg-item">
        <div class="cg-ph" style="position: relative; overflow: hidden;">
          <img src="assets/images/clinic/counseling.png" alt="" class="cg-img" style="position: absolute; inset: 0;">
        </div>
        <figcaption>じっくり相談できるカウンセリングスペース</figcaption>
      </figure>
      <figure class="cg-item">
        <div class="cg-ph" style="display: flex; align-items: center; justify-content: center; background: #eee; color: #999; font-weight: bold; font-size: 1.2rem;">準備中</div>
        <figcaption>お子様も安心のキッズスペース</figcaption>
      </figure>
      <figure class="cg-item">
        <div class="cg-ph" style="position: relative; overflow: hidden;">
          <img src="assets/images/clinic/powder-room.png" alt="" class="cg-img" style="position: absolute; inset: 0;">
        </div>
        <figcaption>身だしなみを整えるパウダーコーナー</figcaption>
      </figure>
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    ${sectionHead('Equipment', '設備・衛生管理へのこだわり')}
    <div class="equip-grid">
      <div class="equip-card"><h3>徹底した滅菌・消毒</h3><p>治療器具は用途に応じて滅菌・消毒を徹底し、手に触れる部分の消毒も丁寧に行い、清潔な環境を保ちます。</p></div>
      <div class="equip-card"><h3>精密な診断機器</h3><p>歯科用CTなどの先進機器を導入し、正確な診断で丁寧な診療に努めます。</p></div>
      <div class="equip-card"><h3>快適な院内環境</h3><p>医療用の空気洗浄機メディカルライトエアーを導入し、いつでも気持ちよくお過ごしいただける空間を整えています。</p></div>
    </div>

    <h3 class="equip-subhead">主な設備のご紹介</h3>
    <div class="device-grid">
      ${[
      { name: 'ジェットウォッシャー（ミーレ）', en: 'Miele Washer', img: 'assets/images/clinic/miele-washer.png', desc: '国際規格（ISO 15883）に準拠した全自動洗浄消毒器を導入し、冷水で血液などの蛋白汚れを洗浄後、93℃の熱水で器具の細部まで熱水消毒を行い、高レベルに除菌します。' },
      { name: 'クラスB滅菌器（リサ）', en: 'Sterilizer (Class B)', img: 'assets/images/clinic/sterilizer-classB.png', desc: '世界最高基準「クラスB」のオートクレーブ「リサ」を導入。複雑な構造の器具やハンドピース内部まで徹底滅菌し、高度な感染防止対策を徹底しています。' },
      { name: '口腔外バキューム', en: 'Oral Vacuum', desc: '治療中に飛散する粉塵や細菌を吸引し、院内の空気を清潔に保ちます。' },
      { name: '歯科用CT', en: 'Dental CT', img: 'assets/images/clinic/dental-ct.png', desc: '立体的な画像で、平面のレントゲンでは見えない部分まで精密に診断します。' },
      { name: 'デジタルレントゲン', en: 'X-ray', desc: '少ない被ばく量で、むし歯や骨の状態を正確に確認します。' },
      { name: '拡大鏡（ルーペ）', en: 'Loupe', desc: '視野を拡大し、より繊細で正確な処置を行います。' },
      { name: '歯科用ユニット', en: 'Dental Unit', img: 'assets/images/clinic/unit.png', desc: 'リラックスして治療を受けていただける、清潔な診療チェアです。座りやすさにこだわっています。' },
      { name: 'エアフロー', en: 'Air Flow', desc: '微細なパウダーで、歯の着色やバイオフィルムを効率よく除去します。' },
    ].map(e => `<figure class="device-card">
        <div class="device-photo">${e.img ? `<img src="${e.img}" alt="${e.name}">` : `<span>${e.en}</span>`}</div>
        <figcaption><span class="device-name">${e.name}</span><span class="device-desc">${e.desc}</span></figcaption>
      </figure>`).join('\n')}
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead('Feature', '当院の特徴')}
    ${featureList(depth)}
  </div>
</section>`;
  write('clinic.html', renderPage({
    title: `医院案内｜${clinic.name}`,
    description: `${clinic.name}の院内・設備のご紹介。木のぬくもりを感じる落ち着いた空間と、徹底した衛生管理で、リラックスして通える歯科医院を目指しています。`,
    depth, active: 'clinic.html', canonical: 'clinic.html', body,
  }));
}

// ============================================================
//  院長紹介  doctor.html
// ============================================================
{
  const depth = 0;
  const body = `
${renderPageHero('Doctor', '院長紹介', '痛みと不安に配慮した、やさしい歯科治療を。', { depth, crumbs: [{ label: '院長紹介' }] })}
<section class="section">
  <div class="container">
    <div class="doctor-intro">
      <div class="doctor-photo"><img src="assets/images/clinic/director-introduction.jpg" alt="院長"></div>
      <div class="doctor-body">
        <p class="doctor-role">院長</p>
        <p class="doctor-name">${clinic.director}<span class="doctor-kana">${clinic.directorKana}</span></p>
        <div class="doctor-message">
          <p>ホームページをご覧いただき、ありがとうございます。院長の${clinic.director}でございます。</p>
          <p>当院では、患者様に「来てよかった」「相談してよかった」と感じていただける歯科医院を目指しています。歯科治療に不安や恐怖心をお持ちの方は少なくありません。だからこそ、痛みに最大限配慮し、一人ひとりのペースに寄り添った、無理のない診療を大切にしています。</p>
          <p>また、治療して終わりではなく、健康なお口を長く保つための予防にも力を入れてまいります。地域の皆様のかかりつけ医として、末永くお付き合いいただけるクリニックでありたいと願っております。どうぞお気軽にご来院ください。</p>
        </div>
        <div class="doctor-career-inline">
          <span class="career-badge">経歴</span>
          <ul class="career-timeline">
            <li>埼玉県立蕨高等学校 普通科 卒業</li>
            <li>北海道大学 歯学部 卒業</li>
            <li>東京医科歯科大学（現・東京科学大学）病院 総合診療部 研修医</li>
            <li>東京都中央区内の歯科医院にて勤務</li>
            <li>${clinic.name} 開院</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>`;
  write('doctor.html', renderPage({
    title: `院長紹介｜${clinic.name}`,
    description: `${clinic.name}の院長 ${clinic.director}のごあいさつ。痛みと不安に配慮した、やさしい歯科治療を心がけています。`,
    depth, active: 'doctor.html', canonical: 'doctor.html', body,
  }));
}

// ============================================================
//  料金表  price.html
// ============================================================
{
  const depth = 0;
  function formatPrices(pStr) {
    if (!pStr || !pStr.includes('¥')) return pStr;
    const taxExcStr = pStr.replace(/¥([0-9,]+)/g, (match, numStr) => {
      const withTax = parseInt(numStr.replace(/,/g, ''), 10);
      const withoutTax = Math.round(withTax / 1.1);
      return `¥${withoutTax.toLocaleString()}`;
    });
    return `${taxExcStr}<span style="font-size:0.75rem; font-weight:normal; color:var(--text-soft); margin-left:6px;">（税込 ${pStr}）</span>`;
  }
  const accordion = priceList.map((c, i) => `
      <details class="price-acc-item"${i === 0 ? ' open' : ''}>
        <summary class="price-acc-head">
          <span class="price-acc-mark" aria-hidden="true"></span>
          <span class="price-acc-ja">${c.cat}</span>
          <span class="price-acc-count">全${c.items.length}項目</span>
          <span class="price-acc-toggle" aria-hidden="true"></span>
        </summary>
        <div class="price-acc-body">
          ${c.desc ? `<p class="price-acc-desc">${c.desc}</p>` : ''}
          <ul class="price-items">
            ${c.items.map(it => `<li class="price-item">
              <div class="price-item-row">
                <span class="price-item-name">${it.n}${it.w ? ` <span class="price-warranty">${it.w}</span>` : ''}</span>
                <span class="price-item-price">${formatPrices(it.p)}</span>
              </div>
              ${it.d ? `<p class="price-item-note">${it.d}</p>` : ''}
            </li>`).join('\n')}
          </ul>
        </div>
      </details>`).join('\n');

  const body = `
${renderPageHero('Price', '料金表', '自由診療（自費）の料金表です。カテゴリーを開くと各項目の料金と説明をご覧いただけます。', { depth, crumbs: [{ label: '料金表' }] })}
<section class="section">
  <div class="container narrow">
    <p class="price-lead">むし歯・歯周病治療などの一般的な診療は<strong>保険診療</strong>で対応しております。<br>以下は自由診療（自費）の料金で、<strong>税込み・税抜き価格をそれぞれ表記</strong>しております。<br>各カテゴリーをタップ／クリックすると、項目ごとの料金と説明が開きます。</p>
    <div class="price-acc">
      ${accordion}
    </div>
    <p class="price-disclaim">※表示は目安金額です。お口の状態により変動する場合があります。詳しい費用は、検査・診断のうえで丁寧にご説明いたします。<br>※お支払いには各種クレジットカードもご利用いただけます。</p>
  </div>
</section>`;
  write('price.html', renderPage({
    title: `料金表｜${clinic.name}`,
    description: `${clinic.name}の自由診療の料金表（税込）。セラミック・インプラント・矯正・ホワイトニング・入れ歯・クリーニングなどの費用をカテゴリー別にご案内します。`,
    depth, active: 'price.html', canonical: 'price.html', body,
  }));
}

// ============================================================
//  アクセス  access.html
// ============================================================
{
  const depth = 0;
  const body = `
${renderPageHero('Access', 'アクセス', '目黒駅前・徒歩3分。お仕事帰りやお買い物ついでにも通いやすい立地です。', { depth, crumbs: [{ label: 'アクセス' }] })}
<section class="section">
  <div class="container">
    <div class="access-grid">
      <div class="access-info">
        ${infoTable()}
        <a href="${clinic.mapLink}" target="_blank" rel="noopener" class="btn-line">Googleマップで見る →</a>
      </div>
      <div class="access-map">${mapEmbed()}</div>
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="container narrow">
    ${sectionHead('Hours', '診療時間')}
    ${hoursTable()}
    <div class="pay-block">
      <h3>お支払いについて</h3>
      <p>各種クレジットカード決済がご利用いただけます。</p>
      <div class="pay-icons"><img src="assets/images/pay_method_icon/creditcard.png" alt="クレジットカード各種"></div>
    </div>
  </div>
</section>`;
  write('access.html', renderPage({
    title: `アクセス｜${clinic.name}`,
    description: `${clinic.name}へのアクセス。${clinic.zip} ${clinic.addressLine1} ${clinic.addressLine2}。JR・東急・都営・メトロ「目黒駅」徒歩3分。`,
    depth, active: 'access.html', canonical: 'access.html', body, jsonLd: true,
  }));
}

// ============================================================
//  お知らせ  news.html
// ============================================================
{
  const depth = 0;
  const rows = news.map(n => `<li class="news-row"><span class="news-date">${n.date}</span><span class="news-cat">${n.cat}</span><span class="news-title">${n.title}</span></li>`).join('\n');
  const body = `
${renderPageHero('News', 'お知らせ', '', { depth, crumbs: [{ label: 'お知らせ' }] })}
<section class="section">
  <div class="container narrow">
    <ul class="news-list news-list-full">${rows}</ul>
  </div>
</section>`;
  write('news.html', renderPage({
    title: `お知らせ｜${clinic.name}`,
    description: `${clinic.name}からのお知らせ・新着情報の一覧です。`,
    depth, active: 'news.html', canonical: 'news.html', body,
  }));
}

// ============================================================
//  診療案内 index  medical/index.html
// ============================================================
{
  const depth = 1;
  const firstSteps = [
    { n: '01', t: 'ご予約', d: 'WEBフォームまたはお電話よりご予約ください。急な痛みなど、当日のご相談もお気軽にどうぞ。' },
    { n: '02', t: 'ご来院・受付', d: '保険証をご持参のうえ、予約時間の少し前にお越しください。' },
    { n: '03', t: 'カウンセリング', d: 'お困りの症状やご希望を丁寧に伺います。気になることは何でもお聞かせください。' },
    { n: '04', t: '検査・診断', d: '必要な検査を行い、お口の状態を確認します。結果は分かりやすくご説明します。' },
    { n: '05', t: '治療計画のご提案', d: '検査結果をもとに、治療の選択肢をご提案します。ご納得いただいたうえで治療を進めます。' },
    { n: '06', t: '治療・メンテナンス', d: '治療後も、お口の健康を保つための定期メンテナンスをご案内します。' },
  ];
  const body = `
${renderPageHero('Medical', '診療案内', 'むし歯や歯周病の治療から、予防・小児・矯正・審美まで幅広く対応します。', { depth, crumbs: [{ label: '診療案内' }] })}
<section class="section">
  <div class="container">
    <p class="sec-desc">気になる診療内容をお選びください。それぞれのページで詳しくご案内しています。</p>
    ${treatmentGrid(depth)}
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    ${sectionHead('Search', '症状・お悩みから探す')}
    <div class="symptom-grid">${symptoms.map(s => `<a href="../${s.to}" class="symptom-chip">${s.label}</a>`).join('\n')}</div>
  </div>
</section>

<!-- 初診の方へ（統合） -->
<section id="first" class="section">
  <div class="container">
    ${sectionHead('First Visit', '初診の方へ')}
    <p class="sec-desc">はじめての方も安心してご来院いただけるよう、ご予約から治療までの流れをご案内します。</p>
    <div class="prep-block">
      <h3 class="block-title">ご来院時にお持ちいただくもの</h3>
      <ul class="check-list">
        <li>マイナ保険証または資格確認証</li>
        <li>各種医療証（お持ちの方）</li>
        <li>お薬手帳（服用中のお薬がある方）</li>
        <li>他院の紹介状・レントゲン（お持ちの方）</li>
      </ul>
    </div>
    <div class="flow-list" style="margin-top:44px;">
      ${firstSteps.map(s => `<div class="flow-item"><span class="flow-num">${s.n}</span><div class="flow-body"><h3>${s.t}</h3><p>${s.d}</p></div></div>`).join('\n')}
    </div>
  </div>
</section>
<section class="section section-alt">
  <div class="container narrow">
    ${sectionHead('Hours', '診療時間')}
    ${hoursTable()}
  </div>
</section>`;
  write('medical/index.html', renderPage({
    title: `診療案内・初診の方へ｜${clinic.name}`,
    description: `${clinic.name}の診療案内。むし歯治療・根管治療・予防歯科・小児歯科・矯正歯科・口腔外科・ホワイトニング・インプラントなど幅広く対応。初診の方の流れもご案内します。`,
    depth, active: 'medical/index.html', canonical: 'medical/', body,
  }));
}

// ============================================================
//  診療案内 個別ページ  medical/<slug>.html  (×13)
// ============================================================
treatments.forEach((t, i) => {
  const depth = 1;
  const related = treatments.filter(x => x.slug !== t.slug).slice(0, 4);
  const troubles = t.troubles.map(x => `<li>${x}</li>`).join('\n');
  const sections = t.sections.map(s => `<div class="med-detail-block"><h3>${s.h}</h3><p>${s.p}</p></div>`).join('\n');
  const relatedCards = related.map(r => `<a href="${r.slug}.html" class="med-card"><div class="med-icon"><img src="../assets/images/icons-med-grid/${r.slug}.png" alt=""></div><span class="med-ja">${r.ja}</span><span class="med-en">${r.en}</span></a>`).join('\n');
  const body = `
${renderPageHero(t.en, t.ja, t.lead, { depth, crumbs: [{ label: '診療案内', href: 'medical/index.html' }, { label: t.ja }] })}
<section class="section">
  <div class="container narrow">
    <p class="med-intro">${t.intro}</p>
    <div class="trouble-box">
      <h2 class="trouble-title">こんなお悩みはありませんか？</h2>
      <ul class="trouble-list">${troubles}</ul>
    </div>
    <div class="med-detail">${sections}</div>
  </div>
</section>
<section class="section section-alt">
  <div class="container">
    ${sectionHead('Medical', 'その他の診療案内')}
    <div class="med-grid">${relatedCards}</div>
    <p class="center-link"><a href="index.html" class="link-arrow">診療案内の一覧へ</a></p>
  </div>
</section>`;
  write(`medical/${t.slug}.html`, renderPage({
    title: `${t.ja}｜${clinic.name}`,
    description: `${clinic.name}の${t.ja}（${t.en}）。${t.intro.slice(0, 70)}`,
    depth, active: 'medical/index.html', canonical: `medical/${t.slug}.html`, body,
  }));
});

// ============================================================
//  採用情報  recruit.html
// ============================================================
{
  const depth = 0;
  const commonRows = [
    ['昇給・賞与', '昇給：あり ／ 賞与：あり'],
    ['勤務時間', '9:45 〜 19:15（休憩1.5時間）'],
    ['休日・休暇', '完全週休2日制（火曜定休 ＋ 土日のいずれか1日）／ 祝日休み<br>年末年始・夏季休暇あり ／ 有給休暇（法定通り）／ 産休・育休制度あり'],
    ['社会保険・福利厚生', '社会保険完備（東京都歯科医師けんぽ・厚生年金・雇用保険・労災保険）<br>交通費全額支給 ／ 制服貸与 ／ 退職金制度あり ／ 社内割引あり'],
    ['試用期間', 'あり（3〜6ヶ月間）／ 期間中の条件は本採用と同額（減額なし）'],
  ].map(r => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`).join('\n');
  const body = `
${renderPageHero('Recruit', '採用情報', '新しくクリーンな環境で、一緒に働きませんか。', { depth, crumbs: [{ label: '採用情報' }] })}
<section class="section">
  <div class="container narrow">
    <div class="recruit-catch">
      <p class="recruit-catch-lead">目黒駅前・徒歩3分の好立地。</p>
      <p>スタッフ一人ひとりが気持ちよく、長く働ける職場づくりを大切にしています。歯科衛生士・歯科助手を募集中です。ブランクのある方、経験の浅い方も歓迎します。まずはお気軽にお問い合わせください。</p>
    </div>

    <div class="recruit-tabs">
      <button class="tab-btn active" data-tab="tab-dh">歯科衛生士</button>
      <button class="tab-btn" data-tab="tab-da">歯科助手</button>
    </div>
    <div class="recruit-tab-content">
      <div class="tab-panel active" id="tab-dh">
        <table class="recruit-table">
          <tr><th>雇用形態</th><td>正社員（常勤）</td></tr>
          <tr><th>応募資格</th><td>歯科衛生士免許をお持ちの方</td></tr>
          <tr><th>仕事内容</th><td>クリーンな環境での歯科衛生士業務全般<ul class="rc-ul"><li><strong>予防処置・メンテナンス：</strong>スケーリング、PMTC、フッ素塗布 など</li><li><strong>保健指導：</strong>TBI（ブラッシング指導）、口腔衛生のアドバイス</li><li><strong>診療補助：</strong>歯科医師のサポート、器具の準備、消毒・滅菌業務</li></ul></td></tr>
          <tr><th>給与</th><td><strong>月給 311,000円 〜</strong><br><small>※経験・スキルを考慮し決定します。</small><br><small>※固定残業代21,000円/10時間分を含む。超過分は別途支給。</small></td></tr>
        </table>
      </div>
      <div class="tab-panel" id="tab-da">
        <table class="recruit-table">
          <tr><th>雇用形態</th><td>正社員（常勤）</td></tr>
          <tr><th>仕事内容</th><td>診療補助（歯科医師のサポート、器具の準備、消毒・滅菌業務）、受付業務</td></tr>
          <tr><th>給与</th><td><strong>月給 258,000円 〜</strong><br><small>※経験・スキルを考慮し決定します。</small><br><small>※固定残業代18,000円/10時間分を含む。超過分は別途支給。</small></td></tr>
        </table>
      </div>
    </div>

    <h2 class="recruit-sub">共通項目</h2>
    <table class="recruit-table">${commonRows}</table>

    <div class="recruit-cta">
      <a href="contact.html" class="btn-primary">応募・お問い合わせはこちら</a>
      <a href="${clinic.jobMedleyUrl}" target="_blank" rel="noopener noreferrer" class="btn-job-medley">
        <img src="assets/images/icon-job-medley.png" alt="ジョブメドレー">
        <span>から応募</span>
      </a>
    </div>
  </div>
</section>`;
  write('recruit.html', renderPage({
    title: `採用情報（歯科衛生士・歯科助手）｜${clinic.name}`,
    description: `${clinic.name}のスタッフ募集。目黒駅前・徒歩3分、新しくクリーンな環境で一緒に働きませんか。歯科衛生士・歯科助手を募集中です。`,
    depth, active: 'recruit.html', canonical: 'recruit.html', body,
  }));
}

// ============================================================
//  お問い合わせ  contact.html
// ============================================================
{
  const depth = 0;
  const body = `
${renderPageHero('Contact', 'ご予約・お問い合わせ', 'ご予約、診療内容や求人についてのお問い合わせを承ります。', { depth, crumbs: [{ label: 'お問い合わせ' }] })}
<section class="section">
  <div class="container narrow">
    <div class="contact-tel-box">
      <p class="ct-label">お電話でのご予約・お問い合わせ</p>
      <a href="tel:${clinic.telHref}" class="ct-num">${clinic.tel}</a>
      <p class="ct-hours">診療時間 10:00-13:00 / 14:30-19:00　休診：${clinic.closed}</p>
    </div>
    <p class="contact-or">または、下記フォームよりお問い合わせください</p>
    <form class="contact-form" action="#" method="post" onsubmit="return false;">
      <div class="form-row"><label for="f-name">お名前 <span class="req">必須</span></label><input type="text" id="f-name" name="name" required></div>
      <div class="form-row"><label for="f-kana">フリガナ</label><input type="text" id="f-kana" name="kana"></div>
      <div class="form-row"><label for="f-tel">電話番号 <span class="req">必須</span></label><input type="tel" id="f-tel" name="tel" required></div>
      <div class="form-row"><label for="f-email">メールアドレス <span class="req">必須</span></label><input type="email" id="f-email" name="email" required></div>
      <div class="form-row"><label for="f-type">お問い合わせ種別</label>
        <select id="f-type" name="type">
          <option>診療のご予約</option>
          <option>診療内容について</option>
          <option>求人・採用について</option>
          <option>その他</option>
        </select>
      </div>
      <div class="form-row"><label for="f-msg">お問い合わせ内容 <span class="req">必須</span></label><textarea id="f-msg" name="message" rows="6" required></textarea></div>
      <p class="form-note">※このフォームはデモ表示です。実際の送信機能は、サーバー設置時に設定してください。</p>
      <div class="form-submit"><button type="submit" class="btn-primary">送信内容を確認する</button></div>
    </form>
  </div>
</section>`;
  write('contact.html', renderPage({
    title: `ご予約・お問い合わせ｜${clinic.name}`,
    description: `${clinic.name}のご予約・お問い合わせページ。お電話またはフォームより承ります。`,
    depth, active: 'contact.html', canonical: 'contact.html', body,
  }));
}

// ============================================================
//  送信完了  thanks.html
// ============================================================
{
  const depth = 0;
  const body = `
${renderPageHero('Thank you', '送信が完了しました')}
<section class="section">
  <div class="container narrow center-block">
    <p class="thanks-msg">お問い合わせいただき、誠にありがとうございます。<br>内容を確認のうえ、担当者よりご連絡いたします。<br>お急ぎの場合は、お電話にてお問い合わせください。</p>
    <a href="tel:${clinic.telHref}" class="thanks-tel">${clinic.tel}</a>
    <p class="center-link"><a href="index.html" class="btn-primary">ホームへ戻る</a></p>
  </div>
</section>`;
  write('thanks.html', renderPage({
    title: `送信完了｜${clinic.name}`,
    description: `お問い合わせ送信完了ページ`,
    depth, active: '', body,
  }));
}

// ============================================================
//  sitemap.xml / robots.txt
// ============================================================
{
  const urls = [
    '', 'clinic.html', 'doctor.html', 'price.html', 'access.html',
    'news.html', 'recruit.html', 'contact.html', 'medical/',
    ...treatments.map(t => `medical/${t.slug}.html`),
  ];
  const today = '2026-08-16';
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${clinic.baseUrl}/${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u === '' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${u === '' ? '1.0' : '0.7'}</priority>\n  </url>`).join('\n')}
</urlset>
`;
  write('sitemap.xml', sitemap);
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${clinic.baseUrl}/sitemap.xml\n`);
}

copyAssets();

console.log('\n✅ Build complete.');
