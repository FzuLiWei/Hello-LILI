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
};

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

let voices = [];
let phraseIndex = Number(localStorage.getItem(storageKeys.phraseIndex) || 0);
let selectedRate = Number(localStorage.getItem(storageKeys.rate) || 0.72);

const normalizeIndex = () => {
  if (Number.isNaN(phraseIndex) || phraseIndex < 0 || phraseIndex >= phrases.length) {
    phraseIndex = 0;
  }
};

const renderCurrentPhrase = () => {
  normalizeIndex();
  const phrase = phrases[phraseIndex];
  currentPhrase.textContent = phrase.text;
  currentMeaning.textContent = phrase.meaning;
  localStorage.setItem(storageKeys.phraseIndex, String(phraseIndex));
};

const getPreferredVoice = () => {
  const savedVoice = localStorage.getItem(storageKeys.voice);
  const exactVoice = voices.find((voice) => voice.name === savedVoice);
  if (exactVoice) return exactVoice;
  return (
    voices.find((voice) => voice.lang === "en-US") ||
    voices.find((voice) => voice.lang.startsWith("en")) ||
    null
  );
};

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

const loadVoices = () => {
  if (!("speechSynthesis" in window)) {
    voiceSelect.innerHTML = "<option>当前浏览器不支持 TTS</option>";
    voiceSelect.disabled = true;
    return;
  }

  voices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith("en"))
    .sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));

  voiceSelect.innerHTML = "";

  if (!voices.length) {
    voiceSelect.innerHTML = "<option>没有找到英文音色</option>";
    return;
  }

  const savedVoice = localStorage.getItem(storageKeys.voice);
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} · ${voice.lang}`;
    option.selected = savedVoice ? voice.name === savedVoice : voice === getPreferredVoice();
    voiceSelect.append(option);
  });
};

const renderRate = () => {
  rateButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.rate) === selectedRate);
  });
};

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

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `选择并播放 ${phrase.text}`);
    button.innerHTML = '<svg><use href="#icon-volume"></use></svg>';
    button.addEventListener("click", () => {
      phraseIndex = index;
      renderCurrentPhrase();
      speak(phrase.text);
    });

    item.append(copy, button);
    phraseList.append(item);
  });
};

voicePanelButton.addEventListener("click", () => {
  const nextOpen = voicePanel.hidden;
  voicePanel.hidden = !nextOpen;
  voicePanelButton.setAttribute("aria-expanded", String(nextOpen));
});

voiceSelect.addEventListener("change", () => {
  localStorage.setItem(storageKeys.voice, voiceSelect.value);
  speak(currentPhrase.textContent);
});

rateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedRate = Number(button.dataset.rate);
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

finishButton.addEventListener("click", () => {
  const done = finishButton.classList.toggle("is-done");
  localStorage.setItem(storageKeys.done, done ? "1" : "0");
  finishButton.innerHTML = done
    ? '<svg><use href="#icon-check"></use></svg>今天完成了'
    : '<svg><use href="#icon-check"></use></svg>我完成了今天的小任务';
});

responseButtons.forEach((button) => {
  const saved = JSON.parse(localStorage.getItem(storageKeys.responses) || "[]");
  button.classList.toggle("active", saved.includes(button.dataset.response));

  button.addEventListener("click", () => {
    const current = JSON.parse(localStorage.getItem(storageKeys.responses) || "[]");
    const next = current.includes(button.dataset.response)
      ? current.filter((item) => item !== button.dataset.response)
      : [...current, button.dataset.response];

    localStorage.setItem(storageKeys.responses, JSON.stringify(next));
    button.classList.toggle("active");
  });
});

allPhrasesButton.addEventListener("click", () => {
  phraseDrawer.hidden = !phraseDrawer.hidden;
  if (!phraseDrawer.hidden) {
    phraseDrawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

if (localStorage.getItem(storageKeys.done) === "1") {
  finishButton.classList.add("is-done");
  finishButton.innerHTML = '<svg><use href="#icon-check"></use></svg>今天完成了';
}

renderCurrentPhrase();
renderRate();
renderPhrases();
loadVoices();

if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
}
