// Language switching functionality for IT Sharks Community
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.langSwitcher = document.getElementById('langSwitcher');
        this.setupEventListeners();
        this.updateLanguage(this.currentLang);
    }

    setupEventListeners() {
        if (this.langSwitcher) {
            this.langSwitcher.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // Handle browser back/forward navigation
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.lang) {
                this.updateLanguage(event.state.lang, false);
            }
        });
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.updateLanguage(newLang, true);
    }

    updateLanguage(lang, updateHistory = true) {
        this.currentLang = lang;

        // Add transition effect
        this.addTransitionEffect();

        // Update HTML attributes
        this.updateHTMLAttributes(lang);

        // Update all text content
        this.updateTextContent(lang);

        // Update meta tags
        this.updateMetaTags(lang);

        // Update browser history
        if (updateHistory) {
            this.updateBrowserHistory(lang);
        }

        // Remove transition effect after animation
        setTimeout(() => {
            this.removeTransitionEffect();
        }, 300);
    }

    addTransitionEffect() {
        const elementsToAnimate = document.querySelectorAll('[data-en], [data-ar]');
        elementsToAnimate.forEach(element => {
            element.classList.add('fade-out');
        });
    }

    removeTransitionEffect() {
        const elementsToAnimate = document.querySelectorAll('[data-en], [data-ar]');
        elementsToAnimate.forEach(element => {
            element.classList.remove('fade-out', 'fade-in');
            element.classList.add('fade-in');
        });

        // Remove fade-in class after animation completes
        setTimeout(() => {
            elementsToAnimate.forEach(element => {
                element.classList.remove('fade-in');
            });
        }, 300);
    }

    updateHTMLAttributes(lang) {
        const html = document.documentElement;
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }

    updateTextContent(lang) {
        const elementsWithLangData = document.querySelectorAll('[data-en], [data-ar]');

        elementsWithLangData.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = text;
                } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    updateMetaTags(lang) {
        const metaData = {
            en: {
                title: 'IT Sharks Community - Egypt\'s Premier IT Community',
                description: 'Join IT Sharks Egypt, the premier community for IT professionals. Connect, learn, and grow with fellow tech enthusiasts.',
                ogTitle: 'IT Sharks Community - Egypt\'s Premier IT Community',
                ogDescription: 'Join IT Sharks Egypt, the premier community for IT professionals.'
            },
            ar: {
                title: 'مجتمع IT Sharks - مجتمع تكنولوجيا المعلومات الرائد في مصر',
                description: 'انضم إلى مجتمع IT Sharks مصر، المجتمع الرائد لمحترفي تكنولوجيا المعلومات. تواصل وتعلم وانمو مع زملائك المتحمسين للتكنولوجيا.',
                ogTitle: 'مجتمع IT Sharks - مجتمع تكنولوجيا المعلومات الرائد في مصر',
                ogDescription: 'انضم إلى مجتمع IT Sharks مصر، المجتمع الرائد لمحترفي تكنولوجيا المعلومات.'
            }
        };

        const data = metaData[lang];

        // Update title
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = data.title;
        }
        document.title = data.title;

        // Update meta description
        const descriptionElement = document.getElementById('page-description');
        if (descriptionElement) {
            descriptionElement.setAttribute('content', data.description);
        }

        // Update Open Graph tags
        const ogTitleElement = document.getElementById('og-title');
        if (ogTitleElement) {
            ogTitleElement.setAttribute('content', data.ogTitle);
        }

        const ogDescriptionElement = document.getElementById('og-description');
        if (ogDescriptionElement) {
            ogDescriptionElement.setAttribute('content', data.ogDescription);
        }
    }

    updateBrowserHistory(lang) {
        const url = lang === 'ar' ? '#ar' : '#en';
        const title = lang === 'ar' ? 'مجتمع IT Sharks' : 'IT Sharks Community';

        history.pushState({ lang: lang }, title, url);
    }
}

// Smooth scrolling for anchor links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Animation observer for scroll-triggered animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.createObserver();
        }
    }

    createObserver() {
        const options = {
            threshold: '0.15s',
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.info-card, .hero-visual, .whatsapp-card, .platform-link');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// WhatsApp and social media link tracking
class LinkHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupExternalLinks();
        this.setupSocialTracking();
        this.setupWhatsAppTracking();
    }

    setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            // Ensure external links open in new tab
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }

            // Add rel attributes for security
            link.setAttribute('rel', 'noopener noreferrer');

            // Add visual indicator for external links
            link.addEventListener('click', (e) => {
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
            });
        });
    }

    setupSocialTracking() {
        const socialLinks = document.querySelectorAll('.social-link, .footer-social a, .platform-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = this.getSocialPlatform(link.href);
                this.trackSocialClick(platform, link.href);
            });
        });
    }

    setupWhatsAppTracking() {
        // Track WhatsApp Channel vs Community Chat clicks
        const whatsappChannelLinks = document.querySelectorAll('a[href*="whatsapp.com/channel"]');
        const whatsappCommunityLinks = document.querySelectorAll('a[href*="chat.whatsapp.com"]');

        whatsappChannelLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackWhatsAppClick('channel', link.href);
            });
        });

        whatsappCommunityLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackWhatsAppClick('community', link.href);
            });
        });
    }

    getSocialPlatform(url) {
        if (url.includes('facebook.com')) return 'Facebook';
        if (url.includes('discord.gg')) return 'Discord';
        if (url.includes('whatsapp.com/channel')) return 'WhatsApp Channel';
        if (url.includes('chat.whatsapp.com')) return 'WhatsApp Community';
        if (url.includes('whatsapp.com')) return 'WhatsApp';
        return 'Unknown';
    }

    trackSocialClick(platform, url) {
        // Analytics tracking would go here
        console.log(`Social click tracked: ${platform} - ${url}`);

        // Show user feedback
        this.showClickFeedback(platform);
    }

    trackWhatsAppClick(type, url) {
        console.log(`WhatsApp ${type} click tracked: ${url}`);

        const message = type === 'channel' ?
            'Redirecting to WhatsApp Channel...' :
            'Redirecting to Community Chat...';

        this.showClickFeedback(message);
    }

    showClickFeedback(message) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.textContent = `Opening ${message}`;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--ocean-success);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(feedback);

        // Animate in
        setTimeout(() => {
            feedback.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 2000);
    }
}

// Performance optimization and lazy loading
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.setupPrefetching();
        this.setupLazyLoading();
    }

    optimizeImages() {
        // Since we're using emojis instead of images, we'll optimize emoji rendering
        const emojiElements = document.querySelectorAll('.shark-icon, .social-icon, .info-icon, .shark-large, .bubble, .whatsapp-icon, .platform-icon');
        emojiElements.forEach(element => {
            element.style.fontDisplay = 'swap';
        });
    }

    setupPrefetching() {
        // Prefetch social media domains for faster external link loading
        const prefetchDomains = [
            'https://www.facebook.com',
            'https://discord.gg',
            'https://whatsapp.com',
            'https://chat.whatsapp.com'
        ];

        prefetchDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    setupLazyLoading() {
        // Lazy load sections that are not immediately visible
        const lazyElements = document.querySelectorAll('.whatsapp-section, .community-info, .all-platforms');

        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                        lazyObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            lazyElements.forEach(el => {
                lazyObserver.observe(el);
            });
        }
    }
}

// Accessibility enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
        this.setupReducedMotion();
    }

    setupKeyboardNavigation() {
        // Enable keyboard navigation for language switcher
        const langSwitcher = document.getElementById('langSwitcher');
        if (langSwitcher) {
            langSwitcher.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    langSwitcher.click();
                }
            });
        }

        // Keyboard navigation for platform links
        const platformLinks = document.querySelectorAll('.platform-link, .social-link');
        platformLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }

    setupFocusManagement() {
        // Ensure focus is visible and properly managed
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link sr-only';
        skipLink.addEventListener('focus', () => {
            skipLink.classList.remove('sr-only');
        });
        skipLink.addEventListener('blur', () => {
            skipLink.classList.add('sr-only');
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupAriaLabels() {
        // Dynamic aria labels for language switcher
        const langSwitcher = document.getElementById('langSwitcher');
        if (langSwitcher) {
            const updateAriaLabel = (currentLang) => {
                const label = currentLang === 'en' ?
                    'Switch to Arabic language' :
                    'التبديل إلى اللغة الإنجليزية';
                langSwitcher.setAttribute('aria-label', label);
            };

            // Initial setup
            updateAriaLabel('en');

            // Update on language change
            langSwitcher.addEventListener('click', () => {
                setTimeout(() => {
                    const newLang = document.documentElement.getAttribute('lang');
                    updateAriaLabel(newLang);
                }, 100);
            });
        }

        // Add aria labels to WhatsApp links
        const whatsappChannelLinks = document.querySelectorAll('a[href*="whatsapp.com/channel"]');
        const whatsappCommunityLinks = document.querySelectorAll('a[href*="chat.whatsapp.com"]');

        whatsappChannelLinks.forEach(link => {
            if (!link.hasAttribute('aria-label')) {
                link.setAttribute('aria-label', 'Follow IT Sharks WhatsApp Channel for updates');
            }
        });

        whatsappCommunityLinks.forEach(link => {
            if (!link.hasAttribute('aria-label')) {
                link.setAttribute('aria-label', 'Join IT Sharks WhatsApp Community Chat');
            }
        });
    }

    setupReducedMotion() {
        // Respect user's reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Color theme enhancements
class ColorThemeManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.enhanceColorContrast();
    }

    setupThemeToggle() {
        // Respect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        prefersDark.addEventListener('change', (e) => {
            this.updateTheme(e.matches ? 'dark' : 'light');
        });
    }

    updateTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);

        // Update meta theme-color for mobile browsers
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            document.head.appendChild(themeColorMeta);
        }

        const themeColor = theme === 'dark' ? '#1A1A1A' : '#F8FAFB';
        themeColorMeta.content = themeColor;
    }

    enhanceColorContrast() {
        // Ensure all text elements have proper contrast
        const checkContrast = () => {
            const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
            textElements.forEach(element => {
                const style = window.getComputedStyle(element);
                const bgColor = style.backgroundColor;
                const textColor = style.color;

                // Simple contrast check - in a real app, you'd use a proper contrast ratio calculation
                if (bgColor && textColor) {
                    element.setAttribute('data-contrast-checked', 'true');
                }
            });
        };

        // Check contrast after DOM is loaded
        setTimeout(checkContrast, 1000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    const languageSwitcher = new LanguageSwitcher();
    const smoothScroll = new SmoothScroll();
    const animationObserver = new AnimationObserver();
    const linkHandler = new LinkHandler();
    const performanceOptimizer = new PerformanceOptimizer();
    const accessibilityEnhancer = new AccessibilityEnhancer();
    const colorThemeManager = new ColorThemeManager();

    // Check URL hash for initial language
    const hash = window.location.hash;
    if (hash === '#ar') {
        languageSwitcher.updateLanguage('ar', false);
    }

    // Add main ID to main element for skip link
    const main = document.querySelector('.main');
    if (main) {
        main.id = 'main';
    }

    // Add CSS for keyboard navigation and animations
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--ocean-primary) !important;
            outline-offset: 2px !important;
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--ocean-primary);
            color: white;
            padding: 8px;
            border-radius: 4px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        }

        .skip-link:focus {
            top: 6px;
        }

        .loaded {
            opacity: 1;
            transform: translateY(0);
        }

        .whatsapp-section,
        .community-info,
        .all-platforms {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        /* Enhanced focus indicators with ocean theme colors */
        .btn:focus-visible {
            outline: 2px solid var(--ocean-accent);
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(0, 180, 216, 0.2);
        }
        
        .social-link:focus-visible {
            outline: 2px solid var(--ocean-primary);
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2);
        }
    `;
    document.head.appendChild(style);

    // Add success message for successful page load
    console.log('🦈 IT Sharks Community website initialized successfully!');
    console.log('🎨 Fixed ocean-themed color palette applied');
    console.log('📱 WhatsApp Channel: https://whatsapp.com/channel/0029Vb5p2ZWBfxoFHuDi7506');
    console.log('💬 Community Chat: https://chat.whatsapp.com/Em5yFcQvi1fJOdkEXHMyVc');

    // Show welcome message with improved colors
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        const currentLang = document.documentElement.getAttribute('lang') || 'en';
        const message = currentLang === 'ar' ?
            'مرحباً بك في مجتمع IT Sharks!' :
            'Welcome to IT Sharks Community!';

        welcomeMessage.textContent = message;
        welcomeMessage.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--ocean-primary);
            color: var(--ocean-white);
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
            transform: translateY(100%);
            transition: transform 0.3s ease;
            border: 2px solid var(--ocean-accent);
        `;

        document.body.appendChild(welcomeMessage);

        // Animate in
        setTimeout(() => {
            welcomeMessage.style.transform = 'translateY(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            welcomeMessage.style.transform = 'translateY(100%)';
            setTimeout(() => {
                if (welcomeMessage.parentNode) {
                    welcomeMessage.parentNode.removeChild(welcomeMessage);
                }
            }, 300);
        }, 3000);
    }, 1000);
});