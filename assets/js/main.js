(function () {
  "use strict";

  // Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Header shadow on scroll
  var header = document.getElementById("header");
  var onScroll = function () {
    if (window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var backdrop = document.getElementById("navBackdrop");
  var closeNav = function () {
    nav.classList.remove("open");
    backdrop.classList.remove("show");
    document.body.classList.remove("nav-open");
  };
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      backdrop.classList.toggle("show", open);
      document.body.classList.toggle("nav-open", open);
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // FAQ accordion
  var items = document.querySelectorAll(".faq-item");
  items.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      items.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  // Recalculate open FAQ height on resize
  window.addEventListener("resize", function () {
    var open = document.querySelector(".faq-item.open .faq-a");
    if (open) open.style.maxHeight = open.scrollHeight + "px";
  });
})();
