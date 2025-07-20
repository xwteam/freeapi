function initializeTopNav() {
  console.log('初始化顶部导航和主题切换...');
  
  // DOM 元素
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const topNav = document.querySelector('.top-nav');
  const container = document.querySelector('.container');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // 调试信息
  console.log('主题切换按钮:', themeToggleBtn);
  
  // 主题应用
  const applyTheme = (theme) => {
    console.log('应用主题:', theme);
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const themeIcon = themeToggleBtn?.querySelector('i');
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      console.log('更新主题图标为:', themeIcon.className);
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
    console.log('初始化主题:', currentTheme, '(保存的主题:', savedTheme, ', 系统偏好:', systemPrefersDark ? 'dark' : 'light', ')');
    applyTheme(currentTheme);
  };

  // 点击主题按钮切换
  if (themeToggleBtn) {
    console.log('为主题切换按钮添加点击事件');
    themeToggleBtn.addEventListener('click', () => {
      console.log('主题切换按钮被点击');
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      console.log('切换主题:', currentTheme, '->', newTheme);
      applyTheme(newTheme);
      themeToggleBtn.style.transform = 'scale(0.8)';
      setTimeout(() => {
        themeToggleBtn.style.transform = '';
      }, 300);
    });
  } else {
    console.error('主题切换按钮未找到！ID: theme-toggle');
    // 尝试直接在文档中查找按钮
    const allButtons = document.querySelectorAll('button');
    console.log('文档中的所有按钮:', allButtons.length);
    allButtons.forEach(btn => {
      if (btn.id === 'theme-toggle' || btn.classList.contains('floating-btn')) {
        console.log('找到可能的主题切换按钮:', btn);
      }
    });
  }

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

// 确保DOM完全加载后再初始化
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM已加载完成，准备初始化主题切换...');
  
  // 延迟一点执行，确保所有包含的HTML都已加载
  setTimeout(() => {
    console.log('检查主题切换按钮是否存在...');
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) {
      console.error('主题切换按钮未找到！可能是HTML结构问题。');
      
      // 尝试手动添加主题切换按钮
      if (!document.querySelector('.floating-buttons')) {
        console.log('尝试添加浮动按钮容器...');
        const floatingButtons = document.createElement('div');
        floatingButtons.className = 'floating-buttons';
        
        const themeBtn = document.createElement('button');
        themeBtn.id = 'theme-toggle';
        themeBtn.className = 'floating-btn';
        themeBtn.setAttribute('aria-label', '切换主题');
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-moon';
        themeBtn.appendChild(icon);
        
        floatingButtons.appendChild(themeBtn);
        document.body.appendChild(floatingButtons);
        
        console.log('已手动添加主题切换按钮');
        
        // 重新初始化
        initializeTopNav();
      }
    }
  }, 1000);
});
