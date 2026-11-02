'use strict';
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('main-nav');

function closeMenu() {
  if (!menuToggle || !menu) return;
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
}

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.setAttribute('aria-label', opened ? 'Close navigation menu' : 'Open navigation menu');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => { if (!menu.contains(e.target) && !menuToggle.contains(e.target)) closeMenu(); });
  window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
}

const dialog = document.getElementById('image-dialog');
const dialogImage = document.getElementById('lightbox-image');
const dialogCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.getElementById('close-lightbox');
if (dialog && dialogImage && dialogCaption && closeLightbox) {
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      dialogImage.src = button.dataset.image;
      dialogImage.alt = button.dataset.alt || 'Expanded project photograph';
      dialogCaption.textContent = button.dataset.alt || '';
      dialog.showModal();
    });
  });
  closeLightbox.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { dialogImage.removeAttribute('src'); });
}
const year = document.getElementById('current-year');
if (year) year.textContent = String(new Date().getFullYear());
