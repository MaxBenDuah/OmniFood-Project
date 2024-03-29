"use strict";

const btnNav = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const navContainer = document.querySelector(".main-nav-list");
const heroTextContainer = document.querySelector(".sub-text");
const sectionHero = document.querySelector(".section-hero");
const headerHeight = headerEl.getBoundingClientRect().height;
const year = document.querySelector(".year");

const toggleMenu = function () {
  headerEl.classList.toggle("nav-open");
};

// Implementing smooth scrolling

const scrollToSection = function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains("nav-links") ||
    e.target.classList.contains("hero-btn")
  ) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
  headerEl.classList.remove("nav-open");
};

navContainer.addEventListener("click", scrollToSection);
heroTextContainer.addEventListener("click", scrollToSection);
btnNav.addEventListener("click", toggleMenu);

// Implementing Sticky nav

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    document.body.classList.add("sticky");
  } else {
    document.body.classList.remove("sticky");
  }
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(sectionHero);

// Creating dynamic date
const date = new Date().getFullYear();
year.textContent = date;

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
