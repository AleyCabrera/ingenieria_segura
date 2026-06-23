/**
 * Ingeniería Segura - Blog Técnico
 * Script principal con funcionalidades interactivas
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 0. EFECTO DE ESCRITURA EN TERMINAL
    // ==========================================
    function initTerminalTyping() {
        const terminalBody = document.getElementById('terminalBody');
        if (!terminalBody) return;

        // Obtener todas las líneas de comando y sus outputs
        const lines = terminalBody.querySelectorAll('.terminal-line');
        const outputs = terminalBody.querySelectorAll('.terminal-output');
        
        // Ocultar outputs inicialmente
        outputs.forEach(el => {
            el.style.opacity = '0';
            el.style.maxHeight = '0';
            el.style.overflow = 'hidden';
            el.style.transition = 'opacity 0.5s ease, max-height 0.5s ease';
        });

        let currentIndex = 0;
        let isTyping = false;

        function typeLine(index) {
            if (index >= lines.length) return;

            const line = lines[index];
            const commandSpan = line.querySelector('.terminal-command');
            const nextOutput = outputs[index];
            
            if (!commandSpan) {
                // Si no hay comando, pasar al siguiente
                setTimeout(() => typeLine(index + 1), 300);
                return;
            }

            const text = commandSpan.textContent;
            commandSpan.textContent = '';
            let charIndex = 0;

            isTyping = true;

            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    commandSpan.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    isTyping = false;
                    
                    // Mostrar output después de escribir el comando
                    if (nextOutput) {
                        setTimeout(() => {
                            nextOutput.style.opacity = '1';
                            nextOutput.style.maxHeight = '300px';
                        }, 300);
                    }
                    
                    // Esperar antes de pasar al siguiente comando
                    setTimeout(() => {
                        typeLine(index + 1);
                    }, 600);
                }
            }, 30 + Math.random() * 20); // Velocidad variable para más realismo
        }

        // Iniciar el efecto después de 1 segundo
        setTimeout(() => {
            typeLine(0);
        }, 800);
    }

    // Iniciar efecto de escritura
    initTerminalTyping();

    // ==========================================
    // 1. NAVBAR - Scroll effect
    // ==========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // 2. MENÚ MÓVIL (Hamburguesa)
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 3. TEMA CLARO / OSCURO
    // ==========================================
    const themeBtn = document.getElementById('themeBtn');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        themeBtn.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // ==========================================
    // 4. NAVEGACIÓN ACTIVA (Scroll Spy)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ==========================================
    // 5. BÚSQUEDA
    // ==========================================
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('🔍 Función de búsqueda activada.\nPróximamente con integración real.');
        });
    }

    // ==========================================
    // 6. ANIMACIÓN DE ENTRADA
    // ==========================================
    const animateElements = document.querySelectorAll('.category-card, .article-card, .path-card, .project-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ==========================================
    // 7. CONSOLA
    // ==========================================
    console.log('%c⚙ Ingeniería Segura v2.0', 'font-size: 20px; font-weight: bold; color: #10B981;');
    console.log('%cDocumentando conocimiento en Ingeniería, Software, Ciberseguridad, Redes e IoT', 'font-size: 14px; color: #94A3B8;');
    console.log('%c📚 Artículos · Rutas · Proyectos', 'font-size: 14px; color: #E2E8F0;');
    console.log('%c🚀 Construido con ❤️ y ☕', 'font-size: 12px; color: #94A3B8;');
});

// ==========================================
// 8. POLYFILL
// ==========================================
if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.category-card, .article-card, .path-card, .project-card').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}