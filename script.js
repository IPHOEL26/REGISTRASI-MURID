// Tempel URL deployment Web App dari Code.gs di bawah ini.
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwPEtSmPfF6t-_atSrevfmSnie139fQXjNMcMG7pWmHYj4rFciuaXLTDtA_PWGHaRjO/exec";
const DRAFT_STORAGE_KEY = "REGISTRASI_MURID_DRAFT_V4";
const FRONTEND_VERSION = "2026.07.30-9";

const SERVICE_CONFIG = {
  PMB: { title: "Pendataan Murid Baru / Belum Terdata", value: "PENDAFTARAN MURID BARU", submit: "Kirim pendataan lengkap" },
  MUTASI_MASUK: { title: "Mutasi Masuk", value: "MUTASI MASUK", submit: "Kirim data mutasi masuk" },
  MUTASI_KELUAR: { title: "Mutasi Keluar", value: "MUTASI KELUAR", submit: "Kirim data mutasi keluar" },
  UPDATE: { title: "Pembaruan Data Tahunan", value: "PEMBARUAN TAHUNAN", submit: "Kirim pembaruan data" },
  UNLOCK_REQUEST: { title: "Permintaan Buka Rombel", value: "PERMINTAAN BUKA ROMBEL", submit: "Kirim permintaan ke operator" },
};

const OPTIONS = {
  education: [
    "Tidak sekolah", "Putus SD", "SD / sederajat", "SMP / sederajat", "SMA / sederajat",
    "D1", "D2", "D3", "D4 / S1 Terapan", "S1", "S2", "S2 Terapan", "S3", "S3 Terapan",
  ],
  job: [
    "Tidak bekerja", "Mengurus rumah tangga", "Nelayan", "Petani", "Peternak",
    "PNS/TNI/Polri", "Karyawan Swasta", "Pedagang Kecil", "Pedagang Besar", "Wiraswasta",
  ],
  income: [
    "Tidak Berpenghasilan", "Kurang dari Rp. 500,000", "Rp. 500,000 - Rp. 999,999",
    "Rp. 1,000,000 - Rp. 1,999,999", "Rp. 2,000,000 - Rp. 4,999,999",
    "Rp. 5,000,000 - Rp. 20,000,000", "Lebih dari Rp. 20,000,000",
    "< Rp1.000.000", "Rp1.000.001 - Rp3.000.000",
  ],
  rombel: [
    "Kelas 2", "Kelas 2-A", "Kelas 2-B", "Kelas 2-C", "Kelas 2-D", "Kelas 2-E",
    "Kelas 3", "Kelas 3-A", "Kelas 3-B", "Kelas 3-C", "Kelas 3-D", "Kelas 3-E",
    "Kelas 4", "Kelas 4-A", "Kelas 4-B", "Kelas 4-C", "Kelas 4-D", "Kelas 4-E",
    "Kelas 5", "Kelas 5-A", "Kelas 5-B", "Kelas 5-C", "Kelas 5-D", "Kelas 5-E",
    "Kelas 6", "Kelas 6-A", "Kelas 6-B", "Kelas 6-C", "Kelas 6-D", "Kelas 6-E",
  ],
  rombelAll: [
    "Kelas 1", "Kelas 1-A", "Kelas 1-B", "Kelas 1-C", "Kelas 1-D", "Kelas 1-E",
    "Kelas 2", "Kelas 2-A", "Kelas 2-B", "Kelas 2-C", "Kelas 2-D", "Kelas 2-E",
    "Kelas 3", "Kelas 3-A", "Kelas 3-B", "Kelas 3-C", "Kelas 3-D", "Kelas 3-E",
    "Kelas 4", "Kelas 4-A", "Kelas 4-B", "Kelas 4-C", "Kelas 4-D", "Kelas 4-E",
    "Kelas 5", "Kelas 5-A", "Kelas 5-B", "Kelas 5-C", "Kelas 5-D", "Kelas 5-E",
    "Kelas 6", "Kelas 6-A", "Kelas 6-B", "Kelas 6-C", "Kelas 6-D", "Kelas 6-E",
  ],
  hobby: [
    "Belanja", "Berkemah", "Berlari", "Bermain Biola", "Bermain Bola", "Bermain Bola Tenis",
    "Bermain Boneka", "Bermain Bulu Tangkis", "Bermain Gitar", "Bermain Musik", "Bermain Piano",
    "Berselancar", "Fitness", "Fotografi", "Jogging", "Kesenian", "Lainnya", "Main Puzzle",
    "Makan", "Memancing", "Membaca", "Mendaki", "Menggambar", "Menjahit", "Menulis",
    "Mewarnai", "Olah Raga", "Traveling",
  ],
  aspiration: [
    "Arsitek", "Astronot", "Atlet", "Atlet E-Sport Profesional", "Atlit Olahraga", "Bidan",
    "Content Creator", "Da'i / Ustadz", "Designer", "Dokter", "Entertainer / Pekerja Seni",
    "Guru/Dosen", "Koki", "Lainnya", "Masinis Kereta Api", "Pegawai Negeri Sipil / PNS",
    "Pelaut", "Pemadam Kebakaran", "Pembalap", "Pembawa Acara / Master Ceremony", "Pendeta",
    "Pengacara", "Penghafal Al-Qur'an", "Pengusaha / Bisnismen", "Penulis", "Penyiar Radio",
    "Perawat", "Perawat / Suster", "Pilot", "PNS", "Polisi", "Politikus", "Presiden",
    "Seni/Lukis/Artis/Sejenis", "TNI/Polri", "Translator", "Vloger", "Wartawan", "Wiraswasta",
  ],
};

const serviceScreen = document.getElementById("serviceScreen");
const contextScreen = document.getElementById("contextScreen");
const wizardScreen = document.getElementById("wizardScreen");
const mainChoices = document.getElementById("mainChoices");
const mutationChoices = document.getElementById("mutationChoices");
const form = document.getElementById("registrationForm");
const allSteps = Array.from(document.querySelectorAll(".form-step"));
const contextYear = document.getElementById("contextYear");
const contextSchool = document.getElementById("contextSchool");
const contextAccessWrap = document.getElementById("contextAccessWrap");
const contextAccessCode = document.getElementById("contextAccessCode");
const startFormBtn = document.getElementById("startFormBtn");
const formYear = document.getElementById("formYear");
const formSchool = document.getElementById("formSchool");
const formService = document.getElementById("formService");
const formAccessCode = document.getElementById("formAccessCode");
const requestToken = document.getElementById("requestToken");
const desktopStepper = document.getElementById("desktopStepper");
const mobileStepLabel = document.getElementById("mobileStepLabel");
const mobilePercent = document.getElementById("mobilePercent");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const reviewContent = document.getElementById("reviewContent");
const toast = document.getElementById("toast");
const resultModal = document.getElementById("resultModal");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const finishBtn = document.getElementById("finishBtn");
const registrationCategory = document.getElementById("registrationCategory");
const registrationRombel = document.getElementById("rombel");
const fullRegistrationAccessWrap = document.getElementById("fullRegistrationAccessWrap");
const fullRegistrationAccessCode = document.getElementById("fullRegistrationAccessCode");
const nisnStatusWrap = document.getElementById("nisnStatusWrap");
const nisnStatus = document.getElementById("nisnStatus");
const nisnInput = document.getElementById("nisn");
const nisnHelp = document.getElementById("nisnHelp");
const updateSearch = document.getElementById("updateSearch");
const updateStudentSelect = document.getElementById("updateStudentSelect");
const priorStudentId = document.getElementById("priorStudentId");
const rombelBaru = document.getElementById("rombelBaru");

let selectedService = "PMB";
let currentStep = 0;
let pendingToken = "";
let responseTimer = null;
let lastHandledToken = "";
let draftTimer = null;
let lastSubmissionSucceeded = false;
let isRestoringDraft = false;
let deferredDraft = null;
let priorStudents = [];

function populateOptionLists() {
  document.querySelectorAll("select[data-options]").forEach(select => {
    const values = OPTIONS[select.dataset.options] || [];
    select.innerHTML = '<option value="">Pilih</option>' + values.map(value => `<option>${value}</option>`).join("");
  });
}

function setSelectOptions(select, values, placeholder = "Pilih") {
  const previous = select.value;
  select.replaceChildren();
  const blank = document.createElement("option");
  blank.value = "";
  blank.textContent = placeholder;
  select.appendChild(blank);
  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  if (values.includes(previous)) select.value = previous;
}

function updateRegistrationRombels(preferredValue = "") {
  const category = registrationCategory.value;
  const oldStudent = category === "SISWA KELAS 2-6 BELUM TERDATA";
  let values = [];
  if (category === "MURID BARU KELAS 1") values = OPTIONS.rombelAll.filter(value => /^Kelas 1(?:-|$)/.test(value));
  if (oldStudent) values = OPTIONS.rombel;
  setSelectOptions(registrationRombel, values, category ? "Pilih rombel saat ini" : "Pilih kategori terlebih dahulu");
  registrationRombel.disabled = !values.length || selectedService !== "PMB";
  fullRegistrationAccessWrap.classList.toggle("is-hidden", !oldStudent);
  fullRegistrationAccessCode.disabled = selectedService !== "PMB" || !oldStudent;
  fullRegistrationAccessCode.dataset.required = oldStudent ? "true" : "false";
  if (!oldStudent) {
    fullRegistrationAccessCode.value = "";
    if (selectedService === "PMB") formAccessCode.value = "";
    clearFieldError(fullRegistrationAccessCode);
  }
  if (preferredValue && values.includes(preferredValue)) registrationRombel.value = preferredValue;
  updateRegistrationNisnState();
}

function updateRegistrationNisnState() {
  const isPmb = selectedService === "PMB";
  const category = registrationCategory.value;
  const upperGrade = isPmb && category === "SISWA KELAS 2-6 BELUM TERDATA";
  const newGradeOne = isPmb && category === "MURID BARU KELAS 1";

  nisnStatusWrap.classList.toggle("is-hidden", !upperGrade);
  nisnStatus.disabled = !upperGrade;
  nisnStatus.dataset.required = upperGrade ? "true" : "false";

  if (!upperGrade) {
    nisnStatus.value = "";
    nisnInput.disabled = !newGradeOne;
    nisnInput.dataset.required = newGradeOne ? "true" : "false";
    nisnInput.placeholder = "10 digit NISN";
    nisnHelp.textContent = newGradeOne
      ? "Masukkan 10 digit NISN yang sudah resmi terbit."
      : "Pilih kategori pendataan terlebih dahulu.";
    clearFieldError(nisnStatus);
    return;
  }

  const hasNisn = nisnStatus.value === "SUDAH MEMILIKI NISN";
  const noNisnYet = nisnStatus.value === "BELUM MEMILIKI NISN";
  nisnInput.disabled = !hasNisn;
  nisnInput.dataset.required = hasNisn ? "true" : "false";
  nisnInput.placeholder = hasNisn ? "10 digit NISN" : "Tidak perlu diisi";
  nisnHelp.textContent = hasNisn
    ? "Masukkan 10 digit NISN yang sudah resmi terbit."
    : noNisnYet
      ? "NISN belum terbit. Sistem akan memakai NIK 16 digit sebagai identitas sementara."
      : "Pilih status NISN terlebih dahulu.";
  if (noNisnYet) {
    nisnInput.value = "";
    clearFieldError(nisnInput);
  }
}

function requiresSchoolAccess(service = selectedService) {
  return service === "UPDATE" || service === "UNLOCK_REQUEST";
}

function setupYear() {
  const currentYear = new Date().getFullYear();
  contextYear.innerHTML = `<option value="${currentYear}">${currentYear}</option>`;
}

function showScreen(screen) {
  [serviceScreen, contextScreen, wizardScreen].forEach(item => item.classList.toggle("is-hidden", item !== screen));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message, type = "") {
  toast.textContent = message;
  toast.className = `toast show ${type}`.trim();
  window.setTimeout(() => { toast.className = "toast"; }, 3600);
}

function saveDraftImmediately() {
  if (isRestoringDraft || !formYear.value || !formSchool.value || !formService.value) return;
  const values = {};
  Array.from(form.elements).forEach(field => {
    if (!field.id) return;
    if (["formAccessCode", "fullRegistrationAccessCode"].includes(field.id)) return;
    values[field.id] = field.type === "checkbox" ? field.checked : field.value;
  });
  try {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
      version: 4,
      savedAt: Date.now(),
      selectedService,
      currentStep,
      year: formYear.value,
      school: formSchool.value,
      pendingToken,
      values,
    }));
  } catch (error) {
    // Form tetap dapat digunakan bila penyimpanan sementara dibatasi browser.
  }
}

function scheduleDraftSave() {
  window.clearTimeout(draftTimer);
  draftTimer = window.setTimeout(saveDraftImmediately, 250);
}

function clearDraft() {
  window.clearTimeout(draftTimer);
  try { sessionStorage.removeItem(DRAFT_STORAGE_KEY); } catch (error) { /* Abaikan. */ }
}

function restoreDraft() {
  let draft;
  try { draft = JSON.parse(sessionStorage.getItem(DRAFT_STORAGE_KEY) || "null"); }
  catch (error) { clearDraft(); return false; }
  if (!draft || draft.version !== 4 || !SERVICE_CONFIG[draft.selectedService] || !draft.school) return false;

  selectedService = draft.selectedService;
  contextYear.value = draft.year || contextYear.value;
  contextSchool.value = draft.school;
  deferredDraft = draft;
  updateAccessVisibility();
  showScreen(contextScreen);
  if (requiresSchoolAccess()) {
    showToast("Draf ditemukan. Masukkan kembali kode akses sekolah untuk melanjutkan.", "success");
  } else {
    startForm();
  }
  return true;
}

function applyDeferredDraft() {
  const draft = deferredDraft;
  if (!draft) return;
  isRestoringDraft = true;
  if (selectedService === "PMB") {
    registrationCategory.value = draft.values?.registrationCategory || "";
    updateRegistrationRombels(draft.values?.rombel || "");
  }
  if (selectedService === "UPDATE") {
    updateStudentSelect.value = draft.values?.updateStudentSelect || "";
    selectPriorStudent();
  }
  Object.entries(draft.values || {}).forEach(([id, value]) => {
    const field = document.getElementById(id);
    if (!field) return;
    if (field.type === "checkbox") field.checked = id === "confirmation" ? false : Boolean(value);
    else field.value = value;
  });
  if (selectedService === "PMB" && registrationCategory.value === "SISWA KELAS 2-6 BELUM TERDATA" && !nisnStatus.value) {
    nisnStatus.value = !nisnInput.value || /^0+$/.test(nisnInput.value)
      ? "BELUM MEMILIKI NISN"
      : "SUDAH MEMILIKI NISN";
  }
  updateRegistrationNisnState();
  pendingToken = draft.pendingToken || "";
  requestToken.value = pendingToken;
  applyConditionalRequirements();
  currentStep = Math.max(0, Math.min(Number(draft.currentStep) || 0, getActiveSteps().length - 1));
  updateStep();
  isRestoringDraft = false;
  deferredDraft = null;
  showToast("Draf sebelumnya dipulihkan. Silakan lanjutkan dari bagian terakhir.", "success");
}

function chooseService(service) {
  selectedService = service;
  currentStep = 0;
  clearAllErrors();
  updateAccessVisibility();
  showScreen(contextScreen);
}

function updateAccessVisibility() {
  const required = requiresSchoolAccess();
  contextAccessWrap.classList.toggle("is-hidden", !required);
  contextAccessCode.value = "";
}

function getActiveSteps() {
  return allSteps.filter(step => (step.dataset.services || "").split(",").includes(selectedService));
}

function setActiveControls() {
  const activeSteps = new Set(getActiveSteps());
  allSteps.forEach(step => {
    const active = activeSteps.has(step);
    step.querySelectorAll("input, select, textarea, button").forEach(control => {
      if (control.id === "confirmation") control.disabled = !active;
      else control.disabled = !active;
    });
  });
}

async function startForm() {
  const school = contextSchool.value.trim();
  if (!school) {
    const wrapper = contextSchool.closest(".field-block");
    wrapper.classList.add("has-error");
    wrapper.querySelector(".field-error").textContent = "Pilih nama sekolah untuk melanjutkan.";
    contextSchool.focus();
    return;
  }

  const accessCode = contextAccessCode.value.trim().toLocaleUpperCase("id-ID");
  if (requiresSchoolAccess() && !accessCode) {
    const wrapper = contextAccessCode.closest(".field-block");
    wrapper.classList.add("has-error");
    wrapper.querySelector(".field-error").textContent = "Masukkan kode akses sekolah dari operator.";
    contextAccessCode.focus();
    return;
  }

  if (!WEB_APP_URL || WEB_APP_URL.includes("PASTE_URL")) {
    showToast("URL Web App belum dipasang pada script.js.", "error");
    return;
  }

  startFormBtn.disabled = true;
  startFormBtn.textContent = selectedService === "UPDATE" ? "Memuat daftar siswa…" : "Memeriksa akses…";
  try {
    if (selectedService === "UPDATE") {
      const data = await requestJsonp("listStudents", {
        year: contextYear.value,
        school,
        accessCode,
      });
      if (data.status !== "success") throw new Error(data.message || "Daftar siswa belum dapat dimuat.");
      priorStudents = data.students || [];
      populatePriorStudentOptions();
      showToast(`${data.total} siswa kelas 1–5 tersedia. ${data.excludedGradeSix || 0} siswa kelas 6 tidak ditawarkan untuk kenaikan.`, "success");
    } else if (selectedService === "UNLOCK_REQUEST") {
      const data = await requestJsonp("validateAccess", {
        year: contextYear.value,
        school,
        accessCode,
      });
      if (data.status !== "success") throw new Error(data.message || "Kode akses belum dapat diperiksa.");
    }

    formYear.value = contextYear.value;
    formSchool.value = school;
    formService.value = SERVICE_CONFIG[selectedService].value;
    formAccessCode.value = requiresSchoolAccess() ? accessCode : "";
    document.getElementById("summaryYear").textContent = contextYear.value;
    document.getElementById("summarySchool").textContent = school;
    document.getElementById("wizardTitle").textContent = SERVICE_CONFIG[selectedService].title;
    submitBtn.textContent = SERVICE_CONFIG[selectedService].submit;
    setActiveControls();
    updateRegistrationRombels(registrationRombel.value);
    showScreen(wizardScreen);
    if (deferredDraft) applyDeferredDraft();
    else {
      currentStep = 0;
      updateStep();
      saveDraftImmediately();
    }
  } catch (error) {
    const wrapper = contextAccessCode.closest(".field-block");
    if (requiresSchoolAccess()) {
      wrapper.classList.add("has-error");
      wrapper.querySelector(".field-error").textContent = error.message || String(error);
    }
    showToast(error.message || String(error), "error");
  } finally {
    startFormBtn.disabled = false;
    startFormBtn.innerHTML = 'Lanjut mengisi data <span aria-hidden="true">→</span>';
  }
}

function requestJsonp(action, parameters) {
  return new Promise((resolve, reject) => {
    const callback = `__rmJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("Pusat data belum menjawab. Periksa internet lalu coba lagi."));
    }, 30000);
    const cleanup = () => {
      window.clearTimeout(timer);
      delete window[callback];
      script.remove();
    };
    window[callback] = data => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("Daftar siswa gagal dimuat. Pastikan deployment Apps Script sudah diperbarui."));
    };
    const query = new URLSearchParams({ action, callback, ...parameters });
    script.src = `${WEB_APP_URL}?${query.toString()}`;
    document.head.appendChild(script);
  });
}

function populatePriorStudentOptions(query = "") {
  const selectedId = updateStudentSelect.value;
  const keyword = query.trim().toLocaleUpperCase("id-ID");
  const matches = priorStudents.filter(student => !keyword || student.name.includes(keyword));
  updateStudentSelect.replaceChildren();
  const blank = document.createElement("option");
  blank.value = "";
  blank.textContent = matches.length ? `Pilih salah satu dari ${matches.length} siswa` : "Nama tidak ditemukan";
  updateStudentSelect.appendChild(blank);
  matches.forEach(student => {
    const option = document.createElement("option");
    option.value = student.id;
    const lock = student.assignedClass ? ` • sudah ${student.assignedClass}` : "";
    option.textContent = `${student.name} — ${student.previousClass} — NISN ${student.nisnMask}${lock}`;
    updateStudentSelect.appendChild(option);
  });
  if (matches.some(student => student.id === selectedId)) updateStudentSelect.value = selectedId;
}

function setKnownFieldValue(id, value) {
  const field = document.getElementById(id);
  if (!field || value === undefined || value === null || value === "") return;
  if (field instanceof HTMLSelectElement && !Array.from(field.options).some(option => option.value === String(value))) return;
  field.value = String(value);
}

function selectPriorStudent() {
  const student = priorStudents.find(item => item.id === updateStudentSelect.value);
  const status = document.getElementById("selectedStudentStatus");
  status.className = "";
  updateStudentSelect.dataset.invalidMessage = "";
  priorStudentId.value = student?.id || "";
  document.getElementById("selectedStudentName").textContent = student?.name || "Belum dipilih";
  document.getElementById("selectedStudentNisn").textContent = student?.nisnMask || "—";
  document.getElementById("selectedStudentPreviousClass").textContent = student?.previousClass || "—";
  document.getElementById("selectedStudentSourceYear").textContent = student?.sourceYear || "—";

  if (!student) {
    setSelectOptions(rombelBaru, [], "Pilih murid terlebih dahulu");
    status.textContent = "Pilih nama murid untuk melihat status penempatannya.";
    return;
  }
  if (student.needsFullRegistration) {
    setSelectOptions(rombelBaru, [], "Identitas lama belum lengkap");
    updateStudentSelect.dataset.invalidMessage = "NISN atau NIK murid ini belum lengkap. Gunakan tombol pendataan lengkap di bawah.";
    status.className = "error";
    status.textContent = updateStudentSelect.dataset.invalidMessage;
    return;
  }

  const choices = student.assignedClass ? [student.assignedClass] : student.allowedRombels;
  setSelectOptions(rombelBaru, choices, "Pilih rombel baru");
  if (student.assignedClass) {
    rombelBaru.value = student.assignedClass;
    status.className = "locked";
    status.textContent = `Murid ini sudah terkunci di ${student.assignedClass}. Data lain masih dapat diperbarui; untuk pindah kelas gunakan permintaan buka rombel.`;
  } else {
    status.textContent = `Murid belum ditempatkan. Pilihan rombel dibatasi satu tingkat di atas ${student.previousClass}.`;
  }
  document.getElementById("rombelRecommendation").textContent = student.assignedClass
    ? `Penempatan aktif: ${student.assignedClass}.`
    : `Rekomendasi berdasarkan rombel sebelumnya: ${student.previousClass}.`;

  const details = student.details || {};
  [
    ["hpUpdate", details.hp], ["kodePosUpdate", details.postalCode], ["alamatUpdate", details.address],
    ["kelurahanUpdate", details.village], ["kecamatanUpdate", details.district], ["transportUpdate", details.transport],
    ["beratUpdate", details.weight], ["tinggiUpdate", details.height], ["lingkarUpdate", details.headCircumference],
    ["saudaraUpdate", details.siblings], ["jarakUpdate", details.distance], ["lintangUpdate", details.latitude],
    ["bujurUpdate", details.longitude], ["pekerjaanAyahUpdate", details.fatherJob],
    ["penghasilanAyahUpdate", details.fatherIncome], ["pekerjaanIbuUpdate", details.motherJob],
    ["penghasilanIbuUpdate", details.motherIncome], ["kebutuhanUpdate", details.specialNeeds],
    ["hobiUpdate", details.hobby], ["citaCitaUpdate", details.aspiration],
  ].forEach(([id, value]) => setKnownFieldValue(id, value));
  clearFieldError(updateStudentSelect);
  scheduleDraftSave();
}

function switchToFullRegistration() {
  const secureAccessCode = formAccessCode.value;
  selectedService = "PMB";
  currentStep = 0;
  formService.value = SERVICE_CONFIG.PMB.value;
  document.getElementById("wizardTitle").textContent = SERVICE_CONFIG.PMB.title;
  submitBtn.textContent = SERVICE_CONFIG.PMB.submit;
  setActiveControls();
  registrationCategory.value = "SISWA KELAS 2-6 BELUM TERDATA";
  updateRegistrationRombels();
  fullRegistrationAccessCode.value = secureAccessCode;
  formAccessCode.value = secureAccessCode;
  updateStep();
  showToast("Silakan isi data lengkap siswa lama yang belum tersedia di daftar.", "success");
}

function updateStep() {
  const steps = getActiveSteps();
  currentStep = Math.max(0, Math.min(currentStep, steps.length - 1));
  allSteps.forEach(step => step.classList.remove("active"));
  steps[currentStep].classList.add("active");

  const percent = Math.round(((currentStep + 1) / steps.length) * 100);
  mobileStepLabel.textContent = `Langkah ${currentStep + 1} dari ${steps.length} · ${steps[currentStep].dataset.title}`;
  mobilePercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
  desktopStepper.innerHTML = steps.map((step, index) => {
    const state = index < currentStep ? "done" : index === currentStep ? "current" : "";
    return `<li class="${state}" data-number="${index + 1}">${step.dataset.title}</li>`;
  }).join("");

  prevBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.classList.toggle("is-hidden", currentStep === steps.length - 1);
  submitBtn.classList.toggle("is-hidden", currentStep !== steps.length - 1);
  if (currentStep === steps.length - 1) renderReview();
  scheduleDraftSave();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalizePhone(value) {
  let phone = String(value || "").replace(/[\s()-]/g, "");
  if (!phone) return "";
  if (phone.startsWith("+62")) return phone;
  if (phone.startsWith("62")) return `+${phone}`;
  if (/^\d/.test(phone) && !phone.startsWith("0")) return `0${phone}`;
  return phone;
}

function properCase(value) {
  return String(value || "").toLocaleLowerCase("id-ID").replace(/(^|[\s.'’-])\p{L}/gu, match => match.toLocaleUpperCase("id-ID"));
}

function maskDate(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
}

function isValidDateId(value) {
  const match = String(value || "").match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return false;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && year <= new Date().getFullYear();
}

function clearFieldError(field) {
  const wrapper = field.closest(".field-block") || field.closest(".confirm-line");
  if (wrapper) wrapper.classList.remove("has-error");
  const error = field.id === "confirmation"
    ? document.querySelector(".confirm-error")
    : field.closest(".field-block")?.querySelector(".field-error");
  if (error) error.textContent = "";
}

function setFieldError(field, message) {
  const wrapper = field.closest(".field-block") || field.closest(".confirm-line");
  if (wrapper) wrapper.classList.add("has-error");
  const error = field.id === "confirmation"
    ? document.querySelector(".confirm-error")
    : field.closest(".field-block")?.querySelector(".field-error");
  if (error) error.textContent = message;
}

function clearAllErrors() {
  document.querySelectorAll(".has-error").forEach(node => node.classList.remove("has-error"));
  document.querySelectorAll(".field-error").forEach(node => { node.textContent = ""; });
}

function validateField(field) {
  if (field.disabled || field.type === "hidden" || field.tagName === "BUTTON") return true;
  clearFieldError(field);
  const value = field.type === "checkbox" ? field.checked : field.value.trim();

  if (field.dataset.invalidMessage) {
    setFieldError(field, field.dataset.invalidMessage);
    return false;
  }

  if (field.dataset.required === "true" && !value) {
    setFieldError(field, "Lengkapi bagian ini agar dapat melanjutkan.");
    return false;
  }
  if (!value) return true;

  if (field.dataset.length && String(value).length !== Number(field.dataset.length)) {
    setFieldError(field, `Masukkan tepat ${field.dataset.length} digit.`);
    return false;
  }
  if (field.id === "nisn" && /^0+$/.test(String(value))) {
    setFieldError(field, "NISN tidak boleh diisi angka nol semua. Jika belum terbit, pilih Belum memiliki NISN.");
    return false;
  }
  if (field.classList.contains("date-id") && !isValidDateId(value)) {
    setFieldError(field, "Gunakan tanggal yang benar dengan format dd-mm-yyyy.");
    return false;
  }
  if (field.classList.contains("phone") && !/^(?:0|\+62)8\d{7,11}$/.test(value)) {
    setFieldError(field, "Nomor HP harus diawali 0 atau +62.");
    return false;
  }
  if (field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
    setFieldError(field, "Periksa kembali format alamat e-mail.");
    return false;
  }
  if (["ayahTahun", "ibuTahun", "waliTahun"].includes(field.id)) {
    const year = Number(value);
    if (year < 1900 || year > new Date().getFullYear()) {
      setFieldError(field, "Masukkan tahun lahir yang benar.");
      return false;
    }
  }
  if (field.classList.contains("decimal") && Number(value) <= 0) {
    setFieldError(field, "Masukkan angka lebih dari 0.");
    return false;
  }
  return true;
}

function applyConditionalRequirements() {
  const oldStudent = selectedService === "PMB" && registrationCategory.value === "SISWA KELAS 2-6 BELUM TERDATA";
  fullRegistrationAccessWrap.classList.toggle("is-hidden", !oldStudent);
  fullRegistrationAccessCode.disabled = !oldStudent;
  fullRegistrationAccessCode.dataset.required = oldStudent ? "true" : "false";
  if (oldStudent) formAccessCode.value = fullRegistrationAccessCode.value.trim().toLocaleUpperCase("id-ID");
  updateRegistrationNisnState();

  const asal = document.getElementById("asalPendidikan");
  const sekolahAsal = document.getElementById("sekolahAsal");
  if (!asal.disabled) sekolahAsal.dataset.required = asal.value === "TK/PAUD" ? "true" : "false";

  const penerimaKps = document.getElementById("penerimaKps");
  const noKps = document.getElementById("noKps");
  const noKpsWrap = document.getElementById("noKpsWrap");
  if (!penerimaKps.disabled) {
    const active = penerimaKps.value === "Ya";
    noKpsWrap.classList.toggle("is-hidden", !active);
    noKps.disabled = !active;
    noKps.dataset.required = active ? "true" : "false";
    if (!active) { noKps.value = ""; clearFieldError(noKps); }
  }

  const statusKeluar = document.getElementById("statusKeluar");
  const sekolahTujuan = document.getElementById("sekolahTujuan");
  if (!statusKeluar.disabled) sekolahTujuan.dataset.required = statusKeluar.value === "Mutasi" ? "true" : "false";
}

function validateStep(step) {
  applyConditionalRequirements();
  const fields = Array.from(step.querySelectorAll("input, select, textarea"));
  const results = fields.map(validateField);
  const valid = results.every(Boolean);
  if (!valid) {
    const firstError = step.querySelector(".has-error input, .has-error select, .has-error textarea");
    if (firstError) firstError.focus();
    showToast("Ada bagian yang belum benar. Periksa keterangan berwarna merah.", "error");
  }
  return valid;
}

function renderReview() {
  reviewContent.replaceChildren();
  const groups = [
    { title: "Layanan", names: ["Tahun Pendaftaran", "Nama Sekolah", "Jenis Layanan"] },
    { title: "Identitas utama", ids: ["nama", "nisnStatus", "nisn", "nik", "mutasiMasukNama", "mutasiMasukNisn", "mutasiMasukNik", "mutasiKeluarNama", "mutasiKeluarNisn", "mutasiKeluarNik", "updateStudentSelect", "requestTeacherName"] },
    { title: "Rangkuman data", allRemaining: true },
  ];
  const included = new Set();

  groups.forEach(groupConfig => {
    const group = document.createElement("div");
    group.className = "review-group";
    const heading = document.createElement("h3");
    heading.textContent = groupConfig.title;
    group.appendChild(heading);

    const candidates = Array.from(form.elements).filter(field => {
      if (!field.name || field.disabled || field.type === "hidden" && !["Tahun Pendaftaran", "Nama Sekolah", "Jenis Layanan"].includes(field.name)) return false;
      if (["Request Token", "Sumber Form"].includes(field.name) || field.type === "checkbox") return false;
      if (groupConfig.names) return groupConfig.names.includes(field.name);
      if (groupConfig.ids) return groupConfig.ids.includes(field.id);
      return groupConfig.allRemaining && !included.has(field);
    });

    candidates.forEach(field => {
      const value = field instanceof HTMLSelectElement
        ? field.selectedOptions[0]?.textContent?.trim()
        : field.value?.trim();
      if (!value) return;
      included.add(field);
      const row = document.createElement("div");
      row.className = "review-row";
      const label = document.createElement("span");
      const valueNode = document.createElement("span");
      label.textContent = document.querySelector(`label[for="${field.id}"]`)?.textContent || field.name;
      valueNode.textContent = value;
      row.append(label, valueNode);
      group.appendChild(row);
    });

    if (group.querySelector(".review-row")) reviewContent.appendChild(group);
  });
}

function createToken() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `RM-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function submitData() {
  const steps = getActiveSteps();
  for (let index = 0; index < steps.length; index += 1) {
    if (!validateStep(steps[index])) {
      currentStep = index;
      updateStep();
      window.setTimeout(() => validateStep(steps[index]), 80);
      return;
    }
  }
  if (!WEB_APP_URL || WEB_APP_URL.includes("PASTE_URL")) {
    showToast("URL Web App belum dipasang. Ikuti README_PANDUAN.txt terlebih dahulu.", "error");
    return;
  }

  pendingToken = pendingToken || createToken();
  lastHandledToken = "";
  requestToken.value = pendingToken;
  form.action = WEB_APP_URL;
  submitBtn.disabled = true;
  submitBtn.textContent = "Mengirim data…";
  showToast("Data sedang dikirim. Jangan tutup halaman ini.");
  saveDraftImmediately();

  window.clearTimeout(responseTimer);
  responseTimer = window.setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = SERVICE_CONFIG[selectedService].submit;
    showResult(false, `Pusat data belum menjawab dalam 60 detik. Draf tetap aman; silakan kirim kembali. Kode: TIMEOUT • Versi ${FRONTEND_VERSION}.`);
  }, 60000);

  HTMLFormElement.prototype.submit.call(form);
}

function showResult(success, message) {
  window.clearTimeout(responseTimer);
  lastSubmissionSucceeded = success;
  resultIcon.textContent = success ? "✓" : "!";
  resultIcon.classList.toggle("error", !success);
  resultTitle.textContent = success ? "Data berhasil dikirim" : "Data belum tersimpan";
  resultMessage.textContent = message || (success ? "Data telah masuk ke pusat data sekolah." : "Silakan periksa data dan coba lagi.");
  resultMessage.classList.toggle("error-message", !success);
  finishBtn.textContent = success ? "Selesai dan kembali ke awal" : "Kembali periksa data";
  if (success) clearDraft();
  resultModal.classList.add("show");
  resultModal.setAttribute("aria-hidden", "false");
}

function returnHome() {
  window.clearTimeout(responseTimer);
  pendingToken = "";
  lastSubmissionSucceeded = false;
  clearDraft();
  currentStep = 0;
  form.reset();
  setupYear();
  contextSchool.value = "";
  contextAccessCode.value = "";
  fullRegistrationAccessCode.value = "";
  contextAccessWrap.classList.add("is-hidden");
  priorStudents = [];
  deferredDraft = null;
  updateSearch.value = "";
  populatePriorStudentOptions();
  updateRegistrationRombels();
  mutationChoices.classList.add("is-hidden");
  mainChoices.classList.remove("is-hidden");
  resultModal.classList.remove("show");
  resultModal.setAttribute("aria-hidden", "true");
  submitBtn.disabled = false;
  clearAllErrors();
  showScreen(serviceScreen);
}

function closeResultAndResume() {
  resultModal.classList.remove("show");
  resultModal.setAttribute("aria-hidden", "true");
  submitBtn.disabled = false;
  submitBtn.textContent = SERVICE_CONFIG[selectedService].submit;
  renderReview();
  showToast("Semua isian tetap tersimpan. Periksa pesan kesalahan, lalu kirim kembali.");
}

function confirmDiscardAndReturnHome() {
  if (formYear.value && !window.confirm("Kembali ke halaman awal dan hapus draf isian ini?")) return;
  returnHome();
}

document.querySelectorAll("[data-service-choice]").forEach(button => {
  button.addEventListener("click", () => chooseService(button.dataset.serviceChoice));
});
document.getElementById("openMutationChoices").addEventListener("click", () => {
  mainChoices.classList.add("is-hidden");
  mutationChoices.classList.remove("is-hidden");
});
document.getElementById("backToServices").addEventListener("click", () => {
  mutationChoices.classList.add("is-hidden");
  mainChoices.classList.remove("is-hidden");
});
document.getElementById("backFromContext").addEventListener("click", () => showScreen(serviceScreen));
startFormBtn.addEventListener("click", startForm);
document.getElementById("changeServiceBtn").addEventListener("click", confirmDiscardAndReturnHome);
document.getElementById("brandHome").addEventListener("click", event => { event.preventDefault(); confirmDiscardAndReturnHome(); });
document.getElementById("finishBtn").addEventListener("click", () => {
  if (lastSubmissionSucceeded) returnHome();
  else closeResultAndResume();
});

prevBtn.addEventListener("click", () => { if (currentStep > 0) { currentStep -= 1; updateStep(); } });
nextBtn.addEventListener("click", () => {
  const steps = getActiveSteps();
  if (validateStep(steps[currentStep]) && currentStep < steps.length - 1) { currentStep += 1; updateStep(); }
});
submitBtn.addEventListener("click", submitData);
form.addEventListener("submit", event => { event.preventDefault(); submitData(); });

contextSchool.addEventListener("change", () => {
  const wrapper = contextSchool.closest(".field-block");
  wrapper.classList.remove("has-error");
  wrapper.querySelector(".field-error").textContent = "";
});
contextAccessCode.addEventListener("input", () => {
  contextAccessCode.value = contextAccessCode.value.toLocaleUpperCase("id-ID");
  const wrapper = contextAccessCode.closest(".field-block");
  wrapper.classList.remove("has-error");
  wrapper.querySelector(".field-error").textContent = "";
});
registrationCategory.addEventListener("change", () => updateRegistrationRombels());
nisnStatus.addEventListener("change", () => {
  updateRegistrationNisnState();
  clearFieldError(nisnStatus);
  scheduleDraftSave();
});
fullRegistrationAccessCode.addEventListener("input", () => {
  fullRegistrationAccessCode.value = fullRegistrationAccessCode.value.toLocaleUpperCase("id-ID");
  formAccessCode.value = fullRegistrationAccessCode.value;
  clearFieldError(fullRegistrationAccessCode);
});
updateSearch.addEventListener("input", () => populatePriorStudentOptions(updateSearch.value));
updateStudentSelect.addEventListener("change", selectPriorStudent);
document.getElementById("studentNotFoundBtn").addEventListener("click", switchToFullRegistration);
document.getElementById("asalPendidikan").addEventListener("change", applyConditionalRequirements);
document.getElementById("penerimaKps").addEventListener("change", applyConditionalRequirements);
document.getElementById("statusKeluar").addEventListener("change", applyConditionalRequirements);

document.addEventListener("input", event => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLTextAreaElement)) return;
  if (field.classList.contains("uppercase")) field.value = field.value.toLocaleUpperCase("id-ID");
  if (field.classList.contains("propercase")) field.value = properCase(field.value);
  if (field.classList.contains("digits")) field.value = field.value.replace(/\D/g, "");
  if (field.classList.contains("decimal")) field.value = field.value.replace(",", ".").replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
  if (field.classList.contains("date-id")) field.value = maskDate(field.value);
  clearFieldError(field);
  scheduleDraftSave();
});
document.addEventListener("change", event => {
  const field = event.target;
  if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) clearFieldError(field);
  scheduleDraftSave();
});
document.addEventListener("focusout", event => {
  const field = event.target;
  if (!(field instanceof HTMLInputElement) && !(field instanceof HTMLTextAreaElement)) return;
  if (field.classList.contains("propercase")) field.value = properCase(field.value.trim());
  if (field.classList.contains("phone")) field.value = normalizePhone(field.value);
  scheduleDraftSave();
});

function setupLocationButton(buttonId, latitudeId, longitudeId, statusId) {
  const button = document.getElementById(buttonId);
  const latitude = document.getElementById(latitudeId);
  const longitude = document.getElementById(longitudeId);
  const status = document.getElementById(statusId);
  button.addEventListener("click", () => {
    if (!navigator.geolocation) {
      status.textContent = "Ponsel atau browser ini tidak mendukung pengambilan lokasi.";
      return;
    }
    button.disabled = true;
    status.textContent = "Sedang mengambil lokasi…";
    navigator.geolocation.getCurrentPosition(position => {
      latitude.value = position.coords.latitude.toFixed(7);
      longitude.value = position.coords.longitude.toFixed(7);
      clearFieldError(latitude);
      clearFieldError(longitude);
      scheduleDraftSave();
      status.textContent = `Lokasi berhasil diambil (akurasi sekitar ${Math.round(position.coords.accuracy)} meter).`;
      button.disabled = false;
    }, error => {
      const messages = {
        1: "Izin lokasi ditolak. Aktifkan izin lokasi pada browser lalu coba lagi.",
        2: "Lokasi belum dapat ditemukan. Pastikan GPS aktif.",
        3: "Pengambilan lokasi terlalu lama. Silakan coba lagi.",
      };
      status.textContent = messages[error.code] || "Lokasi belum dapat diambil.";
      button.disabled = false;
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
  });
}

setupLocationButton("locationBtn", "lintang", "bujur", "locationStatus");
setupLocationButton("locationBtnMutasi", "lintangMutasi", "bujurMutasi", "locationStatusMutasi");
setupLocationButton("locationBtnUpdate", "lintangUpdate", "bujurUpdate", "locationStatusUpdate");

window.addEventListener("message", event => {
  let data = event.data;
  if (typeof data === "string") {
    try { data = JSON.parse(data); }
    catch (error) { return; }
  }
  if (!data || data.source !== "REGISTRASI_MURID" || data.token !== pendingToken) return;
  if (lastHandledToken === data.token) return;
  lastHandledToken = data.token;
  submitBtn.disabled = false;
  submitBtn.textContent = SERVICE_CONFIG[selectedService].submit;
  showResult(data.status === "success", data.message);
});

window.addEventListener("beforeunload", saveDraftImmediately);

populateOptionLists();
setupYear();
populatePriorStudentOptions();
updateRegistrationRombels();
applyConditionalRequirements();
if (!restoreDraft()) showScreen(serviceScreen);
