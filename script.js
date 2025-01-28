document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
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
            
            // Handle navbar dan scroll untuk mobile
            if(window.innerWidth < 768) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                
                const scrollToSection = () => {
                    window.scrollTo({
                        top: document.querySelector(targetId).offsetTop,
                        behavior: 'smooth'
                    });
                };

                if(bsCollapse && navbarCollapse.classList.contains('show')) {
                    // Tunggu sampai navbar tertutup sepenuhnya baru scroll
                    navbarCollapse.addEventListener('hidden.bs.collapse', scrollToSection, {once: true});
                    bsCollapse.hide();
                } else {
                    // Langsung scroll jika navbar sudah tertutup
                    scrollToSection();
                }
            }
        });
    });

    // Auto-close navbar mobile dengan animasi
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if(bsCollapse && navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });
});