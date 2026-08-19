import { soundService } from './soundService';
import { t, translatePage } from './localization';
import options from './options';
import type { Roulette } from './roulette';
import { parseName, shuffle } from './utils/utils';

export function setupUI(roulette: Roulette) {
  let ready = false;
  let winnerType: 'first' | 'last' | 'custom' = 'first';
  let currentSpeed = 1;
  let liveUpdateTimer: number | null = null;

  // DOM Elements
  const settingsPanel = document.getElementById('settings') as HTMLElement;
  const inNames = document.getElementById('in_names') as HTMLTextAreaElement;
  const marbleCountBadge = document.getElementById('marbleCountBadge') as HTMLElement;
  const btnStart = document.getElementById('btnStart') as HTMLButtonElement;
  const btnShuffle = document.getElementById('btnShuffle') as HTMLButtonElement;
  const btnToggleSettings = document.getElementById('btnToggleSettings') as HTMLButtonElement;
  const sltMap = document.getElementById('sltMap') as HTMLSelectElement;

  // Winner Mode Buttons
  const btnFirstWinner = document.querySelector('.btn-first-winner') as HTMLButtonElement;
  const btnLastWinner = document.querySelector('.btn-last-winner') as HTMLButtonElement;
  const btnCustomWinner = document.querySelector('.btn-custom-winner') as HTMLButtonElement;
  const inWinningRank = document.getElementById('in_winningRank') as HTMLInputElement;

  // Option Toggles
  const chkSkill = document.getElementById('chkSkill') as HTMLInputElement;
  const chkAutoRecording = document.getElementById('chkAutoRecording') as HTMLInputElement;
  const chkSound = document.getElementById('chkSound') as HTMLInputElement;
  const chkDarkMode = document.getElementById('chkDarkMode') as HTMLInputElement;

  // In-game HUD
  const hudDock = document.getElementById('hudDock') as HTMLElement;
  const btnHudPause = document.getElementById('btnHudPause') as HTMLButtonElement;
  const btnHudSpeed = document.getElementById('btnHudSpeed') as HTMLButtonElement;
  const btnHudShake = document.getElementById('btnHudShake') as HTMLButtonElement;
  const btnHudReset = document.getElementById('btnHudReset') as HTMLButtonElement;
  const btnHudSound = document.getElementById('btnHudSound') as HTMLButtonElement;
  const leaderboardHud = document.getElementById('leaderboardHud') as HTMLElement;
  const leaderboardList = document.getElementById('leaderboardList') as HTMLElement;

  // Winner Modal
  const winnerModal = document.getElementById('winnerModal') as HTMLElement;
  const winnerNameEl = document.getElementById('winnerName') as HTMLElement;
  const winnerRankBadge = document.getElementById('winnerRankBadge') as HTMLElement;
  const winnerTotalCount = document.getElementById('winnerTotalCount') as HTMLElement;
  const rankingTableBody = document.getElementById('rankingTableBody') as HTMLElement;
  const btnCopyResult = document.getElementById('btnCopyResult') as HTMLButtonElement;
  const btnPlayAgain = document.getElementById('btnPlayAgain') as HTMLButtonElement;
  const btnCloseWinner = document.getElementById('btnCloseWinner') as HTMLButtonElement;

  // Presets container
  const presetButtons = document.querySelectorAll('.btn-preset');

  function getNames(): string[] {
    const val = inNames.value.trim();
    return val
      .split(/[\r\n,]+/g)
      .map((v) => v.trim())
      .filter((v) => !!v);
  }

  function updateMarbleCount() {
    const rawNames = getNames();
    let total = 0;
    rawNames.forEach((nameStr) => {
      const parsed = parseName(nameStr);
      if (parsed) total += parsed.count;
    });

    marbleCountBadge.textContent = `${total} ${total === 1 ? 'Marble' : 'Marbles'}`;
    ready = total > 0;
    btnStart.disabled = !ready;

    localStorage.setItem('mbr_names', inNames.value);

    switch (winnerType) {
      case 'first':
        setWinnerRank(1);
        break;
      case 'last':
        setWinnerRank(total || 1);
        break;
    }
  }

  function setWinnerRank(rank: number) {
    const safeRank = Math.max(1, rank);
    inWinningRank.value = String(safeRank);
    options.winningRank = safeRank - 1;
    roulette.setWinningRank(options.winningRank);

    btnFirstWinner?.classList.toggle('active', winnerType === 'first');
    btnLastWinner?.classList.toggle('active', winnerType === 'last');
    btnCustomWinner?.classList.toggle('active', winnerType === 'custom');
    inWinningRank.classList.toggle('visible', winnerType === 'custom');
  }

  function getReady() {
    const names = getNames();
    roulette.setMarbles(names);
    updateMarbleCount();
  }

  function showToast(msg: string) {
    const existing = document.querySelector('.toast-banner');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-banner';
    toast.textContent = t(msg);
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // Populate Maps
  function populateMaps() {
    sltMap.innerHTML = '';
    const maps = roulette.getMaps();
    maps.forEach((m) => {
      const opt = document.createElement('option');
      opt.value = String(m.index);
      opt.textContent = t(m.title);
      opt.setAttribute('data-trans', '');
      sltMap.appendChild(opt);
    });
  }

  // Populate Saved Names or Defaults
  function initNames() {
    const urlParams = new URLSearchParams(window.location.search);
    const namesFromUrl = urlParams.get('names');
    if (namesFromUrl) {
      inNames.value = namesFromUrl.replace(/,/g, '\n');
    } else {
      const saved = localStorage.getItem('mbr_names');
      if (saved) {
        inNames.value = saved;
      } else {
        inNames.value = '수박*2\n키위*2\n귤*2\n딸기*2\n바나나*2';
      }
    }
  }

  // Presets Handlers
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const preset = target.dataset.preset;
      switch (preset) {
        case '1-10':
          inNames.value = Array.from({ length: 10 }, (_, i) => String(i + 1)).join('\n');
          break;
        case '1-20':
          inNames.value = Array.from({ length: 20 }, (_, i) => String(i + 1)).join('\n');
          break;
        case 'fruits':
          inNames.value = '사과\n바나나\n딸기\n포도\n수박\n오렌지\n복숭아\n망고\n키위\n체리';
          break;
        case 'dice':
          inNames.value = '1 (⚀)\n2 (⚁)\n3 (⚂)\n4 (⚃)\n5 (⚄)\n6 (⚅)';
          break;
        case 'lunch':
          inNames.value = '치킨\n피자\n햄버거\n초밥\n파스타\n김치찌개\n돈까스\n짜장면\n샐러드\n제육볶음';
          break;
        case 'clear':
          inNames.value = '';
          break;
      }
      getReady();
    });
  });

  // Event Listeners
  inNames.addEventListener('input', () => {
    getReady();
  });

  btnShuffle.addEventListener('click', () => {
    const raw = getNames();
    const shuffled = shuffle(raw);
    inNames.value = shuffled.join('\n');
    getReady();
    soundService.playClick(1.2);
  });

  sltMap.addEventListener('change', (e) => {
    const idx = parseInt((e.target as HTMLSelectElement).value, 10);
    roulette.setMap(idx);
    getReady();
  });

  btnFirstWinner.addEventListener('click', () => {
    winnerType = 'first';
    setWinnerRank(1);
  });

  btnLastWinner.addEventListener('click', () => {
    winnerType = 'last';
    setWinnerRank(roulette.getCount());
  });

  btnCustomWinner.addEventListener('click', () => {
    winnerType = 'custom';
    const rank = parseInt(inWinningRank.value, 10) || 1;
    setWinnerRank(rank);
  });

  inWinningRank.addEventListener('input', (e) => {
    winnerType = 'custom';
    const val = parseInt((e.target as HTMLInputElement).value, 10) || 1;
    setWinnerRank(val);
  });

  // Toggles
  chkSkill.addEventListener('change', (e) => {
    options.useSkills = (e.target as HTMLInputElement).checked;
  });

  chkAutoRecording.addEventListener('change', (e) => {
    options.autoRecording = (e.target as HTMLInputElement).checked;
    roulette.setAutoRecording(options.autoRecording);
  });

  chkSound.addEventListener('change', (e) => {
    const muted = !(e.target as HTMLInputElement).checked;
    soundService.muted = muted;
    updateSoundBtnState();
  });

  chkDarkMode.addEventListener('change', (e) => {
    const isDark = (e.target as HTMLInputElement).checked;
    options.darkMode = isDark;
    roulette.setTheme(isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('light', !isDark);
  });

  function updateSoundBtnState() {
    const isMuted = soundService.muted;
    chkSound.checked = !isMuted;
    btnHudSound.innerHTML = isMuted ? '🔇' : '🔊';
    btnHudSound.title = isMuted ? 'Unmute Sound' : 'Mute Sound';
  }

  btnHudSound.addEventListener('click', () => {
    soundService.muted = !soundService.muted;
    updateSoundBtnState();
  });

  // Toggle Settings Panel
  btnToggleSettings.addEventListener('click', () => {
    settingsPanel.classList.toggle('collapsed');
  });

  // Start Button
  btnStart.addEventListener('click', () => {
    if (!ready) return;
    settingsPanel.classList.add('collapsed');
    hudDock.classList.remove('hidden');
    leaderboardHud.classList.remove('hidden');
    winnerModal.classList.add('hidden');

    currentSpeed = 1;
    roulette.setSpeed(1);
    btnHudSpeed.textContent = '1x';
    btnHudPause.innerHTML = '⏸️';

    roulette.start();
    startLeaderboardTicker();
  });

  // HUD Controls
  btnHudPause.addEventListener('click', () => {
    const paused = roulette.togglePause();
    btnHudPause.innerHTML = paused ? '▶️' : '⏸️';
    btnHudPause.classList.toggle('active', paused);
  });

  const speedTiers = [1, 2, 4, 8];
  btnHudSpeed.addEventListener('click', () => {
    const nextIdx = (speedTiers.indexOf(currentSpeed) + 1) % speedTiers.length;
    currentSpeed = speedTiers[nextIdx];
    roulette.setSpeed(currentSpeed);
    btnHudSpeed.textContent = `${currentSpeed}x`;
    soundService.playClick(1 + currentSpeed * 0.2);
  });

  btnHudShake.addEventListener('click', () => {
    roulette.shakeAllMarbles();
    soundService.playBumper();
  });

  btnHudReset.addEventListener('click', () => {
    stopLeaderboardTicker();
    roulette.reset();
    getReady();
    hudDock.classList.add('hidden');
    leaderboardHud.classList.add('hidden');
    winnerModal.classList.add('hidden');
    settingsPanel.classList.remove('collapsed');
  });

  // Leaderboard Ticker
  function startLeaderboardTicker() {
    stopLeaderboardTicker();
    liveUpdateTimer = window.setInterval(() => {
      const top = roulette.getLeaderboard(5);
      renderLeaderboard(top);
    }, 150);
  }

  function stopLeaderboardTicker() {
    if (liveUpdateTimer !== null) {
      clearInterval(liveUpdateTimer);
      liveUpdateTimer = null;
    }
  }

  function renderLeaderboard(list: { rank: number; name: string; hue: number; finished: boolean; isWinner: boolean }[]) {
    leaderboardList.innerHTML = '';
    list.forEach((item) => {
      const li = document.createElement('li');
      li.className = `leaderboard-item ${item.finished ? 'finished' : ''} ${item.isWinner ? 'target-winner' : ''}`;
      li.innerHTML = `
        <span class="rank-badge">${item.rank}</span>
        <span class="marble-dot" style="background-color: hsl(${item.hue}, 100%, 65%)"></span>
        <span class="marble-name">${item.name}</span>
        ${item.isWinner ? '<span class="crown-badge">👑</span>' : ''}
      `;
      leaderboardList.appendChild(li);
    });
  }

  // Goal & Winner Celebration
  roulette.addEventListener('goal', (e: any) => {
    stopLeaderboardTicker();
    const detail = e.detail || {};
    const winnerName = detail.winner || 'Unknown';
    const rank = detail.rank || options.winningRank + 1;

    setTimeout(() => {
      showWinnerModal(winnerName, rank);
    }, 1200);
  });

  roulette.addEventListener('message', (e: any) => {
    showToast(e.detail);
  });

  function showWinnerModal(winnerName: string, rank: number) {
    winnerNameEl.textContent = winnerName;
    winnerRankBadge.textContent = winnerType === 'first' ? t('1st Place') : winnerType === 'last' ? t('Last Place') : `#${rank}`;
    winnerTotalCount.textContent = `Total: ${roulette.getCount()}`;

    // Render Full Results Table
    rankingTableBody.innerHTML = '';
    const standings = roulette.getLeaderboard(100);
    standings.forEach((item) => {
      const tr = document.createElement('tr');
      if (item.name === winnerName) tr.className = 'winner-row';
      tr.innerHTML = `
        <td class="rank-col">${item.rank}</td>
        <td class="name-col">
          <span class="marble-dot" style="background-color: hsl(${item.hue}, 100%, 65%)"></span>
          ${item.name}
        </td>
        <td class="status-col">${item.name === winnerName ? '🏆 Winner' : ''}</td>
      `;
      rankingTableBody.appendChild(tr);
    });

    winnerModal.classList.remove('hidden');
    soundService.playGoal();
  }

  btnCopyResult.addEventListener('click', () => {
    const standings = roulette.getLeaderboard(100);
    let text = `🏆 **Marble Roulette Results**\n`;
    text += `Target Winner: ${winnerNameEl.textContent} (${winnerRankBadge.textContent})\n\n`;
    standings.forEach((item) => {
      const medal = item.rank === 1 ? '🥇 ' : item.rank === 2 ? '🥈 ' : item.rank === 3 ? '🥉 ' : '';
      text += `${medal}#${item.rank} ${item.name}${item.name === winnerNameEl.textContent ? ' 👑' : ''}\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast('The result has been copied');
    });
  });

  btnPlayAgain.addEventListener('click', () => {
    winnerModal.classList.add('hidden');
    btnShuffle.click();
    btnStart.click();
  });

  btnCloseWinner.addEventListener('click', () => {
    winnerModal.classList.add('hidden');
    hudDock.classList.add('hidden');
    leaderboardHud.classList.add('hidden');
    settingsPanel.classList.remove('collapsed');
  });

  // Initialize
  initNames();
  populateMaps();
  updateSoundBtnState();
  getReady();
  translatePage();
}
