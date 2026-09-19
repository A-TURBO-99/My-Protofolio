/* =========================================================
   AMR Mahmoud · A-TURBO-99 — interactions
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("is-open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("is-open");
    });
  }

  /* ---------- Typing effect ---------- */
  var typedEl = document.getElementById("typed");
  if (typedEl) {
    var phrases = [
      "Penetration Tester",
      "Bug Bounty Hunter",
      "Web & API Security",
      "Vulnerability Researcher"
    ];
    var pIndex = 0, cIndex = 0, deleting = false;

    function type() {
      var current = phrases[pIndex];
      if (!deleting) {
        cIndex++;
        typedEl.textContent = current.slice(0, cIndex);
        if (cIndex === current.length) {
          deleting = true;
          return setTimeout(type, 1600);
        }
        return setTimeout(type, 65);
      } else {
        cIndex--;
        typedEl.textContent = current.slice(0, cIndex);
        if (cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
          return setTimeout(type, 350);
        }
        return setTimeout(type, 30);
      }
    }
    type();
  }

  /* ---------- Roadmap accordion ---------- */
  var phaseHeads = document.querySelectorAll(".phase__head");
  phaseHeads.forEach(function (head) {
    head.addEventListener("click", function () {
      var phase = head.closest(".phase");
      var willOpen = !phase.classList.contains("is-open");

      document.querySelectorAll(".phase.is-open").forEach(function (open) {
        if (open !== phase) {
          open.classList.remove("is-open");
          var h = open.querySelector(".phase__head");
          if (h) h.setAttribute("aria-expanded", "false");
        }
      });

      phase.classList.toggle("is-open", willOpen);
      head.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".section__tag, .section__title, .section__lead, .about__card, .about__meta, " +
    ".skill, .cert, .award, .tags, .contact__actions, .phase, .post"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
