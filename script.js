document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Tech Stack Hover Effect ---
    const skillItems = document.querySelectorAll('.skill-item');
    const projectCards = document.querySelectorAll('.project-card');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tech = item.getAttribute('data-tech');
            if (!tech) return;

            projectCards.forEach(card => {
                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.98)';
            });

            projectCards.forEach(card => {
                const cardTechs = card.getAttribute('data-tech');
                if (cardTechs && cardTechs.includes(tech)) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1.02)';
                    card.style.borderColor = 'var(--accent-blue)';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            projectCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.style.borderColor = 'var(--border-color)';
            });
        });
    });

    // --- 2. Mouse Move Effect for Cards (Glow) ---
    document.addEventListener('mousemove', e => {
        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 3. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 4. Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(section => {
        observer.observe(section);
    });

    // --- 5. Typing Effect ---
    const textToType = "Delivering production-grade AI & LLMs through optimized code quality.";
    const typingElement = document.getElementById('typing-text');
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            typingElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 30); // Speed of typing
        }
    }
    // Start typing after a small delay
    setTimeout(typeWriter, 500);

    // --- 6. Canvas Background Animation (Neural Network) ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // Blueish
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = Math.floor(window.innerWidth / 15); // Density
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 1000})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
});
