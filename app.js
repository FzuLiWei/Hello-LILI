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
  const songsByPath = new Map();

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

  const buildLearningSubtitles = (song) => {
    const title = normalizeTitle(song.title);
    const hint = getSongHint(song);
    return [
      {
        start: 0,
        end: 4,
        en: title,
        zh: titleTranslations[song.youtubeId] || `儿歌：${title}`,
        type: "learning",
      },
      {
        start: 4,
        end: Number.POSITIVE_INFINITY,
        en: hint.en,
        zh: hint.zh,
        type: "learning",
      },
    ];
  };

  const renderSubtitleCue = (cue) => {
    if (!cue) {
      subtitleOverlay.style.display = 'none';
      return;
    }

    subEn.textContent = cue.en;
    subZh.textContent = cue.zh;
    subtitleOverlay.classList.toggle('is-learning', cue.type === 'learning');
    subtitleOverlay.style.display = 'flex';
  };

  const updateSubtitleStatus = (mode) => {
    if (!subtitleStatus) return;
    subtitleStatus.textContent =
      mode === 'exact'
        ? '逐句大号双语字幕'
        : '大号双语学习字幕';
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
        // Check if we have subtitles for this song
        const hasExactSub = window.customSubtitlesData && window.customSubtitlesData[song.youtubeId];
        option.textContent = `${song.title} [${hasExactSub ? '逐句双语字幕' : '双语学习字幕'}]`;
        option.dataset.ytid = song.youtubeId;
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
  }

  // Handle Selection
  songSelect.addEventListener('change', (e) => {
    const path = e.target.value;
    if (!path) {
      videoPlayer.pause();
      currentSubtitles = null;
      currentSubtitleMode = 'none';
      subtitleOverlay.style.display = 'none';
      if (subtitleStatus) subtitleStatus.textContent = '每首儿歌都有大号双语字幕';
      return;
    }

    const option = e.target.options[e.target.selectedIndex];
    const ytid = option.dataset.ytid;
    const song = songsByPath.get(path) || {
      youtubeId: ytid,
      title: option.textContent.replace(/\s*\[[^\]]+\]\s*$/, ''),
    };

    // Load and play video
    videoPlayer.src = path;
    videoPlayer.play().catch(err => {
      console.log("Auto-play prevented or failed:", err);
    });

    // Check subtitles
    if (window.customSubtitlesData && window.customSubtitlesData[ytid]) {
      currentSubtitles = window.customSubtitlesData[ytid];
      currentSubtitleMode = 'exact';
      updateSubtitleStatus('exact');
      renderSubtitleCue(currentSubtitles.find(c => videoPlayer.currentTime >= c.start && videoPlayer.currentTime < c.end));
    } else {
      currentSubtitles = buildLearningSubtitles(song);
      currentSubtitleMode = 'learning';
      updateSubtitleStatus('learning');
      renderSubtitleCue(currentSubtitles[0]);
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
    const cue = currentSubtitles.find(c => t >= c.start && t < c.end);
    
    renderSubtitleCue(cue);
  });

  videoPlayer.addEventListener('loadedmetadata', () => {
    if (currentSubtitleMode === 'learning' && currentSubtitles) {
      renderSubtitleCue(currentSubtitles[0]);
    }
  });
});
