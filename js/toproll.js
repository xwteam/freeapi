// js/toproll.js

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------
  // 新增：动态加载 data-include 模块（如 nav.html / loading.html）
  // ------------------------------
  const loadIncludes = () => {
    const includeElements = document.querySelectorAll('[data-include]');
    includeElements.forEach(el => {
      const file = el.getAttribute('data-include');
      if (file) {
        fetch(file)
          .then(res => res.text())
          .then(data => {
            el.innerHTML = data;
            // 加载完后递归处理嵌套的 data-include
            loadIncludes();
          })
          .catch(err => {
            console.error(`模块加载失败: ${file}`, err);
          });
      }
    });
  };
  loadIncludes();

  // ------------------------------
  // 主题切换与浮动按钮功能（保留原有逻辑）
  // ------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = themeToggleBtn?.querySelector('i');
    if (themeIcon) themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    themeToggleBtn?.setAttribute('aria-label', theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题');
    
    const favicons = document.querySelectorAll('link[rel~="icon"]');
    if (theme === 'dark' && !favicons[0].href.includes('FreeAPI-dark.png')) {
      setTimeout(() => {
        favicons.forEach(favicon => {
          if (favicon.href.includes('FreeAPI.png')) {
            favicon.href = favicon.href.replace('FreeAPI.png', 'FreeAPI-dark.png');
          }
        });
      }, 300);
    } else if (theme === 'light' && !favicons[0].href.includes('FreeAPI.png')) {
      setTimeout(() => {
        favicons.forEach(favicon => {
          if (favicon.href.includes('FreeAPI-dark.png')) {
            favicon.href = favicon.href.replace('FreeAPI-dark.png', 'FreeAPI.png');
          }
        });
      }, 300);
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
    
    themeToggleBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 300);
  });
  
  initTheme();
  
  // ------------------------------
  // 返回顶部功能
  // ------------------------------
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  window.addEventListener('scroll', () => {
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
  });
  
  scrollToTopBtn?.addEventListener('click', () => {
    scrollToTopBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      scrollToTopBtn.style.transform = '';
    }, 300);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  setTimeout(() => {
    if (window.pageYOffset > 200) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  }, 500);
  
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

  // ------------------------------
  // 顶部导航栏交互逻辑
  // ------------------------------
  const topNav = document.querySelector('.top-nav');
  const container = document.querySelector('.container');
  const hamburger = document.querySelector('.hamburger'); // 汉堡图标
  const navLinks = document.querySelector('.nav-links'); // 导航链接
  
  let lastScrollY = 0;
  const scrollThreshold = 200;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > scrollThreshold) {
      if (currentScrollY > lastScrollY) {
        topNav?.classList.remove('show');
        container?.classList.remove('nav-visible');
      } else {
        topNav?.classList.add('show');
        container?.classList.add('nav-visible');
      }
    } else {
      topNav?.classList.remove('show');
      container?.classList.remove('nav-visible');
    }
    
    lastScrollY = currentScrollY;
  };

  const handleHamburgerClick = () => {
    if (!navLinks) return;
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  };

  const handleNavLinkClick = () => {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('active');
    hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
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
});
