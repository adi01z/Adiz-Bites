// Active navbar on scroll
let nav = document.querySelector('.navigation-wrap');
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add('scroll-on');
    } else {
        nav.classList.remove('scroll-on');
    }
};

// nav hide

document.addEventListener('DOMContentLoaded', function () {
    const navCollapse = document.getElementById('navbarText');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
                // Try-catch for debugging
                try {
                    let bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });
                    bsCollapse.hide();
                } catch (e) {
                    console.error('Bootstrap Collapse error:', e);
                }
            }
        });
    });
});

// Counter animation
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration) {
        let obj = document.getElementById(id),
            current = start,
            range = end - start,
            increment = end > start ? 1 : -1,
            step = Math.abs(Math.floor(duration / range)),
            timer = setInterval(() => {
                current += increment;
                obj.textContent = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, step);
    }

    counter("count1", 0, 287, 3000);
    counter("count2", 100, 5087, 2500);
    counter("count3", 0, 1447, 3000);
    counter("count4", 0, 7110, 3000);
});
