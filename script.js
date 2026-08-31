if(!document.querySelector('link[data-dollie-theme]')){
  const theme=document.createElement('link');theme.rel='stylesheet';theme.href='dollie-theme.css';theme.dataset.dollieTheme='true';document.head.appendChild(theme);
}

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 24), { passive: true });
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('#year').forEach(year => year.textContent = new Date().getFullYear());
document.querySelectorAll('[data-placeholder]').forEach(link => link.addEventListener('click', event => event.preventDefault()));

document.querySelectorAll('.world-card').forEach((card,index) => {
  const href = card.dataset.href || (index === 0 ? 'hunt.html' : '');
  const button = card.querySelector('button');
  if (!href) {
    button?.setAttribute('aria-disabled','true');
    button?.setAttribute('title','Coming soon');
    return;
  }
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  const openWorld = () => location.href = href;
  card.addEventListener('click', openWorld);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openWorld(); }
  });
});

const filterButtons = document.querySelectorAll('[data-filter]');
const characterCards = document.querySelectorAll('.character-card[data-tags]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active')); button.classList.add('active');
  const filter = button.dataset.filter;
  characterCards.forEach(card => card.hidden = filter !== 'all' && !card.dataset.tags.split(' ').includes(filter));
}));

const lightbox = document.querySelector('.image-lightbox');
if (lightbox) {
  const image = lightbox.querySelector('.lightbox-stage img');
  const title = lightbox.querySelector('.lightbox-bar p');
  const download = lightbox.querySelector('.lightbox-bar a');
  const close = lightbox.querySelector('.lightbox-bar button');

  document.querySelectorAll('[data-lightbox]').forEach(trigger => trigger.addEventListener('click', () => {
    const source = trigger.dataset.lightbox;
    image.src = source;
    image.alt = trigger.dataset.title || 'HD atlas plate';
    title.textContent = trigger.dataset.title || 'HD atlas plate';
    download.href = source;
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  }));

  const closeLightbox = () => {
    lightbox.close();
    image.removeAttribute('src');
    document.body.style.overflow = '';
  };
  close.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => event.target === lightbox && closeLightbox());
  lightbox.addEventListener('cancel', event => {
    event.preventDefault();
    closeLightbox();
  });
}
