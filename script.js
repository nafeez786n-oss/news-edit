const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const filterButtons = document.querySelectorAll('.filter');
const searchInput = document.getElementById('searchInput');
const storyCards = document.querySelectorAll('.story-card');
const emptyMessage = document.getElementById('emptyMessage');
let activeFilter = 'all';

function updateStories() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;
  storyCards.forEach(card => {
    const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
    const textMatches = card.dataset.title.toLowerCase().includes(searchTerm) ||
      card.textContent.toLowerCase().includes(searchTerm);
    const show = categoryMatches && textMatches;
    card.hidden = !show;
    if (show) visibleCount++;
  });
  emptyMessage.hidden = visibleCount !== 0;
}
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    updateStories();
  });
});
searchInput.addEventListener('input', updateStories);

document.querySelectorAll('.save-button').forEach(button => {
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.title = saved ? 'Remove saved story' : 'Save story';
  });
});

const modal = document.getElementById('storyModal');
const modalTitle = document.getElementById('modalTitle');
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.querySelectorAll('.read-button').forEach(button => {
  button.addEventListener('click', () => {
    modalTitle.textContent = button.dataset.story;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalDone').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('newsletterMessage').textContent = 'Thanks for subscribing! This demo form does not send emails yet.';
  event.target.reset();
});