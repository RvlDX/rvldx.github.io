document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    // Fungsi untuk menampilkan section yang diklik
    function showSection(event) {
        event.preventDefault();
        const target = event.target.getAttribute("data-section");

        sections.forEach(section => {
            if (section.id === target) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        // Tutup menu saat di mode mobile
        navLinks.classList.remove("active");
    }

    // Tambahkan event listener ke semua link navbar
    links.forEach(link => {
        link.addEventListener("click", showSection);
    });

    // Event listener untuk hamburger menu
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});