document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navbarNav = document.querySelector('.navbar-nav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const mainHeader = document.querySelector('.main-header');

    menuIcon.addEventListener('click', function () {
        navbarNav.classList.toggle('active');
        menuIcon.classList.toggle('bx-x'); // Assuming you have an icon class 'bx-x' for close
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navbarNav.classList.contains('active')) {
                navbarNav.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        });
    });

    // Active Nav Link on Scroll & Smooth Scroll
    const sections = document.querySelectorAll('section');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - mainHeader.offsetHeight;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink); // Call on load to set initial active link

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = mainHeader.offsetHeight;
                const offsetTop = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resume Tab Switching Logic
    const resumeBtns = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-details');

    resumeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            resumeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const target = this.getAttribute('data-target');

            resumeDetails.forEach(detail => {
                detail.classList.remove('active');
            });

            const targetDetail = document.querySelector(`.resume-details.${target}`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });

    // Trigger the click on the initially active resume button to show default content
    // Check if there's an active button on load, if not, activate the first one
    const initialActiveResumeBtn = document.querySelector('.resume-btn.active');
    if (initialActiveResumeBtn) {
        initialActiveResumeBtn.click();
    } else if (resumeBtns.length > 0) {
        resumeBtns[0].click(); // Activate the first one if no active specified
    }


    // Back to Top Button functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex'; // Use flex to maintain centering
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check for back to top button visibility on load
    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});
 document.addEventListener('DOMContentLoaded', () => {
  // Your desired words are already here in the array
  const words = ["Coder...", "TikToker...", "Dancer...", "Web Developer...", "Designer...", "Creative Enthusiast...", "Innovator...", "Tech Lover...",  "Content Creator"]; 
  const typedWordElement = document.getElementById('typed-word');
  let wordIndex = 0; 
  let charIndex = 0; 
  let isDeleting = false; 

  const typingSpeed = 150; 
  const deletingSpeed = 75; 
  const delayBetweenWords = 1500; 
  const delayBeforeNextWord = 700; 

  function typeWriter() {
    const currentWord = words[wordIndex]; 
    let currentDisplay = typedWordElement.textContent; 

    if (isDeleting) {
      currentDisplay = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentDisplay = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    typedWordElement.textContent = currentDisplay;

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = delayBetweenWords; 
      isDeleting = true; 
    } 
    else if (isDeleting && charIndex === 0) {
      isDeleting = false; 
      wordIndex = (wordIndex + 1) % words.length; 
      speed = delayBeforeNextWord; 
    }

    setTimeout(typeWriter, speed);
  }

  typeWriter();
});