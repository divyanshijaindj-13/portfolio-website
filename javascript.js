/**
 * DIVYANSHI JAIN PORTFOLIO — PURE JAVASCRIPT (script.js)
 */

// 1. PROJECT CASE STUDIES DATA
const PROJECT_DETAILS = {
  1: {
    title: "AI-Based Crowd Monitoring & Safety Alert System",
    subtitle: "Computer Vision & YOLOv8 • 2025",
    overview: "Developed a real-time computer vision system that monitors human density in enclosed campus spaces (auditoriums, dining halls, gate entries) to prevent stampedes and overcrowding.",
    challenge: "Handling variable lighting conditions, high camera angles, and body occlusion in dense student crowds without dropping frame rates on budget hardware.",
    solution: "Trained and deployed a lightweight YOLOv8 head-detection model using OpenCV. Implemented boundary polygon thresholding and connected detection counts to an automated alert notification system.",
    stack: ["Python", "OpenCV", "YOLOv8", "Flask", "Computer Vision"]
  },
  2: {
    title: "Student Smart Expense & Budget Tracker",
    subtitle: "Full-Stack Web • 2025",
    overview: "A lightweight financial assistant built specifically for college students managing a monthly allowance (₹5,000 budget), tracking canteen snacks, college stationery, and transit.",
    challenge: "Ensuring zero data loss and instantaneous calculations without requiring external backend servers or database logins.",
    solution: "Engineered a pure client-side architecture using browser localStorage. Added live remaining budget calculations, percentage warnings, and categorized expenditure filters.",
    stack: ["HTML5", "CSS3", "JavaScript", "LocalStorage"]
  },
  3: {
    title: "College Student Report Card & SGPA Portal",
    subtitle: "Academic Portals & DBMS • 2024",
    overview: "A relational database-backed grading portal to automate semester SGPA and cumulative CGPA computations according to university credit regulations.",
    challenge: "Automating complex multi-course credit computations while ensuring ACID compliance during concurrent grade uploads.",
    solution: "Designed a 3NF normalized schema in MySQL. Built JDBC connectivity in Java to process student grades, calculate grade points, and generate downloadable semester cards.",
    stack: ["Java", "MySQL", "JDBC", "HTML/CSS"]
  },
  4: {
    title: "Interactive Algorithm Visualizer & Benchmarker",
    subtitle: "Algorithms & Systems • 2024",
    overview: "An animated algorithm engine enabling students to visualize how sorting, searching, and graph algorithms traverse memory in real time.",
    challenge: "Simulating step-by-step array states and graph traversals without locking the main browser UI thread.",
    solution: "Implemented asynchronous generators with HTML5 Canvas drawing routines for MergeSort, QuickSort, and Dijkstra's shortest path.",
    stack: ["C++", "JavaScript", "Canvas API", "Algorithms"]
  }
};

// 2. PROJECT FILTERING & LIVE SEARCH
let currentCategory = "All";

function filterProjects(category) {
  currentCategory = category;

  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    if (btn.textContent.trim().includes(category) || (category === "All" && btn.textContent.includes("All Projects"))) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  applyFilters();
}

function applyFilters() {
  const searchInput = document.getElementById("projectSearch");
  const query = (searchInput ? searchInput.value : "").toLowerCase().trim();
  const cards = document.querySelectorAll(".project-card");

  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category") || "";
    const cardKeywords = card.getAttribute("data-keywords") || "";
    const cardText = card.textContent.toLowerCase();

    const matchesCategory = (currentCategory === "All" || cardCat === currentCategory);
    const matchesSearch = (!query || cardKeywords.includes(query) || cardText.includes(query));

    if (matchesCategory && matchesSearch) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("projectSearch");
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
});

// 3. PROJECT DETAILS MODAL
function showProjectDetails(id) {
  const project = PROJECT_DETAILS[id];
  if (!project) return;

  const titleEl = document.getElementById("pmTitle");
  const contentEl = document.getElementById("pmContent");

  if (titleEl) titleEl.textContent = project.title;

  if (contentEl) {
    contentEl.innerHTML = `
      <div style="color: var(--brand); font-weight: 600; font-size: 12px; margin-bottom: 8px;">
        ${project.subtitle}
      </div>
      <p style="font-size: 14px; font-weight: 500; color: var(--text-main); margin-bottom: 16px;">
        ${project.overview}
      </p>

      <div style="margin-bottom: 14px;">
        <strong style="color: var(--text-main); display: block; font-size: 13px; margin-bottom: 4px;">
          The Problem & Challenge:
        </strong>
        <p>${project.challenge}</p>
      </div>

      <div style="margin-bottom: 14px;">
        <strong style="color: var(--text-main); display: block; font-size: 13px; margin-bottom: 4px;">
          How It Was Implemented:
        </strong>
        <p>${project.solution}</p>
      </div>

      <div style="border-top: 1px solid var(--border); padding-top: 12px; margin-top: 16px;">
        <strong style="color: var(--text-main); display: block; font-size: 12px; margin-bottom: 6px;">
          Technologies Used:
        </strong>
        <div class="tags-wrap">
          ${project.stack.map(tech => `<span class="tag">${tech}</span>`).join("")}
        </div>
      </div>
    `;
  }

  const modal = document.getElementById("projectModal");
  if (modal) modal.classList.remove("hidden");
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (modal) modal.classList.add("hidden");
}

// 4. RESUME MODAL
function openResumeModal() {
  const modal = document.getElementById("resumeModal");
  if (modal) modal.classList.remove("hidden");
}

function closeResumeModal() {
  const modal = document.getElementById("resumeModal");
  if (modal) modal.classList.add("hidden");
}

window.addEventListener("click", (e) => {
  const resumeModal = document.getElementById("resumeModal");
  const projectModal = document.getElementById("projectModal");

  if (e.target === resumeModal) closeResumeModal();
  if (e.target === projectModal) closeProjectModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeResumeModal();
    closeProjectModal();
  }
});

// 5. BLOG CLAPS COUNTER (LOCALSTORAGE)
function clapArticle(articleId) {
  const clapSpan = document.getElementById("clap-" + articleId);
  if (!clapSpan) return;

  let count = parseInt(clapSpan.textContent, 10) || 0;
  count++;
  clapSpan.textContent = count;

  try {
    localStorage.setItem("dj_clap_" + articleId, count);
  } catch (err) {
    console.warn("localStorage not accessible", err);
  }
}

function initClaps() {
  ["art-1", "art-2", "art-3"].forEach(id => {
    try {
      const saved = localStorage.getItem("dj_clap_" + id);
      if (saved) {
        const el = document.getElementById("clap-" + id);
        if (el) el.textContent = saved;
      }
    } catch (e) {}
  });
}

// 6. GUESTBOOK COMMENTS (LOCALSTORAGE)
const DEFAULT_GUESTBOOK_COMMENTS = [
  {
    name: "Aarav Sharma (IPS CSE Batchmate)",
    msg: "The crowd monitoring project using OpenCV and YOLO is genuinely impressive! Great solution for campus safety.",
    date: "Sep 21, 2025"
  },
  {
    name: "Prof. R. Verma",
    msg: "Excellent portfolio Divyanshi. Impressive academic consistency with 9.8 CGPA and practical engineering mindset.",
    date: "Sep 19, 2025"
  }
];

function renderGuestbook() {
  const listContainer = document.getElementById("guestbookList");
  if (!listContainer) return;

  let comments = DEFAULT_GUESTBOOK_COMMENTS;
  try {
    const saved = localStorage.getItem("dj_guestbook_notes");
    if (saved) comments = JSON.parse(saved);
  } catch (e) {}

  listContainer.innerHTML = comments.map(c => `
    <div class="guestbook-item">
      <div class="guestbook-header">
        <span>${escapeHtml(c.name)}</span>
        <span class="text-muted text-xs font-normal">${c.date}</span>
      </div>
      <p class="card-desc">${escapeHtml(c.msg)}</p>
    </div>
  `).join("");
}

function initGuestbook() {
  const form = document.getElementById("guestbookForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("guestName");
    const msgInput = document.getElementById("guestMsg");

    const name = nameInput ? nameInput.value.trim() : "";
    const msg = msgInput ? msgInput.value.trim() : "";
    if (!name || !msg) return;

    let comments = DEFAULT_GUESTBOOK_COMMENTS;
    try {
      const saved = localStorage.getItem("dj_guestbook_notes");
      if (saved) comments = JSON.parse(saved);
    } catch (e) {}

    const newComment = {
      name: name,
      msg: msg,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };

    comments.unshift(newComment);

    try {
      localStorage.setItem("dj_guestbook_notes", JSON.stringify(comments));
    } catch (e) {}

    form.reset();
    renderGuestbook();
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 7. MOBILE MENU TOGGLE
function toggleMobileMenu() {
  const nav = document.getElementById("mobileNav");
  if (!nav) return;
  const isShown = nav.style.display === "flex";
  nav.style.display = isShown ? "none" : "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menuToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleMobileMenu);
  }
});

// 8. CONTACT FORM SIMULATION
function initContactForm() {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("contactSuccess");

  if (form && alertBox) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alertBox.classList.remove("hidden");
      form.reset();

      setTimeout(() => {
        alertBox.classList.add("hidden");
      }, 5000);
    });
  }
}

// INITIALIZE ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  initClaps();
  renderGuestbook();
  initGuestbook();
  initContactForm();
});