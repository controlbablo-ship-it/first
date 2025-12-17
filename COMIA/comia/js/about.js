// Fade-up scroll animation (existing)
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.8s forwards ease-out';
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));

// Animated Counters
const counters = document.querySelectorAll('.counter h3');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent.replace(/\D/g,'')); // remove non-numeric
      let count = 0;
      const increment = Math.ceil(target / 100); // adjust speed

      const updateCount = () => {
        count += increment;
        if(count > target) count = target;
        el.textContent = count + '+';
        if(count < target) {
          requestAnimationFrame(updateCount);
        }
      }

      updateCount();
      counterObserver.unobserve(el); // run only once
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));
