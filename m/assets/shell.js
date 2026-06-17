/* 移动端共享外壳：Tailwind 配置 + 顶栏/底部行动条/抽屉/拨号弹层 注入 + 通用渲染 */
(function () {
  /* ---------- 1) Tailwind 配置（须在 CDN 处理 DOM 前就绪） ---------- */
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: "#006b32",
          "primary-container": "#008740",
          "primary-fixed-dim": "#5adf82",
          "on-primary": "#ffffff",
          secondary: "#096969",
          "secondary-container": "#a2f0ef",
          "on-secondary-container": "#166f6f",
          tertiary: "#465d81",
          surface: "#f8f9fa",
          "surface-low": "#f3f4f5",
          "surface-c": "#edeeef",
          "surface-high": "#e7e8e9",
          "surface-highest": "#e1e3e4",
          white2: "#ffffff",
          "on-surface": "#191c1d",
          "on-surface-variant": "#3d4a3e",
          "outline-variant": "#bccabb",
        },
        fontFamily: {
          display: ["Manrope", "Noto Sans SC", "sans-serif"],
          body: ["Noto Sans SC", "Manrope", "sans-serif"],
        },
        borderRadius: { xl2: "1.25rem", xl3: "1.5rem" },
      },
    },
  };

  /* ---------- 2) 站点数据 ---------- */
  var NAV = [
    { key: "home", label: "首页", icon: "home", href: "index.html" },
    { key: "about", label: "医院概况", icon: "apartment", href: "about.html" },
    { key: "services", label: "医疗服务", icon: "medical_services", href: "services.html" },
    { key: "team", label: "专家团队", icon: "stethoscope", href: "team.html" },
    { key: "guide", label: "就诊指南", icon: "event_note", href: "guide.html" },
    { key: "news", label: "最新消息", icon: "campaign", href: "news.html" },
    { key: "contact", label: "联系我们", icon: "call", href: "contact.html" },
  ];
  var CAMPUS = [
    { name: "滨江院区", tag: "综合诊疗 / 疑难会诊", tel: "057186873458", show: "0571-86873458" },
    { name: "朝晖院区", tag: "24 小时全科诊疗", tel: "057188806817", show: "0571-88806817" },
    { name: "城西院区", tag: "骨科特色 / 物理康复", tel: "057187651915", show: "0571-87651915" },
  ];
  window.MOBILE_CAMPUS = CAMPUS;

  /* ---------- 3) 外壳片段 ---------- */
  function headerHTML() {
    return '' +
      '<header class="sticky top-0 z-40 bg-surface/85 backdrop-blur-md">' +
        '<div class="flex items-center justify-between h-14 px-5">' +
          '<a href="index.html" class="font-display font-extrabold tracking-tight text-[16px]">浙江张旭动物医院</a>' +
          '<button id="menuBtn" aria-label="打开菜单" class="flex items-center gap-1 h-9 pl-3 pr-3.5 -mr-1 rounded-full bg-surface-low active:bg-surface-high transition-colors">' +
            '<span class="material-symbols-outlined" style="font-size:20px">menu</span>' +
            '<span class="text-[13px] font-medium">菜单</span>' +
          '</button>' +
        '</div>' +
      '</header>';
  }

  function bottomBarHTML() {
    return '' +
      '<div class="fixed bottom-0 inset-x-0 z-40 px-4 pt-3 bg-surface/85 backdrop-blur-md" style="padding-bottom: calc(0.75rem + var(--safe-b));">' +
        '<div class="flex gap-3">' +
          '<button data-open-call class="flex-1 grid place-items-center h-12 rounded-2xl bg-primary text-on-primary font-display font-bold text-[15px] ambient-sm active:bg-primary-container transition-colors">' +
            '<span class="flex items-center gap-2"><span class="material-symbols-outlined" style="font-size:20px">call</span>电话预约</span>' +
          '</button>' +
          '<a href="contact.html" class="grid place-items-center h-12 px-6 rounded-2xl bg-surface-high text-on-surface font-display font-bold text-[15px] active:bg-surface-highest transition-colors">找分院</a>' +
        '</div>' +
      '</div>';
  }

  function drawerHTML(active) {
    var links = NAV.map(function (n) {
      var on = n.key === active;
      return '<a href="' + n.href + '" class="flex items-center gap-3 px-4 py-3.5 rounded-xl ' + (on ? "bg-surface-low" : "active:bg-surface-low") + '">' +
        '<span class="material-symbols-outlined ' + (on ? "text-primary" : "text-secondary") + '">' + n.icon + '</span>' +
        '<span class="text-[15px] ' + (on ? "font-bold text-primary" : "font-medium") + '">' + n.label + '</span>' +
        '</a>';
    }).join("");
    return '' +
      '<div id="drawer" class="fixed inset-0 z-50 invisible">' +
        '<div data-close-drawer class="sheet-mask absolute inset-0 bg-on-surface/40 opacity-0"></div>' +
        '<nav class="drawer-panel absolute top-0 right-0 h-full w-[78%] max-w-xs bg-surface translate-x-full flex flex-col">' +
          '<div class="flex items-center justify-between h-14 px-5">' +
            '<span class="font-display font-extrabold tracking-tight">菜单</span>' +
            '<button data-close-drawer aria-label="关闭菜单" class="grid place-items-center w-10 h-10 -mr-2 rounded-full active:bg-surface-high"><span class="material-symbols-outlined">close</span></button>' +
          '</div>' +
          '<div class="px-3 py-2 flex flex-col">' + links + '</div>' +
        '</nav>' +
      '</div>';
  }

  function callSheetHTML() {
    var rows = CAMPUS.map(function (c) {
      return '<a href="tel:' + c.tel + '" class="flex items-center justify-between px-4 py-3.5 rounded-2xl bg-surface-low active:bg-surface-c">' +
        '<div><div class="font-bold text-[15px]">' + c.name + '</div>' +
        '<div class="text-[12px] text-on-surface-variant mt-0.5">' + c.tag + '</div></div>' +
        '<div class="flex items-center gap-1.5 text-primary font-display font-bold text-[14px]">' +
        '<span class="material-symbols-outlined" style="font-size:18px">call</span>' + c.show + '</div></a>';
    }).join("");
    return '' +
      '<div id="callSheet" class="fixed inset-0 z-50 invisible">' +
        '<div data-close-call class="sheet-mask absolute inset-0 bg-on-surface/40 opacity-0"></div>' +
        '<div class="sheet-panel absolute bottom-0 inset-x-0 bg-surface rounded-t-xl3 translate-y-full pb-[calc(1.25rem+var(--safe-b))]">' +
          '<div class="flex justify-center pt-3 pb-1"><span class="w-10 h-1 rounded-full bg-surface-highest"></span></div>' +
          '<div class="px-5 pt-2 pb-1"><h3 class="font-display font-extrabold text-[17px]">电话预约</h3>' +
          '<p class="text-[12.5px] text-on-surface-variant mt-1">选择就近院区，点击即可拨号</p></div>' +
          '<div class="px-4 pt-3 space-y-2">' + rows + '</div>' +
        '</div>' +
      '</div>';
  }

  /* ---------- 4) 通用：医生详情渲染（doctor 页用） ---------- */
  window.renderDoctorDetail = function (containerId, slug) {
    var box = document.getElementById(containerId);
    if (!box) return;
    var map = window.DOCTOR_MAP || {};
    var d = map[slug];
    if (!d) {
      box.innerHTML = '<div class="px-5 py-16 text-center text-on-surface-variant">' +
        '<p class="text-[15px]">未找到该医生信息</p>' +
        '<a href="team.html" class="inline-block mt-4 text-primary font-semibold text-[14px]">返回专家团队 →</a></div>';
      return;
    }
    function list(arr) {
      return '<ul class="dot-list space-y-2.5 text-[13.5px] leading-relaxed text-on-surface-variant">' +
        (arr || []).map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
    }
    var badges = (d.badges || []).map(function (b) {
      return '<span class="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-medium">' + b + "</span>";
    }).join("");
    box.innerHTML = '' +
      '<section class="px-5 pt-4">' +
        '<a href="team.html" class="inline-flex items-center gap-1 text-[13px] text-on-surface-variant"><span class="material-symbols-outlined" style="font-size:18px">arrow_back</span>专家团队</a>' +
        '<div class="mt-4 rounded-xl3 overflow-hidden bg-surface-high ambient">' +
          '<img src="../' + d.portrait + '" alt="' + d.name + '" class="w-full h-72 object-cover"/>' +
        '</div>' +
        '<div class="mt-5">' +
          '<div class="text-[11px] font-display font-bold tracking-wider text-secondary uppercase">' + (d.label || "") + '</div>' +
          '<h1 class="font-display font-extrabold text-[1.7rem] tracking-tight mt-1">' + d.name +
            '<span class="text-[14px] font-medium text-on-surface-variant ml-2">' + (d.role || "") + "</span></h1>" +
          '<div class="text-[13px] text-secondary mt-2 flex items-center gap-1"><span class="material-symbols-outlined" style="font-size:16px">location_on</span>' + (d.campus || "") + "</div>" +
          '<div class="flex flex-wrap gap-2 mt-4">' + badges + "</div>" +
        "</div>" +
      "</section>" +
      '<section class="px-5 mt-7"><div class="rounded-2xl bg-surface-low p-5">' +
        '<h2 class="font-display font-bold text-[15px] mb-2">专业简介</h2>' +
        '<p class="text-[13.5px] leading-[1.8] text-on-surface-variant">' + (d.summary || "") + "</p></div></section>" +
      '<section class="px-5 mt-5"><h2 class="font-display font-bold text-[15px] mb-3 flex items-center gap-2"><span class="w-1.5 h-5 bg-primary rounded-full"></span>专业履历</h2>' + list(d.experience) + "</section>" +
      '<section class="px-5 mt-7"><h2 class="font-display font-bold text-[15px] mb-3 flex items-center gap-2"><span class="w-1.5 h-5 bg-primary rounded-full"></span>专长方向</h2>' + list(d.focus) + "</section>";
    document.title = d.name + " " + (d.role || "") + " · 浙江张旭动物医院";
  };

  /* ---------- 5) 开关逻辑 ---------- */
  function opener(rootId) {
    var root = document.getElementById(rootId);
    if (!root) return { open: function () {}, close: function () {} };
    var mask = root.querySelector(".sheet-mask");
    var panel = root.querySelector(".drawer-panel, .sheet-panel");
    var openCls = rootId === "drawer" ? "translate-x-full" : "translate-y-full";
    return {
      open: function () {
        root.classList.remove("invisible");
        requestAnimationFrame(function () {
          mask.classList.add("opacity-100"); mask.classList.remove("opacity-0");
          panel.classList.remove(openCls);
        });
        document.body.style.overflow = "hidden";
      },
      close: function () {
        mask.classList.remove("opacity-100"); mask.classList.add("opacity-0");
        panel.classList.add(openCls);
        document.body.style.overflow = "";
        setTimeout(function () { root.classList.add("invisible"); }, 320);
      },
    };
  }

  /* ---------- 6) 注入 + 接线 ---------- */
  function init() {
    var active = document.body.getAttribute("data-page") || "";
    document.body.insertAdjacentHTML("afterbegin", headerHTML());
    document.body.insertAdjacentHTML("beforeend", bottomBarHTML() + drawerHTML(active) + callSheetHTML());

    var drawer = opener("drawer");
    var callSheet = opener("callSheet");
    var menuBtn = document.getElementById("menuBtn");
    if (menuBtn) menuBtn.addEventListener("click", drawer.open);
    document.querySelectorAll("[data-close-drawer]").forEach(function (el) { el.addEventListener("click", drawer.close); });
    document.querySelectorAll("[data-open-call]").forEach(function (el) { el.addEventListener("click", callSheet.open); });
    document.querySelectorAll("[data-close-call]").forEach(function (el) { el.addEventListener("click", callSheet.close); });
    document.querySelectorAll("[data-desktop]").forEach(function (el) {
      el.addEventListener("click", function () { try { sessionStorage.setItem("preferDesktop", "1"); } catch (e) {} });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
