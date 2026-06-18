const phrases = [
  {
    text: "Splash splash.",
    meaning: "玩水时说两遍，配合轻轻拍水的动作。",
  },
  {
    text: "Wash your hands.",
    meaning: "洗手时说，动作比解释更重要。",
  },
  {
    text: "Where is your duck?",
    meaning: "指向小鸭子，停顿一下等宝宝看过去。",
  },
  {
    text: "Bath time is over.",
    meaning: "洗澡结束时固定说，帮助建立日常信号。",
  },
];

const storageKeys = {
  phraseIndex: "hellolili-mobile-phrase-index",
  responses: "hellolili-mobile-responses",
  done: "hellolili-mobile-done",
  voice: "hellolili-mobile-voice",
  rate: "hellolili-mobile-rate",
  bedtime: "hellolili-mobile-bedtime",
};

// UI 元素声明
const currentPhrase = document.querySelector("#currentPhrase");
const currentMeaning = document.querySelector("#currentMeaning");
const speakCurrent = document.querySelector("#speakCurrent");
const nextPhrase = document.querySelector("#nextPhrase");
const finishButton = document.querySelector("#finishButton");
const responseButtons = document.querySelectorAll("[data-response]");
const voicePanelButton = document.querySelector("#voicePanelButton");
const voicePanel = document.querySelector("#voicePanel");
const voiceSelect = document.querySelector("#voiceSelect");
const rateButtons = document.querySelectorAll("[data-rate]");
const allPhrasesButton = document.querySelector("#allPhrasesButton");
const phraseDrawer = document.querySelector("#phraseDrawer");
const phraseList = document.querySelector("#phraseList");

// 新增 UI 元素（进度条、睡睡模式、底栏面板）
const progressFill = document.querySelector("#progressFill");
const progressVal = document.querySelector("#progressVal");
const bedtimeButton = document.querySelector("#bedtimeButton");
const sheetOverlay = document.querySelector("#sheetOverlay");
const sheetCloseButton = document.querySelector("#sheetCloseButton");

let voices = [];
let phraseIndex = Number(localStorage.getItem(storageKeys.phraseIndex) || 0);
let selectedRate = Number(localStorage.getItem(storageKeys.rate) || 0.72);

// 索引范围纠正
const normalizeIndex = () => {
  if (Number.isNaN(phraseIndex) || phraseIndex < 0 || phraseIndex >= phrases.length) {
    phraseIndex = 0;
  }
};

// 渲染今日卡片内容
const renderCurrentPhrase = () => {
  normalizeIndex();
  const phrase = phrases[phraseIndex];
  currentPhrase.textContent = phrase.text;
  currentMeaning.textContent = phrase.meaning;
  localStorage.setItem(storageKeys.phraseIndex, String(phraseIndex));
};

// 获取首选发音音色
const getPreferredVoice = () => {
  const savedVoice = localStorage.getItem(storageKeys.voice);
  const exactVoice = voices.find((v) => v.name === savedVoice);
  if (exactVoice) return exactVoice;
  return (
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null
  );
};

// TTS 播音逻辑
const speak = (text) => {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getPreferredVoice();
  utterance.lang = voice?.lang || "en-US";
  utterance.voice = voice;
  utterance.rate = selectedRate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};

// 读取系统/浏览器 TTS 音色源
const loadVoices = () => {
  if (!("speechSynthesis" in window)) {
    voiceSelect.innerHTML = "<option>当前浏览器不支持 TTS</option>";
    voiceSelect.disabled = true;
    return;
  }

  voices = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith("en"))
    .sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));

  voiceSelect.innerHTML = "";

  if (!voices.length) {
    voiceSelect.innerHTML = "<option>没有找到英文音色</option>";
    return;
  }

  const savedVoice = localStorage.getItem(storageKeys.voice);
  voices.forEach((v) => {
    const option = document.createElement("option");
    option.value = v.name;
    option.textContent = `${v.name} · ${v.lang}`;
    option.selected = savedVoice ? v.name === savedVoice : v === getPreferredVoice();
    voiceSelect.append(option);
  });
};

const renderRate = () => {
  rateButtons.forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.rate) === selectedRate);
  });
};

// 进度条渲染更新
const renderProgress = (isFinished) => {
  if (isFinished) {
    progressFill.style.width = "100%";
    progressVal.textContent = "100% (MAX)";
  } else {
    progressFill.style.width = "45%";
    progressVal.textContent = "45%";
  }
};

// 渲染更多短句可选列表
const renderPhrases = () => {
  phraseList.innerHTML = "";
  phrases.forEach((phrase, index) => {
    const item = document.createElement("div");
    item.className = "phrase-item";

    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = phrase.text;
    const meaning = document.createElement("span");
    meaning.textContent = phrase.meaning;
    copy.append(title, meaning);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `选择并播放 ${phrase.text}`);
    btn.innerHTML = '<svg><use href="#icon-volume"></use></svg>';
    btn.addEventListener("click", () => {
      phraseIndex = index;
      renderCurrentPhrase();
      speak(phrase.text);
    });

    item.append(copy, btn);
    phraseList.append(item);
  });
};

// --- Bottom Sheet 底栏面板交互逻辑 ---
const openBottomSheet = () => {
  voicePanel.hidden = false;
  sheetOverlay.hidden = false;
  voicePanel.setAttribute("aria-hidden", "false");
  voicePanelButton.setAttribute("aria-expanded", "true");
  voicePanel.focus();
};

const closeBottomSheet = () => {
  voicePanel.hidden = true;
  sheetOverlay.hidden = true;
  voicePanel.setAttribute("aria-hidden", "true");
  voicePanelButton.setAttribute("aria-expanded", "false");
};

voicePanelButton.addEventListener("click", openBottomSheet);
sheetCloseButton.addEventListener("click", closeBottomSheet);
sheetOverlay.addEventListener("click", closeBottomSheet);

// 发音音色及语速持久化
voiceSelect.addEventListener("change", () => {
  localStorage.setItem(storageKeys.voice, voiceSelect.value);
  speak(currentPhrase.textContent);
});

rateButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedRate = Number(btn.dataset.rate);
    localStorage.setItem(storageKeys.rate, String(selectedRate));
    renderRate();
    speak(currentPhrase.textContent);
  });
});

speakCurrent.addEventListener("click", () => {
  speak(currentPhrase.textContent);
});

nextPhrase.addEventListener("click", () => {
  phraseIndex = (phraseIndex + 1) % phrases.length;
  renderCurrentPhrase();
});

// 打卡行为绑定进度槽
finishButton.addEventListener("click", () => {
  const done = finishButton.classList.toggle("is-done");
  localStorage.setItem(storageKeys.done, done ? "1" : "0");
  finishButton.innerHTML = done
    ? '<svg><use href="#icon-check"></use></svg>今天完成了'
    : '<svg><use href="#icon-check"></use></svg>我完成了今天的小任务';
  renderProgress(done);
});

// 记录反应反馈
responseButtons.forEach((btn) => {
  const saved = JSON.parse(localStorage.getItem(storageKeys.responses) || "[]");
  btn.classList.toggle("active", saved.includes(btn.dataset.response));

  btn.addEventListener("click", () => {
    const current = JSON.parse(localStorage.getItem(storageKeys.responses) || "[]");
    const next = current.includes(btn.dataset.response)
      ? current.filter((item) => item !== btn.dataset.response)
      : [...current, btn.dataset.response];

    localStorage.setItem(storageKeys.responses, JSON.stringify(next));
    btn.classList.toggle("active");
  });
});

// 可选短句展板展开
allPhrasesButton.addEventListener("click", () => {
  phraseDrawer.hidden = !phraseDrawer.hidden;
  if (!phraseDrawer.hidden) {
    phraseDrawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

// --- 睡前温和模式交互 ---
const updateBedtimeButtonIcon = (isBedtime) => {
  const iconSun = bedtimeButton.querySelector(".icon-sun");
  const iconMoon = bedtimeButton.querySelector(".icon-moon");
  if (isBedtime) {
    iconSun.style.display = "block";
    iconMoon.style.display = "none";
    bedtimeButton.setAttribute("aria-pressed", "true");
  } else {
    iconSun.style.display = "none";
    iconMoon.style.display = "block";
    bedtimeButton.setAttribute("aria-pressed", "false");
  }
};

const toggleBedtimeMode = () => {
  const isCurrentlyBedtime = document.body.classList.toggle("bedtime-mode");
  localStorage.setItem(storageKeys.bedtime, isCurrentlyBedtime ? "1" : "0");
  updateBedtimeButtonIcon(isCurrentlyBedtime);
};

bedtimeButton.addEventListener("click", toggleBedtimeMode);

// 初始化
const init = () => {
  // 1. 发音短句与语速初始化
  renderCurrentPhrase();
  renderRate();
  renderPhrases();
  loadVoices();

  // 2. 打卡状态与进度条载入
  const isDone = localStorage.getItem(storageKeys.done) === "1";
  if (isDone) {
    finishButton.classList.add("is-done");
    finishButton.innerHTML = '<svg><use href="#icon-check"></use></svg>今天完成了';
  }
  renderProgress(isDone);

  // 3. 睡前温和模式载入
  const isBedtime = localStorage.getItem(storageKeys.bedtime) === "1";
  if (isBedtime) {
    document.body.classList.add("bedtime-mode");
  }
  updateBedtimeButtonIcon(isBedtime);

  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  }
};

init();
