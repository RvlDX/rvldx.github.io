// script.js
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const navLinksA = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinksA.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetSectionId = link.dataset.section;

        sections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(targetSectionId).classList.add('active');

        if (window.innerWidth <= 768) { // Close menu on mobile after link click
             navLinks.classList.remove('active');
        }
    });
});


// Show the Home section initially
document.getElementById('home').classList.add('active');

