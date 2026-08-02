/* ============================================================
   约克顿语言服务 · 官网交互脚本
   Yokton Language Services — Main JS
   功能：导航栏滚动效果、移动端菜单、平滑滚动、
        滚动入场动画、数字滚动、表单验证
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. 当前年份 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. 导航栏滚动效果 ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add("header--scrolled");
    else header.classList.remove("header--scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 3. 移动端菜单 ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  function closeMenu() {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 点击菜单项后关闭
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    // 点击菜单外部关闭
    document.addEventListener("click", function (e) {
      if (!navMenu.classList.contains("is-open")) return;
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
    });
    // 按 Esc 关闭
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- 4. 滚动入场动画 + 数字滚动（IntersectionObserver） ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var countEls = document.querySelectorAll(".num[data-count]");

  // 缓动函数
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    // 年份等无需千分位分隔符的数值
    var format = el.hasAttribute("data-nocomma")
      ? function (v) { return String(v); }
      : function (v) { return v.toLocaleString(); };
    var duration = 1600;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value = Math.floor(easeOutCubic(progress) * target);
      el.innerHTML = format(value) + '<span class="suffix">' + suffix + "</span>";
      if (progress < 1) requestAnimationFrame(step);
      else el.innerHTML = format(target) + '<span class="suffix">' + suffix + "</span>";
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    // 入场动画
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    // 数字滚动（元素进入视口即触发，阈值低以确保可靠触发）
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    countEls.forEach(function (el) { countObserver.observe(el); });
  } else {
    // 降级：直接显示
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    countEls.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var suffix = el.getAttribute("data-suffix") || "";
      var txt = el.hasAttribute("data-nocomma") ? String(target) : target.toLocaleString();
      el.innerHTML = txt + '<span class="suffix">' + suffix + "</span>";
    });
  }

  /* ---------- 5. 表单验证 ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var successBox = document.getElementById("formSuccess");

    function setError(field, hasError) {
      var wrapper = field.closest(".field");
      if (wrapper) wrapper.classList.toggle("has-error", hasError);
    }

    function isEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    // 输入时清除错误状态
    form.querySelectorAll("input, textarea, select").forEach(function (el) {
      el.addEventListener("input", function () {
        var wrapper = el.closest(".field");
        if (wrapper) wrapper.classList.remove("has-error");
      });
      el.addEventListener("change", function () {
        var wrapper = el.closest(".field");
        if (wrapper) wrapper.classList.remove("has-error");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var service = form.querySelector("#service");
      var message = form.querySelector("#message");

      if (!name.value.trim()) { setError(name, true); valid = false; }
      if (!isEmail(email.value.trim())) { setError(email, true); valid = false; }
      if (!service.value) { setError(service, true); valid = false; }
      if (!message.value.trim()) { setError(message, true); valid = false; }

      if (!valid) {
        // 滚动到第一个错误字段
        var firstError = form.querySelector(".field.has-error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      // === 通过 FormSubmit 发送至 linda@yokton.cn（免费、无需后端） ===
      var errorBox = document.getElementById("formError");
      var submitBtn = form.querySelector('button[type="submit"]');
      var isEnglish = document.documentElement.lang.indexOf("en") === 0;
      var btnText = submitBtn ? submitBtn.textContent : "";

      var payload = {
        name: name.value.trim(),
        company: form.querySelector("#company").value.trim(),
        email: email.value.trim(),
        phone: form.querySelector("#phone").value.trim(),
        service: service.value,
        message: message.value.trim(),
        _subject: isEnglish
          ? "Website inquiry from " + name.value.trim()
          : "官网咨询 - " + name.value.trim(),
        _template: "table",
        _captcha: "false"
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = isEnglish ? "Sending…" : "提交中…";
      }
      if (errorBox) errorBox.classList.remove("is-visible");
      if (successBox) successBox.classList.remove("is-visible");

      fetch("https://formsubmit.co/ajax/linda@yokton.cn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function () {
          if (successBox) {
            successBox.classList.add("is-visible");
            successBox.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          form.reset();
          setTimeout(function () {
            if (successBox) successBox.classList.remove("is-visible");
          }, 8000);
        })
        .catch(function () {
          if (errorBox) {
            errorBox.classList.add("is-visible");
            errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = btnText;
          }
        });
    });
  }

})();
