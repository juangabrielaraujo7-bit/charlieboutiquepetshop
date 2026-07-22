(function () {
  "use strict";

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("mobile-open");
      var isOpen = navLinks.classList.contains("mobile-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("mobile-open");
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      var isActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach(function (el) {
        el.classList.remove("active");
        el.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isActive) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Lightbox for galleries
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  document.querySelectorAll("[data-lightbox]").forEach(function (el) {
    el.addEventListener("click", function () {
      var img = el.querySelector("img");
      if (!img || !lightbox || !lightboxImg) return;
      lightboxImg.src = img.getAttribute("data-full") || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("active");
    });
  });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
        lightbox.classList.remove("active");
        lightboxImg.src = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        lightbox.classList.remove("active");
      }
    });
  }

  // Current year in footer
  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
