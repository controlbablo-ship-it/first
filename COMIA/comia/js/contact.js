// Fade-up animation for scroll
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.8s forwards ease-out';
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));

// Form validation and feedback
const contactForm = document.getElementById('contactForm');
const formMsg = document.querySelector('.form-msg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if(name === "" || email === "" || message === "") {
    formMsg.textContent = "Please fill in all fields!";
    formMsg.style.color = "red";
    return;
  }

  formMsg.textContent = "Message sent successfully!";
  formMsg.style.color = "green";

  contactForm.reset();
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});
