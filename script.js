document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hide all sections except home
    sections.forEach(section => {
        if(section.id !== 'home') section.style.display = 'none';
    });

    // Navigation handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            document.querySelector(targetId).style.display = 'block';
            
            // Update active class
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll for mobile
            if(window.innerWidth < 768) {
                window.scrollTo({
                    top: document.querySelector(targetId).offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Auto-close navbar mobile dengan animasi (PINDahkan KE DALAM DOMContentLoaded)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            
            if(bsCollapse && navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });
}); // Hanya SATU penutupan event listener di sini