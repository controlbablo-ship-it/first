// HERO ANIMATIONS
gsap.from(".navbar", { y:-80, opacity:0, duration:1, ease:"power3.out" });
gsap.from(".hero-content h1", { y:60, opacity:0, duration:1, delay:0.4, ease:"power3.out" });
gsap.from(".hero-content h2", { y:40, opacity:0, duration:1, delay:0.6, ease:"power3.out" });
gsap.from(".hero-content p", { y:30, opacity:0, duration:1, delay:0.8, ease:"power3.out" });
gsap.from(".hero-buttons .btn", { y:20, opacity:0, duration:0.8, delay:1, stagger:0.2, ease:"power3.out" });

// SCROLL ANIMATIONS
const animatedElements = document.querySelectorAll(".animate");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){ entry.target.classList.add("show"); observer.unobserve(entry.target);}
    });
},{ threshold:0.2 });
animatedElements.forEach(el => observer.observe(el));

// MOBILE NAV TOGGLE
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger.addEventListener("click", () => nav.classList.toggle("active"));

// PROJECT MODAL
const modal = document.querySelector(".project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImage = document.getElementById("modal-image");
const modalLive = document.getElementById("modal-live");
const modalGithub = document.getElementById("modal-github");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;
        modalImage.src = card.dataset.image;
        modalLive.href = card.dataset.live;
        modalGithub.href = card.dataset.github;
        modal.classList.add("active");
    });
});

closeModal.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", e => { if(e.target===modal) modal.classList.remove("active"); });

// ANIMATED NAME
const nameElement = document.querySelector(".animated-name");
const text = nameElement.textContent;
nameElement.textContent = "";
text.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char===" " ? "\u00A0" : char;
    nameElement.appendChild(span);
});
gsap.fromTo(".animated-name span", { opacity:0, y:40 }, { opacity:1, y:0, duration:0.8, ease:"power4.out", stagger:0.05, repeat:-1, repeatDelay:3, yoyo:true });

// BACK TO TOP
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => backToTop.style.display = window.scrollY>300 ? 'flex':'none');
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

// EMAILJS
(function () { emailjs.init("Zqed_OuRN-y7s1CYt"); })();
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", function(e){
    e.preventDefault();
    emailjs.sendForm("service_gyohcb2","template_ar066im",this).then(
        () => { status.textContent="Message sent successfully!"; status.style.color="#00ffd5"; form.reset(); },
        () => { status.textContent="Failed to send message. Please try again."; status.style.color="#ff4c4c"; }
    );
});
