document.addEventListener('DOMContentLoaded', () => {



  const navbar       = document.getElementById('navbar');
  const navLinks     = document.getElementById('navLinks');
  const hamburger    = document.getElementById('hamburger');
  const themeToggle  = document.getElementById('themeToggle');
  const themeIcon    = themeToggle.querySelector('.theme-icon');
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');

  const allNavLinks  = document.querySelectorAll('.nav-link');

  const revealEls    = document.querySelectorAll('.reveal');

  const skillFills   = document.querySelectorAll('.skill-fill');


  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  handleNavbarScroll();


  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          allNavLinks.forEach((link) => link.classList.remove('active'));

          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    {

      threshold: 0.4,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));



  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  allNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });



  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.textContent = '☽';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');

    themeIcon.textContent = isDark ? '☽' : '☀';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });


  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));


  const skillsSection = document.getElementById('skills');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillFills.forEach((fill, index) => {
            setTimeout(() => {
              fill.classList.add('animate');
            }, index * 120);
          });

          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (skillsSection) skillObserver.observe(skillsSection);


  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      formSuccess.style.display = 'block';

      contactForm.reset();

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    });
  }


  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });


});
