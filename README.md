# 约克顿语言服务 · 官网 / Yokton Language Services Website

深圳市约克顿语言服务有限公司官方网站——国际语言翻译空间站。纯静态、零依赖、中英双语、响应式设计，内容取自公司真实资料。

> ✅ **内容说明**：网站内容已根据公司 PPT 资料填充真实信息（公司介绍、服务类型、行业领域、服务流程、企业文化、联系方式等）。
> 仅余少量信息需上线前补充，详见下方 [「上线前需补充清单」](#上线前需补充清单)。

---

## 📁 项目结构

```
yokton-website/
├── index.html          # 中文首页（默认入口）
├── en/
│   └── index.html      # 英文首页
├── css/
│   └── style.css       # 全部样式（主题变量 + 响应式 + 动画）
├── js/
│   └── main.js         # 全部交互（导航、滚动动画、数字滚动、表单验证）
└── README.md           # 本文件
```

**技术特点：**
- 纯 HTML / CSS / JS，**无任何外部依赖**（无 CDN、无框架、无外部字体）
- 图标全部使用内联 SVG，无图片资源
- 国内访问零阻塞，加载快，SEO 友好

---

## 🚀 本地预览

无需任何构建，用任意方式启动一个静态服务器即可：

```bash
# 方式 1：Python（macOS 自带）
cd yokton-website
python3 -m http.server 8000

# 方式 2：Node（需先安装 serve）
npx serve .

# 方式 3：直接双击 index.html 用浏览器打开（部分浏览器功能受限，建议用上两种）
```

然后访问 <http://localhost:8000>，英文版：<http://localhost:8000/en/>

---

## 🌐 部署上线

### 第一步：选择托管方式（任选其一）

| 方式 | 适用场景 | 费用 |
|------|----------|------|
| **对象存储 + CDN**（阿里云 OSS / 腾讯云 COS / 七牛云） | 静态网站首选，访问快、便宜 | 存储费约几元/月 |
| **云服务器 / 轻量服务器**（阿里云/腾讯云轻量） | 需要后端（如表单接收）时 | 约 30-60 元/月 |
| **GitHub Pages / Vercel / Netlify** | 海外/全球访问 | 免费 |

> 推荐国内客户为主 → **阿里云 OSS + CDN**，国内访问最快。

### 第二步：上传文件

把 `yokton-website/` 目录下的**全部内容**（index.html、en/、css/、js/）上传到托管服务。
注意：上传的是「目录内的内容」，不是目录本身——保证根目录直接能访问到 `index.html`。

### 第三步：配置 DNS（关键）

你当前的域名 `yokton.cn` 的 NS 服务器在 **ClouDNS**（`ns1.cloudns.net` / `ns2.cloudns.net`），
并且此前解析指向了「建站之星」平台（`pro136896.gd.websitecname.cn`）。**需要修改解析指向你新的托管地址。**

登录 ClouDNS 管理后台（<https://www.cloudns.net/>），把 `www` 和 `@` 记录改为：

**方式 A —— 用对象存储/CDN（推荐）**
```
类型    主机    值                                   TTL
CNAME   www     your-bucket.oss-cn-shenzhen.aliyuncs.com   （或 CDN 提供的 CNAME）
A       @       <你的服务器或 CDN 的 IP>
```

**方式 B —— 用云服务器（Nginx 托管静态文件）**
```
类型    主机    值                      TTL
A       www     <服务器公网 IP>         3600
A       @       <服务器公网 IP>         3600
```

> 💡 修改 DNS 后，全球生效通常需要几分钟到 48 小时（多数情况 10 分钟内）。
> 可用 `dig www.yokton.cn` 或 <https://dnschecker.org/> 检查生效情况。

### 第四步：配置 HTTPS（强烈推荐）

**A. 对象存储 / CDN 方案：** 在云控制台一键开启，通常可免费申请证书并自动绑定域名。

**B. 云服务器方案（Nginx + Let's Encrypt 免费证书）：**
```bash
# 安装 certbot（以 Ubuntu/Debian 为例）
sudo apt install certbot python3-certbot-nginx

# 自动申请并配置证书
sudo certbot --nginx -d www.yokton.cn -d yokton.cn
```
证书 90 天到期，certbot 会自动续期。

---

## ✏️ 上线前需补充清单

网站主体内容已使用公司真实资料，仅以下少量信息需上线前补充：

| 待补充内容 | 位置 | 当前占位 | 替换为 |
|----------|------|----------|--------|
| 📋 ICP 备案号 | 页脚底部 | （国内服务器必须备案） | 真实备案号，如「粤ICP备2026XXXXXX号」 |
| 📍 详细办公地址 | 联系区 | 「广东省深圳市（详细地址请来电咨询）」 | 如有需要可补具体门牌地址 |
| 🖼️ 公司 Logo 图片 | 导航栏 / 页脚 | 当前为文字「Y」Logo | 如有矢量 Logo 可替换 `.brand-mark` 为 `<img>` |

**已填入的真实信息**（来自公司 PPT 资料）：
- ✅ 公司全称：深圳市约克顿语言服务有限公司 / Shenzhen Yokton Language Services Co., Ltd.
- ✅ 邮箱：linda@yokton.cn
- ✅ 电话/微信：(+86) 15820793871
- ✅ 官网：www.yokton.cn
- ✅ 成立年份：2016 年
- ✅ 服务语种：80+ 语种
- ✅ 客户满意率：98%+
- ✅ 企业文化（理念/宗旨/使命）、服务类型、行业领域、服务流程等

**表单功能**：当前表单是纯前端演示（提交后只显示成功提示，不发送邮件）。
要真正接收客户咨询，二选一：
1. **无后端方案**：接入 [Formspree](https://formspree.io/)、[FormSubmit](https://formsubmit.co/) 等服务，把表单 `action` 指向它们提供的地址，并配置转发到 `linda@yokton.cn`。
2. **自建后端**：在云服务器上写一个接口接收表单数据并发邮件。

---

## 🎨 自定义指南

| 想改什么 | 改哪里 |
|----------|--------|
| 主色调（深蓝/约克顿绿） | `css/style.css` 顶部的 `:root` 变量（`--navy-700` 深蓝、`--cyan-500` 绿色等） |
| Logo 字母「Y」 | HTML 中 `.brand-mark` 文本 + `<link rel="icon">` 里的 SVG |
| 服务 / 行业内容 | `index.html` 对应 `<section>` |
| 文案翻译 | `en/index.html` |

### 品牌配色（取自公司 PPT 主题色）
- **主色 深蓝** `#003366`（`--navy-700`）：体现专业、稳重、国际化
- **点缀色 约克顿绿** `#00B050`（`--cyan-500`）：取自 PPT，象征活力与沟通

---

## 📄 License

© 深圳约克顿语言服务有限公司. 本网站代码供该公司使用。
