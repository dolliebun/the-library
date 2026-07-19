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

const huntCard = document.querySelector('.world-card:first-child');
if (huntCard) {
  huntCard.setAttribute('role', 'link'); huntCard.setAttribute('tabindex', '0');
  const openHunt = () => location.href = 'hunt.html';
  huntCard.addEventListener('click', openHunt);
  huntCard.addEventListener('keydown', event => (event.key === 'Enter' || event.key === ' ') && openHunt());
}
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
