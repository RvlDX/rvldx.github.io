const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

sections.forEach(section => {
  if (section.id !== 'home') {
    section.style.display = 'none';
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    sections.forEach(section => {
      section.style.display = 'none';
    });

    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.style.display = 'block';
  });
});

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbarCollapse.classList.remove('show');
  });
});
