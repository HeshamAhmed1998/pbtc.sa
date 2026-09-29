
    function showProjects(type) {
        document.getElementById('proj-current').style.display = type === 'current' ? 'block' : 'none';
        document.getElementById('proj-previous').style.display = type === 'previous' ? 'block' : 'none';
        document.getElementById('btn-current').style.background = type === 'current' ? '#003B6F' : 'white';
        document.getElementById('btn-current').style.color = type === 'current' ? 'white' : '#666';
        document.getElementById('btn-current').style.borderColor = type === 'current' ? '#003B6F' : '#dde5f0';
        document.getElementById('btn-previous').style.background = type === 'previous' ? '#003B6F' : 'white';
        document.getElementById('btn-previous').style.color = type === 'previous' ? 'white' : '#666';
        document.getElementById('btn-previous').style.borderColor = type === 'previous' ? '#003B6F' : '#dde5f0';
    }

    function animateCounter(el, target, duration, suffix) {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            el.textContent = Math.floor(start) + suffix;
        }, 16);
    }

    function startCounters() {
        document.querySelectorAll('[data-counter]').forEach(el => {
            animateCounter(el, parseInt(el.getAttribute('data-counter')), 2000, el.getAttribute('data-suffix') || '');
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(startCounters, 600);
    });



        // ===== Ticker positioning below navbar =====
        function positionTicker() {
            const nav = document.querySelector('.navbar');
            const ticker = document.getElementById('tickerBar');
            const content = document.getElementById('pageContent');
            if (nav && ticker) {
                const navH = nav.offsetHeight;
                ticker.style.top = navH + 'px';
                if (content) content.style.paddingTop = (navH + ticker.offsetHeight + 4) + 'px';
            }
        }
        window.addEventListener('load', positionTicker);
        window.addEventListener('resize', positionTicker);

        // ===== Navbar scroll effect =====
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const offset = 115;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
        window.addEventListener('scroll', function () {
            const nav = document.querySelector('.navbar');
            if (window.scrollY > 30) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // ===== Active nav link on scroll =====
        const sections = document.querySelectorAll('.section[data-anchor]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function () {
            let current = '';
            sections.forEach(sec => {
                const top = sec.offsetTop - 150;
                if (window.scrollY >= top) {
                    current = sec.getAttribute('data-anchor');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // ===== Fade-in elements on scroll into view (staggered) =====
        function setupFadeIn() {
            const allAnimated = '.fade-in, .blur-in, .scale-up';

            document.querySelectorAll(allAnimated).forEach(el => {
                const siblings = Array.from(el.parentElement.children).filter(c =>
                    c.classList.contains('fade-in') || c.classList.contains('blur-in') || c.classList.contains('scale-up')
                );
                const indexInGroup = siblings.indexOf(el);
                el.style.transitionDelay = (indexInGroup * 0.08) + 's';
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            document.querySelectorAll(allAnimated).forEach(el => observer.observe(el));
        }
        document.addEventListener('DOMContentLoaded', setupFadeIn);
    


        function openContact() {
            document.getElementById('contactModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        function closeContact() {
            document.getElementById('contactModal').style.display = 'none';
            document.body.style.overflow = '';
        }
        document.getElementById('contactModal').addEventListener('click', function(e) {
            if (e.target === this) closeContact();
        });
        async function sendMessage() { alert("شكراً! سيتم التواصل معكم قريباً."); return; } async function sendMessage_disabled() {
            const name = document.getElementById('cName').value;
            const phone = document.getElementById('cPhone').value;
            const email = document.getElementById('cEmail').value;
            const subject = document.getElementById('cSubject').value;
            const message = document.getElementById('cMessage').value;
            if (!name || !subject || !message) {
                alert('يرجى ملء الحقول المطلوبة');
                return;
            }
            try {
                const formData = new FormData();
                formData.append('Name', name);
                formData.append('Phone', phone);
                formData.append('Email', email);
                formData.append('Subject', subject);
                formData.append('Message', message);
                const token = document.querySelector('input[name="__RequestVerificationToken"]');
                if (token) formData.append('__RequestVerificationToken', token.value);
                const response = await fetch('/Home/ContactAjax', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    document.getElementById('successMsg').style.display = 'block';
                    document.getElementById('errorMsg').style.display = 'none';
                    document.getElementById('contactForm').reset();
                } else {
                    document.getElementById('errorMsg').style.display = 'block';
                }
            } catch {
                document.getElementById('errorMsg').style.display = 'block';
            }
        }
    