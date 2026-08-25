/**
 * Jayabuddha Agrotech - Main Application Logic
 * Location: Bharatpur, Chitwan, Nepal
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. PRELOADER
    // =========================================================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 400);
        });
        // Fallback hide after 2 seconds
        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
            }
        }, 2000);
    }

    // =========================================================================
    // 2. NAVBAR SCROLL EFFECT & SCROLL-SPY
    // =========================================================================
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar blur toggle
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Scroll to top button visibility
        if (scrollTopBtn) {
            if (scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Active Section Scroll-Spy
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Scroll to Top click event
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // =========================================================================
    // 2.5 HERO BACKGROUND SLIDER
    // =========================================================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-slider-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        if (!heroSlides.length) return;
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + heroSlides.length) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
        if (heroDots[currentSlide]) {
            heroDots[currentSlide].classList.add('active');
        }
    }

    function startSlideTimer() {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    if (heroSlides.length) {
        startSlideTimer();

        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                goToSlide(index);
                startSlideTimer();
            });
        });
    }

    // =========================================================================
    // 3. MOBILE HAMBURGER MENU
    // =========================================================================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
        });

        // Close menu on link click
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('open');
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinksContainer.classList.contains('open')) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('open');
            }
        });
    }

    // =========================================================================
    // 4. SCROLL REVEAL ANIMATIONS
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // =========================================================================
    // 5. PRODUCT CATEGORY FILTERING
    // =========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // =========================================================================
    // 6. PRODUCT QUICK VIEW MODAL
    // =========================================================================
    const productModal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const quickViewBtns = document.querySelectorAll('.btn-quick-view');

    const productDetailsData = {
        'honey': {
            title: 'Pure Organic Honey',
            badge: 'Bestseller • 100% Raw',
            image: 'assets/img/gallery/honey_1.jpg',
            desc: 'Harvested from pristine organic farms and wild forests of Chitwan, Nepal. Our pure honey undergoes zero thermal processing, retaining all natural enzymes, pollens, and potent antioxidants.',
            features: [
                '100% Raw, Unfiltered & Unheated',
                'Rich in natural enzymes & immune boosters',
                'Sourced directly from Apis cerana & Apis mellifera hives',
                'Certified organic quality from Chitwan Valley'
            ],
            waMsg: 'Hello Jayabuddha Agrotech, I am interested in purchasing Pure Organic Honey. Please share details and pricing.'
        },
        'propolis': {
            title: 'Natural Propolis Extract',
            badge: 'Immunity Shield • Premium',
            image: 'assets/img/gallery/honey_25.jpg',
            desc: 'Nature\'s ultimate defense. Bee propolis is a resinous mixture harvested by honey bees to protect their hives against bacteria and viruses. Extremely rich in bioflavonoids.',
            features: [
                'High concentration of active bioflavonoids',
                'Potent natural antimicrobial & antiviral properties',
                'Ideal for sore throat, wound healing & immune defense',
                'Handcrafted and lab-tested in Nepal'
            ],
            waMsg: 'Hello Jayabuddha Agrotech, I would like to order Natural Propolis Extract. Please provide availability and pricing.'
        },
        'royal-jelly': {
            title: 'Fresh Royal Jelly',
            badge: 'Royal Grade • Superfood',
            image: 'assets/img/royal-jelly.png',
            desc: 'The exclusive nutrition of queen bees. Royal jelly contains 10-HDA (10-hydroxy-2-decenoic acid), essential amino acids, and B-complex vitamins for vitality and skin rejuvenation.',
            features: [
                'Freshly harvested and cold-preserved',
                'Contains 10-HDA & complete B-complex vitamins',
                'Promotes cellular regeneration & cognitive energy',
                '100% natural, additive-free'
            ],
            waMsg: 'Hello Jayabuddha Agrotech, I want to inquire about Fresh Royal Jelly. Please share pricing and shipping details.'
        },
        'bee-pollen': {
            title: 'Organic Bee Pollen',
            badge: 'Superfood • High Protein',
            image: 'assets/img/gallery/honey_26.jpg',
            desc: 'A complete superfood containing over 250 biological active substances, including essential amino acids, fatty acids, vitamins, and minerals collected from Himalayan flora.',
            features: [
                'Contains up to 40% natural bioavailable protein',
                'Boosts stamina, athletic performance & gut health',
                'Carefully dried at low temperatures to preserve nutrients',
                'Perfect addition to smoothies, yogurt & breakfast bowls'
            ],
            waMsg: 'Hello Jayabuddha Agrotech, I am interested in buying Organic Bee Pollen. Kindly let me know the pricing and pack sizes.'
        },
        'lemon': {
            title: 'Farm Fresh Lemons',
            badge: 'Organic Farm • Fresh Harvest',
            image: 'https://images.unsplash.com/photo-1587496679742-bad502958fbf?w=600&h=400&fit=crop',
            desc: 'Organically grown on our own orchard farm in Bharatpur-7, Chitwan. Packed with natural Vitamin C, juicy flavor, and fresh aroma for culinary and wellness use.',
            features: [
                'Grown without synthetic pesticides or chemicals',
                'High Vitamin C content & refreshing acidity',
                'Harvested fresh upon order placement',
                'Available in bulk quantities for homes and businesses'
            ],
            waMsg: 'Hello Jayabuddha Agrotech, I want to order Farm Fresh Lemons. Please provide price per kg and delivery details.'
        },
        'nursery': {
            title: 'Nursery Saplings & Plants',
            badge: 'High Yield • Certified Plants',
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
            desc: 'Top-quality agricultural saplings, fruit trees, and nursery plants raised under expert scientific care by agricultural specialists in Bharatpur, Chitwan.',
            features: [
                'High resistance and high-yield plant varieties',
                'Expertly nurtured under ideal soil & climate conditions',
                'Includes citrus, bee flora plants, and fruit saplings',
                'Comprehensive planting guidance included'
            ],
            waMsg: 'Hello Jayabuddha Agrotech, I am interested in purchasing Nursery Saplings & Plants. Please share your catalog.'
        }
    };

    if (productModal && quickViewBtns.length > 0) {
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalBadge = document.getElementById('modalBadge');
        const modalDesc = document.getElementById('modalDesc');
        const modalFeatures = document.getElementById('modalFeatures');
        const modalWaBtn = document.getElementById('modalWaBtn');

        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const key = btn.getAttribute('data-product');
                const data = productDetailsData[key];

                if (data) {
                    modalImg.src = data.image;
                    modalImg.alt = data.title;
                    modalTitle.textContent = data.title;
                    modalBadge.textContent = data.badge;
                    modalDesc.textContent = data.desc;

                    modalFeatures.innerHTML = '';
                    data.features.forEach(feat => {
                        const li = document.createElement('li');
                        li.innerHTML = `<i class="fas fa-check-circle"></i> ${feat}`;
                        modalFeatures.appendChild(li);
                    });

                    modalWaBtn.href = `https://wa.me/9779851159148?text=${encodeURIComponent(data.waMsg)}`;

                    productModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        function closeModal() {
            productModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && productModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // =========================================================================
    // 7. CONTACT FORM SUBMISSION (SILENT GOOGLE FORM IN BACKGROUND)
    // =========================================================================
    const customContactForm = document.getElementById('customContactForm');
    const formSuccessMsg = document.getElementById('formSuccessMsg');

    if (customContactForm) {
        customContactForm.addEventListener('submit', () => {
            const emailInput = document.getElementById('formEmail');
            const hiddenEmail = document.getElementById('hiddenEmailAddress');
            
            // Sync emailAddress field required by Google Form automatic email collection
            if (emailInput && hiddenEmail) {
                hiddenEmail.value = emailInput.value.trim();
            }

            const submitBtn = customContactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Form posts natively to target="hidden_iframe" in the background
            setTimeout(() => {
                customContactForm.style.display = 'none';
                if (formSuccessMsg) {
                    formSuccessMsg.classList.add('active');
                }
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                customContactForm.reset();
            }, 800);
        });
    }

    // Reset Form button
    const btnResetForm = document.getElementById('btnResetForm');
    if (btnResetForm && customContactForm && formSuccessMsg) {
        btnResetForm.addEventListener('click', () => {
            formSuccessMsg.classList.remove('active');
            customContactForm.style.display = 'flex';
        });
    }
});
