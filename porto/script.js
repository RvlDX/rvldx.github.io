// Fungsi untuk memuat navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            setActiveLink();
            addMobileMenuListeners();
        });
}

// Fungsi toggle menu mobile
function toggleMenu() {
    const menu = document.querySelector('.navbar ul');
    menu.classList.toggle('active');
}

// Fungsi untuk menutup menu mobile saat klik link
function addMobileMenuListeners() {
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.querySelector('.navbar ul').classList.remove('active');
            }
        });
    });
}

// Fungsi untuk menampilkan section
function showSection(sectionId) {
    // Sembunyikan semua section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Tampilkan section yang dipilih
    document.getElementById(sectionId).classList.add('active');
    
    // Update active class pada navbar
    setActiveLink();
}

// Fungsi untuk set active link
function setActiveLink() {
    const links = document.querySelectorAll('.navbar ul li a');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(`'${window.location.hash.substring(1)}'`) || 
            link.getAttribute('onclick')?.includes(`showSection('home')`) && window.location.hash === '') {
            link.classList.add('active');
        }
    });
}

// Event listener untuk halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    
    // Tangani perubahan hash URL
    window.addEventListener('hashchange', setActiveLink);
    
    // Inisialisasi section yang aktif
    const currentSection = window.location.hash.substring(1) || 'home';
    showSection(currentSection);
});