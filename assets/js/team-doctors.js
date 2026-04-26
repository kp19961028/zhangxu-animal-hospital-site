(() => {
  const doctors = window.DOCTOR_PROFILES || [];
  const chief = doctors.find((doctor) => doctor.slug === "zhang-xu");
  const specialists = doctors.filter((doctor) => doctor.slug !== "zhang-xu");
  const chiefContainer = document.getElementById("chief-doctor");
  const grid = document.getElementById("doctors-grid");

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderBadges(badges, className) {
    return (badges || [])
      .map((badge) => `<span class="${className}">${escapeHtml(badge)}</span>`)
      .join("");
  }

  function campusData(doctor) {
    return (doctor.campuses || [doctor.campusKey]).filter(Boolean).join(" ");
  }

  function renderPortrait(doctor) {
    if (doctor.portrait) {
      return `<img alt="${escapeHtml(doctor.name)}医生" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" src="${escapeHtml(doctor.portrait)}"/>`;
    }

    return `
      <div class="w-full h-full bg-surface-container-high flex flex-col items-center justify-center px-6 text-center">
        <span class="text-5xl font-black text-primary mb-3">${escapeHtml(doctor.name.slice(0, 1))}</span>
        <span class="text-xl font-extrabold text-on-surface mb-2">${escapeHtml(doctor.name)}</span>
        <span class="text-xs font-bold text-on-surface-variant">${escapeHtml(doctor.role)}</span>
      </div>`;
  }

  if (chief && chiefContainer) {
    chiefContainer.innerHTML = `
      <div class="mb-16 doctor-card" data-always-show="true" data-campuses="${escapeHtml(campusData(chief))}">
        <div class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col lg:flex-row ring-1 ring-outline-variant/10">
          <div class="lg:w-2/5 relative h-[400px] lg:h-auto overflow-hidden bg-surface-container-high">
            <img alt="${escapeHtml(chief.name)}院长" class="w-full h-full object-contain transition-all duration-700" src="${escapeHtml(chief.portrait)}"/>
            <div class="absolute top-6 left-6">
              <span class="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-xs font-black tracking-tighter shadow-xl">${escapeHtml(chief.label)}</span>
            </div>
          </div>
          <div class="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <div class="mb-8">
              <h2 class="text-4xl font-extrabold text-on-surface mb-2">${escapeHtml(chief.name)}</h2>
              <p class="text-primary font-bold text-lg mb-4">${escapeHtml(chief.role)} / 首席专家</p>
              <div class="flex gap-2 mb-6 flex-wrap">
                ${renderBadges(["疑难杂症专家", "全院区会诊", "朝晖院区", "城西院区", "滨江院区"], "bg-surface-container text-on-surface-variant text-[10px] font-bold px-3 py-1 rounded uppercase")}
              </div>
              <p class="text-on-surface-variant leading-relaxed text-lg italic border-l-2 border-primary/30 pl-6 mb-8">
                “每一个生命都值得被全力以赴。精湛技术是基础，医者的责任感才是通往治愈的唯一路径。”
              </p>
            </div>
            <div class="flex flex-wrap gap-4">
              <a class="bg-primary text-on-primary px-4 md:px-8 py-3 rounded-lg font-bold text-sm hover:bg-primary-container transition-all flex items-center gap-2" href="doctor-profile.html?doctor=${escapeHtml(chief.slug)}">
                查看详细简历 <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a class="bg-secondary-container text-on-secondary-container px-4 md:px-8 py-3 rounded-lg font-bold text-sm flex items-center gap-2" href="contact.html">
                <span class="material-symbols-outlined text-sm">call</span> 拨打院区电话
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  if (grid) {
    grid.innerHTML = specialists
      .map((doctor) => `
        <div class="doctor-card bg-surface-container-low rounded-xl p-8 hover:bg-surface-container-lowest transition-all duration-300 group ring-1 ring-outline-variant/5" data-campuses="${escapeHtml(campusData(doctor))}">
          <div class="aspect-[4/5] rounded-lg overflow-hidden mb-8 relative bg-surface-container-high">
            ${renderPortrait(doctor)}
            <div class="absolute bottom-4 left-4">
              <span class="bg-white/90 backdrop-blur text-primary text-[10px] font-black px-3 py-1 rounded shadow-sm">${escapeHtml(doctor.label)}</span>
            </div>
          </div>
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-on-surface mb-1">${escapeHtml(doctor.name)}</h3>
            <p class="text-secondary font-semibold text-sm mb-4">${escapeHtml(doctor.role)}</p>
            <div class="flex gap-2 mb-4 flex-wrap">
              ${renderBadges([doctor.campus, ...(doctor.badges || []).filter((badge) => badge !== doctor.campus).slice(0, 1)], "bg-white text-on-surface-variant text-[10px] font-medium px-2 py-0.5 rounded ring-1 ring-outline-variant/10")}
            </div>
            <p class="text-on-surface-variant text-sm line-clamp-2">${escapeHtml(doctor.cardSummary)}</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <a class="bg-primary text-on-primary py-2 rounded-lg text-xs font-bold transition-all hover:bg-primary-container text-center" href="doctor-profile.html?doctor=${escapeHtml(doctor.slug)}">简历</a>
            <a class="bg-secondary-container/50 text-on-secondary-container py-2 rounded-lg text-xs font-bold transition-all hover:bg-secondary-container text-center" href="contact.html">致电</a>
          </div>
        </div>`)
      .join("");
  }
})();
