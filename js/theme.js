// 主题切换功能
function toggleTheme() {
  console.log('toggleTheme 函数被调用');
  
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  console.log('当前主题:', currentTheme, '新主题:', newTheme);
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // 强制重新应用链接卡片样式
  setTimeout(() => {
    const linkCards = document.querySelectorAll('.link-card');
    if (linkCards.length > 0) {
      console.log('找到链接卡片:', linkCards.length, '个，强制重新应用样式');
      linkCards.forEach(card => {
        // 强制重新应用链接信息和操作区域的样式
        const linkInfo = card.querySelector('.link-info');
        if (linkInfo) {
          linkInfo.style.backgroundColor = '';
        }
        
        const linkActions = card.querySelector('.link-actions');
        if (linkActions) {
          linkActions.style.backgroundColor = '';
        }
      });
    }
  }, 50);
  
  const themeIcon = document.querySelector('#theme-toggle i');
  if (themeIcon) {
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    console.log('图标已更新为:', themeIcon.className);
  } else {
    console.error('找不到主题图标元素');
  }
  
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      themeToggleBtn.style.transform = '';
    }, 300);
    console.log('按钮动画已应用');
  } else {
    console.error('找不到主题切换按钮元素');
  }
}

// 页面加载时应用保存的主题
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM已加载，正在应用保存的主题');
  
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  console.log('应用主题:', currentTheme, '(保存的主题:', savedTheme, ', 系统偏好:', systemPrefersDark ? 'dark' : 'light', ')');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  const themeIcon = document.querySelector('#theme-toggle i');
  if (themeIcon) {
    themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    console.log('初始图标已设置为:', themeIcon.className);
  } else {
    console.error('在页面加载时找不到主题图标元素');
  }
  
  // 确保主题切换按钮有正确的点击事件
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    console.log('找到主题切换按钮，确保它有正确的点击事件');
    // 移除可能存在的旧事件监听器
    themeToggleBtn.removeEventListener('click', toggleTheme);
    // 添加新的事件监听器
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // 确保按钮可点击
    themeToggleBtn.style.pointerEvents = 'auto';
    themeToggleBtn.style.cursor = 'pointer';
  } else {
    console.error('在页面加载时找不到主题切换按钮元素');
    // 尝试延迟再次查找按钮
    setTimeout(() => {
      const delayedBtn = document.getElementById('theme-toggle');
      if (delayedBtn) {
        console.log('延迟后找到主题切换按钮，添加点击事件');
        delayedBtn.removeEventListener('click', toggleTheme);
        delayedBtn.addEventListener('click', toggleTheme);
      }
    }, 1000);
  }
}); 
