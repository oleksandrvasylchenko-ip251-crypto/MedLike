// ==================== CAROUSEL/SLIDER ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
let slidesPerView = 3;

function getSlidesPerView() {
    if (window.innerWidth <= 480) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 1;
    } else if (window.innerWidth <= 1024) {
        return 2;
    } else {
        return 3;
    }
}

function initCarousel() {
    slidesPerView = getSlidesPerView();
    const carousel = document.querySelector('.carousel');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
    }
    
    const oldControls = document.querySelector('.carousel-controls');
    if (oldControls) {
        oldControls.remove();
    }
    
    if (window.innerWidth > 768) {
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        controls.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            padding: 0 10px;
            pointer-events: none;
            z-index: 10;
        `;
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev-btn';
        prevBtn.innerHTML = '❮';
        prevBtn.style.cssText = `
            background: var(--primary, #09B9AA);
            color: white;
            border: none;
            padding: 15px 20px;
            font-size: 24px;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.3s;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
            box-shadow: 0 4px 15px rgba(9, 185, 170, 0.3);
            z-index: 10;
        `;
        prevBtn.onmouseover = () => prevBtn.style.transform = 'scale(1.1)';
        prevBtn.onmouseout = () => prevBtn.style.transform = 'scale(1)';
        prevBtn.onclick = () => goToSlide(currentSlide - slidesPerView);
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next-btn';
        nextBtn.innerHTML = '❯';
        nextBtn.style.cssText = `
            background: var(--primary, #09B9AA);
            color: white;
            border: none;
            padding: 15px 20px;
            font-size: 24px;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.3s;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
            box-shadow: 0 4px 15px rgba(9, 185, 170, 0.3);
            z-index: 10;
        `;
        nextBtn.onmouseover = () => nextBtn.style.transform = 'scale(1.1)';
        nextBtn.onmouseout = () => nextBtn.style.transform = 'scale(1)';
        nextBtn.onclick = () => goToSlide(currentSlide + slidesPerView);
        
        const carouselContainer = carousel.parentNode;
        carouselContainer.style.position = 'relative';
        carouselContainer.appendChild(controls);
        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
    }
    
    const totalDots = Math.ceil(totalSlides / slidesPerView);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i * slidesPerView));
        if (dotsContainer) {
            dotsContainer.appendChild(dot);
        }
    }
    
    showSlide(0);
}

function showSlide(startIndex) {
    slidesPerView = getSlidesPerView();
    
    slides.forEach(slide => slide.style.display = 'none');
    
    const start = startIndex;
    const end = Math.min(start + slidesPerView, totalSlides);
    
    for (let i = start; i < end; i++) {
        if (slides[i]) {
            slides[i].style.display = 'block';
        }
    }
    
    const dots = document.querySelectorAll('.carousel-dot');
    const currentDotIndex = Math.floor(start / slidesPerView);
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentDotIndex);
    });
    
    if (window.innerWidth > 768) {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.style.opacity = start === 0 ? '0.3' : '1';
            prevBtn.style.cursor = start === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (nextBtn) {
            const isLast = start + slidesPerView >= totalSlides;
            nextBtn.style.opacity = isLast ? '0.3' : '1';
            nextBtn.style.cursor = isLast ? 'not-allowed' : 'pointer';
        }
    }
}

function goToSlide(index) {
    if (index < 0) return;
    if (index >= totalSlides) return;
    currentSlide = index;
    showSlide(index);
}

window.addEventListener('resize', function() {
    const newSlidesPerView = getSlidesPerView();
    if (newSlidesPerView !== slidesPerView) {
        slidesPerView = newSlidesPerView;
        const dotsContainer = document.getElementById('carouselDots');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
        }
        initCarousel();
    }
});

// ==================== BOOKING FORM ====================
function handleBooking(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const service = form.querySelector('select').value;
    
    if (!name || !phone || !service) {
        alert('Будь ласка, заповніть всі необхідні поля!');
        return;
    }
    
    if (phone.replace(/[^0-9]/g, '').length < 10) {
        alert('Будь ласка, введіть коректний номер телефону!');
        return;
    }
    
    alert(`✅ Дякуємо, ${name}!\n\nМи отримали вашу заявку.\nНайближчим часом ми зв'яжемось з вами за номером ${phone}.\n\nОчікуваний час прийому буде підтверджено в SMS.`);
    
    form.reset();
}

// ==================== SMOOTH SCROLL TO BOOKING ====================
function scrollToBooking() {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== STICKY NAVBAR ON SCROLL ====================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== REVEAL ANIMATIONS ON SCROLL ====================
function revealOnScroll() {
    const elements = document.querySelectorAll('.service-card, .carousel-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    const headerTop = document.querySelector('.header-top');
    
    const oldHamburger = document.querySelector('.hamburger-menu');
    if (oldHamburger) {
        oldHamburger.remove();
    }
    
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Меню');
    
    if (window.innerWidth <= 768 && nav) {
        hamburger.style.display = 'block';
        nav.classList.remove('open');
        
        if (headerTop) {
            headerTop.insertBefore(hamburger, headerTop.firstChild);
        }
        
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('open');
            hamburger.innerHTML = nav.classList.contains('open') ? '✕' : '☰';
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.header-top') && nav.classList.contains('open')) {
                nav.classList.remove('open');
                hamburger.innerHTML = '☰';
            }
        });
        
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                hamburger.innerHTML = '☰';
            });
        });
    } else if (nav && window.innerWidth > 768) {
        nav.classList.remove('open');
        hamburger.style.display = 'none';
    }
}

window.addEventListener('resize', function() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (window.innerWidth > 768 && nav) {
        nav.classList.remove('open');
        if (hamburger) {
            hamburger.style.display = 'none';
            hamburger.innerHTML = '☰';
        }
    } else if (window.innerWidth <= 768 && nav) {
        if (hamburger) {
            hamburger.style.display = 'block';
        } else {
            initMobileMenu();
        }
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
            if (hamburger) hamburger.innerHTML = '☰';
        }
    }
});

// ==================== FORM INPUT VALIDATION ====================
function validateForm() {
    const inputs = document.querySelectorAll('.booking-form input');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.style.borderColor = '#FF7757';
            input.style.boxShadow = '0 0 0 3px rgba(255, 119, 87, 0.1)';
        });
        
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                input.style.borderColor = '#e0e0e0';
                input.style.boxShadow = 'none';
            }
        });
    });
}

// ==================== ACTIVE NAVIGATION LINK ====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary, #09B9AA)';
            }
        });
    });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== GALLERY ACCORDION ====================
function initGalleryAccordion() {
    const items = document.querySelectorAll('.gallery-accordion-item');
    
    if (items.length === 0) return;
    
    items[0].classList.add('active');
    
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.classList.contains('active')) return;
            
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ==================== SERVICE CARDS TOGGLE ====================
function toggleService(element) {
    const allCards = document.querySelectorAll('.service-card');
    allCards.forEach(card => {
        if (card !== element && card.classList.contains('active')) {
            card.classList.remove('active');
        }
    });
    element.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const isCard = event.target.closest('.service-card');
    if (!isCard) {
        document.querySelectorAll('.service-card.active').forEach(card => {
            card.classList.remove('active');
        });
    }
});

document.querySelectorAll('.service-card').forEach(card => {
    const hint = document.createElement('span');
    hint.className = 'click-hint';
    hint.textContent = ' Натисніть для перегляду послуг та цін';
    card.appendChild(hint);
});

// ==================== CONTACT FORM ENHANCEMENT ====================
window.addEventListener('load', () => {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('380')) {
                value = value.slice(2);
            }
            if (value.length > 0) {
                if (value.length <= 3) {
                    e.target.value = `+38(0${value}`;
                } else if (value.length <= 6) {
                    e.target.value = `+38(0${value.slice(0, 3)})${value.slice(3)}`;
                } else {
                    e.target.value = `+38(0${value.slice(0, 3)})${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
                }
            }
        });
    });
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ МЕДЛАЙК website loaded!');
    
    initCarousel();
    validateForm();
    revealOnScroll();
    initMobileMenu();
    updateActiveNavLink();
    initBackToTop();
    initGalleryAccordion();
});


// ==================== NEWS FILTER ====================
function initNewsFilter() {
    const buttons = document.querySelectorAll('.news-nav-btn');
    const cards = document.querySelectorAll('.news-card');

    if (buttons.length === 0) return;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Видаляємо активний клас у всіх кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Додати виклик у DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... існуючий код ...
    initNewsFilter();
});



// ==================== CALL MODAL ====================
let timerInterval = null;
let timerSeconds = 600; // 10 хвилин за замовчуванням
let isTimerRunning = false;
let selectedTime = 10; // хвилин

function openCallModal() {
    const modal = document.getElementById('callModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    document.getElementById('callPhone').value = '';
    document.getElementById('callPhone').focus();
    document.getElementById('callTimer').style.display = 'none';
    document.querySelector('.call-modal-form').style.display = 'flex';
    document.querySelector('.call-time-selector').style.display = 'block';
    
    // Скидаємо вибір часу
    selectedTime = 10;
    timerSeconds = 600;
    document.querySelectorAll('.time-option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.time == 10);
    });
    document.getElementById('customTime').value = '';
}

function closeCallModal() {
    const modal = document.getElementById('callModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        isTimerRunning = false;
    }
}

// Закриття по кліку на фон
document.getElementById('callModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeCallModal();
    }
});

// Закриття по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCallModal();
    }
});

// ==================== ВИБІР ЧАСУ ====================
document.querySelectorAll('.time-option').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.time-option').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedTime = parseInt(this.dataset.time);
        timerSeconds = selectedTime * 60;
        document.getElementById('customTime').value = '';
    });
});

function setCustomTime() {
    const input = document.getElementById('customTime');
    const minutes = parseInt(input.value);
    if (minutes && minutes > 0 && minutes <= 120) {
        document.querySelectorAll('.time-option').forEach(b => b.classList.remove('active'));
        selectedTime = minutes;
        timerSeconds = minutes * 60;
        input.value = '';
    } else {
        alert('Введіть час від 1 до 120 хвилин');
    }
}

// ==================== SUBMIT PHONE ====================
function submitPhone(event) {
    event.preventDefault();
    
    const phoneInput = document.getElementById('callPhone');
    const phone = phoneInput.value.trim();
    
    const phoneClean = phone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
        alert('Будь ласка, введіть коректний номер телефону');
        phoneInput.focus();
        return;
    }
    
    document.querySelector('.call-modal-form').style.display = 'none';
    document.querySelector('.call-time-selector').style.display = 'none';
    
    const timerContainer = document.getElementById('callTimer');
    timerContainer.style.display = 'block';
    
    startTimer(phone);
}

// ==================== TIMER ====================
function startTimer(phone) {
    isTimerRunning = true;
    updateTimerDisplay(timerSeconds);
    
    const progressBar = document.getElementById('timerProgressBar');
    progressBar.style.width = '100%';
    
    const totalSeconds = timerSeconds;
    document.getElementById('timerStatus').textContent = `⏳ Очікуємо дзвінка на номер ${phone}...`;
    document.querySelector('.call-submit-btn').disabled = true;
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay(timerSeconds);
        
        const progress = (timerSeconds / totalSeconds) * 100;
        document.getElementById('timerProgressBar').style.width = progress + '%';
        
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerSeconds <= 60) {
            timerDisplay.style.color = '#e74c3c';
            document.getElementById('timerStatus').textContent = '⚠️ Скоро зателефонують!';
        } else if (timerSeconds <= 180) {
            timerDisplay.style.color = '#f39c12';
            document.getElementById('timerStatus').textContent = '⏳ Готуємось до дзвінка...';
        }
        
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isTimerRunning = false;
            
            document.getElementById('timerDisplay').textContent = '00:00';
            document.getElementById('timerStatus').textContent = '✅ Дзвінок виконано! Дякуємо за довіру!';
            document.getElementById('timerStatus').style.color = 'var(--primary)';
            document.querySelector('.timer-cancel-btn').style.display = 'none';
            
            setTimeout(() => {
                if (!isTimerRunning) {
                    resetModal();
                }
            }, 5000);
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function cancelTimer() {
    if (confirm('Ви впевнені, що хочете скасувати очікування дзвінка?')) {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            isTimerRunning = false;
        }
        resetModal();
    }
}

function resetModal() {
    document.getElementById('callTimer').style.display = 'none';
    document.querySelector('.call-modal-form').style.display = 'flex';
    document.querySelector('.call-time-selector').style.display = 'block';
    document.querySelector('.call-submit-btn').disabled = false;
    document.getElementById('callPhone').value = '';
    document.getElementById('timerDisplay').style.color = 'var(--primary)';
    document.getElementById('timerStatus').style.color = '';
    document.querySelector('.timer-cancel-btn').style.display = 'block';
    document.getElementById('timerProgressBar').style.width = '100%';
}

// ==================== PHONE INPUT FORMAT ====================
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('callPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('380')) {
                value = value.slice(2);
            }
            if (value.length > 0) {
                if (value.length <= 3) {
                    e.target.value = `+38(0${value}`;
                } else if (value.length <= 6) {
                    e.target.value = `+38(0${value.slice(0, 3)})${value.slice(3)}`;
                } else {
                    e.target.value = `+38(0${value.slice(0, 3)})${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
                }
            }
        });
    }
});





// ==================== МОБІЛЬНА ГАЛЕРЕЯ (свайп) ====================
function initMobileGallery() {
    const gallery = document.querySelector('.gallery-accordion');
    const items = document.querySelectorAll('.gallery-accordion-item');
    
    if (!gallery || items.length === 0) return;
    if (window.innerWidth > 768) return; // Тільки для мобільних

    // Очищаємо клас active у всіх
    items.forEach(item => item.classList.remove('active'));

    // Створюємо контейнер для точок
    let dotsContainer = document.querySelector('.gallery-dots');
    if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'gallery-dots';
        gallery.parentNode.insertBefore(dotsContainer, gallery.nextSibling);
    }

    // Створюємо точки
    items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => {
            scrollToItem(index);
        });
        dotsContainer.appendChild(dot);
    });

    // Створюємо кнопки навігації
    let navContainer = document.querySelector('.gallery-nav');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.className = 'gallery-nav';
        navContainer.innerHTML = `
            <button class="gallery-nav-btn prev-btn" aria-label="Назад">❮</button>
            <button class="gallery-nav-btn next-btn" aria-label="Вперед">❯</button>
        `;
        dotsContainer.parentNode.insertBefore(navContainer, dotsContainer.nextSibling);
    }

    const prevBtn = navContainer.querySelector('.prev-btn');
    const nextBtn = navContainer.querySelector('.next-btn');

    // Функція прокрутки до елемента
    function scrollToItem(index) {
        const item = items[index];
        if (item) {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
            updateActive(index);
        }
    }

    // Оновлення активних елементів
    function updateActive(activeIndex) {
        // Оновлюємо точки
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });

        // Оновлюємо елементи галереї
        items.forEach((item, i) => {
            item.classList.toggle('active', i === activeIndex);
        });

        // Оновлюємо кнопки
        if (prevBtn) prevBtn.disabled = activeIndex === 0;
        if (nextBtn) nextBtn.disabled = activeIndex === items.length - 1;
    }

    // Визначення активного елемента при скролі
    let isScrolling = false;
    gallery.addEventListener('scroll', () => {
        if (isScrolling) return;
        isScrolling = true;
        
        requestAnimationFrame(() => {
            const center = gallery.scrollLeft + gallery.offsetWidth / 2;
            let closestIndex = 0;
            let closestDistance = Infinity;

            items.forEach((item, index) => {
                const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                const distance = Math.abs(center - itemCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            updateActive(closestIndex);
            isScrolling = false;
        });
    });

    // Кнопки навігації
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentIndex = getCurrentIndex();
            if (currentIndex > 0) {
                scrollToItem(currentIndex - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentIndex = getCurrentIndex();
            if (currentIndex < items.length - 1) {
                scrollToItem(currentIndex + 1);
            }
        });
    }

    function getCurrentIndex() {
        const center = gallery.scrollLeft + gallery.offsetWidth / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;

        items.forEach((item, index) => {
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const distance = Math.abs(center - itemCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    // Початкова ініціалізація
    setTimeout(() => {
        updateActive(0);
    }, 100);
}

// ==================== ВИКЛИК ПРИ ЗАВАНТАЖЕННІ ====================
document.addEventListener('DOMContentLoaded', () => {
    // ... існуючий код ...
    
    // Ініціалізація мобільної галереї
    initMobileGallery();
});

// ==================== ОНОВЛЕННЯ ПРИ ЗМІНІ РОЗМІРУ ====================
window.addEventListener('resize', () => {
    const gallery = document.querySelector('.gallery-accordion');
    const navContainer = document.querySelector('.gallery-nav');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    if (gallery) {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            if (navContainer) navContainer.style.display = 'flex';
            if (dotsContainer) dotsContainer.style.display = 'flex';
        } else {
            if (navContainer) navContainer.style.display = 'none';
            if (dotsContainer) dotsContainer.style.display = 'none';
            // Повертаємо десктопну поведінку
            const items = document.querySelectorAll('.gallery-accordion-item');
            items.forEach(item => item.classList.remove('active'));
            if (items.length > 0) items[0].classList.add('active');
        }
    }
});