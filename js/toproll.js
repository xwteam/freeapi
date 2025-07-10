// js/toproll.js

function initializeTopNav() {
  // 所有的 DOM 相关逻辑，放在这个函数里
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const themeIcon = themeToggleBtn?.querySelector('i');
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    themeToggleBtn?.setAttribute('aria-label', theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题');
    const favicons = document.querySelectorAll('link[rel~="icon"]');
    if (favicons.length > 0) {
      const newFavicon = theme === 'dark' ? 'FreeAPI-dark.png' : 'FreeAPI.png';
      if (!favicons[0].href.includes(newFavicon)) {
        setTimeout(() => {
          favicons.forEach(favicon => {
            favicon.href = favicon.href.replace(/FreeAPI(-dark)?\.png/, newFavicon);
          });
        }, 300);
      }
    }
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);
  };

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    if (themeToggleBtn) {
      themeToggleBtn.style.transform = 'scale(0.8)';
      setTimeout(() => {
        themeToggleBtn.style.transform = '';
      }, 300);
    }
  });

  initTheme();

  const scrollToTopBtn = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', () => {
    if (scrollToTopBtn) {
      if (window.pageYOffset > 200) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.opacity = '1';
      } else {
        scrollToTopBtn.style.opacity = '0';
        setTimeout(() => {
          if (window.pageYOffset <= 200) {
            scrollToTopBtn.style.display = 'none';
          }
        }, 300);
      }
    }
  });

  scrollToTopBtn?.addEventListener('click', () => {
    scrollToTopBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      scrollToTopBtn.style.transform = '';
    }, 300);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  const topNav = document.querySelector('.top-nav');
  const container = document.querySelector('.container');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  let lastScrollY = 0;
  const scrollThreshold = 200;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (topNav && container) {
      if (currentScrollY > scrollThreshold) {
        if (currentScrollY > lastScrollY) {
          topNav.classList.remove('show');
          container.classList.remove('nav-visible');
        } else {
          topNav.classList.add('show');
          container.classList.add('nav-visible');
        }
      } else {
        topNav.classList.remove('show');
        container.classList.remove('nav-visible');
      }
      lastScrollY = currentScrollY;
    }
  };

  const handleHamburgerClick = () => {
    if (navLinks && hamburger) {
      navLinks.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  };

  const handleNavLinkClick = () => {
    if (navLinks && hamburger) {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars');
    }
  };

  if (topNav && container) {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', () => {
      lastScrollY = window.scrollY;
      handleScroll();
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', handleHamburgerClick);
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 't' && e.altKey) {
      themeToggleBtn?.click();
      e.preventDefault();
    }
    if (e.key === 'ArrowUp' && e.altKey) {
      scrollToTopBtn?.click();
      e.preventDefault();
    }
  });
}
