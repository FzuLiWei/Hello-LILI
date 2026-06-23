document.addEventListener('DOMContentLoaded', () => {
  const songSelect = document.getElementById('songSelect');
  const videoPlayer = document.getElementById('videoPlayer');
  const subtitleOverlay = document.getElementById('subtitleOverlay');
  const subEn = document.getElementById('subEn');
  const subZh = document.getElementById('subZh');
  const playerContainer = document.getElementById('playerContainer');

  let currentSubtitles = null;

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
        // Check if we have subtitles for this song
        const hasSub = window.customSubtitlesData && window.customSubtitlesData[song.youtubeId];
        option.textContent = `${song.title} ${hasSub ? '[有双语字幕]' : ''}`;
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
      subtitleOverlay.style.display = 'none';
      return;
    }

    const option = e.target.options[e.target.selectedIndex];
    const ytid = option.dataset.ytid;

    // Load and play video
    videoPlayer.src = path;
    videoPlayer.play().catch(err => {
      console.log("Auto-play prevented or failed:", err);
    });

    // Check subtitles
    if (window.customSubtitlesData && window.customSubtitlesData[ytid]) {
      currentSubtitles = window.customSubtitlesData[ytid];
    } else {
      currentSubtitles = null;
      subtitleOverlay.style.display = 'none';
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
    
    if (cue) {
      subEn.textContent = cue.en;
      subZh.textContent = cue.zh;
      subtitleOverlay.style.display = 'block';
    } else {
      subtitleOverlay.style.display = 'none';
    }
  });
});
