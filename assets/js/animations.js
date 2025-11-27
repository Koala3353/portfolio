/**
 * Modern Interactive Animations
 * Handles scroll reveal, navbar effects, and counter animations
 */
(function() {
    'use strict';

    // ===== Scroll Reveal Animation =====
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, [data-animate]');
        
        const revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Get animation type from data attribute
                    const animationType = entry.target.getAttribute('data-animate');
                    if (animationType) {
                        entry.target.classList.add('animate-' + animationType);
                    }
                }
            });
        }, revealOptions);

        revealElements.forEach(function(element) {
            revealObserver.observe(element);
        });
    }

    // ===== Navbar Scroll Effect =====
    function initNavbarScroll() {
        const navbar = document.getElementById('mainNav');
        if (!navbar) return;

        var lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ===== Counter Animation =====
    function initCounters() {
        var counters = document.querySelectorAll('[data-counter]');
        
        var counterOptions = {
            threshold: 0.5
        };

        var counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, counterOptions);

        counters.forEach(function(counter) {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-counter'), 10);
        var duration = 2000;
        var step = target / (duration / 16);
        var current = 0;
        var suffix = element.getAttribute('data-suffix') || '';
        var prefix = element.getAttribute('data-prefix') || '';

        function updateCounter() {
            current += step;
            if (current < target) {
                element.textContent = prefix + Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ===== Smooth Scroll for Anchor Links =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== Stagger Animation for Children =====
    function initStaggerAnimation() {
        var staggerContainers = document.querySelectorAll('[data-stagger]');
        
        var staggerOptions = {
            threshold: 0.2
        };

        var staggerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var children = entry.target.children;
                    var delay = parseInt(entry.target.getAttribute('data-stagger'), 10) || 100;
                    
                    Array.prototype.forEach.call(children, function(child, index) {
                        setTimeout(function() {
                            child.classList.add('animate-fade-in-up');
                            child.style.opacity = '1';
                        }, index * delay);
                    });
                }
            });
        }, staggerOptions);

        staggerContainers.forEach(function(container) {
            // Set initial state for children
            Array.prototype.forEach.call(container.children, function(child) {
                child.style.opacity = '0';
            });
            staggerObserver.observe(container);
        });
    }

    // ===== Parallax Effect =====
    function initParallaxEffect() {
        var parallaxElements = document.querySelectorAll('[data-parallax]');
        
        // Use matchMedia for reliable touch device detection instead of user agent sniffing
        var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (!parallaxElements.length || isTouchDevice) return;

        window.addEventListener('scroll', function() {
            var scrolled = window.pageYOffset;
            
            parallaxElements.forEach(function(element) {
                var speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                var offset = scrolled * speed;
                element.style.transform = 'translateY(' + offset + 'px)';
            });
        });
    }

    // ===== Magnetic Button Effect =====
    function initMagneticButtons() {
        var buttons = document.querySelectorAll('.btn-magnetic');
        
        buttons.forEach(function(button) {
            button.addEventListener('mousemove', function(e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ===== Typing Effect =====
    function initTypingEffect() {
        var typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(function(element) {
            var text = element.getAttribute('data-typing');
            var speed = parseInt(element.getAttribute('data-typing-speed'), 10) || 100;
            var i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            // Start typing when element is visible
            var typingObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        type();
                        typingObserver.unobserve(entry.target);
                    }
                });
            });
            
            typingObserver.observe(element);
        });
    }

    // ===== Progress Bar Animation =====
    function initProgressBars() {
        var progressBars = document.querySelectorAll('.progress-bar');
        
        var progressOptions = {
            threshold: 0.5
        };

        var progressObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var bar = entry.target;
                    var width = bar.getAttribute('aria-valuenow') + '%';
                    bar.style.width = '0%';
                    
                    setTimeout(function() {
                        bar.style.width = width;
                    }, 200);
                }
            });
        }, progressOptions);

        progressBars.forEach(function(bar) {
            progressObserver.observe(bar);
        });
    }

    // ===== Card Tilt Effect =====
    function initCardTilt() {
        var cards = document.querySelectorAll('.tilt-card');
        
        cards.forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = (y - centerY) / 10;
                var rotateY = (centerX - x) / 10;
                
                this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // ===== Custom Cursor =====
    function initCustomCursor() {
        // Check if it's a touch device
        var isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) return;

        // Create cursor elements
        var cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        var cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);

        // Add class to body
        document.body.classList.add('custom-cursor-active');

        var mouseX = 0;
        var mouseY = 0;
        var cursorX = 0;
        var cursorY = 0;

        // Track mouse position - update both immediately for snappy feel
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update dot position immediately (no lag)
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Faster cursor animation for less laggy feel
        function animateCursor() {
            var dx = mouseX - cursorX;
            var dy = mouseY - cursorY;
            
            // Increased from 0.15 to 0.35 for faster response
            cursorX += dx * 0.35;
            cursorY += dy * 0.35;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Add hover effect for interactive elements
        var interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"], .btn, .nav-link, .card');
        
        interactiveElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
            });
        });

        // Add clicking effect
        document.addEventListener('mousedown', function() {
            cursor.classList.add('clicking');
        });
        document.addEventListener('mouseup', function() {
            cursor.classList.remove('clicking');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });
        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    }

    // ===== Initialize All Effects =====
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        initScrollReveal();
        initNavbarScroll();
        initCounters();
        initSmoothScroll();
        initStaggerAnimation();
        initParallaxEffect();
        initMagneticButtons();
        initProgressBars();
        initCardTilt();
        initCustomCursor();
        
        // Add loaded class to body for initial animations
        document.body.classList.add('page-loaded');
    }

    init();
})();
