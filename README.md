<p align="center">
<div align="center">
    <a href="https://gitee.com/xwteam/freeapi">
        <img src="img/FreeAPI.png" alt="mpay" width=300 />
    </a>
</div>
<div align="center">
    项目主页：
    <a href="https://github.com/xwteam/freeapi" target="_blank">Github</a>
    <a href="https://gitee.com/xwteam/freeapi" target="_blank">Gitee</a> ｜
    <a href="https://free.xwteam.cn/donate" target="_blank">赞赏作者</a>
</div>
<br />
<div align="center">
    😎免服务器、🧩边缘加速、🛜稳定不掉线 - 纯静态维护简单💴
</div>
</p>

## ✨ 项目介绍

**福利云API[freeapi]是一款基于Edgeone/CloudFlare Pages + Cloudflare Workers搭建的纯静态API，使用Edgeone/CloudFlare边缘加速，无需数据库**

## ⚙️ 工具特性

- 开源程序，个人免费使用，不断更新
- 纯静态，Edgeone/CloudFlare Pages托管，边缘加速
- Cloudflare Workers处理API项目，无需服务器，日请求量100,000
- 免费API统一维护更新，只需搭建前端代码即可
- 无数据库，统一使用json文件配置网站
- 接口文档返回实时示例

## ✨ 演示站点

访问 [在线演示](https://demo.fuli.pp.ua/) 快速体验。

## 📝 安装说明

Fork本项目，**Edgeone/CloudFlare Pages** 绑定Git仓库账号，导入仓库，部署，绑定自定义域名。

### Edgeone Pages 安装方法

登录 **腾讯云Edgeone** → 服务概览 → Pages → 创建项目 → 导入Git仓库

![](img/QYW8wq.png)

选择Git仓库并绑定账号

![](img/1Cb4Q8.png)

选择代码仓库

![](img/HM1a9G.png)

配置项目，点击开始部署，等待部署结束
> 注意，加速区域选择包含中国大陆，则绑定域名的时候需要绑定已备案的域名

![](img/V7be4z.png)

至此，部署完成

![](img/HGgC8H.png)

### CloudFlare Pages 安装方法

登录 **CloudFlare** → Workers & Pages → Creat

![](img/xhh9e3.png)

选择 Pages → Import an existing Git repository，点击右侧 Get started

![](img/GY10aB.png)

绑定Git仓库账号 → 选择代码仓库 → 点击 Begin setup

![](img/rhxwXl.png)

填写Project name → 点击底部 **Save and Deploy** 按钮

![](img/l9iPJS.png)

至此，部署完成

![](img/rztCbD.png)

## 配置信息

1. 网站信息修改 config/web_config.json
2. 友链信息修改 config/links.json
3. 赞赏信息修改 config/donate.json
4. API接口列表信息 data/apilist.json
5. API接口文档信息 data/对应接口ID.json
6. 导航菜单直接修改**nav.html**

## 🔎补充说明

1. 如修改网站信息无效，可**单独修改每个页面**的代码
2. **JS文件**尽量不要乱动，以免出现错误
3. **接口的Json文件**尽量不要修改，统一维护
4. **Json文件**如确实需修改，请严格按照原文件格式

## 📬聊天交流

欢迎加入 [QQ交流群](https://www.xwteam.cn/go/qqqun)，一起聊天，一起交流学习，一起吹水，备注：**API** 机器人自动审核，加群后记得及时验证，否则机器人会自动**踢出群聊**
