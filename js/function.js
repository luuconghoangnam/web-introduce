if (CSS.supports('animation-timeline', 'auto')) {
    document.querySelector('img').animate(
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
} else {
    console.log("Scroll Timeline không được hỗ trợ trên trình duyệt này.");
}

const textSpan = document.getElementById('text-span');
const texts = ["Frontend Designer", "Web Designer", "UI / UX Designer", "Web Developer"];
let textIndex = 0;
let charIndex = 0;
let deleting = false;
const typingSpeed = 150;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
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
    type();
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                let target = document.querySelector('header nav a[href*=' + id + ']');
                if (target) {
                    target.classList.add('active');
                }
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// open project in new tab

function openProject(link) {
    window.open(link, "_blank");
}

document.addEventListener("DOMContentLoaded", function() {
    const commentInput = document.getElementById('comment-input');
    const sendCommentButton = document.getElementById('send-comment');

    commentInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            event.preventDefault();
            sendCommentButton.click();
        }
    });
});

function closeContactList() {
    document.getElementById('show-contact-list').style.display = "none";
}

function changeNavBackground() {
    var nav = document.getElementById("header");
    if (window.scrollY > 30) {
        // Khi cuộn xuống - trong suốt
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        nav.style.backdropFilter = "blur(10px)";
    } else {
        // Khi ở đầu trang - màu đen
        nav.style.backgroundColor = "rgb(0, 0, 0)";
        nav.style.backdropFilter = "none";
    }
}

window.addEventListener("scroll", changeNavBackground);