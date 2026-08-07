// public/js/interaksi.js
// Vanilla JS: buka/tutup drawer menu mobile, dan isi otomatis form chat
// dari tombol saran pertanyaan (chip).

document.addEventListener("DOMContentLoaded", function () {
  const tombolMenu = document.getElementById("tombol-menu");
  const drawer = document.getElementById("drawer-menu");
  const overlay = document.getElementById("drawer-overlay");
  const tombolTutup = document.getElementById("tombol-tutup-drawer");

  function bukaDrawer() {
    drawer.classList.add("drawer--open");
    overlay.classList.add("drawer-overlay--tampil");
    tombolMenu.setAttribute("aria-expanded", "true");
  }

  function tutupDrawer() {
    drawer.classList.remove("drawer--open");
    overlay.classList.remove("drawer-overlay--tampil");
    tombolMenu.setAttribute("aria-expanded", "false");
  }

  if (tombolMenu && drawer && overlay) {
    tombolMenu.addEventListener("click", bukaDrawer);
    tombolTutup.addEventListener("click", tutupDrawer);
    overlay.addEventListener("click", tutupDrawer);
  }

  // Chip saran pertanyaan di halaman Tanya AI
  const chipList = document.querySelectorAll(".chip");
  const inputChat = document.getElementById("pesan-chat");

  chipList.forEach(function (chip) {
    chip.addEventListener("click", function () {
      if (inputChat) {
        inputChat.value = chip.dataset.isi;
        inputChat.focus();
      }
    });
  });
});
