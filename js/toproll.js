// js/toproll.js

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------
  // 主题切换与浮动按钮功能（保留原有逻辑）
  // ------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = themeToggleBtn.querySelector('i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题');
    
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
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    
    themeToggleBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 300);
  });
  
  initTheme();
  
  // 返回顶部功能（保留原有逻辑）
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
  
  scrollToTopBtn.addEventListener('click', () => {
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
      themeToggleBtn.click();
      e.preventDefault();
    }
    if (e.key === 'ArrowUp' && e.altKey) {
      scrollToTopBtn.click();
      e.preventDefault();
    }
  });

  // ------------------------------
  // 顶部导航栏交互逻辑（修改重点）
  // ------------------------------
  const topNav = document.querySelector('.top-nav');
  const container = document.querySelector('.container');
  const hamburger = document.querySelector('.hamburger'); // 汉堡图标
  const navLinks = document.querySelector('.nav-links'); // 导航链接
  
  let lastScrollY = 0;
  const scrollThreshold = 200; // 滚动超过200px才开始判断方向（避免顶部小滚动频繁切换）

  // 1. 滚动监听：根据方向显示/隐藏导航栏
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // 当滚动超过阈值时，根据方向判断
    if (currentScrollY > scrollThreshold) {
      // 向下滚动：隐藏导航栏
      if (currentScrollY > lastScrollY) {
        topNav.classList.remove('show');
        container.classList.remove('nav-visible');
      } else {
        // 向上滚动：显示导航栏
        topNav.classList.add('show');
        container.classList.add('nav-visible');
      }
    } else {
      // 滚动未超过阈值（顶部区域）：隐藏导航栏
      topNav.classList.remove('show');
      container.classList.remove('nav-visible');
    }
    
    lastScrollY = currentScrollY;
  };

  // 2. 汉堡菜单交互（手机端）
  const handleHamburgerClick = () => {
    if (!navLinks) return;
    navLinks.classList.toggle('active'); // 切换导航链接显示状态
    
    // 切换汉堡图标（fa-bars → fa-times）
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  };

  // 3. 点击导航链接：关闭菜单（提升用户体验）
  const handleNavLinkClick = () => {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('active'); // 关闭菜单
    hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars'); // 恢复汉堡图标
  };

  // 绑定事件
  if (topNav && container) {
    window.addEventListener('scroll', handleScroll);
    // 页面加载时初始化导航栏状态（避免刷新时滚动位置保留导致异常）
    window.addEventListener('load', () => {
      lastScrollY = window.scrollY;
      handleScroll();
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', handleHamburgerClick);
    // 给所有导航链接绑定点击事件
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });
  }
});