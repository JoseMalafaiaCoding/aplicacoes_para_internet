document.addEventListener('DOMContentLoaded', function() {
    var btnTema   = document.getElementById('btn-tema');
    var btnMotion = document.getElementById('btn-motion');
    var menuBtn   = document.querySelector('.nav__toggle');
    var navList   = document.querySelector('.nav__list');

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', function() {
            var aberto = navList.classList.contains('nav__list--open');
            if (aberto) {
                navList.classList.remove('nav__list--open');
                menuBtn.classList.remove('nav__toggle--open');
                menuBtn.setAttribute('aria-expanded', 'false');
            } else {
                navList.classList.add('nav__list--open');
                menuBtn.classList.add('nav__toggle--open');
                menuBtn.setAttribute('aria-expanded', 'true');
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                navList.classList.remove('nav__list--open');
                menuBtn.classList.remove('nav__toggle--open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navList.classList.contains('nav__list--open')) {
                navList.classList.remove('nav__list--open');
                menuBtn.classList.remove('nav__toggle--open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus();
            }
        });
    }

    var colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    var isLight = !colorSchemeMedia.matches;

    function applyTheme() {
        document.body.classList.toggle('manual-light', isLight);
        document.body.classList.toggle('manual-dark', !isLight);
        btnTema.textContent = isLight ? '🌙' : '☀️';
        btnTema.setAttribute('aria-pressed', String(!isLight));
    }

    if (btnTema) {
        applyTheme();
        btnTema.addEventListener('click', function() {
            isLight = !isLight;
            applyTheme();
        });
        colorSchemeMedia.addEventListener('change', function(e) {
            isLight = !e.matches;
            applyTheme();
        });
    }

    if (btnMotion) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('manual-reduced-motion');
            btnMotion.setAttribute('aria-pressed', 'true');
            btnMotion.textContent = '▶';
        }
        btnMotion.addEventListener('click', function() {
            var reduced = document.body.classList.toggle('manual-reduced-motion');
            btnMotion.setAttribute('aria-pressed', String(reduced));
            btnMotion.textContent = reduced ? '▶' : '⏸';
        });
    }

    var yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
