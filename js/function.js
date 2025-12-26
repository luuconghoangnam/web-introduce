const heroImage = document.querySelector('#main-image');
if (heroImage && CSS.supports('animation-timeline', 'auto')) {
    heroImage.animate(
        [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(5)', opacity: 0 }
        ],
        {
            duration: 1000,
            fill: 'both',
            timeline: new ScrollTimeline({
                source: document.scrollingElement,
                orientation: 'block',
                scrollOffsets: [CSS.percent(0), CSS.percent(100)]
            })
        }
    );
}

const textSpan = document.getElementById('text-span');
const texts = ["Frontend Designer", "Web Designer", "Web Developer", "Unity Developer"];
let textIndex = 0;
let charIndex = 0;
let deleting = false;
const typingSpeed = 150;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    if (!textSpan) return;
    const currentText = texts[textIndex];
    if (!deleting) {
        textSpan.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            deleting = true;
            setTimeout(type, pauseTime);
            return;
        }
    } else {
        textSpan.textContent = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    setTimeout(type, deleting ? deletingSpeed : typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (textSpan) {
        type();
    }
});

const menuIcon = document.querySelector('#menu-icon');
const mobileMenu = document.querySelector('#mobile-menu');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('[data-nav-link]');
const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');

function setActiveLink() {
    const top = window.scrollY;
    sections.forEach(sec => {
        const offset = sec.offsetTop - 200;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height && id) {
            navLinks.forEach(link => {
                link.classList.remove('text-primary');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('text-primary');
                }
            });
        }
    });
}

window.addEventListener('scroll', () => {
    setActiveLink();
});
setActiveLink();

if (projectFilters.length && projectCards.length) {
    projectFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            projectFilters.forEach(b => b.classList.remove('bg-primary', 'text-white', 'border-primary', 'shadow-primary/20', 'shadow-lg'));
            btn.classList.add('bg-primary', 'text-white', 'border-primary', 'shadow-primary/20', 'shadow-lg');

            projectCards.forEach(card => {
                const isMatch = filter === 'all' || card.classList.contains(`cat-${filter}`);
                card.style.display = isMatch ? 'flex' : 'none';
            });
        });
    });
    // set default active
    const defaultBtn = document.querySelector('.project-filter[data-filter="all"]');
    if (defaultBtn) defaultBtn.click();
}

if (menuIcon && mobileMenu) {
    menuIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const iconSpan = menuIcon.querySelector('.material-symbols-outlined');
        if (iconSpan) {
            iconSpan.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
        }
    });
}

// open project in new tab
function openProject(link) {
    window.open(link, "_blank");
}

document.addEventListener("DOMContentLoaded", function() {
    const commentInput = document.getElementById('comment-input');
    const sendCommentButton = document.getElementById('send-comment');

    if (commentInput && sendCommentButton) {
        commentInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();
                sendCommentButton.click();
            }
        });
    }
});

function closeContactList() {
    const modal = document.getElementById('show-contact-list');
    if (modal) {
        modal.style.display = "none";
    }
}

function changeNavBackground() {
    const nav = document.getElementById("header");
    if (!nav) return;
    if (window.scrollY > 30) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
}

window.addEventListener("scroll", changeNavBackground);