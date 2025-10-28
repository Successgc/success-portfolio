// small utility and interactions
document.addEventListener('DOMContentLoaded', () => {
  // set copyright years
  const years = ['year','year2','year3','year4','year5','year6','year7','year8'];
  years.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });

  // hamburger toggles for small screens (works across pages)
  function setupHamburger(hamburgerId, navId) {
    const hb = document.getElementById(hamburgerId);
    if(!hb) return;
    const nav = document.querySelector('.nav-links');
    hb.addEventListener('click', () => {
      if(nav.style.display === 'flex') {
        nav.style.display = '';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.gap = '12px';
      }
    });
  }
  // attach to all buttons if present
  ['hamburger','hamburgerAbout','hamburgerWorks','hamburgerGallery','hamburgerContact','hamburgerFpv','hamburgerPlanes','hamburgerRobots'].forEach(id => setupHamburger(id));

  // fade-in on scroll for elements with data-fade
  const faders = document.querySelectorAll('[data-fade]');
  const appearOptions = { threshold: 0.12, rootMargin: "0px 0px -20px 0px" };
  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(f => appearOnScroll.observe(f));

  // smooth anchor links (internal navigation)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if(target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // simple gallery lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  if(galleryItems && lightbox) {
    galleryItems.forEach(img => img.addEventListener('click', () => {
      lbImg.src = img.src;
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden','false');
      setTimeout(()=> lightbox.classList.add('visible'), 20);
    }));
    lbClose && lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if(e.target === lightbox) closeLightbox();
    });
    function closeLightbox(){
      lightbox.classList.remove('visible');
      lightbox.setAttribute('aria-hidden','true');
      setTimeout(()=> lightbox.style.display='none', 200);
    }
  }

  // contact form - static demo behaviour
  const form = document.getElementById('contactForm');
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // simple UX feedback (no backend)
      alert('Thanks! This site is static — to send messages you can connect the form to Formspree, Netlify Forms, or EmailJS. Your message is NOT sent yet.');
      form.reset();
    });
  }
});
