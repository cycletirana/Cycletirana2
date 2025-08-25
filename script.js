document.addEventListener('DOMContentLoaded', () => {
    function bindSmoothScrollLinks() {
        document.querySelectorAll('a[href*="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const url = new URL(this.href, location.href);

                // Only smooth scroll if same page
                if (url.hash && url.pathname === location.pathname) {
                    const target = document.querySelector(url.hash);
                    if (target) {
                        e.preventDefault();
                        if (url.hash === '#contact-booking' || url.hash === '#booking-form') {
                            const form = document.querySelector('#booking-form') || target;
                            const submit = form.querySelector('button[type="submit"]');
                            (submit || form).scrollIntoView({ behavior: 'smooth', block: 'end' });
                            // small nudge so the button isn't on the very edge
                            setTimeout(() => window.scrollBy(0, 24), 0);
                        } else {
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            });
        });
    }

    bindSmoothScrollLinks(); // run once now


    // Close burger menu on link click
    document.querySelectorAll('nav ul.menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('menu-toggle').checked = false;
        });
    });

    // Animate section titles on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Animate once
            }
        });
    });

    document.querySelectorAll('.tours-section h2').forEach(h2 => {
        observer.observe(h2);
    });
});

// Google Maps init
function initMap() {
    const meetingPoint = { lat: 41.335984, lng: 19.816142 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: meetingPoint,
    });
    new google.maps.Marker({
        position: meetingPoint,
        map: map,
        title: "Cycle Tirana Meeting Point",
    });
}


// Tour card toggle
function toggleDescription(clickedCard) {
    const allDescriptions = document.querySelectorAll('.tour-description');
    const target = clickedCard.nextElementSibling;

    const isAlreadyVisible = target.classList.contains('show');
    allDescriptions.forEach(desc => desc.classList.remove('show'));
    if (!isAlreadyVisible) {
        target.classList.add('show');
    }
}



// Show booking success popup if URL has ?status=success
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success') {
        const popup = document.getElementById('booking-popup');
        if (popup) {
            popup.style.display = 'block';

            // Remove ?status=success from URL after 4s
            setTimeout(() => {
                popup.style.display = 'none';
                history.replaceState(null, "", window.location.pathname);
            }, 4000);
        }
    }
});



document.addEventListener('DOMContentLoaded', () => {
    // For each album-box on the page, wire up a paired main+thumb swiper
    document.querySelectorAll('.album-box').forEach(album => {
        const mainEl = album.querySelector('.mainSwiper');
        const thumbEl = album.querySelector('.thumbSwiper');

        if (!mainEl || !thumbEl) return;

        // Build thumbnails (no duplication in HTML)
        const mainWrapper = mainEl.querySelector('.swiper-wrapper');
        const thumbWrapper = thumbEl.querySelector('.swiper-wrapper');
        if (!mainWrapper || !thumbWrapper) return;

        // Clear any server-rendered duplicate thumbs (optional safety)
        thumbWrapper.innerHTML = '';

        mainWrapper.querySelectorAll('.swiper-slide img').forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            const timg = document.createElement('img');
            timg.src = img.currentSrc || img.src;
            timg.alt = (img.alt || '') + ' thumbnail';
            slide.appendChild(timg);
            thumbWrapper.appendChild(slide);
        });

        // Scope nav/pagination to this album to avoid cross-talk
        const nextBtn = album.querySelector('.swiper-button-next');
        const prevBtn = album.querySelector('.swiper-button-prev');
        const pager = album.querySelector('.swiper-pagination');

        const thumbSwiper = new Swiper(thumbEl, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            freeMode: true,
            watchSlidesProgress: true,
        });

        const mainSwiper = new Swiper(mainEl, {
            loop: true,
            centeredSlides: true,
            spaceBetween: 16,
            navigation: nextBtn && prevBtn ? { nextEl: nextBtn, prevEl: prevBtn } : undefined,
            pagination: pager ? { el: pager, clickable: true } : undefined,
            thumbs: { swiper: thumbSwiper },
            on: {
                imagesReady() { mainSwiper.updateAutoHeight(300); }
            }
        });
    });
});