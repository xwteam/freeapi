// js/toproll.js

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------
  // 1. 主题切换功能
  // ------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // 应用主题（修改主题属性、本地存储、图标/提示文本）
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // 更新主题切换按钮的图标（可选链避免null错误）
    const themeIcon = themeToggleBtn?.querySelector('i');
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // 更新按钮提示文本
    themeToggleBtn?.setAttribute('aria-label', theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题');
    
    // 更新 favicon（根据主题切换图标）
    const favicons = document.querySelectorAll('link[rel~="icon"]');
    if (favicons.length > 0) {
      const newFavicon = theme === 'dark' ? 'FreeAPI-dark.png' : 'FreeAPI.png';
      // 避免重复替换（优化性能）
      if (!favicons[0].href.includes(newFavicon)) {
        setTimeout(() => {
          favicons.forEach(favicon => {
            favicon.href = favicon.href.replace(/FreeAPI(-dark)?\.png/, newFavicon);
          });
        }, 300); // 延迟300ms，避免主题切换时闪烁
      }
    }
  };
  
  // 初始化主题（优先使用本地存储，其次系统偏好）
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);
  };
  
  // 绑定主题切换按钮的点击事件
  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    
    // 添加点击动画（缩放效果）
    if (themeToggleBtn) {
      themeToggleBtn.style.transform = 'scale(0.8)';
      setTimeout(() => {
        themeToggleBtn.style.transform = '';
      }, 300);
    }
  });
  
  // 初始化主题（页面加载时执行）
  initTheme();
  
  // ------------------------------
  // 2. 返回顶部功能
  // ------------------------------
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  // 滚动事件监听（控制返回顶部按钮的显示/隐藏）
  window.addEventListener('scroll', () => {
    if (scrollToTopBtn) {
      if (window.pageYOffset > 200) { // 滚动超过200px显示按钮
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.opacity = '1';
      } else { // 滚动小于等于200px隐藏按钮（带过渡效果）
        scrollToTopBtn.style.opacity = '0';
        setTimeout(() => {
          if (window.pageYOffset <= 200) {
            scrollToTopBtn.style.display = 'none';
          }
        }, 300); // 等待过渡效果完成（与CSS的transition时间一致）
      }
    }
  });
  
  // 绑定返回顶部按钮的点击事件（平滑滚动）
  scrollToTopBtn?.addEventListener('click', () => {
    // 添加点击动画（缩放效果）
    if (scrollToTopBtn) {
      scrollToTopBtn.style.transform = 'scale(0.8)';
      setTimeout(() => {
        scrollToTopBtn.style.transform = '';
      }, 300);
    }
    
    // 平滑滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ------------------------------
  // 3. 系统主题变化监听（自动切换主题，若用户未手动设置）
  // ------------------------------
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) { // 仅当用户未手动设置主题时触发
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  // ------------------------------
  // 4. 顶部导航栏交互逻辑（滚动方向判断+手机端汉堡菜单）
  // ------------------------------
  const topNav = document.querySelector('.top-nav'); // 顶部导航栏元素
  const container = document.querySelector('.container'); // 主容器（用于调整 padding）
  const hamburger = document.querySelector('.hamburger'); // 汉堡图标（手机端）
  const navLinks = document.querySelector('.nav-links'); // 导航链接列表（手机端）
  
  let lastScrollY = 0; // 上一次滚动的位置
  const scrollThreshold = 200; // 滚动超过200px才开始判断方向（避免顶部小滚动频繁切换）
  
  // 滚动事件处理函数（根据滚动方向显示/隐藏导航栏）
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (topNav && container) {
      // 滚动超过阈值时，根据方向判断
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
      
      // 更新上一次滚动的位置
      lastScrollY = currentScrollY;
    }
  };
  
  // 汉堡图标点击事件（手机端切换导航菜单显示/隐藏）
  const handleHamburgerClick = () => {
    if (navLinks && hamburger) {
      navLinks.classList.toggle('active'); // 切换导航链接的显示状态
      const icon = hamburger.querySelector('i');
      icon.classList.toggle('fa-bars'); // 切换为汉堡图标
      icon.classList.toggle('fa-times'); // 切换为关闭图标
    }
  };
  
  // 导航链接点击事件（手机端点击链接后关闭菜单）
  const handleNavLinkClick = () => {
    if (navLinks && hamburger) {
      navLinks.classList.remove('active'); // 关闭导航菜单
      const icon = hamburger.querySelector('i');
      icon.classList.replace('fa-times', 'fa-bars'); // 恢复汉堡图标
    }
  };
  
  // 绑定导航栏相关事件
  if (topNav && container) {
    window.addEventListener('scroll', handleScroll); // 滚动事件
    window.addEventListener('load', () => { // 页面加载时初始化导航栏状态
      lastScrollY = window.scrollY;
      handleScroll();
    });
  }
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', handleHamburgerClick); // 汉堡图标点击事件
    // 给所有导航链接绑定点击事件（手机端关闭菜单）
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });
  }
  
  // ------------------------------
  // 5. 键盘快捷键支持（可选，提升用户体验）
  // ------------------------------
  document.addEventListener('keydown', (e) => {
    // Alt+T：切换主题
    if (e.key === 't' && e.altKey) {
      themeToggleBtn?.click();
      e.preventDefault();
    }
    // Alt+↑：返回顶部
    if (e.key === 'ArrowUp' && e.altKey) {
      scrollToTopBtn?.click();
      e.preventDefault();
    }
  });
});
