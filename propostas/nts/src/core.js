/* =========================================================================
   Enjourney · Proposta NTS — motor da apresentação
   ========================================================================= */
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const NS = "http://www.w3.org/2000/svg";
function el(tag, attrs = {}, parent, text) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    if (k === "class") e.className = v; else if (k === "html") e.innerHTML = v; else e.setAttribute(k, v);
  }
  if (text != null) e.textContent = text;
  if (parent) parent.appendChild(e);
  return e;
}
function sv(tag, attrs = {}, parent, text) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v != null) e.setAttribute(k, v);
  if (text != null) e.textContent = text;
  if (parent) parent.appendChild(e);
  return e;
}
const store = {
  get(k) { try { return localStorage.getItem("enj-nts-" + k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem("enj-nts-" + k, v); } catch (e) {} },
};
const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------ ícones --- */
const I = {
  arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  flag: '<path d="M4 22V4M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  spark: '<path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6M16 4a4 4 0 0 1 0 8M22 21c0-3-2-5-4-6"/>',
  tap: '<path d="M9 11V5a2 2 0 0 1 4 0v5M13 9.5a2 2 0 0 1 4 0V11M17 11a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-.5a7 7 0 0 1-5.6-2.8L3.5 15a2 2 0 0 1 3-2.6L9 15"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  rows: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/>',
  slides: '<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 22h8"/>',
  full: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>',
  keys: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
  server: '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  db: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M19 9h3M19 15h3M2 9h3M2 15h3"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  approve: '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  ruler: '<path d="M21.3 15.3 8.7 2.7a1 1 0 0 0-1.4 0L2.7 7.3a1 1 0 0 0 0 1.4l12.6 12.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4zM7.5 10.5l2-2M10.5 13.5l2-2M13.5 16.5l2-2"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
  workshop: '<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M7 21v-2a5 5 0 0 1 10 0v2M2 19v-1a3 3 0 0 1 4-2.8M22 19v-1a3 3 0 0 0-4-2.8"/>',
  test: '<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><path d="M7 15h10"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
  folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  gate: '<path d="M4 21V8l8-5 8 5v13"/><path d="M9 21v-6h6v6"/>',
};
function icon(name, cls = "") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name] || ""}</svg>`;
}
function hydrateIcons(root = document) {
  $$("i.ic[data-i]", root).forEach((n) => { if (!n.firstChild) n.innerHTML = icon(n.dataset.i); });
}

/* --------------------------------------------- logo Enjourney (vetor) --- */
// Pássaros traçados do logo original (coordenadas do arquivo 274×76).
const BIRD_PATHS = __BIRDS__;
const BIRD_GROUPS = { big: [3], mid: [0, 2], small: [1] };
function enjLogoSVG({ birds = "url(#enjG)", word = "#8F8F8F", id = "" } = {}) {
  const g = (k) => BIRD_GROUPS[k].map((i) => `<path d="${BIRD_PATHS[i].d}"/>`).join("");
  return `<svg class="enj" viewBox="14 4 252 64" role="img" aria-label="Enjourney">
    <defs><linearGradient id="enjG${id}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#0b4f86"/><stop offset=".6" stop-color="#1d65a0"/><stop offset="1" stop-color="#518ec7"/></linearGradient></defs>
    <g fill="${birds === "url(#enjG)" ? `url(#enjG${id})` : birds}">${g("big")}${g("mid")}${g("small")}</g>
    <text x="79" y="63" textLength="181" lengthAdjust="spacingAndGlyphs" font-family="Montserrat" font-weight="300" font-size="39" fill="${word}">ENJOURNEY</text>
  </svg>`;
}

/* ================================================================ deck --- */
const CHAPTERS = [
  { t: "A resposta" },
  { t: "O ciclo hoje", s: "O tempo do time vai para reunir e reconciliar dados de dez aplicativos, não para decidir. Na tarefa coberta a ferramenta corta de metade a quatro quintos; no ciclo inteiro, cerca de 10% em rotina na opção 1 e 15% na opção 2." },
  { t: "O que propomos", s: "Uma aplicação agêntica em que agentes reúnem e parametrizam, código calcula, agentes explicam e pessoas aprovam; o dado não sai do perímetro da NTS, e nenhuma exceção passa por omissão." },
  { t: "Como trabalhamos", s: "Duas modalidades sobre a mesma arquitetura e o mesmo roteiro de 12 semanas, que começam medindo o ciclo." },
  { t: "Quanto custa e quanto devolve", s: "O caso se apoia no controle das diferenças que hoje passam ao próximo ciclo; o tempo devolvido é capacidade, não caixa. As semanas 1 e 2 medem e decidem seguir ou parar." },
  { t: "A decisão", s: "Três decisões da Enjourney abrem a semana 1: a modalidade, os nomes na NTS e a data do kickoff." },
];
const Deck = {
  slides: [], i: 0, read: false, hooks: {}, leave: {},
  on(id, fn) { (this.hooks[id] ||= []).push(fn); },
  onLeave(id, fn) { (this.leave[id] ||= []).push(fn); },

  init() {
    this.slides = $$(".slide");
    const total = this.slides.length;
    const logoDark = enjLogoSVG({ birds: "#d6e8f8", word: "#ffffff", id: "D" });
    this.slides.forEach((s, n) => {
      s.dataset.n = n + 1;
      if (s.hasAttribute("data-bare")) return;
      const ch = CHAPTERS[+s.dataset.chapter];
      const pg = `${String(n + 1).padStart(2, "0")} / ${total}`;
      const head = $(".head", s), body = $(".body", s);
      const hbar = el("div", { class: "hbar" });
      hbar.innerHTML = `${logoDark}<span class="sep"></span><div class="ht"><b>${s.dataset.title}</b><span>${+s.dataset.chapter ? "Parte " + String(s.dataset.chapter).padStart(2, "0") + " · " : ""}${ch.t}</span></div>
        <div class="rt"><span class="dot"></span><span>Proposta de agentes de IA para</span><img src="__NTS_LOGO__" alt="NTS"><span class="pg">${pg}</span></div>`;
      const band = el("div", { class: "band" });
      band.innerHTML = `<b>${s.dataset.title}</b><span>${s.dataset.bs || ch.t}</span>`;
      const panel = el("div", { class: "panel" });
      if (head) panel.appendChild(head);
      if (body) panel.appendChild(body);
      const foot = el("div", { class: "foot" });
      foot.innerHTML = `<span class="mark">Enjourney · Proposta NTS</span><span class="src">${s.dataset.src || ""}</span><span class="pgn">${pg}</span>`;
      s.prepend(hbar, band, panel);
      s.appendChild(foot);
    });
    $$("svg[data-birds]").forEach((svg) => (svg.innerHTML = `<g fill="#9fc8ee">${BIRD_PATHS.map((p) => `<path d="${p.d}"/>`).join("")}</g>`));
    hydrateIcons();
    this.buildBar();
    this.bindKeys();
    const want = store.get("read");
    this.setRead(want != null ? want === "1" : this.autoRead(), false);
    const h = parseInt(location.hash.slice(1), 10);
    this.go(h >= 1 && h <= total ? h - 1 : 0, { instant: true });
    addEventListener("resize", () => { if (store.get("read") == null) this.setRead(this.autoRead(), false); this.fit(); });
    this.fit();
  },
  autoRead() { return innerWidth < 900 || (innerHeight > innerWidth * 1.15 && innerWidth < 1100); },

  fit() {
    if (this.read) return;
    const vp = $("#viewport"), st = $("#stage");
    const w = vp.clientWidth - 24, h = vp.clientHeight - 16;
    const s = Math.min(w / 1920, h / 1080);
    st.style.transform = `translate(${-960 * s}px, ${-540 * s}px) scale(${s})`;
    this.scale = s;
  },

  buildBar() {
    const chapters = $("#chapters");
    CHAPTERS.forEach((c, k) => {
      const b = el("button", { type: "button" }, chapters);
      b.innerHTML = `${c.t}<i><b></b></i>`;
      b.onclick = () => this.go(this.slides.findIndex((s) => +s.dataset.chapter === k));
    });
    const menu = $("#menu");
    let last = -1;
    this.slides.forEach((s, n) => {
      const c = +s.dataset.chapter;
      if (c !== last) { el("h6", {}, menu, CHAPTERS[c].t); last = c; }
      const b = el("button", { type: "button", role: "menuitem" }, menu);
      b.innerHTML = `<span>${String(n + 1).padStart(2, "0")}</span>${s.dataset.title}`;
      b.onclick = () => { this.go(n); menu.classList.remove("open"); };
    });
    $("#counter").onclick = (e) => { e.stopPropagation(); menu.classList.toggle("open"); };
    document.addEventListener("click", (e) => { if (!menu.contains(e.target)) menu.classList.remove("open"); });
    $("#btnPrev").onclick = () => this.prev();
    $("#btnNext").onclick = () => this.next();
    $("#btnRead").onclick = () => this.setRead(!this.read, true);
    $("#btnFull").onclick = () => this.full();
  },

  bindKeys() {
    addEventListener("keydown", (e) => {
      if (e.target.closest("input,textarea") || e.target.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (this.read) { if (k === "l" || k === "L") this.setRead(false, true); return; }
      if (["ArrowRight", "PageDown", " "].includes(k)) { e.preventDefault(); this.next(); }
      else if (["ArrowLeft", "PageUp"].includes(k)) { e.preventDefault(); this.prev(); }
      else if (k === "Home") this.go(0);
      else if (k === "End") this.go(this.slides.length - 1);
      else if (k === "f" || k === "F") this.full();
      else if (k === "l" || k === "L") this.setRead(true, true);
      else if (k === "g" || k === "G") $("#menu").classList.toggle("open");
      else if (k === "Escape") $("#menu").classList.remove("open");
    });
    let x0 = null, y0 = null;
    const vp = $("#viewport");
    vp.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    vp.addEventListener("touchend", (e) => {
      if (x0 == null || this.read) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? this.next() : this.prev();
      x0 = null;
    });
  },

  full() {
    const d = document;
    if (!d.fullscreenElement) d.documentElement.requestFullscreen?.().catch(() => {});
    else d.exitFullscreen?.();
  },

  setRead(on, user) {
    this.read = on;
    document.documentElement.classList.toggle("read", on);
    $("#btnRead").innerHTML = on ? `${icon("slides")}<span class="hide-sm">Apresentar</span>` : `${icon("rows")}<span class="hide-sm">Leitura</span>`;
    if (user) store.set("read", on ? "1" : "0");
    if (on) {
      $("#stage").style.transform = "";
      this.observe();
      this.slides.forEach((s) => s.classList.add("is-active"));
      this.slides.forEach((s) => this.fire(s.id));
      const cur = this.slides[this.i];
      if (user && cur) setTimeout(() => cur.scrollIntoView({ block: "start" }), 30);
    } else {
      this.io?.disconnect();
      this.slides.forEach((s, n) => s.classList.toggle("is-active", n === this.i));
      this.fit();
      this.go(this.i, { instant: true, force: true });
    }
  },
  observe() {
    this.io?.disconnect();
    this.io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting && en.intersectionRatio > 0.35) {
          const n = +en.target.dataset.n - 1;
          this.i = n; this.updateUI();
        }
        en.target.dispatchEvent(new CustomEvent(en.isIntersecting ? "visible" : "hidden"));
      });
    }, { threshold: [0, 0.35] });
    this.slides.forEach((s) => this.io.observe(s));
  },

  next() { if (this.i < this.slides.length - 1) this.go(this.i + 1); },
  prev() { if (this.i > 0) this.go(this.i - 1); },
  go(n, { instant = false, force = false } = {}) {
    n = Math.max(0, Math.min(this.slides.length - 1, n));
    if (this.read) { this.slides[n].scrollIntoView({ behavior: instant ? "auto" : "smooth" }); return; }
    const prevI = this.i, prev = this.slides[prevI], cur = this.slides[n];
    if (n === prevI && !force && cur.classList.contains("is-active")) return;
    this.slides.forEach((s, k) => {
      s.classList.toggle("is-prev", k < n);
      if (k !== n) s.classList.remove("is-active");
    });
    if (prev && prev !== cur) (this.leave[prev.id] || []).forEach((f) => f());
    this.i = n;
    const show = () => { cur.classList.add("is-active"); this.fire(cur.id); };
    show();
    history.replaceState(null, "", "#" + (n + 1));
    this.updateUI();
  },
  fire(id) { (this.hooks[id] || []).forEach((f) => f()); },
  updateUI() {
    const n = this.i, total = this.slides.length, cur = this.slides[n];
    $("#counter").textContent = `${n + 1} / ${total}`;
    $("#progress").style.width = `${((n + 1) / total) * 100}%`;
    $("#btnPrev").disabled = n === 0;
    $("#btnNext").disabled = n === total - 1;
    const c = +cur.dataset.chapter;
    $$("#chapters button").forEach((b, k) => {
      b.classList.toggle("on", k === c);
      const idx = this.slides.map((s, j) => (+s.dataset.chapter === k ? j : -1)).filter((j) => j >= 0);
      const done = idx.filter((j) => j <= n).length / idx.length;
      b.querySelector("b").style.width = `${Math.round(done * 100)}%`;
    });
    $$("#menu button").forEach((b, k) => b.classList.toggle("on", k === n));
  },
};
