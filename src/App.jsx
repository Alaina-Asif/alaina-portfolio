import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ── DATA ────────────────────────────────────────────────────
const ROLES = [
  "Data Science Student",
  "React Developer",
  "ML Enthusiast",
  "Cyber Security Learner",
  "Physics Student",
  "Problem Solver",
];

const SKILLS = [
  {
    icon: "🧠", title: "Python & Data Science", desc: "Data analysis, ML models, visualizations",
    tags: ["Python", "Data Analysis", "ML", "Pandas"],
    color: { icon: "rgba(168,85,247,.1)", border: "rgba(168,85,247,.3)", fa: "#a855f7" },
    bars: [
      { label: "Python",          w: 88, grad: "linear-gradient(90deg,#a855f7,#c084fc)" },
      { label: "Data Analysis",   w: 85, grad: "linear-gradient(90deg,#a855f7,#c084fc)" },
      { label: "Machine Learning",w: 80, grad: "linear-gradient(90deg,#a855f7,#c084fc)" },
    ],
  },
  {
    icon: "💻", title: "Frontend Development", desc: "Modern, responsive web interfaces",
    tags: ["React.js", "HTML5", "CSS3", "JavaScript", "Vite"],
    color: { icon: "rgba(244,114,182,.1)", border: "rgba(244,114,182,.3)", fa: "#f472b6" },
    bars: [
      { label: "React.js",    w: 85, grad: "linear-gradient(90deg,#f472b6,#fb2576)" },
      { label: "HTML/CSS",    w: 90, grad: "linear-gradient(90deg,#f472b6,#fb2576)" },
      { label: "JavaScript",  w: 82, grad: "linear-gradient(90deg,#f472b6,#fb2576)" },
    ],
  },
  {
    icon: "🛡️", title: "Cyber Security", desc: "Penetration testing & security analysis",
    tags: ["Nmap", "Malware Analysis", "Network Security"],
    color: { icon: "rgba(251,37,118,.1)", border: "rgba(251,37,118,.3)", fa: "#fb2576" },
    bars: [
      { label: "Pen Testing",       w: 78, grad: "linear-gradient(90deg,#fb2576,#f43f5e)" },
      { label: "Network Security",  w: 75, grad: "linear-gradient(90deg,#fb2576,#f43f5e)" },
      { label: "Malware Analysis",  w: 72, grad: "linear-gradient(90deg,#fb2576,#f43f5e)" },
    ],
  },
  {
    icon: "🗄️", title: "Database & Backend", desc: "Data storage and server-side logic",
    tags: ["SQL", "MongoDB", "Node.js"],
    color: { icon: "rgba(52,211,153,.1)", border: "rgba(52,211,153,.3)", fa: "#34d399" },
    bars: [
      { label: "SQL / Database", w: 82, grad: "linear-gradient(90deg,#34d399,#10b981)" },
      { label: "Node.js",        w: 70, grad: "linear-gradient(90deg,#34d399,#10b981)" },
      { label: "REST APIs",      w: 80, grad: "linear-gradient(90deg,#34d399,#10b981)" },
    ],
  },
  {
    icon: "📋", title: "Project Management", desc: "Planning, organizing & delivering",
    tags: ["Agile", "Jira", "IBM DOORS", "Git"],
    color: { icon: "rgba(251,191,36,.1)", border: "rgba(251,191,36,.3)", fa: "#fbbf24" },
    bars: [
      { label: "Project Mgmt",   w: 75, grad: "linear-gradient(90deg,#fbbf24,#f59e0b)" },
      { label: "Git & GitHub",   w: 88, grad: "linear-gradient(90deg,#fbbf24,#f59e0b)" },
      { label: "IBM DOORS/Jira", w: 72, grad: "linear-gradient(90deg,#fbbf24,#f59e0b)" },
    ],
  },
  {
    icon: "⚛️", title: "CS & Physics Fundamentals", desc: "Core foundations across disciplines",
    tags: ["DSA", "OOP", "AI", "Networks", "Physics"],
    color: { icon: "rgba(244,114,182,.1)", border: "rgba(244,114,182,.3)", fa: "#f472b6" },
    bars: [
      { label: "OOP & DSA",          w: 85, grad: "linear-gradient(90deg,#f472b6,#a855f7)" },
      { label: "AI Fundamentals",    w: 80, grad: "linear-gradient(90deg,#f472b6,#a855f7)" },
      { label: "Engineering Physics",w: 75, grad: "linear-gradient(90deg,#f472b6,#a855f7)" },
    ],
  },
];

const PROJECTS = [
  { emoji:"🌐", num:"01", tags:["react","security"], tagLabels:["React","Vite","Networking"],       title:"NetProbe",         desc:"Network insights made simple, visual and accessible. Real-time network scanning UI.",                             code:"https://github.com/Alaina-Asif/netprobe-app",     live:"https://netprobe-app.vercel.app/",           grad:"rgba(168,85,247,.2),rgba(168,85,247,.05)",  featured:false },
  { emoji:"✍️", num:"02", tags:["react"],            tagLabels:["React","localStorage","CSS"],       title:"InkSpace",         desc:"Modern note-taking combining flexibility, organization and creativity in one place.",                             code:"https://github.com/Alaina-Asif/inkspace-app",     live:"https://inkspace-app-three.vercel.app/",     grad:"rgba(244,114,182,.2),rgba(244,114,182,.05)", featured:false },
  { emoji:"🔐", num:"03", tags:["react","security"], tagLabels:["React","Security","localStorage"],  title:"VaultEntry",       desc:"Secure sensitive info manager. Structured and safer password & credential storage.",                             code:"https://github.com/Alaina-Asif/vaultentry-app",   live:"https://vaultentry-app.vercel.app/",         grad:"rgba(251,37,118,.2),rgba(251,37,118,.05)",   featured:false },
  { emoji:"📝", num:"04", tags:["react"],            tagLabels:["React","useState","CSS"],           title:"NoteNest",         desc:"Minimal, focused note-taking app. Simple tools that are the most powerful.",                                     code:"https://github.com/Alaina-Asif/notenest-app",     live:"https://notenest-app-henna.vercel.app/",     grad:"rgba(168,85,247,.2),rgba(168,85,247,.05)",  featured:false },
  { emoji:"🛡️", num:"05", tags:["react","security"], tagLabels:["React","Regex","Security"],        title:"PassGuard",        desc:"Smart password manager. Stores and organizes credentials securely in one place.",                               code:"https://github.com/Alaina-Asif/passguard-app",    live:"https://passguard-app.vercel.app/",          grad:"rgba(244,114,182,.2),rgba(244,114,182,.05)", featured:false },
  { emoji:"💸", num:"06", tags:["react"],            tagLabels:["React","useMemo","Charts"],         title:"SpendSmart",       desc:"Expense tracker with live bar chart breakdown, category filters and clean data viz.",                           code:"https://github.com/Alaina-Asif/spendsmart-app",   live:"https://spendsmart-app-alaina.vercel.app",   grad:"rgba(52,211,153,.2),rgba(52,211,153,.05)",   featured:false },
  { emoji:"🧠", num:"07", tags:["react"],            tagLabels:["React","useEffect","Timer"],        title:"QuizWave",         desc:"CS Quiz App with 10 questions, instant feedback, score tracking & glassmorphism UI.",                           code:"https://github.com/Alaina-Asif/quizwave-app",     live:"https://quizwave-app.vercel.app/",           grad:"rgba(251,191,36,.2),rgba(251,191,36,.05)",   featured:false },
  { emoji:"🌤️", num:"08", tags:["react","api"],      tagLabels:["React","API","async/await"],        title:"WeatherNow",       desc:"Real-time weather app. Search any city — temperature, humidity, wind & more.",                                  code:"https://github.com/Alaina-Asif/weathernow-app",   live:"https://weathernow-app.vercel.app/",         grad:"rgba(59,130,246,.2),rgba(59,130,246,.05)",   featured:false },
  { emoji:"🧮", num:"09", tags:["react"],            tagLabels:["React","Logic","useState"],         title:"Smart Calculator", desc:"Full arithmetic, percentage, sign toggle & live expression display. Built with React.",                         code:"https://github.com/Alaina-Asif/calculator-app",   live:"https://calculator-alaina.vercel.app/",      grad:"rgba(244,114,182,.2),rgba(244,114,182,.05)", featured:false },
  { emoji:"✅", num:"10", tags:["react"],            tagLabels:["React","useState","CSS","Vite"],    title:"Task Manager App", desc:"First React project — task management with add, delete, complete & filter features.",                           code:"https://github.com/Alaina-Asif/task-manager-app", live:"https://task-manager-alaina.vercel.app/",    grad:"rgba(168,85,247,.2),rgba(168,85,247,.05)",  featured:true  },
];

const CERTS = [
  { icon:"🛡️", color:"#fb2576", issuer:"IBM via Coursera",    title:"Malware Analysis & Introduction to Assembly Language", date:"May 2025",  link:"https://www.coursera.org/account/accomplishments/verify/M5GLYJOL6ZP6",  label:"Verify" },
  { icon:"🔍", color:"#a855f7", issuer:"Coursera",             title:"Vulnerability Scanning with Nmap: Network Scanning",   date:"Dec 2024",  link:"https://www.coursera.org/account/accomplishments/verify/B84GZLG7I4BH",  label:"Verify" },
  { icon:"🔐", color:"#f472b6", issuer:"DiceCamp",             title:"Cyber Security Crash Course",                          date:"2024",       link:"https://www.linkedin.com/posts/alaina-asif-1b1563339_cybersecurity-professionalgrowth-learninganddevelopment-share-7276919045973585921-kL-V", label:"View" },
  { icon:"🤖", color:"#c084fc", issuer:"IBM via Coursera",     title:"Generative AI: Introduction and Applications",          date:"2025",       link:"https://www.coursera.org/account/accomplishments/verify/HIXEWP71AYZJ",  label:"Verify" },
  { icon:"📊", color:"#34d399", issuer:"Coursera",             title:"Data Analysis with Python",                            date:"2025",       link:"https://www.coursera.org/account/accomplishments/verify/YY5IQHP9I8ND",  label:"Verify" },
  { icon:"📋", color:"#fbbf24", issuer:"Google via Coursera",  title:"Foundations of Project Management",                    date:"Feb 2025",   link:"https://www.coursera.org/account/accomplishments/records/GOCK5RAYV6QA", label:"Verify" },
];

const MARQUEE_ITEMS = ["Python","React.js","Machine Learning","Data Analysis","Cyber Security","HTML5","CSS3","Git","SQL","Vite","AI & ML","Vercel"];

// ── HOOKS ───────────────────────────────────────────────────
function useTypewriter(words) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const speed = deleting ? 55 : 85;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words]);

  return text;
}

function useReveal() {
  useEffect(() => {
    // Small delay so DOM is fully painted before we check visibility
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal");

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              setTimeout(() => e.target.classList.add("visible"), i * 70);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px 0px 0px" }
      );

      elements.forEach((el) => obs.observe(el));

      // Fallback: force-show anything still invisible after 800ms
      setTimeout(() => {
        document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
          el.classList.add("visible");
        });
      }, 800);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}

function useSkillBars() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll(".sbar-fill").forEach((b) => {
            b.style.width = b.dataset.w + "%";
          });
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".skill-card").forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
}

function useCounters() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const end = parseInt(el.dataset.count);
          let cur = 0;
          const inc = Math.ceil(end / 40);
          const t = setInterval(() => {
            cur = Math.min(cur + inc, end);
            el.textContent = cur;
            if (cur >= end) clearInterval(t);
          }, 35);
          obs.unobserve(el);
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.35 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,114,182,${p.o})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(244,114,182,${0.04 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
  }, [canvasRef]);
}

// ── COMPONENTS ──────────────────────────────────────────────
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("Initializing...");
  const msgs = ["Initializing...", "Loading Projects...", "Almost Ready...", "Welcome! 🌸"];

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 100) { p = 100; clearInterval(interval); setProgress(100); setMsg("Welcome! 🌸"); setTimeout(onDone, 500); return; }
      setProgress(p);
      setMsg(msgs[Math.min(Math.floor((p / 100) * msgs.length), msgs.length - 1)]);
    }, 100);
    const safety = setTimeout(() => { clearInterval(interval); onDone(); }, 2500);
    return () => { clearInterval(interval); clearTimeout(safety); };
  }, []);

  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="loader-logo">AA</div>
        <div className="loader-bar"><div className="loader-fill" style={{ width: `${progress}%` }} /></div>
        <div className="loader-text">{msg}</div>
      </div>
    </div>
  );
}

function Navbar({ scrolled, activeSection, menuOpen, setMenuOpen }) {
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo"><span className="logo-bracket">&lt;</span>AA<span className="logo-bracket">/&gt;</span></div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {["home","about","skills","projects","certifications","contact"].map((s) => (
          <li key={s}>
            <a href={`#${s}`} className={`nav-link ${activeSection === s ? "active" : ""}`}
               onClick={() => setMenuOpen(false)}
               style={{ textTransform: "capitalize" }}>
              {s === "certifications" ? "Certs" : s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <a href="https://alaina-asif-cv.vercel.app" target="_blank" rel="noreferrer" className="nav-cta">View CV</a>
      <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  const role = useTypewriter(ROLES);
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-orb orb-1" /><div className="hero-orb orb-2" /><div className="hero-orb orb-3" />
      <canvas className="particles-canvas" ref={canvasRef} />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting reveal"><span className="greeting-line" />Hello, World! 🌸</div>
          <h1 className="hero-name reveal">
            <span className="name-line">Alaina</span>
            <span className="name-line accent">Asif</span>
          </h1>
          <div className="hero-roles reveal">
            <span className="role-static">I am a&nbsp;</span>
            <span className="role-dynamic">{role}</span>
            <span className="role-cursor">|</span>
          </div>
          <p className="hero-desc reveal">
            Engineering Physics &amp; Data Science Student at <strong>Hochschule München 🇩🇪</strong> — building real projects,
            earning certifications, and turning data into insight from <strong>Pakistan 🇵🇰</strong>
          </p>
          <div className="hero-btns reveal">
            <a href="#projects" className="btn-primary"><span>View Projects</span> →</a>
            <a href="#contact" className="btn-secondary"><span>Hire Me</span> ✉</a>
          </div>
          <div className="hero-socials reveal">
            <a href="https://github.com/Alaina-Asif" target="_blank" rel="noreferrer" className="social-icon">GH</a>
            <a href="https://www.linkedin.com/in/alaina-asif-1b1563339/" target="_blank" rel="noreferrer" className="social-icon">in</a>
            <a href="mailto:alainasif6@gmail.com" className="social-icon">✉</a>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="photo-frame">
            <div className="frame-ring ring-1" /><div className="frame-ring ring-2" /><div className="frame-ring ring-3" />
            <div className="photo-wrap-frame">
              <div className="photo-fallback-hero">AA</div>
            </div>
            <div className="photo-badge badge-1">💻 Dev</div>
            <div className="photo-badge badge-2">🧠 ML</div>
            <div className="photo-badge badge-3">🇵🇰 → 🇩🇪</div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>Scroll Down</span>
      </div>

      <div className="tech-marquee">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={item === "◆" ? "dot" : ""}>{i % 2 === 1 ? <span className="dot">◆</span> : null}{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  useCounters();
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">01 — About Me</span>
          <h2 className="section-title">Who I <span className="accent">Am</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-left reveal">
            <div className="about-img-wrap">
              <div className="about-img-bg" />
              <div className="about-img-fallback">AA</div>
              <div className="about-exp-badge"><span className="exp-num">10</span><span className="exp-label">Projects</span></div>
            </div>
          </div>
          <div className="about-right reveal">
            <h3 className="about-heading">Data Science &amp; <span className="accent">ML Enthusiast</span></h3>
            <p className="about-text">I'm a Software Engineering graduate (4 semesters) now pursuing <strong>Engineering Physics &amp; Data Science</strong> at <strong>Hochschule München</strong> in Germany. My journey started with curiosity about how software and data shape the world.</p>
            <p className="about-text">I specialize in building modern web applications with <strong>React.js</strong> and exploring data through <strong>Python &amp; Machine Learning</strong>. With a background in <strong>Cyber Security</strong>, I bring a unique perspective to every project.</p>
            <div className="about-stats">
              {[["10","Projects"],["6","Certs"],["4","SE Semesters"],["2","Countries"]].map(([n, l]) => (
                <div key={l} className="a-stat">
                  <span className="a-num" data-count={n}>0</span><span className="a-plus">+</span>
                  <p>{l}</p>
                </div>
              ))}
            </div>
            <div className="about-info">
              <div className="info-item"><span className="info-icon">🎓</span><span>Engineering Physics &amp; Data Science — Hochschule München</span></div>
              <div className="info-item"><span className="info-icon">📍</span><span>Munich, Germany 🇩🇪</span></div>
              <div className="info-item"><span className="info-icon">✉</span><a href="mailto:alainasif6@gmail.com">alainasif6@gmail.com</a></div>
              <div className="info-item"><span className="info-icon">🌍</span><span>Open to opportunities in Germany &amp; Remote 🇩🇪</span></div>
            </div>
            <a href="https://alaina-asif-cv.vercel.app" target="_blank" rel="noreferrer" className="btn-primary">
              <span>View Full CV</span> ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  useSkillBars();
  return (
    <section className="section section-dark" id="skills">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">02 — Skills</span>
          <h2 className="section-title">What I <span className="accent">Know</span></h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map((sk) => (
            <div key={sk.title} className="skill-card reveal">
              <div className="skill-card-icon" style={{ background: sk.color.icon, borderColor: sk.color.border, border: `1px solid ${sk.color.border}` }}>
                <span style={{ fontSize: "20px" }}>{sk.icon}</span>
              </div>
              <h4>{sk.title}</h4>
              <p>{sk.desc}</p>
              <div className="skill-tags">{sk.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="skill-bars">
                {sk.bars.map((b) => (
                  <div key={b.label} className="sbar-item">
                    <span>{b.label}</span>
                    <div className="sbar"><div className="sbar-fill" data-w={b.w} style={{ background: b.grad }} /></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">03 — Projects</span>
          <h2 className="section-title">What I've <span className="accent">Built</span></h2>
        </div>
        <div className="project-filters reveal">
          {["all","react","security","api"].map((f) => (
            <button key={f} className={`pf-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {PROJECTS.filter((p) => filter === "all" || p.tags.includes(filter)).map((p) => (
            <div key={p.num} className={`project-card reveal ${p.featured ? "featured" : ""}`}>
              <div className="pc-header" style={{ background: `linear-gradient(135deg,${p.grad})` }}>
                <span className="pc-emoji">{p.emoji}</span>
                <span className="pc-num">{p.num}</span>
                {p.featured && <span className="featured-badge">⭐ First Project</span>}
              </div>
              <div className="pc-body">
                <div className="pc-tags">{p.tagLabels.map((t) => <span key={t}>{t}</span>)}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="pc-footer">
                  <a href={p.code} target="_blank" rel="noreferrer" className="pc-link">GH Code</a>
                  <a href={p.live} target="_blank" rel="noreferrer" className="pc-link pc-live">↗ Live</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="section section-dark" id="certifications">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">04 — Certifications</span>
          <h2 className="section-title">My <span className="accent">Certs</span></h2>
        </div>
        <div className="certs-grid">
          {CERTS.map((c) => (
            <div key={c.title} className="cert-card reveal" style={{ "--cc": c.color }}>
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-body">
                <span className="cert-issuer">{c.issuer}</span>
                <h4>{c.title}</h4>
                <span className="cert-date">{c.date}</span>
              </div>
              <a href={c.link} target="_blank" rel="noreferrer" className="cert-verify">{c.label} ↗</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-label">05 — Contact</span>
          <h2 className="section-title">Let's <span className="accent">Talk</span></h2>
        </div>
        <div className="contact-grid">
          <div className="contact-left reveal">
            <h3>Open to Opportunities in<br /><span className="accent">Germany 🇩🇪 &amp; Remote</span></h3>
            <p>Whether you have a job offer, internship, collaboration or just want to connect — I'd love to hear from you!</p>
            <div className="contact-items">
              <div className="ci"><div className="ci-icon">✉</div><div><span>Email</span><a href="mailto:alainasif6@gmail.com">alainasif6@gmail.com</a></div></div>
              <div className="ci"><div className="ci-icon">in</div><div><span>LinkedIn</span><a href="https://www.linkedin.com/in/alaina-asif-1b1563339/" target="_blank" rel="noreferrer">linkedin.com/in/alaina-asif</a></div></div>
              <div className="ci"><div className="ci-icon">GH</div><div><span>GitHub</span><a href="https://github.com/Alaina-Asif" target="_blank" rel="noreferrer">github.com/Alaina-Asif</a></div></div>
            </div>
            <div className="availability"><div className="avail-dot" /><span>Available — <strong>Open to Work 🇩🇪</strong></span></div>
          </div>
          <div className="contact-right reveal">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>Your Name</label><input type="text" placeholder="Max Mustermann" required /></div>
                <div className="form-group"><label>Your Email</label><input type="email" placeholder="max@company.de" required /></div>
              </div>
              <div className="form-group"><label>Subject</label><input type="text" placeholder="Job Opportunity / Collaboration" /></div>
              <div className="form-group"><label>Message</label><textarea placeholder="Tell me about the opportunity..." rows="5" required /></div>
              <button type="submit" className="btn-primary submit-btn">
                <span>{sent ? "Sent! 🌸" : "Send Message"}</span> ✉
              </button>
              <p className="form-note">* I usually respond within 24 hours 🌸</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo"><span className="logo-bracket">&lt;</span>AA<span className="logo-bracket">/&gt;</span></div>
        <p>Engineering Physics &amp; Data Science Student 🇵🇰 → Munich, Germany 🇩🇪</p>
        <div className="footer-socials">
          <a href="https://github.com/Alaina-Asif" target="_blank" rel="noreferrer">GH</a>
          <a href="https://www.linkedin.com/in/alaina-asif-1b1563339/" target="_blank" rel="noreferrer">in</a>
          <a href="mailto:alainasif6@gmail.com">✉</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Alaina Asif — Built with React &amp; Vite 🌸</p>
        <p>Gujrat, Pakistan 🇵🇰 → Munich, Germany 🇩🇪</p>
      </div>
    </footer>
  );
}

// ── ROOT APP ─────────────────────────────────────────────────
export default function App() {
  const [loading,       setLoading]       = useState(true);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [showTop,       setShowTop]       = useState(false);
  const [mousePos,      setMousePos]      = useState({ x: 0, y: 0 });
  const [followerPos,   setFollowerPos]   = useState({ x: 0, y: 0 });
  const followerRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });

  // cursor
  useEffect(() => {
    const onMove = (e) => { mousePosRef.current = { x: e.clientX, y: e.clientY }; setMousePos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", onMove);
    let raf;
    const animate = () => {
      followerRef.current.x += (mousePosRef.current.x - followerRef.current.x) * 0.1;
      followerRef.current.y += (mousePosRef.current.y - followerRef.current.y) * 0.1;
      setFollowerPos({ x: followerRef.current.x, y: followerRef.current.y });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 400);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120, bot = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bot) setActiveSection(sec.id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <Loader onDone={() => setLoading(false)} />;

  return (
    <>
      <div className="cursor" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="cursor-follower" style={{ left: followerPos.x, top: followerPos.y }} />
      <Navbar scrolled={scrolled} activeSection={activeSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
      {showTop && (
        <button className="back-top show" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
      )}
    </>
  );
}
