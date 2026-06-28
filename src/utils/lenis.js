import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", function () {
  const lenis = new Lenis();
  // Expose the instance so other scripts (e.g. scorecard submit handler) can drive smooth scrolls.
  window.__lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  /* For Anchor Links Scrolling */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const t = e.currentTarget;

      if (t) {
        lenis.scrollTo(t.getAttribute("href"), { offset: -132 } ?? "");
      }
    });
  });
});
