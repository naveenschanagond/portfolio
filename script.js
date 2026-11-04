/* =====================================================
   EDIT YOUR CONTENT HERE. Everything on the page is
   rendered from this DATA object. Leave null/empty
   until you have real values; nothing is invented.
   ===================================================== */
const DATA = {
  email: "your-email@example.com",            // PLACEHOLDER: replace
  formEndpoint: "",                            // Formspree URL, see README
  social: [
    { name: "GitHub",   url: "https://github.com/naveenschanagond" },        // PLACEHOLDER
    { name: "LinkedIn", url: "https://www.linkedin.com/in/naveen-s-chanagond-898a80339?utm_source=share_via&utm_content=profile&utm_medium=member_android" }, // PLACEHOLDER
    { name: "Instagram",url: "https://www.instagram.com/naveenschanagond" }   // PLACEHOLDER
  ],
  currentSemester: "5th Semester",
  achievementsCount: 0,                        // update when you have achievements
  typedWords: ["Software Developer", "Web Developer", "Tech Enthusiast"],
  // level: 0-100, or null while undecided (shows a dashed "set level" bar)
  skills: {
    "Programming":     [["C",null],["Python",null],["Java",null]],
    "Web Development": [["HTML",null],["CSS",null],["JavaScript",null]],
    "Database":        [["MySQL",null],["SQL",null]],
    "Tools":           [["Git",null],["GitHub",null],["VS Code",null]],
    "Concepts":        [["Data Structures",null],["Algorithms",null],["DBMS",null],["Object-Oriented Programming",null]]
  },
  projects: [
    { title:"CricStats", sub:"Ball-by-Ball Cricket Scoring and Analytics Engine", image:"", tech:["Add tech"], live:"", github:"",
      desc:"A scoring and analytics engine that records a cricket match ball by ball and turns it into statistics." },
    { title:"IPL Mega Auction Simulator", sub:"", image:"", tech:["Add tech"], live:"", github:"",
      desc:"A simulator for running an IPL-style mega auction with teams, budgets and player bidding." },
    { title:"FitTrack", sub:"Gym Membership and Access Management System", image:"", tech:["Add tech"], live:"", github:"",
      desc:"A system for managing gym memberships and controlling member access." },
    { title:"Women Safety Application", sub:"", image:"", tech:["Add tech"], live:"", github:"",
      desc:"An application focused on helping users stay safe and reach help quickly." }
  ],
  // Fill the arrays below with real entries only. Example entry shown in comments.
  performance: {
    "Technical learning milestones": [],   // { text:"Learned Git basics", date:"2025" }
    "Academic achievements": [],           // { text:"CGPA / SGPA", value:"8.5" }
    "Certifications & courses": [],        // { text:"Course name, Provider", date:"2025" }
    "Project milestones": []               // { text:"CricStats v1 completed", date:"2025" }
  },
  coding: [                                 // value & goal: numbers, or null
    { label:"Coding problems solved", value:null, goal:null },
    { label:"Projects completed", value:null, goal:4 }
  ],
  education: [
    { school:"Atria Institute of Technology, Bengaluru", degree:"Bachelor of Engineering (B.E.)", branch:"Information Science & Engineering", sem:"Current semester: 5th", years:"2026 – 2027" }
  ]
};

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- render content ---------- */
function render() {
  $("#year").textContent = new Date().getFullYear();
  $("#about-sem").textContent = DATA.currentSemester;
  const mail = $("#email-link"); mail.href = "mailto:" + DATA.email; mail.textContent = DATA.email;

  const socials = DATA.social.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a>`).join("");
  $("#social-hero").innerHTML = socials; $("#social-contact").innerHTML = socials;

  const skillCount = Object.values(DATA.skills).reduce((n, a) => n + a.length, 0);
  $("#stats").innerHTML = [["Projects", DATA.projects.length], ["Skills", skillCount], ["Achievements", DATA.achievementsCount]]
    .map(([l, v]) => `<div class="card stat"><b data-count="${v}">0</b><span>${l}</span></div>`).join("");

  $("#skills-grid").append(...Object.entries(DATA.skills).map(([cat, list]) => el(`<div class="card"><h3>${esc(cat)}</h3>${
    list.map(([n, lv]) => `<div class="skill"><div><span>${esc(n)}</span><span>${lv == null ? "level: set me" : lv + "%"}</span></div>
      <div class="bar ${lv == null ? "todo" : ""}"><i data-w="${lv ?? 0}"></i></div></div>`).join("")}</div>`)));

  $("#projects-grid").append(...DATA.projects.map(p => {
    const link = (u, t) => u ? `<a class="btn ghost" href="${esc(u)}" target="_blank" rel="noopener noreferrer">${t}</a>`
      : `<span class="btn ghost todo-link" title="Add this link in script.js">${t} (link needed)</span>`;
    const thumb = p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">` : esc(p.title.slice(0, 2).toUpperCase());
    return el(`<article class="card project"><div class="thumb">${thumb}</div><div class="body"><h3>${esc(p.title)}</h3>
      ${p.sub ? `<p><em>${esc(p.sub)}</em></p>` : ""}<p>${esc(p.desc)}</p><div class="chips">${p.tech.map(t => `<span>${esc(t)}</span>`).join("")}</div>
      <div class="btns">${link(p.live, "View Project")}${link(p.github, "GitHub")}</div></div></article>`);
  }));

  const perf = Object.entries(DATA.performance).map(([cat, items]) => el(`<div class="card"><h3>${esc(cat)}</h3>${
    items.length ? `<ul>${items.map(i => `<li>${esc(i.text)}${i.value ? ": <b>" + esc(i.value) + "</b>" : ""}${i.date ? " (" + esc(i.date) + ")" : ""}</li>`).join("")}</ul>`
    : `<p class="empty">Nothing added yet. Add real entries in script.js.</p>`}</div>`));
  perf.push(el(`<div class="card"><h3>Coding practice</h3>${DATA.coding.map(c => {
    const pct = c.value != null && c.goal ? Math.min(100, Math.round(c.value / c.goal * 100)) : null;
    return `<div class="skill"><div><span>${esc(c.label)}</span><span>${c.value ?? "?"}${c.goal ? " / " + c.goal : ""}</span></div>
      <div class="bar ${pct == null ? "todo" : ""}"><i data-w="${pct ?? 0}"></i></div></div>`;}).join("")}</div>`));
  $("#perf-grid").append(...perf);

  $("#timeline").append(...DATA.education.map(e => el(`<li><div class="card"><h3>${esc(e.school)}</h3><p>${esc(e.degree)}</p>
    <p>Branch: ${esc(e.branch)}</p><p>${esc(e.sem)} &middot; ${esc(e.years)}</p></div></li>`)));
}

/* ---------- theme (saved in localStorage) ---------- */
function initTheme() {
  let t; try { t = localStorage.getItem("theme"); } catch {}
  document.documentElement.dataset.theme = t || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  $("#theme").onclick = () => {
    const n = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = n; try { localStorage.setItem("theme", n); } catch {}
  };
}

/* ---------- typing effect ---------- */
function typing() {
  const out = $("#typed"), words = DATA.typedWords; let w = 0, c = 0, del = false;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { out.textContent = words[0]; return; }
  (function tick() {
    const word = words[w]; out.textContent = word.slice(0, c);
    if (!del && c++ === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && --c === 0) { del = false; w = (w + 1) % words.length; }
    setTimeout(tick, del ? 40 : 90);
  })();
}

/* ---------- scroll: reveal, bars, counters, active nav, back-to-top ---------- */
function scrollFx() {
  const animate = (root) => {
    root.querySelectorAll("[data-w]").forEach(b => b.style.width = b.dataset.w + "%");
    root.querySelectorAll("[data-count]").forEach(n => {
      const end = +n.dataset.count; let i = 0; const step = Math.max(1, Math.ceil(end / 30));
      (function up() { i = Math.min(end, i + step); n.textContent = i; if (i < end) requestAnimationFrame(up); })();
    });
  };
  // Scroll-based reveal + active nav (no IntersectionObserver, so it works in every viewer)
  const secs = [...document.querySelectorAll("main section")];
  const links = [...document.querySelectorAll("nav a")];
  const check = () => {
    const vh = innerHeight;
    document.querySelectorAll(".reveal:not(.show)").forEach(s => {
      if (s.getBoundingClientRect().top < vh * 0.92) { s.classList.add("show"); animate(s); }
    });
    let cur = secs[0].id;
    secs.forEach(s => { if (s.getBoundingClientRect().top <= vh * 0.4) cur = s.id; });
    links.forEach(a => a.classList.toggle("active", a.hash === "#" + cur));
  };
  addEventListener("scroll", check, { passive: true }); addEventListener("resize", check);
  check(); setTimeout(check, 300);

  const top = $("#top");
  addEventListener("scroll", () => top.hidden = scrollY < 500, { passive: true });
  top.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

  const burger = $("#burger"), menu = $("#menu");
  burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
  menu.onclick = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); };
}

/* ---------- contact form ---------- */
function form() {
  const f = $("#form"), status = $("#status");
  f.addEventListener("submit", async (e) => {
    e.preventDefault(); status.textContent = ""; status.className = "";
    let ok = true;
    [...f.elements].filter(x => x.name).forEach(x => {
      const msg = !x.value.trim() ? "This field is required." : x.validity.typeMismatch ? "Enter a valid email address."
        : x.validity.tooShort ? "Write at least 10 characters." : "";
      x.parentElement.querySelector("small").textContent = msg; if (msg) ok = false;
    });
    if (!ok) { status.textContent = "Fix the highlighted fields and try again."; status.className = "err"; return; }
    const d = Object.fromEntries(new FormData(f));
    if (!DATA.formEndpoint) {   // fallback: open the visitor's email app
      location.href = `mailto:${DATA.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message + "\n\nFrom: " + d.name + " (" + d.email + ")")}`;
      status.textContent = "Opening your email app. To send directly from the site, set formEndpoint (see README)."; status.className = "ok"; return;
    }
    try {
      const r = await fetch(DATA.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw 0;
      f.reset(); status.textContent = "Message sent. Thank you!"; status.className = "ok";
    } catch { status.textContent = "Message not sent. Check your connection or email me directly."; status.className = "err"; }
  });
}

initTheme(); render(); typing(); scrollFx(); form();
