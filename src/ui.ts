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

  // --- DOM refs ---
  const sidebar        = document.getElementById('sidebar')!;
  const inNames        = document.getElementById('in_names') as HTMLTextAreaElement;
  const marbleCountBadge = document.getElementById('marbleCountBadge')!;
  const btnStart       = document.getElementById('btnStart') as HTMLButtonElement;
  const btnShuffle     = document.getElementById('btnShuffle') as HTMLButtonElement;
  const btnToggleSidebar = document.getElementById('btnToggleSidebar') as HTMLButtonElement;
  const btnOpenSidebar = document.getElementById('btnOpenSidebar') as HTMLButtonElement;
  const sltMap         = document.getElementById('sltMap') as HTMLSelectElement;

  const btnFirstWinner  = document.querySelector('.btn-first-winner') as HTMLButtonElement;
  const btnLastWinner   = document.querySelector('.btn-last-winner') as HTMLButtonElement;
  const btnCustomWinner = document.querySelector('.btn-custom-winner') as HTMLButtonElement;
  const inWinningRank   = document.getElementById('in_winningRank') as HTMLInputElement;

  const chkSkill         = document.getElementById('chkSkill') as HTMLInputElement;
  const chkAutoRecording = document.getElementById('chkAutoRecording') as HTMLInputElement;
  const chkSound         = document.getElementById('chkSound') as HTMLInputElement;
  const chkDarkMode      = document.getElementById('chkDarkMode') as HTMLInputElement;

  const controlBar   = document.getElementById('controlBar')!;
  const btnHudPause  = document.getElementById('btnHudPause') as HTMLButtonElement;
  const iconPause    = document.getElementById('iconPause')!;
  const iconPlay     = document.getElementById('iconPlay')!;
  const btnHudSpeed  = document.getElementById('btnHudSpeed') as HTMLButtonElement;
  const btnHudShake  = document.getElementById('btnHudShake') as HTMLButtonElement;
  const btnHudReset  = document.getElementById('btnHudReset') as HTMLButtonElement;
  const btnHudSound  = document.getElementById('btnHudSound') as HTMLButtonElement;
  const iconSoundOn  = document.getElementById('iconSoundOn')!;
  const iconSoundOff = document.getElementById('iconSoundOff')!;
  const rankStrip    = document.getElementById('rankStrip')!;

  const resultModal    = document.getElementById('resultModal')!;
  const resultName     = document.getElementById('resultName')!;
  const resultRankLabel = document.getElementById('resultRankLabel')!;
  const resultTotal    = document.getElementById('resultTotal')!;
  const resultTableBody = document.getElementById('resultTableBody')!;
  const btnCopyResult  = document.getElementById('btnCopyResult') as HTMLButtonElement;
  const btnPlayAgain   = document.getElementById('btnPlayAgain') as HTMLButtonElement;
  const btnCloseResult = document.getElementById('btnCloseResult') as HTMLButtonElement;

  const presetButtons = document.querySelectorAll('.btn-preset');

  // --- Helpers ---
  function getNames(): string[] {
    return inNames.value.trim()
      .split(/[\r\n,]+/g)
      .map(v => v.trim())
      .filter(Boolean);
  }

  function updateMarbleCount() {
    const rawNames = getNames();
    let total = 0;
    rawNames.forEach(s => { const p = parseName(s); if (p) total += p.count; });
    marbleCountBadge.textContent = String(total);
    ready = total > 0;
    btnStart.disabled = !ready;
    localStorage.setItem('mbr_names', inNames.value);
    if (winnerType === 'first') setWinnerRank(1);
    if (winnerType === 'last')  setWinnerRank(total || 1);
  }

  function setWinnerRank(rank: number) {
    const safe = Math.max(1, rank);
    inWinningRank.value = String(safe);
    options.winningRank = safe - 1;
    roulette.setWinningRank(options.winningRank);
    btnFirstWinner?.classList.toggle('active', winnerType === 'first');
    btnLastWinner?.classList.toggle('active', winnerType === 'last');
    btnCustomWinner?.classList.toggle('active', winnerType === 'custom');
    inWinningRank.classList.toggle('visible', winnerType === 'custom');
  }

  function getReady() {
    roulette.setMarbles(getNames());
    updateMarbleCount();
  }

  function showToast(msg: string) {
    const el = document.getElementById('toast')!;
    el.textContent = t(msg);
    el.classList.remove('hidden', 'hide');
    setTimeout(() => {
      el.classList.add('hide');
      setTimeout(() => el.classList.add('hidden'), 220);
    }, 2200);
  }

  function populateMaps() {
    sltMap.innerHTML = '';
    roulette.getMaps().forEach(m => {
      const opt = document.createElement('option');
      opt.value = String(m.index);
      opt.textContent = t(m.title);
      sltMap.appendChild(opt);
    });
  }

  function initNames() {
    const p = new URLSearchParams(window.location.search).get('names');
    if (p) { inNames.value = p.replace(/,/g, '\n'); return; }
    const saved = localStorage.getItem('mbr_names');
    inNames.value = saved ?? 'suika*2\nkiwi*2\norange*2\nstrawberry*2\nbanana*2';
  }

  function setSidebarOpen(open: boolean) {
    sidebar.classList.toggle('collapsed', !open);
    btnOpenSidebar.classList.toggle('hidden', open);
  }

  function updateSoundIcons() {
    const muted = soundService.muted;
    chkSound.checked = !muted;
    iconSoundOn.classList.toggle('hidden', muted);
    iconSoundOff.classList.toggle('hidden', !muted);
  }

  function updatePauseIcons(paused: boolean) {
    iconPause.classList.toggle('hidden', paused);
    iconPlay.classList.toggle('hidden', !paused);
    btnHudPause.classList.toggle('active', paused);
  }

  function renderRankStrip(list: { rank: number; name: string; hue: number; finished: boolean; isWinner: boolean }[]) {
    rankStrip.innerHTML = '';
    list.forEach(item => {
      const div = document.createElement('div');
      div.className = `rank-item${item.finished ? ' rank-done' : ''}`;
      div.innerHTML = `
        <span class="rank-num">${item.rank}</span>
        <span class="rank-dot" style="background:hsl(${item.hue},80%,60%)"></span>
        <span class="rank-name">${item.name}</span>
      `;
      rankStrip.appendChild(div);
    });
  }

  // --- Preset buttons ---
  presetButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      const preset = (e.currentTarget as HTMLElement).dataset.preset;
      if (preset === '1-10') inNames.value = Array.from({length:10},(_,i)=>String(i+1)).join('\n');
      else if (preset === '1-20') inNames.value = Array.from({length:20},(_,i)=>String(i+1)).join('\n');
      else if (preset === 'fruits') inNames.value = '사과\n바나나\n딸기\n포도\n수박\n오렌지\n복숭아\n망고\n키위\n체리';
      else if (preset === 'dice')  inNames.value = '1 (⚀)\n2 (⚁)\n3 (⚂)\n4 (⚃)\n5 (⚄)\n6 (⚅)';
      else if (preset === 'lunch') inNames.value = '치킨\n피자\n햄버거\n초밥\n파스타\n김치찌개\n돈까스\n짜장면\n샐러드\n제육볶음';
      else if (preset === 'clear') inNames.value = '';
      getReady();
    });
  });

  // --- Input handlers ---
  inNames.addEventListener('input', getReady);
  btnShuffle.addEventListener('click', () => {
    inNames.value = shuffle(getNames()).join('\n');
    getReady();
    soundService.playClick(1.2);
  });
  sltMap.addEventListener('change', e => {
    roulette.setMap(parseInt((e.target as HTMLSelectElement).value, 10));
    getReady();
  });

  btnFirstWinner.addEventListener('click', () => { winnerType = 'first';  setWinnerRank(1); });
  btnLastWinner.addEventListener('click',  () => { winnerType = 'last';   setWinnerRank(roulette.getCount()); });
  btnCustomWinner.addEventListener('click',() => { winnerType = 'custom'; setWinnerRank(parseInt(inWinningRank.value,10)||1); });
  inWinningRank.addEventListener('input', e => {
    winnerType = 'custom';
    setWinnerRank(parseInt((e.target as HTMLInputElement).value,10)||1);
  });

  chkSkill.addEventListener('change', e => { options.useSkills = (e.target as HTMLInputElement).checked; });
  chkAutoRecording.addEventListener('change', e => {
    options.autoRecording = (e.target as HTMLInputElement).checked;
    roulette.setAutoRecording(options.autoRecording);
  });
  chkSound.addEventListener('change', e => {
    soundService.muted = !(e.target as HTMLInputElement).checked;
    updateSoundIcons();
  });
  chkDarkMode.addEventListener('change', e => {
    const dark = (e.target as HTMLInputElement).checked;
    options.darkMode = dark;
    roulette.setTheme(dark ? 'dark' : 'light');
    document.documentElement.classList.toggle('light', !dark);
  });

  // --- Sidebar toggle ---
  btnToggleSidebar.addEventListener('click', () => setSidebarOpen(false));
  btnOpenSidebar.addEventListener('click',   () => setSidebarOpen(true));

  // --- Start ---
  btnStart.addEventListener('click', () => {
    if (!ready) return;
    setSidebarOpen(false);
    controlBar.classList.remove('hidden');
    rankStrip.classList.remove('hidden');
    resultModal.classList.add('hidden');
    currentSpeed = 1;
    roulette.setSpeed(1);
    btnHudSpeed.textContent = '1×';
    updatePauseIcons(false);
    roulette.start();
    startRankTicker();
  });

  // --- Control bar ---
  btnHudPause.addEventListener('click', () => {
    const paused = roulette.togglePause();
    updatePauseIcons(paused);
  });

  const speedTiers = [1, 2, 4, 8];
  btnHudSpeed.addEventListener('click', () => {
    currentSpeed = speedTiers[(speedTiers.indexOf(currentSpeed)+1) % speedTiers.length];
    roulette.setSpeed(currentSpeed);
    btnHudSpeed.textContent = `${currentSpeed}×`;
    soundService.playClick(1 + currentSpeed * 0.2);
  });

  btnHudShake.addEventListener('click', () => {
    roulette.shakeAllMarbles();
    soundService.playBumper();
  });

  btnHudSound.addEventListener('click', () => {
    soundService.muted = !soundService.muted;
    updateSoundIcons();
  });

  btnHudReset.addEventListener('click', () => {
    stopRankTicker();
    roulette.reset();
    getReady();
    controlBar.classList.add('hidden');
    rankStrip.classList.add('hidden');
    resultModal.classList.add('hidden');
    setSidebarOpen(true);
  });

  // --- Rank ticker ---
  function startRankTicker() {
    stopRankTicker();
    liveUpdateTimer = window.setInterval(() => {
      renderRankStrip(roulette.getLeaderboard(8));
    }, 200);
  }
  function stopRankTicker() {
    if (liveUpdateTimer !== null) { clearInterval(liveUpdateTimer); liveUpdateTimer = null; }
  }

  // --- Goal event ---
  roulette.addEventListener('goal', (e: any) => {
    stopRankTicker();
    const { winner, rank } = e.detail || {};
    setTimeout(() => showResult(winner || 'Unknown', rank || (options.winningRank + 1)), 1200);
  });

  roulette.addEventListener('message', (e: any) => showToast(e.detail));

  function showResult(winnerName: string, rank: number) {
    resultName.textContent = winnerName;
    resultRankLabel.textContent =
      winnerType === 'first' ? t('1st Place') :
      winnerType === 'last'  ? t('Last Place') : `#${rank}`;
    resultTotal.textContent = `Total: ${roulette.getCount()}`;

    resultTableBody.innerHTML = '';
    roulette.getLeaderboard(100).forEach(item => {
      const tr = document.createElement('tr');
      if (item.name === winnerName) tr.className = 'winner-row';
      tr.innerHTML = `
        <td>${item.rank}</td>
        <td><span class="marble-dot" style="background:hsl(${item.hue},80%,60%)"></span>${item.name}</td>
        <td>${item.isWinner ? '★' : ''}</td>
      `;
      resultTableBody.appendChild(tr);
    });

    resultModal.classList.remove('hidden');
    soundService.playGoal();
  }

  btnCopyResult.addEventListener('click', () => {
    const standings = roulette.getLeaderboard(100);
    let text = `Marble Roulette Results\nWinner: ${resultName.textContent} (${resultRankLabel.textContent})\n\n`;
    standings.forEach(item => { text += `#${item.rank} ${item.name}${item.isWinner ? ' *' : ''}\n`; });
    navigator.clipboard.writeText(text).then(() => showToast('The result has been copied'));
  });

  btnPlayAgain.addEventListener('click', () => {
    resultModal.classList.add('hidden');
    btnShuffle.click();
    btnStart.click();
  });

  btnCloseResult.addEventListener('click', () => {
    resultModal.classList.add('hidden');
    controlBar.classList.add('hidden');
    rankStrip.classList.add('hidden');
    setSidebarOpen(true);
  });

  // --- Init ---
  initNames();
  populateMaps();
  updateSoundIcons();
  getReady();
  translatePage();
}