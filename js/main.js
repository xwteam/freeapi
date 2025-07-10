async function loadIncludes() {
  const includes = document.querySelectorAll('[data-include]');
  for (const el of includes) {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      if (res.ok) {
        const html = await res.text();
        el.innerHTML = html;
      } else {
        el.innerHTML = `<p style="color:red;">加载失败：${url}</p>`;
      }
    } catch {
      el.innerHTML = `<p style="color:red;">加载失败：${url}</p>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadIncludes();
  initializeTopNav();
  initializeApp();
});

let globalConfig = {};

async function initializeApp() {
  showLoading();
  try {
    await loadTitleConfig();
    await loadData();
  } catch (error) {
    console.error('应用初始化失败:', error);
    if (statsElem) {
      statsElem.textContent = "系统初始化失败，请刷新页面";
      statsElem.style.color = 'var(--error)';
    }
  } finally {
    hideLoading();
  }
}

async function loadTitleConfig() {
  try {
    const res = await fetch('config/web_config.json');
    if (!res.ok) throw new Error(`配置加载失败: ${res.status}`);
    const config = await res.json();
    document.title = `${config.title} - ${config.subhead}`;
    document.getElementById('titleText').textContent = config.webname;
    globalConfig = config;
    const notice = config.notice?.trim();
    startDeployTypewriterEffect(notice || "为众多开发者免费提供专业的 API 服务，让您无忧探索广阔的数字世界。");
  } catch (err) {
    console.warn('未能加载 web_config.json，使用默认标题。', err);
    // 使用默认值
    globalConfig = {
      title: "福利云API",
      subhead: "不止是免费的API，更是一个免费的公益福利云",
      webname: "福利云",
      notice: "为众多开发者免费提供专业的 API 服务，让您无忧探索广阔的数字世界。"
    };
    document.getElementById('titleText').textContent = globalConfig.webname;
    document.title = `${globalConfig.title} - ${globalConfig.subhead}`;
    startDeployTypewriterEffect(globalConfig.notice);
  }
}

function startDeployTypewriterEffect(text) {
  const deployText = document.getElementById('deployNoticeText');
  if (!deployText) return; // 修复：避免元素不存在导致报错
  deployText.innerHTML = '';
  let index = 0;
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  deployText.appendChild(cursor);
  function typeChar() {
    if (index < text.length) {
      const span = document.createElement('span');
      span.textContent = text.charAt(index);
      deployText.insertBefore(span, cursor);
      index++;
      setTimeout(typeChar, 50);
    } else {
      setTimeout(() => cursor.style.display = 'none', 1000);
    }
  }
  setTimeout(typeChar, 500);
}

const cardContainer = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");
const statsElem = document.getElementById("stats");
const loaderElem = document.getElementById("loader");
let allAddons = [];

function showLoading() {
  loaderElem.style.display = "block";
  cardContainer.innerHTML = "";
  statsElem.textContent = "";
}

function showError(message) {
  loaderElem.style.display = "none";
  cardContainer.innerHTML = `<div class="error-panel"><h2 class="error-title"><i class="fas fa-exclamation-triangle"></i> 加载数据失败</h2><p>${message}</p><div class="controls" style="margin-top: 20px;"><button class="btn" id="retryBtn"><i class="fas fa-redo"></i> 重试</button></div></div>`;
  document.getElementById("retryBtn").addEventListener("click", loadData);
  statsElem.textContent = "";
}

function showSuccess() {
  loaderElem.style.display = "none";
}

async function loadData() {
  showLoading();
  statsElem.textContent = "正在加载接口数据...";
  statsElem.style.color = "var(--primary)";
  try {
    const response = await fetch("data/apilist.json");
    if (!response.ok) throw new Error(`服务器响应错误: ${response.status}`);
    const result = await response.json();
    if (!result.data || !Array.isArray(result.data)) throw new Error("JSON数据格式错误");
    allAddons = result.data;
    renderData(allAddons);
    statsElem.textContent = `${globalConfig.webname} 当前共有 ${allAddons.length} 个接口`;
    statsElem.style.color = "var(--success)";
    showSuccess();
  } catch (error) {
    showError(`无法加载接口数据: ${error.message}<br><small>请确保 data/apilist.json 存在</small>`);
    statsElem.textContent = "数据加载失败";
    statsElem.style.color = "var(--error)";
  }
}

function renderData(data) {
  if (!data.length) {
    cardContainer.innerHTML = `<div class="loader"><p>没有找到接口数据</p></div>`;
    statsElem.textContent = `${globalConfig.webname} 暂无接口数据`;
    return;
  }
  statsElem.textContent = `${globalConfig.webname} 共有 ${data.length} 个接口`;
  statsElem.style.color = 'var(--primary)';
  cardContainer.innerHTML = data.map(item => `
    <div class="card" onclick="goToApiDoc('${item.xwteam_api_id}')">
      <div class="card-header">
        <div class="card-id">ID: ${item.xwteam_api_id}</div>
        <h2 class="card-title">${item.xwteam_api_title}</h2>
      </div>
      <div class="card-body">
        <p class="card-desc">${item.xwteam_api_desc}</p>
      </div>
    </div>
  `).join('');
}

// 添加跳转到API文档页面的函数
function goToApiDoc(id) {
  window.location.href = `doc.html?id=${id}`;
}

function filterData() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (!searchTerm) {
    renderData(allAddons);
    statsElem.textContent = `${globalConfig.webname} 共有 ${allAddons.length} 个接口`;
    statsElem.style.color = 'var(--primary)';
    return;
  }
  const filtered = allAddons.filter(item =>
    item.xwteam_api_title.toLowerCase().includes(searchTerm) ||
    item.xwteam_api_desc.toLowerCase().includes(searchTerm)
  );
  if (filtered.length) {
    renderData(filtered);
    statsElem.textContent = `找到 ${filtered.length} 个匹配的接口 (关键词: "${searchTerm}")`;
    statsElem.style.color = 'var(--primary)';
  } else {
    cardContainer.innerHTML = `<div class="loader"><p>没有找到匹配的接口</p></div>`;
    statsElem.textContent = `没有找到匹配 "${searchTerm}" 的接口`;
    statsElem.style.color = 'var(--gray)';
  }
}

searchInput.addEventListener("input", filterData);
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") filterData();
});
