document.addEventListener('DOMContentLoaded', () => {
  const songSelect = document.getElementById('songSelect');
  const videoPlayer = document.getElementById('videoPlayer');
  const subtitleOverlay = document.getElementById('subtitleOverlay');
  const subEn = document.getElementById('subEn');
  const subZh = document.getElementById('subZh');
  const playerContainer = document.getElementById('playerContainer');
  const subtitleStatus = document.getElementById('subtitleStatus');

  let currentSubtitles = null;
  let currentSubtitleMode = 'none';
  let currentSong = null;
  let learningSubtitleTimer = null;
  let learningSubtitleStartedAt = 0;
  const songsByPath = new Map();
  const subtitleCatalog = window.subtitleCatalog || {};
  const importedSubtitleCatalog = subtitleCatalog.imported || {};
  const exactSubtitleData = window.customSubtitlesData || {};
  const remoteMediaRevision = "77cfa628291d531c2e5d9c28dc5ad2906e8ded5c";
  const remoteMediaBaseUrl = `https://raw.githubusercontent.com/FzuLiWei/Hello-LILI/${remoteMediaRevision}/`;

  const encodeMediaPath = (localPath) => String(localPath || "")
    .split("/")
    .map(segment => encodeURIComponent(segment))
    .join("/");

  const shouldUseRemoteMedia = () => {
    const hostname = window.location.hostname;
    return hostname === "cheerful-mooncake-bf41c5.netlify.app" || hostname.endsWith(".netlify.app");
  };

  const toMediaUrl = (localPath) => {
    const encodedPath = encodeMediaPath(localPath);
    const configuredBase = window.HELLOLILI_MEDIA_BASE_URL;
    const mediaBaseUrl = configuredBase || (shouldUseRemoteMedia() ? remoteMediaBaseUrl : "");

    if (!mediaBaseUrl) return encodedPath;
    return new URL(encodedPath, mediaBaseUrl).toString();
  };

  const titleTranslations = {
    "1GDFa-nEzlg": "穿衣歌",
    "1jX8XyYvtWs": "摇篮曲：睡吧小宝贝",
    "1Ziku4FLka4": "早上好，公鸡先生",
    "4XLQpRI_wOQ": "这就是我们的日常方式",
    "5oYKonYBujg": "老麦克唐纳有个农场",
    "666UZRBO5q8": "我的泰迪熊",
    "7otAJa3jui8": "划呀划小船",
    "9UasekNr8KI": "公交车的轮子",
    "aUgy3u5Mvzk": "洗澡歌",
    "BdrZWu2dZ4c": "开车歌",
    "EqVHR2vIwIE": "一根小手指",
    "f_raDpgx_3M": "小宝贝别哭",
    "jdg50KzCR9w": "拍拍小蛋糕",
    "LFrKYjrIDs8": "雨啊雨快走开",
    "lMQcwNZVUO8": "头肩膝盖脚趾",
    "lVFj91Z1AfM": "躲猫猫",
    "OKbpLQp509Y": "晚安甜梦歌",
    "pZw9veQ76fo": "五只小鸭",
    "rfLLlxgE8nk": "打开关上",
    "TbKI-jjpPx8": "小蜘蛛",
    "TCoQ_2WWwxQ": "拇指在哪里？",
    "ug1pI-Ephns": "亲亲歌",
    "wqvQAcloTRQ": "如果你开心",
    "yCjJyiqpAuU": "一闪一闪小星星",
    "YVgv1EFJZHc": "你听到了什么？",
    "zXEq-QO3xTg": "农场动物",
    "2HOrFuhIcHA": "颜色小火车歌",
    "5_ShP3fiEhU": "一起去猎熊",
    "7oOaPVq07g8": "动一动休息歌",
    "chxQb4YRC2U": "你睡了吗，小熊宝宝？",
    "CRHvTTOR8Ns": "咩咩黑羊",
    "fXFg5QsTcLQ": "松饼人",
    "GoSq-yZcJ-4": "在丛林里走",
    "HGgsklW-mtg": "滴答滴答老鼠跑",
    "ij_eHTvhIlE": "晚安蝴蝶",
    "JRMAptlBgTk": "我们都倒下",
    "JV-D_K4drsA": "匹诺曹",
    "JXIILWwaHQc": "一步再一步",
    "jYAWf8Y91hA": "我看见蓝色",
    "nrv495corBc": "蛋头先生",
    "P-uznC3AmaE": "走路走路",
    "TdDypyS_5zE": "床上十个小朋友",
    "TJhfl5vdxp4": "形状歌 1",
    "WQtbFDPOdT8": "超级简单摇篮曲合辑",
    "XqZsoesa55w": "鲨鱼宝宝",
    "Yq6qYbwqAk8": "午睡时间",
    "75p-N9YKqNo": "字母歌",
    "ANChOA4SyL0": "请和谢谢歌",
    "ffeZXPtTGC4": "自然拼读歌 2",
    "frN3nvhIHUk": "你喜欢西兰花冰淇淋吗？",
    "ohHYABXMqUQ": "是的，是的，蔬菜歌",
    "SFE0mMWbA-Y": "收拾歌",
    "wCio_xVlgQ0": "刷牙歌",
    "WP1blVh1ZQM": "看一看，说一说，比一比",
  };

  const normalizeTitle = (title) =>
    String(title || "Song")
      .replace(/^\[[^\]]+\]\s*/, "")
      .replace(/\.mp4$/i, "")
      .trim();

  const getSongHint = (song) => {
    const title = normalizeTitle(song.title).toLowerCase();

    if (/sleep|bed|hush|twinkle|lullaby|dream|nap|rock/.test(title)) {
      return {
        en: "Hold your baby and rock gently.",
        zh: "抱着宝宝轻轻摇，听一小段就好。",
      };
    }

    if (/bath|wash|brush|clean|dressed|way|get dressed/.test(title)) {
      return {
        en: "Use the song during the real routine.",
        zh: "放在真实日常里用，边做边听。",
      };
    }

    if (/finger|thumbkin|pat-a-cake|open shut|itsy|spider/.test(title)) {
      return {
        en: "Do the hand action slowly.",
        zh: "慢慢做手部动作，让宝宝看清楚。",
      };
    }

    if (/farm|animal|duck|bear|teddy|hear|shark|sheep/.test(title)) {
      return {
        en: "Point, pause, and make the sound.",
        zh: "指给宝宝看，停一下，再模仿声音。",
      };
    }

    if (/wheels|car|train|walk|foot|fall|jungle|bear hunt|shake/.test(title)) {
      return {
        en: "Bounce or move gently with the beat.",
        zh: "跟着节奏轻轻晃动，不要太快。",
      };
    }

    if (/color|blue|shape|abc|phonics|say it|vegetables|broccoli/.test(title)) {
      return {
        en: "Name one word and repeat it softly.",
        zh: "只抓一个词，轻声重复几遍。",
      };
    }

    return {
      en: "Listen first, then sing one easy line.",
      zh: "先听，再跟着唱一句最简单的。",
    };
  };

  const getSongFocus = (song) => {
    const title = normalizeTitle(song.title);
    const lowerTitle = title.toLowerCase();

    if (/sleep|bed|hush|lullaby|dream|nap|rock|twinkle/.test(lowerTitle)) {
      return {
        en: "Focus: soft listening",
        zh: "重点：安静听、轻轻哼",
      };
    }

    if (/bath|wash|brush|clean|dressed|get dressed|way/.test(lowerTitle)) {
      return {
        en: "Focus: daily routine words",
        zh: "重点：日常动作词",
      };
    }

    if (/finger|thumbkin|pat-a-cake|open shut|itsy|spider|pinocchio/.test(lowerTitle)) {
      return {
        en: "Focus: hand actions",
        zh: "重点：手部动作",
      };
    }

    if (/farm|animal|duck|bear|teddy|hear|shark|sheep|macdonald/.test(lowerTitle)) {
      return {
        en: "Focus: animals and sounds",
        zh: "重点：动物和声音",
      };
    }

    if (/wheels|bus|car|train|walk|foot|fall|jungle|bear hunt|shake|row/.test(lowerTitle)) {
      return {
        en: "Focus: movement and rhythm",
        zh: "重点：动作和节奏",
      };
    }

    if (/color|blue|shape|abc|phonics|say it|vegetables|broccoli/.test(lowerTitle)) {
      return {
        en: "Focus: one clear word",
        zh: "重点：一个清楚的词",
      };
    }

    return {
      en: "Focus: listen and repeat",
      zh: "重点：先听，再重复",
    };
  };

  const buildLearningSubtitlePattern = (song) => {
    const title = normalizeTitle(song.title);
    const hint = getSongHint(song);
    const focus = getSongFocus(song);
    const zhTitle = titleTranslations[song.youtubeId] || `儿歌：${title}`;

    return [
      {
        en: title,
        zh: zhTitle,
        type: "learning",
      },
      {
        en: "Listen first. No need to translate every word.",
        zh: "先听声音，不用每个词都翻译。",
        type: "learning",
      },
      {
        en: hint.en,
        zh: hint.zh,
        type: "learning",
      },
      {
        en: focus.en,
        zh: focus.zh,
        type: "learning",
      },
      {
        en: "Sing one tiny part with your baby.",
        zh: "只陪宝宝跟一小段就好。",
        type: "learning",
      },
      {
        en: "Pause, smile, and repeat softly.",
        zh: "停一下、笑一笑、轻轻重复。",
        type: "learning",
      },
      {
        en: "Let the song play. Keep the subtitles big.",
        zh: "让儿歌继续播放，大字幕一直保留。",
        type: "learning",
      },
    ];
  };

  const buildLearningSubtitles = (song, duration) => {
    const pattern = buildLearningSubtitlePattern(song);
    const targetDuration = Number.isFinite(duration)
      ? Math.min(Math.max(Math.ceil(duration) + 8, 120), 3600)
      : 3600;
    const cues = [];
    let start = 0;

    while (start < targetDuration) {
      pattern.forEach((cue, index) => {
        const cueDuration = index === 0 && start === 0 ? 5 : 8;
        cues.push({
          ...cue,
          start,
          end: start + cueDuration,
        });
        start += cueDuration;
      });
    }

    if (cues.length > 0) {
      cues[cues.length - 1].end = Number.POSITIVE_INFINITY;
    }

    return cues;
  };

  const renderSubtitleCue = (cue) => {
    if (!cue) {
      subtitleOverlay.classList.remove('is-visible');
      subtitleOverlay.style.display = 'none';
      return;
    }

    subEn.textContent = cue.en;
    subZh.textContent = cue.zh;
    subtitleOverlay.classList.toggle('is-learning', cue.type === 'learning');
    subtitleOverlay.style.display = '';
    subtitleOverlay.classList.add('is-visible');
  };

  const findSubtitleCue = (time) => {
    if (!currentSubtitles) return null;
    return currentSubtitles.find(cue => time >= cue.start && time < cue.end) || null;
  };

  const renderSubtitleAt = (time) => {
    renderSubtitleCue(findSubtitleCue(time));
  };

  const stopLearningSubtitleTimer = () => {
    if (learningSubtitleTimer) {
      window.clearInterval(learningSubtitleTimer);
      learningSubtitleTimer = null;
    }
  };

  const startLearningSubtitleTimer = () => {
    stopLearningSubtitleTimer();
    learningSubtitleStartedAt = window.performance.now();
    learningSubtitleTimer = window.setInterval(() => {
      if (currentSubtitleMode !== 'pending' || !currentSubtitles) {
        stopLearningSubtitleTimer();
        return;
      }
      const elapsed = (window.performance.now() - learningSubtitleStartedAt) / 1000;
      renderSubtitleAt(elapsed);
    }, 1000);
  };

  const normalizeImportedCues = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.cues)) return payload.cues;
    return null;
  };

  const loadTimedSubtitles = async (song) => {
    const youtubeId = song && song.youtubeId;
    if (!youtubeId) return null;

    if (exactSubtitleData[youtubeId]) {
      return exactSubtitleData[youtubeId];
    }

    const catalogEntry = importedSubtitleCatalog[youtubeId];
    if (!catalogEntry || !catalogEntry.file) {
      return null;
    }

    if (catalogEntry.cues) {
      return catalogEntry.cues;
    }

    try {
      const response = await fetch(catalogEntry.file, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Subtitle file HTTP ${response.status}`);
      }
      const payload = await response.json();
      const cues = normalizeImportedCues(payload);
      if (!cues) {
        throw new Error("Subtitle file does not contain a cues array");
      }
      catalogEntry.cues = cues;
      return cues;
    } catch (error) {
      console.warn(`Failed to load timed subtitles for ${youtubeId}:`, error);
      return null;
    }
  };

  const getSubtitleState = (song) => {
    const youtubeId = song && song.youtubeId;
    const catalogEntry = youtubeId ? importedSubtitleCatalog[youtubeId] : null;
    const hasTimedSubtitles = Boolean(
      youtubeId &&
      (exactSubtitleData[youtubeId] || (catalogEntry && catalogEntry.status === "timed" && catalogEntry.file))
    );

    if (hasTimedSubtitles) {
      return {
        mode: "exact",
        optionLabel: "逐句歌词字幕",
        statusText: "逐句大号双语字幕",
        catalogEntry,
      };
    }

    return {
      mode: "pending",
      optionLabel: "大字幕已覆盖·逐句待导入",
      statusText: "大号中英学习字幕 - 逐句歌词待导入",
      catalogEntry: null,
    };
  };

  const updateSubtitleStatus = (mode, detailText) => {
    if (!subtitleStatus) return;
    if (detailText) {
      subtitleStatus.textContent = detailText;
      return;
    }
    if (mode === 'exact') {
      subtitleStatus.textContent = '逐句大号双语字幕';
      return;
    }
    if (mode === 'pending') {
      subtitleStatus.textContent = '大号中英学习字幕 - 逐句歌词待导入';
      return;
    }
    subtitleStatus.textContent = '逐句字幕状态待选择';
  };

  // Populate Dropdown
  const db = window.songDatabase || {};
  let songCount = 0;

  // Add options for each age group
  const ageGroups = [
    { key: "0_to_18_months", label: "👶 0-18个月 (启蒙与安抚)" },
    { key: "18_to_36_months", label: "🧒 18-36个月 (认知与跟唱)" },
    { key: "3_to_6_years", label: "👦 3-6岁 (律动与拼读)" }
  ];

  ageGroups.forEach(group => {
    const songs = db[group.key];
    if (songs && songs.length > 0) {
      const optgroup = document.createElement('optgroup');
      optgroup.label = group.label;
      
      songs.forEach(song => {
        const option = document.createElement('option');
        option.value = song.localPath;
        songsByPath.set(song.localPath, song);
        const subtitleState = getSubtitleState(song);
        option.textContent = `${song.title} [${subtitleState.optionLabel}]`;
        option.dataset.ytid = song.youtubeId;
        option.dataset.subtitleMode = subtitleState.mode;
        optgroup.appendChild(option);
        songCount++;
      });
      songSelect.appendChild(optgroup);
    }
  });

  if (songCount === 0) {
    const errorOpt = document.createElement('option');
    errorOpt.textContent = "未发现本地视频！请检查 songs 目录。";
    songSelect.appendChild(errorOpt);
  } else if (subtitleStatus) {
    const timedCount = Object.values(db)
      .flat()
      .filter(song => getSubtitleState(song).mode === 'exact').length;
    subtitleStatus.textContent = `大号中英字幕 ${songCount}/${songCount} 已覆盖；逐句歌词 ${timedCount}/${songCount}`;
  }

  // Handle Selection
  songSelect.addEventListener('change', async (e) => {
    const path = e.target.value;
    if (!path) {
      videoPlayer.pause();
      currentSubtitles = null;
      currentSubtitleMode = 'none';
      currentSong = null;
      stopLearningSubtitleTimer();
      subtitleOverlay.classList.remove('is-visible');
      subtitleOverlay.style.display = 'none';
      const timedCount = Object.values(db)
        .flat()
        .filter(song => getSubtitleState(song).mode === 'exact').length;
      if (subtitleStatus) subtitleStatus.textContent = `大号中英字幕 ${songCount}/${songCount} 已覆盖；逐句歌词 ${timedCount}/${songCount}`;
      return;
    }

    const option = e.target.options[e.target.selectedIndex];
    const ytid = option.dataset.ytid;
    const song = songsByPath.get(path) || {
      youtubeId: ytid,
      title: option.textContent.replace(/\s*\[[^\]]+\]\s*$/, ''),
    };
    currentSong = song;

    // Load and play video
    videoPlayer.src = toMediaUrl(path);
    videoPlayer.play().catch(err => {
      console.log("Auto-play prevented or failed:", err);
    });

    const subtitleState = getSubtitleState(song);
    const timedSubtitles = await loadTimedSubtitles(song);
    if (timedSubtitles) {
      currentSubtitles = timedSubtitles;
      currentSubtitleMode = 'exact';
      stopLearningSubtitleTimer();
      updateSubtitleStatus('exact', '逐句大号双语字幕');
      renderSubtitleAt(videoPlayer.currentTime);
    } else {
      currentSubtitles = buildLearningSubtitles(song, videoPlayer.duration);
      currentSubtitleMode = 'pending';
      const pendingStatusText = subtitleState.mode === 'exact'
        ? '逐句字幕文件加载失败 - 改用大号中英学习字幕'
        : subtitleState.statusText;
      updateSubtitleStatus('pending', pendingStatusText);
      renderSubtitleCue(currentSubtitles[0]);
      startLearningSubtitleTimer();
    }
  });

  // Handle Playback State for UI (optional fading)
  videoPlayer.addEventListener('play', () => {
    playerContainer.classList.add('playing');
  });
  videoPlayer.addEventListener('pause', () => {
    playerContainer.classList.remove('playing');
  });

  // High-precision native subtitle synchronization
  videoPlayer.addEventListener('timeupdate', () => {
    if (!currentSubtitles) return;
    
    const t = videoPlayer.currentTime;
    if (currentSubtitleMode === 'pending' && t === 0) return;
    renderSubtitleAt(t);
  });

  videoPlayer.addEventListener('loadedmetadata', () => {
    if (currentSubtitleMode === 'pending' && currentSong) {
      currentSubtitles = buildLearningSubtitles(currentSong, videoPlayer.duration);
      renderSubtitleCue(currentSubtitles[0]);
      startLearningSubtitleTimer();
    }
  });
});
