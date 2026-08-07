// public/js/main.js
// Vanilla JS: toggle menu mobile (tampilkan/sembunyikan) + swap ikon hamburger/close.

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", function () {
      const isHidden = mobileMenu.hasAttribute("hidden");

      if (isHidden) {
        mobileMenu.removeAttribute("hidden");
        toggleBtn.setAttribute("aria-expanded", "true");
        iconOpen.style.display = "none";
        iconClose.style.display = "block";
      } else {
        mobileMenu.setAttribute("hidden", "");
        toggleBtn.setAttribute("aria-expanded", "false");
        iconOpen.style.display = "block";
        iconClose.style.display = "none";
      }
    });
  }
});
