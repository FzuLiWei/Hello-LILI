const responseChoices = {
  look: "看向我",
  smile: "笑了",
  reach: "伸手",
  calm: "安静下来",
  sound: "模仿声音",
  gesture: "模仿动作",
};

const songSources = {
  rowBoat: {
    title: "Row, Row, Row Your Boat",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "7otAJa3jui8",
    sourceUrl: "https://supersimple.com/song/row-row-row-your-boat/",
    credit: "Official video",
  },
  goodMorning: {
    title: "Good Morning, Mr. Rooster",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "1Ziku4FLka4",
    sourceUrl: "https://supersimple.com/song/good-morning-mr-rooster/",
    credit: "Official video",
  },
  headShoulders: {
    title: "Head Shoulders Knees & Toes",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "lMQcwNZVUO8",
    sourceUrl: "https://supersimple.com/song/head-shoulders-knees-toes-learn-it/",
    credit: "Official video",
  },
  patACake: {
    title: "Pat-A-Cake",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "jdg50KzCR9w",
    sourceUrl: "https://supersimple.com/song/pat-a-cake/",
    credit: "Official video",
  },
  thisIsTheWay: {
    title: "This Is The Way",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "4XLQpRI_wOQ",
    sourceUrl: "https://supersimple.com/song/this-is-the-way/",
    credit: "Official video",
  },
  twinkle: {
    title: "Twinkle Twinkle Little Star",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "yCjJyiqpAuU",
    sourceUrl: "https://supersimple.com/song/twinkle-twinkle-little-star/",
    credit: "Official video",
  },
  hushBaby: {
    title: "Hush Little Baby",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "f_raDpgx_3M",
    sourceUrl: "https://supersimple.com/song/hush-little-baby/",
    credit: "Official video",
  },
  wheelsBus: {
    title: "The Wheels On The Bus",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "9UasekNr8KI",
    sourceUrl: "https://supersimple.com/song/wheels-on-the-bus/",
    credit: "Official video",
  },
  happy: {
    title: "If You're Happy",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "wqvQAcloTRQ",
    sourceUrl: "https://supersimple.com/song/if-youre-happy/",
    credit: "Official video",
  },
  openShut: {
    title: "Open Shut Them",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "RNUZBHlRH4Y",
    sourceUrl: "https://supersimple.com/song/open-shut-them/",
    credit: "Official video",
  },
  peekaboo: {
    title: "Peekaboo",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "lVFj91Z1AfM",
    sourceUrl: "https://supersimple.com/song/peekaboo/",
    credit: "Official video",
  },
  getDressed: {
    title: "This Is The Way We Get Dressed",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "1GDFa-nEzlg",
    sourceUrl: "https://supersimple.com/song/this-is-the-way-we-get-dressed/",
    credit: "Official video",
  },
  drivingCar: {
    title: "Driving In My Car",
    source: "Super Simple Songs",
    localAudioUrl: "",
    youtubeId: "BdrZWu2dZ4c",
    sourceUrl: "https://supersimple.com/song/driving-in-my-car/",
    credit: "Official video",
  },
};

const seedPlans = [
  {
    id: "day-01",
    day: 1,
    scene: "bath",
    title: "洗澡时说英语",
    duration: "3 分钟",
    phrases: [
      ["Splash splash.", "玩水时说两遍，配合轻轻拍水的动作。"],
      ["Wash your hands.", "洗手时说，动作比解释更重要。"],
      ["Where is your duck?", "指向小鸭子，停顿一下等宝宝看过去。"],
      ["Bath time is over.", "洗澡结束时固定说，帮助建立日常信号。"],
    ],
    steps: [
      ["看着宝宝说", "先听一遍发音，再用你的声音说。"],
      ["配一个动作", "轻轻拍水或指小鸭子，不要求宝宝回答。"],
      ["重复三次就好", "今天够了，稳定比数量重要。"],
    ],
    song: {
      ...songSources.rowBoat,
      tip: "洗澡后或睡前听一段，家长做摇船动作就够。",
    },
    book: ["Brown Bear, Brown Bear", "只看两页也可以，指图比讲完整本更重要。"],
    responses: ["look", "smile", "reach", "calm"],
  },
  {
    id: "day-02",
    day: 2,
    scene: "wake",
    title: "起床时说英语",
    duration: "3 分钟",
    phrases: [
      ["Good morning.", "拉开窗帘或抱起时说。"],
      ["You are awake.", "宝宝睁眼后轻声说。"],
      ["Hello, sunshine.", "用温柔语气建立早晨仪式。"],
      ["Big stretch.", "宝宝伸懒腰时配合动作。"],
    ],
    steps: [
      ["先打招呼", "抱起前说 Good morning。"],
      ["慢慢重复", "不要连珠炮，留一点安静时间。"],
      ["配一个表情", "微笑和眼神比解释更有效。"],
    ],
    song: {
      ...songSources.goodMorning,
      tip: "起床后听一小段，重点是固定早晨声音。",
    },
    book: ["Hello, Baby!", "翻到有脸的页面，和宝宝对视。"],
    responses: ["look", "smile", "sound", "gesture"],
  },
  {
    id: "day-03",
    day: 3,
    scene: "diaper",
    title: "换尿布时说英语",
    duration: "3 分钟",
    phrases: [
      ["Let's change your diaper.", "换之前固定说，建立预告感。"],
      ["Lift your legs.", "抬腿时说，不要求宝宝听懂执行。"],
      ["All clean.", "擦完后说，语气轻快。"],
      ["Fresh and dry.", "换好后说，作为结束信号。"],
    ],
    steps: [
      ["先预告", "开始前说 Let's change your diaper。"],
      ["动作同步", "抬腿、擦拭、贴好时各说一句。"],
      ["结束固定", "最后说 All clean，让宝宝熟悉流程。"],
    ],
    song: {
      ...songSources.headShoulders,
      tip: "只做一个身体部位动作，不追求跟唱。",
    },
    book: ["Where's Spot?", "只玩找一找，不追求讲完整。"],
    responses: ["calm", "look", "reach", "sound"],
  },
  {
    id: "day-04",
    day: 4,
    scene: "feeding",
    title: "吃饭时说英语",
    duration: "5 分钟",
    phrases: [
      ["Are you hungry?", "准备吃饭时问，自己接着喂。"],
      ["Open your mouth.", "勺子靠近时说。"],
      ["Yummy.", "吃进去后用夸张但自然的表情说。"],
      ["More water?", "喝水前问，给出实际动作。"],
    ],
    steps: [
      ["少量短句", "吃饭时只用 2-3 句，别打断进食。"],
      ["配真实物品", "指水杯、勺子、食物。"],
      ["重复关键词", "今天只重复 hungry / yummy / water。"],
    ],
    song: {
      ...songSources.patACake,
      tip: "吃饭后轻轻拍手，节奏比歌词完整更重要。",
    },
    book: ["The Very Hungry Caterpillar", "只看食物页，指一两个图。"],
    responses: ["look", "reach", "smile", "calm"],
  },
  {
    id: "day-05",
    day: 5,
    scene: "play",
    title: "玩球时说英语",
    duration: "4 分钟",
    phrases: [
      ["Where is the ball?", "拿球前问，随后自己指出答案。"],
      ["Here it is.", "球出现时说。"],
      ["Roll the ball.", "滚动球时说。"],
      ["Good catch.", "宝宝碰到球时说。"],
    ],
    steps: [
      ["拿出一个球", "真实物品比屏幕图更适合这个年龄。"],
      ["边做边说", "滚一下说一次 Roll the ball。"],
      ["宝宝不回应也没关系", "你示范，他观察就已经在学习。"],
    ],
    song: {
      ...songSources.thisIsTheWay,
      tip: "听一段节奏，玩球时只保留一个动作。",
    },
    book: ["Dear Zoo", "翻到动物页，模仿一个声音即可。"],
    responses: ["reach", "smile", "gesture", "sound"],
  },
  {
    id: "day-06",
    day: 6,
    scene: "bed",
    title: "睡前时说英语",
    duration: "3 分钟",
    phrases: [
      ["Good night.", "关灯前固定说。"],
      ["Time to sleep.", "抱起或放下时说。"],
      ["I love you.", "拥抱时说。"],
      ["See you tomorrow.", "离开前轻声说。"],
    ],
    steps: [
      ["降低音量", "睡前英语要慢，不要兴奋。"],
      ["只留一句主句", "Good night 反复出现就够。"],
      ["用中文安抚也可以", "英语是额外输入，不替代亲密交流。"],
    ],
    song: {
      ...songSources.twinkle,
      tip: "睡前只放低音量听一小段，别把气氛唱兴奋。",
    },
    book: ["Goodnight Moon", "只看月亮、灯、床几个图。"],
    responses: ["calm", "look", "smile", "sound"],
  },
  {
    id: "day-07",
    day: 7,
    scene: "comfort",
    title: "安抚时说英语",
    duration: "3 分钟",
    phrases: [
      ["It's okay.", "宝宝不舒服或烦躁时轻声说。"],
      ["Daddy is here.", "抱着时说，建立安全感。"],
      ["Take it easy.", "语速要慢。"],
      ["You are safe.", "安静下来后重复。"],
    ],
    steps: [
      ["先回应情绪", "不要急着教学，先抱住和安抚。"],
      ["只用一句", "选 It's okay 或 Daddy is here。"],
      ["观察变化", "记录是否安静下来。"],
    ],
    song: {
      ...songSources.hushBaby,
      tip: "安抚时可先由家长听，再用自己的声音哼。",
    },
    book: ["Guess How Much I Love You", "只读一句 I love you。"],
    responses: ["calm", "look", "smile", "sound"],
  },
  {
    id: "day-08",
    day: 8,
    scene: "out",
    title: "出门时说英语",
    duration: "4 分钟",
    phrases: [
      ["Let's go outside.", "准备出门时说。"],
      ["Put on your hat.", "戴帽子时说。"],
      ["Look at the tree.", "看到树时指给宝宝看。"],
      ["Bye-bye.", "离开家门或和人告别时说。"],
    ],
    steps: [
      ["出门前预告", "先说 Let's go outside。"],
      ["只找一个东西", "今天只看 tree 或 car。"],
      ["挥手告别", "Bye-bye 配合手势。"],
    ],
    song: {
      ...songSources.wheelsBus,
      tip: "出门前听一段，配合转手或挥手动作。",
    },
    book: ["Maisy Goes Out", "看出门相关图片即可。"],
    responses: ["look", "gesture", "smile", "reach"],
  },
  {
    id: "day-09",
    day: 9,
    scene: "wake",
    title: "早晨身体小游戏",
    duration: "4 分钟",
    phrases: [
      ["Touch your nose.", "你先摸自己的鼻子，再轻轻指宝宝鼻子。"],
      ["These are your hands.", "握住小手时说。"],
      ["Clap clap.", "自己拍手给宝宝看。"],
      ["Wave hello.", "挥手时说。"],
    ],
    steps: [
      ["先做示范", "动作比翻译有用。"],
      ["重复一个身体词", "nose 或 hands 二选一。"],
      ["宝宝看就算完成", "不要求模仿。"],
    ],
    song: {
      ...songSources.happy,
      tip: "只做 clap 或 wave 一个动作，让宝宝看你示范。",
    },
    book: ["Ten Little Fingers", "看手指图片，数不数都可以。"],
    responses: ["look", "gesture", "sound", "smile"],
  },
  {
    id: "day-10",
    day: 10,
    scene: "feeding",
    title: "喝水时说英语",
    duration: "3 分钟",
    phrases: [
      ["Water, please.", "拿水杯时说。"],
      ["Take a sip.", "喝一小口时说。"],
      ["All done?", "结束时问。"],
      ["Good job.", "喝完后说。"],
    ],
    steps: [
      ["只围绕水杯", "今天不要扩展太多食物词。"],
      ["慢速说 water", "让宝宝听清 /w/ 的开头。"],
      ["结束时固定", "All done 是很实用的日常句。"],
    ],
    song: {
      ...songSources.openShut,
      tip: "喝水后做 open / shut 手势，不需要宝宝模仿。",
    },
    book: ["Eating the Alphabet", "只看一种水果。"],
    responses: ["reach", "look", "smile", "calm"],
  },
  {
    id: "day-11",
    day: 11,
    scene: "play",
    title: "躲猫猫时说英语",
    duration: "4 分钟",
    phrases: [
      ["Where is Daddy?", "遮住脸时说。"],
      ["Peekaboo!", "露出脸时说。"],
      ["Here I am.", "出现后说。"],
      ["Again?", "重复前问，自己继续游戏。"],
    ],
    steps: [
      ["遮住脸", "先说 Where is Daddy?"],
      ["突然出现", "说 Peekaboo，注意不要吓到宝宝。"],
      ["看反应", "笑、看向你、伸手都可以记录。"],
    ],
    song: {
      ...songSources.peekaboo,
      tip: "游戏前听一段，真正互动时用你的脸和声音。",
    },
    book: ["Where Is Baby's Belly Button?", "翻翻书很适合这个动作主题。"],
    responses: ["smile", "look", "reach", "gesture"],
  },
  {
    id: "day-12",
    day: 12,
    scene: "diaper",
    title: "穿衣时说英语",
    duration: "4 分钟",
    phrases: [
      ["Put on your shirt.", "穿上衣时说。"],
      ["One arm.", "伸一只手臂时说。"],
      ["Other arm.", "换另一只手臂时说。"],
      ["All set.", "穿好后说。"],
    ],
    steps: [
      ["先说动作", "不要解释，边穿边说。"],
      ["重复 arm", "左右手臂都用这个词。"],
      ["结束收口", "All set 是非常自然的结束句。"],
    ],
    song: {
      ...songSources.getDressed,
      tip: "穿衣前听一段，穿的时候只说一个衣物动作。",
    },
    book: ["Blue Hat, Green Hat", "看衣物和颜色，不要求宝宝认。"],
    responses: ["calm", "look", "gesture", "sound"],
  },
  {
    id: "day-13",
    day: 13,
    scene: "out",
    title: "看车时说英语",
    duration: "4 分钟",
    phrases: [
      ["Look, a car.", "看到车时指过去。"],
      ["The car is red.", "看到红车时说，不用强行找。"],
      ["It goes fast.", "车开过时说。"],
      ["Bye-bye, car.", "车离开时挥手。"],
    ],
    steps: [
      ["只找车", "今天户外只锁定 car。"],
      ["配合挥手", "Bye-bye 是宝宝容易观察的动作。"],
      ["说完就停", "外面信息多，短句更好。"],
    ],
    song: {
      ...songSources.drivingCar,
      tip: "户外看车前听一段，出门后只做 vroom 声音游戏。",
    },
    book: ["Cars and Trucks and Things That Go", "只看一页车，不追求读完。"],
    responses: ["look", "gesture", "smile", "sound"],
  },
  {
    id: "day-14",
    day: 14,
    scene: "bed",
    title: "复习晚安仪式",
    duration: "5 分钟",
    phrases: [
      ["Good night.", "继续作为固定睡前句。"],
      ["I love you.", "拥抱时重复。"],
      ["Time to sleep.", "放下前说。"],
      ["Sweet dreams.", "最后轻声说。"],
    ],
    steps: [
      ["回到最熟的一句", "Good night 是这个阶段的核心固定语。"],
      ["读一页绘本", "只看图和重复句，不追求完整。"],
      ["记录一个变化", "看看宝宝是否更熟悉睡前英语。"],
    ],
    song: {
      ...songSources.twinkle,
      tip: "复习晚安仪式时重复同一首，不急着换新。",
    },
    book: ["Goodnight Moon", "第二次读同一本，比换新书更有价值。"],
    responses: ["calm", "look", "smile", "sound"],
  },
];

const sceneLabels = {
  wake: "起床",
  diaper: "换尿布",
  feeding: "吃饭/喂奶",
  play: "玩耍",
  bath: "洗澡",
  out: "出门",
  bed: "睡前",
  comfort: "安抚",
};

const storageKeys = {
  profile: "hellolili-profile-v1",
  dayIndex: "hellolili-day-index-v1",
  phraseIndex: "hellolili-phrase-index-v2",
  responses: "hellolili-responses-v2",
  completed: "hellolili-completed-v2",
  voice: "hellolili-mobile-voice",
  rate: "hellolili-mobile-rate",
  bedtime: "hellolili-mobile-bedtime",
};

const guidanceItems = [
  {
    label: "看一眼",
    title: "手机给家长看",
    text: "看完一句和动作，就离开屏幕。",
  },
  {
    label: "一句话",
    title: "只带走一句",
    text: "一个场景一句英文，反复几天也可以。",
  },
  {
    label: "不催说",
    title: "没回应也算输入",
    text: "看你、笑、安静下来，都算反应。",
  },
  {
    label: "真声音",
    title: "儿歌用真实来源",
    text: "卡片内放一小段，家长跟着哼就好。",
  },
];

const currentPhrase = document.querySelector("#currentPhrase");
const currentMeaning = document.querySelector("#currentMeaning");
const speakCurrent = document.querySelector("#speakCurrent");
const nextPhrase = document.querySelector("#nextPhrase");
const finishButton = document.querySelector("#finishButton");
const responseGrid = document.querySelector("#responseGrid");
const voicePanelButton = document.querySelector("#voicePanelButton");
const voicePanel = document.querySelector("#voicePanel");
const voiceSelect = document.querySelector("#voiceSelect");
const rateButtons = document.querySelectorAll("[data-rate]");
const allPhrasesButton = document.querySelector("#allPhrasesButton");
const phraseDrawer = document.querySelector("#phraseDrawer");
const phraseList = document.querySelector("#phraseList");
const progressFill = document.querySelector("#progressFill");
const progressVal = document.querySelector("#progressVal");
const progressLabel = document.querySelector("#progressLabel");
const bedtimeButton = document.querySelector("#bedtimeButton");
const sheetOverlay = document.querySelector("#sheetOverlay");
const sheetCloseButton = document.querySelector("#sheetCloseButton");
const childSummary = document.querySelector("#childSummary");
const childStageText = document.querySelector("#childStageText");
const editProfileButton = document.querySelector("#editProfileButton");
const dayLabel = document.querySelector("#dayLabel");
const planTitle = document.querySelector("#planTitle");
const planDuration = document.querySelector("#planDuration");
const dayCounter = document.querySelector("#dayCounter");
const prevDayButton = document.querySelector("#prevDayButton");
const nextDayButton = document.querySelector("#nextDayButton");
const routineList = document.querySelector("#routineList");
const songTitle = document.querySelector("#songTitle");
const songSource = document.querySelector("#songSource");
const songTip = document.querySelector("#songTip");
const songCaptionTip = document.querySelector("#songCaptionTip");
const songControls = document.querySelector("#songControls");
const songPlayButton = document.querySelector("#songPlayButton");
const songPlayButtonText = songPlayButton.querySelector("span");
const songStatus = document.querySelector("#songStatus");
const songAudio = document.querySelector("#songAudio");
const songVideoWrap = document.querySelector("#songVideoWrap");
const songVideo = document.querySelector("#songVideo");
const songCreditLink = document.querySelector("#songCreditLink");
const bookTitle = document.querySelector("#bookTitle");
const phraseDrawerTitle = document.querySelector("#phraseDrawerTitle");
const onboardingOverlay = document.querySelector("#onboardingOverlay");
const onboardingForm = document.querySelector("#onboardingForm");
const closeOnboardingButton = document.querySelector("#closeOnboardingButton");
const childNicknameInput = document.querySelector("#childNicknameInput");
const childBirthdateInput = document.querySelector("#childBirthdateInput");
const parentLevelInput = document.querySelector("#parentLevelInput");
const dailyTimeInput = document.querySelector("#dailyTimeInput");
const preferredSceneInput = document.querySelector("#preferredSceneInput");
const summaryDoneDays = document.querySelector("#summaryDoneDays");
const summaryScenes = document.querySelector("#summaryScenes");
const summaryResponses = document.querySelector("#summaryResponses");
const weekStrip = document.querySelector("#weekStrip");
const summarySceneText = document.querySelector("#summarySceneText");
const summaryResponseText = document.querySelector("#summaryResponseText");
const summarySuggestion = document.querySelector("#summarySuggestion");
const parentTodayTip = document.querySelector("#parentTodayTip");
const guidanceList = document.querySelector("#guidanceList");
const navItems = document.querySelectorAll("[data-nav-target]");

let voices = [];
let selectedRate = Number(localStorage.getItem(storageKeys.rate) || 0.72);
let currentDayIndex = 0;
let currentPhraseIndex = 0;

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const todayIso = () => new Date().toISOString().slice(0, 10);

const getProfile = () => readJson(storageKeys.profile, null);
const getPlan = () => seedPlans[currentDayIndex];

const clampDayIndex = (value) => {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), seedPlans.length - 1);
};

const getAgeMonths = (birthdate) => {
  if (!birthdate) return null;
  const birth = new Date(`${birthdate}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12;
  months += now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  return Math.max(months, 0);
};

const getStageText = (months) => {
  if (months === null) return "先设置生日，用来安排适龄任务。";
  if (months <= 6) return "声音连接阶段，家长说，宝宝听声音和节奏。";
  if (months <= 12) return "反应与日常阶段，家长说，宝宝听和感受。";
  if (months <= 18) return "理解与模仿阶段，可以增加动作和固定指令。";
  return "已超过 18 个月，当前仍先使用家长助手模式。";
};

const getInitialDayIndex = () => {
  const saved = localStorage.getItem(storageKeys.dayIndex);
  if (saved !== null) return clampDayIndex(Number(saved));

  const profile = getProfile();
  if (!profile?.startDate) return 0;
  const start = new Date(`${profile.startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 0;
  const diff = Math.floor((Date.now() - start.getTime()) / 86400000);
  return clampDayIndex(diff % seedPlans.length);
};

const getPlanMap = (key) => readJson(key, {});

const getCurrentWeekPlans = () => {
  const weekStart = currentDayIndex < 7 ? 0 : 7;
  return seedPlans.slice(weekStart, weekStart + 7);
};

const setActiveNav = (target) => {
  navItems.forEach((item) => {
    item.classList.toggle("is-active", item.dataset.navTarget === target);
  });
};

const syncNavFromHash = () => {
  const target = window.location.hash.replace("#", "") || "today";
  if (["today", "record", "summary", "parent"].includes(target)) {
    setActiveNav(target);
  }
};

const setDayIndex = (index) => {
  currentDayIndex = clampDayIndex(index);
  localStorage.setItem(storageKeys.dayIndex, String(currentDayIndex));
  currentPhraseIndex = 0;
  localStorage.setItem(storageKeys.phraseIndex, "0");
  renderPlan();
};

const renderProfile = () => {
  const profile = getProfile();
  if (!profile) {
    childSummary.textContent = "欢迎使用 · 先设置";
    childStageText.textContent = "设置孩子生日后，首页会自动安排适龄任务。";
    return;
  }

  const months = getAgeMonths(profile.birthdate);
  childSummary.textContent = `${profile.nickname || "宝宝"} · ${months ?? "?"} 个月`;
  childStageText.textContent = getStageText(months);
};

const renderProgress = () => {
  const plan = getPlan();
  const completed = getPlanMap(storageKeys.completed);
  const responseMap = getPlanMap(storageKeys.responses);
  const responseCount = responseMap[plan.id]?.length || 0;
  const isDone = Boolean(completed[plan.id]);
  const percent = isDone ? 100 : responseCount ? 70 : 45;

  progressFill.style.width = `${percent}%`;
  progressVal.textContent = isDone ? "100% (MAX)" : `${percent}%`;
  progressLabel.textContent = isDone ? "今日已完成" : "今日习惯进度";

  finishButton.classList.toggle("is-done", isDone);
  finishButton.innerHTML = isDone
    ? '<svg><use href="#icon-check"></use></svg>今天完成了'
    : '<svg><use href="#icon-check"></use></svg>我完成了今天的小任务';
};

const renderWeeklySummary = () => {
  const completed = getPlanMap(storageKeys.completed);
  const responseMap = getPlanMap(storageKeys.responses);
  const weekPlans = getCurrentWeekPlans();
  const practicedPlans = weekPlans.filter((plan) => completed[plan.id] || responseMap[plan.id]?.length);
  const doneCount = weekPlans.filter((plan) => completed[plan.id]).length;
  const responseKeys = weekPlans.flatMap((plan) => responseMap[plan.id] || []);
  const sceneNames = [...new Set(practicedPlans.map((plan) => sceneLabels[plan.scene]))];
  const responseLabels = [...new Set(responseKeys.map((key) => responseChoices[key]).filter(Boolean))];

  summaryDoneDays.textContent = String(doneCount);
  summaryScenes.textContent = String(sceneNames.length);
  summaryResponses.textContent = String(responseKeys.length);
  summarySceneText.textContent = sceneNames.length ? sceneNames.join("、") : "完成一次任务后会显示。";
  summaryResponseText.textContent = responseLabels.length
    ? responseLabels.join("、")
    : "记录一个反应后会显示。";

  if (doneCount === 0) {
    summarySuggestion.textContent = "先完成今天的一句和一个观察，节奏比数量更重要。";
  } else if (doneCount < 3) {
    summarySuggestion.textContent = "本周先把一个固定场景做稳，不急着加量。";
  } else if (responseKeys.length === 0) {
    summarySuggestion.textContent = "下次完成后顺手记录一个宝宝反应，方便判断哪些句子更有效。";
  } else if (sceneNames.length < 2) {
    summarySuggestion.textContent = "可以尝试把英语放进第二个日常场景，比如洗澡或睡前。";
  } else {
    summarySuggestion.textContent = "下周继续重复高反应场景，少量换句即可。";
  }

  weekStrip.innerHTML = "";
  weekPlans.forEach((plan) => {
    const day = document.createElement("span");
    day.textContent = `D${plan.day}`;
    day.title = plan.title;
    day.classList.toggle("is-observed", Boolean(responseMap[plan.id]?.length));
    day.classList.toggle("is-done", Boolean(completed[plan.id]));
    weekStrip.append(day);
  });
};

const renderGuidance = () => {
  const plan = getPlan();
  const [phrase] = plan.phrases[0];
  parentTodayTip.textContent = `${sceneLabels[plan.scene]}只带走 "${phrase}"，说两三次就停。`;

  guidanceList.innerHTML = "";
  guidanceItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "guidance-item";

    const label = document.createElement("span");
    label.textContent = item.label;

    const title = document.createElement("strong");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.append(label, title, text);
    guidanceList.append(article);
  });
};

const renderResponseOptions = () => {
  const plan = getPlan();
  const responseMap = getPlanMap(storageKeys.responses);
  const saved = responseMap[plan.id] || [];
  responseGrid.innerHTML = "";

  plan.responses.forEach((key) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.response = key;
    button.textContent = responseChoices[key];
    button.classList.toggle("active", saved.includes(key));
    button.addEventListener("click", () => {
      const currentMap = getPlanMap(storageKeys.responses);
      const current = currentMap[plan.id] || [];
      const next = current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key];
      currentMap[plan.id] = next;
      writeJson(storageKeys.responses, currentMap);
      renderResponseOptions();
      renderProgress();
      renderWeeklySummary();
    });
    responseGrid.append(button);
  });
};

const renderRoutine = () => {
  routineList.innerHTML = "";
  getPlan().steps.forEach(([title, text]) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const strong = document.createElement("strong");
    const span = document.createElement("span");
    strong.textContent = title;
    span.textContent = text;
    div.append(strong, span);
    li.append(div);
    routineList.append(li);
  });
};

const renderPhrases = () => {
  const plan = getPlan();
  phraseList.innerHTML = "";
  phraseDrawerTitle.textContent = `${sceneLabels[plan.scene]}可选短句`;

  plan.phrases.forEach(([text, meaning], index) => {
    const item = document.createElement("div");
    item.className = "phrase-item";

    const copy = document.createElement("div");
    const title = document.createElement("strong");
    const detail = document.createElement("span");
    title.textContent = text;
    detail.textContent = meaning;
    copy.append(title, detail);

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `选择并播放 ${text}`);
    button.innerHTML = '<svg><use href="#icon-volume"></use></svg>';
    button.addEventListener("click", () => {
      currentPhraseIndex = index;
      localStorage.setItem(storageKeys.phraseIndex, String(currentPhraseIndex));
      renderCurrentPhrase();
      speak(text);
    });

    item.append(copy, button);
    phraseList.append(item);
  });
};

const renderCurrentPhrase = () => {
  const phrases = getPlan().phrases;
  currentPhraseIndex = Math.min(Math.max(currentPhraseIndex, 0), phrases.length - 1);
  const [text, meaning] = phrases[currentPhraseIndex];
  currentPhrase.textContent = text;
  currentMeaning.textContent = meaning;
  localStorage.setItem(storageKeys.phraseIndex, String(currentPhraseIndex));
};

const setSongPlayingState = (isPlaying) => {
  songPlayButtonText.textContent = isPlaying ? "暂停本地音频" : "播放本地音频";
  songPlayButton.setAttribute(
    "aria-label",
    `${isPlaying ? "暂停" : "播放"} ${getPlan().song.title} 本地音频`
  );
};

const getSongEmbedUrl = (song) => {
  if (!song.youtubeId) return "";
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    cc_load_policy: "1",
    cc_lang_pref: "en",
    hl: "en",
  });
  return `https://www.youtube-nocookie.com/embed/${song.youtubeId}?${params.toString()}`;
};

const prepareSongMedia = (song) => {
  songAudio.pause();
  setSongPlayingState(false);

  if (song.localAudioUrl) {
    songControls.hidden = false;
    songAudio.hidden = false;
    songVideoWrap.hidden = true;
    songVideo.removeAttribute("src");
    songAudio.src = song.localAudioUrl;
    songAudio.load();
    songStatus.textContent = "本地音频";
    return;
  }

  songControls.hidden = true;
  songAudio.hidden = true;
  songAudio.removeAttribute("src");
  songAudio.load();
  songVideoWrap.hidden = false;
  songVideo.src = getSongEmbedUrl(song);
  songVideo.title = `${song.title} 官方儿歌视频`;
  songStatus.textContent = "官方视频";
};

const playSong = async () => {
  try {
    await songAudio.play();
  } catch {
    songStatus.textContent = "可点下方音频控件";
    setSongPlayingState(false);
  }
};

const renderPlan = () => {
  const plan = getPlan();
  currentPhraseIndex = Number(localStorage.getItem(storageKeys.phraseIndex) || 0);
  currentPhraseIndex = Math.min(Math.max(currentPhraseIndex, 0), plan.phrases.length - 1);

  dayLabel.textContent = `第 ${plan.day} 天 · ${sceneLabels[plan.scene]}`;
  planTitle.textContent = plan.title;
  planDuration.textContent = plan.duration;
  dayCounter.textContent = `${plan.day} / ${seedPlans.length}`;
  songTitle.textContent = plan.song.title;
  songSource.textContent = `${plan.song.source} · ${plan.song.credit}`;
  songTip.textContent = plan.song.tip;
  songCaptionTip.textContent = plan.song.localAudioUrl
    ? "本地音频暂不含字幕；先由家长跟唱。"
    : "已请求英文字幕；若未显示，请点视频里的 CC。";
  songCreditLink.href = plan.song.sourceUrl;
  songCreditLink.textContent = plan.song.localAudioUrl ? "本地音频来源" : "打开官方页面";
  songCreditLink.setAttribute("aria-label", `查看 ${plan.song.title} 官方来源`);
  bookTitle.textContent = `绘本：${plan.book[0]}`;
  prepareSongMedia(plan.song);

  renderCurrentPhrase();
  renderRoutine();
  renderPhrases();
  renderResponseOptions();
  renderProgress();
  renderWeeklySummary();
  renderGuidance();
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

const openOnboarding = () => {
  const profile = getProfile();
  childNicknameInput.value = profile?.nickname || "";
  childBirthdateInput.value = profile?.birthdate || "";
  parentLevelInput.value = profile?.parentLevel || "beginner";
  dailyTimeInput.value = profile?.dailyTime || "3";
  preferredSceneInput.value = profile?.preferredScene || "auto";
  onboardingOverlay.hidden = false;
  document.body.classList.add("onboarding-open");
  childNicknameInput.focus();
};

const closeOnboarding = () => {
  onboardingOverlay.hidden = true;
  document.body.classList.remove("onboarding-open");
};

const saveProfile = () => {
  const previous = getProfile();
  const profile = {
    nickname: childNicknameInput.value.trim() || "宝宝",
    birthdate: childBirthdateInput.value,
    parentLevel: parentLevelInput.value,
    dailyTime: dailyTimeInput.value,
    preferredScene: preferredSceneInput.value,
    startDate: previous?.startDate || todayIso(),
  };

  writeJson(storageKeys.profile, profile);

  if (!previous) {
    const preferredIndex = seedPlans.findIndex((plan) => plan.scene === profile.preferredScene);
    currentDayIndex = preferredIndex >= 0 ? preferredIndex : 0;
    localStorage.setItem(storageKeys.dayIndex, String(currentDayIndex));
  }

  renderProfile();
  renderPlan();
  closeOnboarding();
};

voicePanelButton.addEventListener("click", openBottomSheet);
sheetCloseButton.addEventListener("click", closeBottomSheet);
sheetOverlay.addEventListener("click", closeBottomSheet);

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

songPlayButton.addEventListener("click", () => {
  if (songAudio.paused) {
    playSong();
  } else {
    songAudio.pause();
  }
});

songAudio.addEventListener("loadedmetadata", () => {
  if (songAudio.paused) {
    songStatus.textContent = "已准备";
  }
});

songAudio.addEventListener("waiting", () => {
  songStatus.textContent = "加载中";
});

songAudio.addEventListener("playing", () => {
  songStatus.textContent = "正在播放";
  setSongPlayingState(true);
});

songAudio.addEventListener("pause", () => {
  if (songAudio.ended) return;
  songStatus.textContent = songAudio.currentTime > 0 ? "已暂停" : "未播放";
  setSongPlayingState(false);
});

songAudio.addEventListener("ended", () => {
  songStatus.textContent = "播放结束";
  setSongPlayingState(false);
});

songAudio.addEventListener("error", () => {
  songStatus.textContent = "本地音频加载失败";
  setSongPlayingState(false);
});

nextPhrase.addEventListener("click", () => {
  currentPhraseIndex = (currentPhraseIndex + 1) % getPlan().phrases.length;
  renderCurrentPhrase();
});

finishButton.addEventListener("click", () => {
  const plan = getPlan();
  const completed = getPlanMap(storageKeys.completed);
  completed[plan.id] = !completed[plan.id];
  writeJson(storageKeys.completed, completed);
  renderProgress();
  renderWeeklySummary();
});

allPhrasesButton.addEventListener("click", () => {
  phraseDrawer.hidden = !phraseDrawer.hidden;
  if (!phraseDrawer.hidden) {
    setActiveNav("phrases");
    phraseDrawer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    syncNavFromHash();
  }
});

prevDayButton.addEventListener("click", () => {
  setDayIndex(currentDayIndex - 1);
});

nextDayButton.addEventListener("click", () => {
  setDayIndex(currentDayIndex + 1);
});

editProfileButton.addEventListener("click", openOnboarding);
closeOnboardingButton.addEventListener("click", closeOnboarding);

onboardingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveProfile();
});

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
window.addEventListener("hashchange", syncNavFromHash);

const init = () => {
  currentDayIndex = getInitialDayIndex();
  currentPhraseIndex = Number(localStorage.getItem(storageKeys.phraseIndex) || 0);
  renderProfile();
  renderPlan();
  renderRate();
  syncNavFromHash();
  loadVoices();

  const isBedtime = localStorage.getItem(storageKeys.bedtime) === "1";
  if (isBedtime) {
    document.body.classList.add("bedtime-mode");
  }
  updateBedtimeButtonIcon(isBedtime);

  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  }

  if (!getProfile()) {
    openOnboarding();
  }
};

init();
