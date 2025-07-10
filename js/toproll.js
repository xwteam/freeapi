function initializeTopNav() {
  // DOM 元素
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const topNav = document.querySelector('.top-nav');
  const container = document.querySelector('.container');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // 主题应用
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

  // 初始化主题
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);
  };

  // 点击主题按钮切换
  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    themeToggleBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 300);
  });

  // 根据系统变化自动切换
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 初始化主题
  initTheme();

  // 返回顶部按钮
  window.addEventListener('scroll', () => {
    if (!scrollToTopBtn) return;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 顶部导航栏滚动控制 - 修改后的逻辑
  const handleScroll = () => {
    const currentY = window.scrollY;
    
    // 当页面在顶部时，隐藏导航栏
    if (currentY <= 10) {
      topNav?.classList.remove('show');
      container?.classList.remove('nav-visible');
    } 
    // 当页面向下滚动超过阈值时，显示导航栏
    else if (currentY > 10) {
      topNav?.classList.add('show');
      container?.classList.add('nav-visible');
    }
  };

  window.addEventListener('scroll', handleScroll);
  
  // 页面加载时检查滚动位置
  window.addEventListener('load', () => {
    handleScroll();
  });

  // 手机汉堡菜单交互
  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon?.classList.toggle('fa-bars');
    icon?.classList.toggle('fa-times');
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon?.classList.replace('fa-times', 'fa-bars');
    });
  });

  // 快捷键切换主题和返回顶部
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
