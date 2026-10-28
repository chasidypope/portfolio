(() => {
  'use strict';
  const body = document.body;
  const themeButton = document.getElementById('themeToggle');
  const themeIcon = themeButton.querySelector('.theme-icon');
  const storageKey = 'chasidy-portfolio-theme';
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    body.classList.toggle('dark', isDark);
    themeButton.setAttribute('aria-label', isDark ? 'Enable light mode' : 'Enable dark mode');
    themeIcon.textContent = isDark ? '☀' : '☾';
  }
  let initialTheme = 'light';
  try { initialTheme = localStorage.getItem(storageKey) || 'light'; } catch (err) { /* private storage */ }
  applyTheme(initialTheme);
  themeButton.addEventListener('click', () => {
    const theme = body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem(storageKey, theme); } catch (err) { /* optional */ }
  });

  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');
  function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label','Open menu'); }
  toggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  });
  const navLinks = [...document.querySelectorAll('.nav-link')];
  function activateSection(hash) {
    navLinks.forEach(link => {
      const selected = link.getAttribute('href') === hash;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
  // Explicit section navigation works in the stand-alone file and on GitHub Pages.
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    const target = hash && document.getElementById(hash.slice(1));
    if (!target) return;
    e.preventDefault();
    closeMenu();
    const headerOffset = window.innerWidth <= 520 ? 80 : 105;
    const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - (hash === '#home' ? 0 : headerOffset));
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    window.scrollTo({top, behavior});
    if (navLinks.some(item => item.getAttribute('href') === hash)) activateSection(hash);
    try { history.replaceState(null, '', hash); } catch (_) { /* file previews */ }
  }));
  if (location.hash) activateSection(location.hash);
  document.addEventListener('click', (e) => { if (!e.target.closest('.navbar')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  const galleries = {
    study: [ {src:'assets/study-buddy-preview.png', alt:'Study Buddy planner interface', caption:'Study Buddy — student planner'} ],
    pc: [
      {src:'assets/IMG_4605.jpeg', alt:'Actual PC setup with cherry blossom desk mat and purple lights',caption:'My custom PC and desk setup'},
      {src:'assets/IMG_4553.jpeg', alt:'Actual second angle of PC setup and keyboard',caption:'Another look at my custom setup'}
    ],
    keyboard: [
      {src:'assets/real-keyboard-crop.jpg', alt:'Close-up view of one of my custom-built keyboards',caption:'One of my custom-built keyboards'},
      {src:'assets/IMG_4553.jpeg', alt:'Original desk picture featuring custom keyboard',caption:'The keyboard in my desk setup'}
    ]
  };
  const dialog=document.getElementById('galleryDialog');
  const image=document.getElementById('galleryImage');
  const caption=document.getElementById('galleryCaption');
  const close=document.getElementById('galleryClose');
  const prev=document.getElementById('galleryPrev');
  const next=document.getElementById('galleryNext');
  let activeGallery='pc'; let activeIndex=0;
  function display() {
    const items=galleries[activeGallery];
    const item=items[activeIndex];
    image.src=item.src; image.alt=item.alt; caption.textContent=item.caption;
    prev.hidden=next.hidden=items.length<2;
  }
  document.querySelectorAll('[data-gallery]').forEach(btn => btn.addEventListener('click', () => {
    activeGallery=btn.dataset.gallery;
    activeIndex=Number(btn.dataset.index) || 0;
    display();
    if (typeof dialog.showModal==='function') dialog.showModal();
    else dialog.setAttribute('open','');
  }));
  function move(delta){const items=galleries[activeGallery];activeIndex=(activeIndex+delta+items.length)%items.length;display();}
  prev.addEventListener('click',()=>move(-1));
  next.addEventListener('click',()=>move(1));
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1);});
  document.getElementById('copyrightYear').textContent=String(new Date().getFullYear());
})();
