/**
 * THE LOST PC - WINDOWS 98 ENGINE
 * Gandhi Hackathon 2026 | OpenLake x Meraz (IIT Bhilai)
 * Clean, modular Vanilla JavaScript
 */

// ============================================================================
// 1. STATE & GLOBAL CONFIGURATION
// ============================================================================

const state = {
  activeWindow: null,
  highestZIndex: 100,
  soundEnabled: true,
  crtEnabled: false,
  recycleBinItems: [
    { name: "homework_final_FINAL_v2.doc", size: "320 KB", icon: "assets/file-text.svg" },
    { name: "dialup_modem_screech.wav", size: "840 KB", icon: "assets/sound.svg" },
    { name: "y2k_survival_guide.txt", size: "45 KB", icon: "assets/file-text.svg" },
    { name: "unnamed_secret_plan.exe", size: "640 KB", icon: "assets/danger.svg" }
  ],
  savedNotes: localStorage.getItem("the_lost_pc_notepad") || "",
  clippyIndex: 0,
  matrixRunning: false,
  openWindows: new Set()
};

// Preset text files content
const FILE_CONTENTS = {
  "read_me_first.txt": `[THE LOST PC - SYSTEM AUDIT LOG]
Date: October 14, 1998
Location: Indian Institute of Technology Bhilai, Computer Center Room 204
Machine: COMPAQ Presario 5000 (Pentium II 300MHz, 64MB RAM)
Owner: Dr. Vikram Malhotra (Research Scholar)

STATUS: Abandoned during the pre-Y2K hardware migration.

IMPORTANT NOTES FOR FINDER:
1. Please do NOT click "DO_NOT_CLICK.exe" on the desktop. It triggers experimental unstable kernel instructions.
2. If you are here for the Gandhi Hackathon 2026, check out C:\\Secret\\hackathon_confidential.txt.
3. Don't snoop in my secret diary. There are things about 56k dial-up you don't want to know.
4. Try typing "matrix" or "hack" in the MS-DOS prompt.

- Dr. V. Malhotra (1998)`,

  "secret_diary.txt": `=== PERSONAL CONFIDENTIAL DIARY (DO NOT READ!) ===

[July 12, 1998]
France won the World Cup 3-0 against Brazil! Zidane is a legend!
Celebrated by attempting to download a 2MB JPEG of the victory. Netscape says:
"Estimated time remaining: 1 hour 42 minutes". God bless dial-up.

[August 24, 1998]
Finally upgraded to a 56k V.90 modem! The modem screech sounds like an alien
abduction but it's the sweetest music on earth.
Was downloading an Eminem MP3 at 98% after 3 hours.
Then my mother picked up the living room telephone to call my aunt.
Connection terminated. Download failed. I am moving out.

[October 3, 1998]
Y2K bug preparations: Stockpiled 40 cans of baked beans and 80 floppy disks in
my dorm room. The news says when midnight strikes on Dec 31, 1999, microwaves
will develop artificial intelligence and take over the earth.

[November 1, 2026]
WAIT A MINUTE. Why does my system clock suddenly say year 2026?!
Who are these Gandhi Hackathon judges examining my computer right now?!
DEAR JUDGES: IF YOU GIVE THIS TEAM FIRST PRIZE, I PROMISE TO FIX THE Y2K BUG!`,

  "hackathon_confidential.txt": `===============================================================
IIT BHILAI - GANDHI HACKATHON 2026
OpenLake × Meraz
Problem Statement: THE ABANDONED COMPUTER
===============================================================

CONGRATULATIONS! You have discovered the hidden hackathon vault!

Judge Criteria Checklist Addressed in "THE LOST PC":
[✔] Visual Authenticity: Authentic Windows 98 3D bevels, teal desktop (#008080), classic icons & fonts.
[✔] Interactive Windows: My Computer, My Documents, Notepad (with localStorage), IE, Recycle Bin.
[✔] Functional Games: Fully playable Minesweeper with timer & smiley face reactions!
[✔] Nostalgic Sound: Synthesized 98 Startup Chord, Error Dings & 56k Dial-Up (Pure Web Audio API!).
[✔] Entertaining Easter Eggs:
    - BSOD with reboot sequence into BIOS & Windows 98 cloud splash screen!
    - Cascading error dialogs on DO_NOT_CLICK.exe
    - Interactive Clippy giving unsolicited hackathon scoring advice
    - MS-DOS prompt with 'matrix', 'hack', 'cls', 'dir' commands
    - 1998 Google Beta search engine with retro results

Judges: Remember Section 04 of the problem statement:
"You make us laugh and we give you points, deal!!"
We kept our end of the deal! 🏆`,

  "time_machine_blueprints.txt": `TIME MACHINE SCHEMATIC v1.0b
----------------------------------------------
Components Required:
1. Pentium II Processor overclocked to 350MHz
2. Sound Blaster 16 Card configured to IRQ 5
3. 1.21 Gigawatts of electricity
4. 1x Quantum Fireball 2.1GB Hard Drive
5. Exactly 100 points from Gandhi Hackathon judges

Operation Instructions:
Load Windows 98, open MS-DOS prompt, type 'matrix', and hold onto your chair.`,

  "autoexec.bat": `@ECHO OFF
PROMPT $P$G
PATH C:\\WINDOWS;C:\\WINDOWS\\COMMAND
SET SOUND=C:\\SB16
SET BLASTER=A220 I5 D1 H5 P330 T6
LH C:\\WINDOWS\\SMARTDRV.EXE
LH C:\\WINDOWS\\COMMAND\\MSCDEX.EXE /D:MSCD001
ECHO =============================================
ECHO Welcome to Windows 98 Second Edition
ECHO Indian Institute of Technology Bhilai (1998)
ECHO =============================================`
};

// ============================================================================
// 2. WEB AUDIO API SYNTHESIZER (Zero external sound files needed!)
// ============================================================================

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Windows 98 Iconic Startup Chord
function playStartupSound() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // F Major 9 / lush dreamy chord: F3, C4, A4, C5, E5, G5
    const freqs = [174.61, 261.63, 440.0, 523.25, 659.25, 783.99];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + 3.5);
    });
  } catch (e) {
    console.warn("Audio playback not permitted yet", e);
  }
}

// Windows Error "Ding / Chord"
function playErrorSound() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(350, now + 0.1);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (e) {
    console.warn("Audio error", e);
  }
}

// Floppy / Click sound
function playClickSound() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {}
}

// 56k Dial-Up Handshake Sound Simulation
function playDialupSound() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    showToast("Connecting to V.90 56,000 bps Dial-Up Server...");

    // Dial tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.frequency.setValueAtTime(440, now);
    gain1.gain.setValueAtTime(0.1, now);
    gain1.gain.setValueAtTime(0, now + 0.8);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.8);

    // Beep sweeps (handshake tones)
    const tones = [941, 1336, 1209, 1477, 2100, 1800, 2400];
    tones.forEach((tone, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startT = now + 0.9 + idx * 0.22;

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(tone, startT);
      gain.gain.setValueAtTime(0.08, startT);
      gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startT);
      osc.stop(startT + 0.2);
    });

    // Static hiss
    setTimeout(() => {
      showToast("Connected at 52,000 bps! Welcome to the World Wide Web.");
    }, 2800);
  } catch (e) {}
}

// ============================================================================
// 3. WINDOW MANAGEMENT SYSTEM
// ============================================================================

function openWindow(appId) {
  playClickSound();
  const win = document.getElementById(`window-${appId}`);
  if (!win) {
    console.error(`Window not found: window-${appId}`);
    return;
  }

  win.style.display = "flex";
  win.classList.remove("minimized");
  bringToFront(win);
  state.openWindows.add(appId);

  updateTaskbar();
  closeStartMenu();

  // If opening notepad, initialize text if empty
  if (appId === "notepad") {
    const textarea = document.getElementById("notepad-textarea");
    if (!textarea.value && state.savedNotes) {
      textarea.value = state.savedNotes;
      updateNotepadStatus();
    }
  }

  // If opening minesweeper, init board if empty
  if (appId === "minesweeper" && !document.querySelector(".cell")) {
    initMinesweeper();
  }
}

function closeWindow(appId) {
  playClickSound();
  const win = document.getElementById(`window-${appId}`);
  if (!win) return;
  win.style.display = "none";
  state.openWindows.delete(appId);

  if (state.activeWindow === win) {
    state.activeWindow = null;
    // Activate next highest window
    const visibleWindows = Array.from(document.querySelectorAll(".window")).filter(
      (w) => w.style.display === "flex" && !w.classList.contains("minimized")
    );
    if (visibleWindows.length > 0) {
      visibleWindows.sort((a, b) => (parseInt(b.style.zIndex) || 0) - (parseInt(a.style.zIndex) || 0));
      bringToFront(visibleWindows[0]);
    }
  }

  updateTaskbar();
}

function minimizeWindow(appId) {
  playClickSound();
  const win = document.getElementById(`window-${appId}`);
  if (!win) return;
  win.classList.add("minimized");
  if (state.activeWindow === win) {
    state.activeWindow = null;
  }
  updateTaskbar();
}

function maximizeWindow(appId) {
  playClickSound();
  const win = document.getElementById(`window-${appId}`);
  if (!win) return;
  win.classList.toggle("maximized");
}

function bringToFront(win) {
  if (!win) return;
  state.highestZIndex += 2;
  win.style.zIndex = state.highestZIndex;

  document.querySelectorAll(".window").forEach((w) => w.classList.remove("active"));
  win.classList.add("active");
  state.activeWindow = win;

  updateTaskbar();
}

function updateTaskbar() {
  const container = document.getElementById("taskbar-tasks");
  container.innerHTML = "";

  state.openWindows.forEach((appId) => {
    const win = document.getElementById(`window-${appId}`);
    if (!win) return;

    const titleEl = win.querySelector(".window-title span");
    const iconEl = win.querySelector(".window-title img");
    const titleText = titleEl ? titleEl.textContent : appId;
    const iconSrc = iconEl ? iconEl.src : "assets/win98-logo.svg";

    const taskBtn = document.createElement("button");
    taskBtn.className = "win-btn taskbar-item";
    if (state.activeWindow === win && !win.classList.contains("minimized")) {
      taskBtn.classList.add("active");
    }

    taskBtn.innerHTML = `<img src="${iconSrc}" alt=""><span>${titleText}</span>`;

    taskBtn.addEventListener("click", () => {
      playClickSound();
      if (win.classList.contains("minimized")) {
        win.classList.remove("minimized");
        bringToFront(win);
      } else if (state.activeWindow === win) {
        win.classList.add("minimized");
        state.activeWindow = null;
        updateTaskbar();
      } else {
        bringToFront(win);
      }
    });

    container.appendChild(taskBtn);
  });
}

// Make windows draggable with mouse and touch support
function setupWindowDraggable(win) {
  const titlebar = win.querySelector(".window-titlebar");
  if (!titlebar) return;

  let isDragging = false;
  let startX = 0, startY = 0;
  let initLeft = 0, initTop = 0;

  function onPointerDown(e) {
    // Ignore clicks on control buttons
    if (e.target.closest(".window-controls")) return;

    bringToFront(win);
    if (win.classList.contains("maximized")) return;

    isDragging = true;
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);

    startX = clientX;
    startY = clientY;

    const rect = win.getBoundingClientRect();
    initLeft = rect.left;
    initTop = rect.top;

    document.addEventListener("mousemove", onPointerMove);
    document.addEventListener("mouseup", onPointerUp);
    document.addEventListener("touchmove", onPointerMove, { passive: false });
    document.addEventListener("touchend", onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    let newLeft = Math.max(0, Math.min(window.innerWidth - 60, initLeft + deltaX));
    let newTop = Math.max(0, Math.min(window.innerHeight - 80, initTop + deltaY));

    win.style.left = `${newLeft}px`;
    win.style.top = `${newTop}px`;

    if (e.cancelable) e.preventDefault();
  }

  function onPointerUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onPointerMove);
    document.removeEventListener("mouseup", onPointerUp);
    document.removeEventListener("touchmove", onPointerMove);
    document.removeEventListener("touchend", onPointerUp);
  }

  titlebar.addEventListener("mousedown", onPointerDown);
  titlebar.addEventListener("touchstart", onPointerDown, { passive: true });

  // Click on window body to bring to front
  win.addEventListener("mousedown", () => bringToFront(win));
  win.addEventListener("touchstart", () => bringToFront(win), { passive: true });

  // Control buttons
  const minBtn = win.querySelector(".win-control-btn.minimize");
  const maxBtn = win.querySelector(".win-control-btn.maximize");
  const closeBtn = win.querySelector(".win-control-btn.close");

  const appId = win.id.replace("window-", "");

  if (minBtn) minBtn.addEventListener("click", (e) => { e.stopPropagation(); minimizeWindow(appId); });
  if (maxBtn) maxBtn.addEventListener("click", (e) => { e.stopPropagation(); maximizeWindow(appId); });
  if (closeBtn) closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closeWindow(appId); });
}

// ============================================================================
// 4. START MENU & SYSTEM CLOCK
// ============================================================================

function toggleStartMenu() {
  playClickSound();
  const menu = document.getElementById("start-menu");
  const startBtn = document.getElementById("start-button");
  menu.classList.toggle("open");
  startBtn.classList.toggle("active");
}

function closeStartMenu() {
  const menu = document.getElementById("start-menu");
  const startBtn = document.getElementById("start-button");
  if (menu) menu.classList.remove("open");
  if (startBtn) startBtn.classList.remove("active");
}

function updateSystemClock() {
  const clockEl = document.getElementById("digital-clock");
  if (!clockEl) return;
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  clockEl.textContent = `${hours}:${minutes} ${ampm}`;
}

// ============================================================================
// 5. NOTEPAD APPLICATION (with localStorage persistence)
// ============================================================================

function setupNotepad() {
  const textarea = document.getElementById("notepad-textarea");
  const statusEl = document.getElementById("notepad-status");
  const titleEl = document.getElementById("notepad-title");
  const quickSaveBtn = document.getElementById("notepad-save-btn");

  const menuNew = document.getElementById("notepad-menu-new");
  const menuSave = document.getElementById("notepad-menu-save");
  const menuSaveAs = document.getElementById("notepad-menu-saveas");
  const menuClear = document.getElementById("notepad-menu-clear");
  const menuAbout = document.getElementById("notepad-menu-about");

  function saveNote() {
    playClickSound();
    localStorage.setItem("the_lost_pc_notepad", textarea.value);
    state.savedNotes = textarea.value;
    updateNotepadStatus(true);
    showToast("File saved to Local Disk (C:) successfully!");
  }

  if (quickSaveBtn) quickSaveBtn.addEventListener("click", saveNote);
  if (menuSave) menuSave.addEventListener("click", saveNote);

  if (menuNew) {
    menuNew.addEventListener("click", () => {
      playClickSound();
      textarea.value = "";
      titleEl.textContent = "Untitled - Notepad";
      updateNotepadStatus();
    });
  }

  if (menuSaveAs) {
    menuSaveAs.addEventListener("click", () => {
      const filename = prompt("Enter filename to save:", "my_note.txt");
      if (filename) {
        saveNote();
        titleEl.textContent = `${filename} - Notepad`;
      }
    });
  }

  if (menuClear) {
    menuClear.addEventListener("click", () => {
      playClickSound();
      textarea.value = "";
      updateNotepadStatus();
    });
  }

  if (menuAbout) {
    menuAbout.addEventListener("click", () => {
      showModal("About Notepad", "Notepad v4.10 for Windows 98.\nRe-engineered for Gandhi Hackathon 2026.");
    });
  }

  textarea.addEventListener("input", () => updateNotepadStatus(false));
  textarea.addEventListener("keyup", () => updateNotepadStatus(false));
  textarea.addEventListener("click", () => updateNotepadStatus(false));

  // Shortcut Ctrl+S
  textarea.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      saveNote();
    }
  });
}

function updateNotepadStatus(isSaved) {
  const textarea = document.getElementById("notepad-textarea");
  const statusEl = document.getElementById("notepad-status");
  if (!textarea || !statusEl) return;

  const text = textarea.value;
  const pos = textarea.selectionStart;
  const lines = text.substring(0, pos).split("\n");
  const lineNo = lines.length;
  const colNo = lines[lines.length - 1].length + 1;

  const savedStatus = isSaved !== undefined ? (isSaved ? "Yes" : "No") : (text === state.savedNotes ? "Yes" : "No");
  statusEl.textContent = `Ln ${lineNo}, Col ${colNo} | Chars: ${text.length} | Saved: ${savedStatus}`;
}

function openFile(fileName) {
  playClickSound();
  const content = FILE_CONTENTS[fileName] || `File ${fileName} not found.`;
  const textarea = document.getElementById("notepad-textarea");
  const titleEl = document.getElementById("notepad-title");

  textarea.value = content;
  titleEl.textContent = `${fileName} - Notepad`;
  updateNotepadStatus();
  openWindow("notepad");
}

function openImageFile(fileName) {
  playClickSound();
  const imgEl = document.getElementById("image-viewer-img");
  const titleEl = document.getElementById("image-viewer-title");
  const statusEl = document.getElementById("image-viewer-status");

  imgEl.src = `assets/${fileName}`;
  imgEl.style.transform = "scale(1)";
  titleEl.textContent = `Image Viewer - ${fileName}`;
  statusEl.textContent = `${fileName} | 640 × 480 | 24-bit TrueColor`;

  openWindow("image-viewer");
}

// ============================================================================
// 6. INTERNET EXPLORER 4.0 (1998 Retro Browser)
// ============================================================================

const searchDatabase = [
  {
    query: "gandhi hackathon",
    title: "IIT Bhilai - Gandhi Hackathon 2026: The Abandoned Computer",
    url: "http://hackathon.iitbhilai.ac.in",
    desc: "OpenLake x Meraz presents the 2026 Gandhi Hackathon. Challenge: Bring an abandoned Windows 98 machine back to life with authentic retro design and crazy Easter eggs!"
  },
  {
    query: "iit bhilai",
    title: "Indian Institute of Technology Bhilai - Official Portal",
    url: "http://www.iitbhilai.ac.in",
    desc: "Premier engineering institute in Chhattisgarh, India. Home to OpenLake open-source society and the Meraz Annual Tech Fest."
  },
  {
    query: "windows 98",
    title: "Microsoft Announces Windows 98 with USB Support & IE 4.0",
    url: "http://www.microsoft.com/press/1998/win98",
    desc: "June 25, 1998: Microsoft officially releases Windows 98, featuring FAT32 file system, USB support, and deep Internet Explorer integration."
  },
  {
    query: "y2k bug",
    title: "The Millennium Bug: Will Computers Crash on Jan 1, 2000?",
    url: "http://www.y2k-panic-survival.com",
    desc: "Experts predict date formatting bugs could trigger worldwide electrical grid failures and elevators falling. Advice: Buy floppy disks and canned beans."
  },
  {
    query: "world cup 1998",
    title: "FIFA World Cup France 98 - Official Results",
    url: "http://www.france98.com",
    desc: "France triumphs 3-0 against Brazil in the final at Stade de France with two header goals by Zinedine Zidane and one by Emmanuel Petit."
  }
];

function ieGoHome() {
  ieLoadUrl("http://www.google.com");
}

function ieLoadUrl(url) {
  playClickSound();
  const addressBar = document.getElementById("ie-address-bar");
  const status = document.getElementById("ie-status");
  addressBar.value = url;
  status.textContent = "Opening " + url + "...";

  document.getElementById("ie-page-google").style.display = "none";
  document.getElementById("ie-page-geocities").style.display = "none";
  document.getElementById("ie-page-hackathon").style.display = "none";

  setTimeout(() => {
    if (url.includes("geocities")) {
      document.getElementById("ie-page-geocities").style.display = "block";
    } else if (url.includes("hackathon")) {
      document.getElementById("ie-page-hackathon").style.display = "block";
    } else {
      document.getElementById("ie-page-google").style.display = "block";
    }
    status.textContent = "Done";
  }, 250);
}

function searchGoogle(query) {
  const input = document.getElementById("google-search-input");
  input.value = query;
  performGoogleSearch();
}

function performGoogleSearch() {
  playClickSound();
  const input = document.getElementById("google-search-input");
  const resultsContainer = document.getElementById("google-search-results");
  const query = (input.value || "").trim().toLowerCase();

  if (!query) {
    resultsContainer.innerHTML = "<p style='color:#666;'>Please enter a search query.</p>";
    return;
  }

  const matches = searchDatabase.filter((item) =>
    item.query.includes(query) || item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
  );

  let html = `<p style='font-size:12px; margin-bottom:12px; color:#555;'>Searched the web for <strong>${input.value}</strong>. Showing ${matches.length || 1} result(s):</p>`;

  if (matches.length > 0) {
    matches.forEach((m) => {
      html += `
        <div class="search-result-item">
          <a href="javascript:void(0)" onclick="showModal('${m.title}', '${m.desc}')">${m.title}</a><br>
          <span style="color:#008000; font-size:11px;">${m.url}</span>
          <p>${m.desc}</p>
        </div>
      `;
    });
  } else {
    // Funny generic 1998 result
    html += `
      <div class="search-result-item">
        <a href="javascript:void(0)" onclick="showModal('AltaVista 1998', 'Search powered by DEC AltaVista web spider.')">1998 Search Match: "${input.value}"</a><br>
        <span style="color:#008000; font-size:11px;">http://www.altavista.digital.com/results?q=${encodeURIComponent(query)}</span>
        <p>Found 4,210 web pages matching "${input.value}" across USENET newsgroups and Geocities homesteads. Connection speed: 56 kbps.</p>
      </div>
      <div class="search-result-item">
        <a href="javascript:void(0)" onclick="openWindow('notepad'); openFile('hackathon_confidential.txt')">Secret Hackathon Dossier for "${input.value}"</a><br>
        <span style="color:#008000; font-size:11px;">http://www.iitbhilai.ac.in/secret/classified</span>
        <p>Judges: You found an easter egg search result! Click to view secret project blueprints.</p>
      </div>
    `;
  }

  resultsContainer.innerHTML = html;
}

function setupInternetExplorer() {
  const searchBtn = document.getElementById("google-search-btn");
  const luckyBtn = document.getElementById("google-lucky-btn");
  const searchInput = document.getElementById("google-search-input");
  const goBtn = document.getElementById("ie-go-btn");
  const addressBar = document.getElementById("ie-address-bar");

  const backBtn = document.getElementById("ie-back-btn");
  const fwdBtn = document.getElementById("ie-fwd-btn");
  const stopBtn = document.getElementById("ie-stop-btn");
  const refreshBtn = document.getElementById("ie-refresh-btn");
  const homeBtn = document.getElementById("ie-home-btn");

  if (searchBtn) searchBtn.addEventListener("click", performGoogleSearch);
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performGoogleSearch();
    });
  }

  if (luckyBtn) {
    luckyBtn.addEventListener("click", () => {
      playDialupSound();
      ieLoadUrl("http://www.geocities.com");
    });
  }

  if (goBtn) {
    goBtn.addEventListener("click", () => {
      ieLoadUrl(addressBar.value);
    });
  }

  if (addressBar) {
    addressBar.addEventListener("keypress", (e) => {
      if (e.key === "Enter") ieLoadUrl(addressBar.value);
    });
  }

  if (homeBtn) homeBtn.addEventListener("click", ieGoHome);
  if (refreshBtn) refreshBtn.addEventListener("click", () => ieLoadUrl(addressBar.value));
  if (stopBtn) stopBtn.addEventListener("click", () => showToast("Navigation stopped."));
  if (backBtn) backBtn.addEventListener("click", ieGoHome);
  if (fwdBtn) fwdBtn.addEventListener("click", () => ieLoadUrl("http://www.geocities.com"));
}

// ============================================================================
// 7. RECYCLE BIN FUNCTIONALITY
// ============================================================================

function setupRecycleBin() {
  const emptyBtn = document.getElementById("recycle-empty-btn");
  const restoreBtn = document.getElementById("recycle-restore-btn");
  const itemsContainer = document.getElementById("recycle-bin-items");
  const statusText = document.getElementById("recycle-status-text");
  const desktopBinImg = document.getElementById("recycle-bin-icon-img");

  function renderBin() {
    itemsContainer.innerHTML = "";
    if (state.recycleBinItems.length === 0) {
      itemsContainer.innerHTML = "<p style='color:#666; padding:16px;'>The Recycle Bin is completely empty.</p>";
      statusText.textContent = "0 object(s) | 0 bytes";
      if (desktopBinImg) desktopBinImg.src = "assets/recycle-bin-empty.svg";
    } else {
      state.recycleBinItems.forEach((item) => {
        const div = document.createElement("div");
        div.className = "file-item";
        div.tabIndex = 0;
        div.innerHTML = `<img src="${item.icon}" alt=""><span>${item.name}</span>`;
        div.addEventListener("click", () => {
          showModal(item.name, `This item is located in the Recycle Bin (${item.size}). To use it, please click 'Restore All Items'.`);
        });
        itemsContainer.appendChild(div);
      });
      statusText.textContent = `${state.recycleBinItems.length} object(s) | 1.84 MB`;
      if (desktopBinImg) desktopBinImg.src = "assets/recycle-bin.svg";
    }
  }

  if (emptyBtn) {
    emptyBtn.addEventListener("click", () => {
      playClickSound();
      if (state.recycleBinItems.length === 0) {
        showToast("Recycle Bin is already empty.");
        return;
      }
      if (confirm("Are you sure you want to permanently delete these items?")) {
        state.recycleBinItems = [];
        renderBin();
        showToast("Recycle Bin emptied successfully.");
      }
    });
  }

  if (restoreBtn) {
    restoreBtn.addEventListener("click", () => {
      playClickSound();
      state.recycleBinItems = [
        { name: "homework_final_FINAL_v2.doc", size: "320 KB", icon: "assets/file-text.svg" },
        { name: "dialup_modem_screech.wav", size: "840 KB", icon: "assets/sound.svg" },
        { name: "y2k_survival_guide.txt", size: "45 KB", icon: "assets/file-text.svg" },
        { name: "unnamed_secret_plan.exe", size: "640 KB", icon: "assets/danger.svg" }
      ];
      renderBin();
      showToast("All items restored to original folders!");
    });
  }

  renderBin();
}

// ============================================================================
// 8. MINESWEEPER GAME
// ============================================================================

let msGrid = [];
let msRows = 9, msCols = 9, msMines = 10;
let msGameOver = false, msTimer = 0, msTimerInterval = null;
let msFlagCount = 10;

function initMinesweeper() {
  const gridEl = document.getElementById("minesweeper-grid");
  const faceBtn = document.getElementById("minesweeper-face-btn");
  const counterEl = document.getElementById("mines-counter");
  const timerEl = document.getElementById("mines-timer");

  clearInterval(msTimerInterval);
  msTimer = 0;
  msGameOver = false;
  msFlagCount = msMines;
  timerEl.textContent = "000";
  counterEl.textContent = String(msFlagCount).padStart(3, "0");
  faceBtn.textContent = "🙂";

  msGrid = [];
  gridEl.innerHTML = "";

  // Create empty grid
  for (let r = 0; r < msRows; r++) {
    const row = [];
    for (let c = 0; c < msCols; c++) {
      row.push({
        r, c,
        isMine: false,
        revealed: false,
        flagged: false,
        count: 0
      });
    }
    msGrid.push(row);
  }

  // Place mines randomly
  let placed = 0;
  while (placed < msMines) {
    const rr = Math.floor(Math.random() * msRows);
    const cc = Math.floor(Math.random() * msCols);
    if (!msGrid[rr][cc].isMine) {
      msGrid[rr][cc].isMine = true;
      placed++;
    }
  }

  // Calculate neighbor counts
  for (let r = 0; r < msRows; r++) {
    for (let c = 0; c < msCols; c++) {
      if (msGrid[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < msRows && nc >= 0 && nc < msCols && msGrid[nr][nc].isMine) {
            count++;
          }
        }
      }
      msGrid[r][c].count = count;
    }
  }

  // Render DOM cells
  for (let r = 0; r < msRows; r++) {
    for (let c = 0; c < msCols; c++) {
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.dataset.r = r;
      cellDiv.dataset.c = c;

      // Click to reveal
      cellDiv.addEventListener("click", () => revealCell(r, c));

      // Right click to flag
      cellDiv.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        toggleFlag(r, c);
      });

      // Face reaction during click
      cellDiv.addEventListener("mousedown", () => {
        if (!msGameOver) faceBtn.textContent = "😮";
      });
      cellDiv.addEventListener("mouseup", () => {
        if (!msGameOver) faceBtn.textContent = "🙂";
      });

      gridEl.appendChild(cellDiv);
    }
  }
}

function startMinesweeperTimer() {
  if (msTimerInterval) return;
  const timerEl = document.getElementById("mines-timer");
  msTimerInterval = setInterval(() => {
    msTimer++;
    if (msTimer > 999) msTimer = 999;
    timerEl.textContent = String(msTimer).padStart(3, "0");
  }, 1000);
}

function revealCell(r, c) {
  if (msGameOver) return;
  startMinesweeperTimer();
  const cell = msGrid[r][c];
  if (cell.revealed || cell.flagged) return;

  playClickSound();
  cell.revealed = true;
  const cellDiv = document.querySelector(`.cell[data-r='${r}'][data-c='${c}']`);

  if (cell.isMine) {
    // Mine hit! Game over!
    playErrorSound();
    msGameOver = true;
    clearInterval(msTimerInterval);
    document.getElementById("minesweeper-face-btn").textContent = "😵";
    cellDiv.classList.add("revealed", "mine-hit");
    cellDiv.textContent = "💣";

    // Reveal all mines
    for (let row = 0; row < msRows; row++) {
      for (let col = 0; col < msCols; col++) {
        if (msGrid[row][col].isMine) {
          const el = document.querySelector(`.cell[data-r='${row}'][data-c='${col}']`);
          el.classList.add("revealed");
          el.textContent = "💣";
        }
      }
    }
    showToast("Game Over! You stepped on a 1998 mine!");
    return;
  }

  cellDiv.classList.add("revealed");
  if (cell.count > 0) {
    cellDiv.textContent = cell.count;
    cellDiv.classList.add(`c-${cell.count}`);
  } else {
    // Flood fill empty neighbors
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < msRows && nc >= 0 && nc < msCols) {
          revealCell(nr, nc);
        }
      }
    }
  }

  checkMinesweeperWin();
}

function toggleFlag(r, c) {
  if (msGameOver) return;
  const cell = msGrid[r][c];
  if (cell.revealed) return;

  playClickSound();
  const cellDiv = document.querySelector(`.cell[data-r='${r}'][data-c='${c}']`);
  const counterEl = document.getElementById("mines-counter");

  if (cell.flagged) {
    cell.flagged = false;
    cellDiv.textContent = "";
    msFlagCount++;
  } else {
    cell.flagged = true;
    cellDiv.textContent = "🚩";
    msFlagCount--;
  }

  counterEl.textContent = String(msFlagCount).padStart(3, "0");
}

function checkMinesweeperWin() {
  let unrevealedSafe = 0;
  for (let r = 0; r < msRows; r++) {
    for (let c = 0; c < msCols; c++) {
      if (!msGrid[r][c].isMine && !msGrid[r][c].revealed) {
        unrevealedSafe++;
      }
    }
  }

  if (unrevealedSafe === 0) {
    msGameOver = true;
    clearInterval(msTimerInterval);
    document.getElementById("minesweeper-face-btn").textContent = "😎";
    playStartupSound();
    showModal("Minesweeper Champion!", `You cleared all mines in ${msTimer} seconds! The judges are thoroughly impressed!`);
  }
}

// ============================================================================
// 9. CALCULATOR APP
// ============================================================================

let calcCurrent = "0";
let calcPrev = null;
let calcOperator = null;

function calcInput(digit) {
  playClickSound();
  const screen = document.getElementById("calc-screen");
  if (calcCurrent === "0" || calcCurrent === "Error") {
    calcCurrent = digit;
  } else {
    calcCurrent += digit;
  }
  screen.value = calcCurrent;
}

function calcOp(op) {
  playClickSound();
  const screen = document.getElementById("calc-screen");
  calcPrev = parseFloat(calcCurrent);
  calcOperator = op;
  calcCurrent = "0";
  screen.value = op;
}

function calcEquals() {
  playClickSound();
  const screen = document.getElementById("calc-screen");
  if (calcOperator === null || calcPrev === null) return;
  const current = parseFloat(calcCurrent);
  let res = 0;

  switch (calcOperator) {
    case "+": res = calcPrev + current; break;
    case "-": res = calcPrev - current; break;
    case "*": res = calcPrev * current; break;
    case "/": res = current === 0 ? "Error" : calcPrev / current; break;
  }

  calcCurrent = String(res);
  calcPrev = null;
  calcOperator = null;
  screen.value = calcCurrent;
}

function calcClear() {
  playClickSound();
  calcCurrent = "0";
  calcPrev = null;
  calcOperator = null;
  document.getElementById("calc-screen").value = "0";
}

// ============================================================================
// 10. MS-DOS PROMPT & MATRIX EASTER EGG
// ============================================================================

function setupDosPrompt() {
  const dosInput = document.getElementById("dos-input");
  const dosHistory = document.getElementById("dos-history");
  if (!dosInput) return;

  dosInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const cmd = dosInput.value.trim();
      dosInput.value = "";
      handleDosCommand(cmd);
    }
  });
}

function handleDosCommand(rawCmd) {
  const dosHistory = document.getElementById("dos-history");
  const cmd = rawCmd.toLowerCase();

  const print = (text, color = "#00ff00") => {
    const line = document.createElement("div");
    line.style.color = color;
    line.innerHTML = text;
    dosHistory.appendChild(line);
  };

  print(`C:\\WINDOWS&gt; ${rawCmd}`);

  if (!cmd) return;

  switch (cmd) {
    case "help":
      print("Available MS-DOS 7.10 Commands:");
      print("  HELP       - Displays this list of commands");
      print("  DIR        - Displays directory files and folders");
      print("  CLS        - Clears the command prompt screen");
      print("  VER        - Displays Windows 98 version information");
      print("  HACK       - Runs advanced penetration testing script");
      print("  MATRIX     - Toggles falling green Matrix digital rain");
      print("  BSOD       - Force crash kernel into Blue Screen of Death");
      print("  DATE       - Displays current system date");
      print("  TIME       - Displays current system time");
      print("  EXIT       - Closes MS-DOS command prompt");
      break;

    case "dir":
      print(" Volume in drive C has no label.");
      print(" Volume Serial Number is 1998-2026");
      print(" Directory of C:\\WINDOWS<br>");
      print("07-11-98  10:24a    &lt;DIR&gt;          SYSTEM");
      print("08-14-98  03:15p    &lt;DIR&gt;          COMMAND");
      print("10-02-98  08:45p           124,512 WIN.COM");
      print("10-14-98  11:20a            45,056 NOTEPAD.EXE");
      print("11-01-26  03:45p         1,048,576 HACKATHON.EXE");
      print("               3 File(s)      1,218,144 bytes");
      print("               2 Dir(s)   1,332,684,800 bytes free");
      break;

    case "cls":
      dosHistory.innerHTML = "";
      break;

    case "ver":
      print("Microsoft Windows 98 [Version 4.10.1998] Second Edition");
      break;

    case "hack":
      playDialupSound();
      print("[*] Initiating Gandhi Hackathon mainframe breach...", "#ffff00");
      setTimeout(() => print("[+] Bypassing firewall via 56k dial-up modem..."), 400);
      setTimeout(() => print("[+] Cracking IIT Bhilai server password..."), 900);
      setTimeout(() => print("[+] Injecting 100/100 points into judging database..."), 1500);
      setTimeout(() => print("[SUCCESS] YOU HAVE WON THE HACKATHON! 🏆", "#00ffff"), 2200);
      break;

    case "matrix":
      toggleMatrixRain();
      print(state.matrixRunning ? "Matrix digital rain enabled! Wake up, Neo..." : "Matrix digital rain disabled.");
      break;

    case "bsod":
      triggerBSOD();
      break;

    case "date":
      print(`Current date is: ${new Date().toLocaleDateString()}`);
      break;

    case "time":
      print(`Current time is: ${new Date().toLocaleTimeString()}`);
      break;

    case "exit":
      closeWindow("dos");
      break;

    default:
      if (cmd.startsWith("echo ")) {
        print(rawCmd.substring(5));
      } else {
        print(`Bad command or file name: '${rawCmd}'. Type 'help' for command list.`, "#ff4444");
      }
      break;
  }

  // Scroll to bottom
  const container = document.getElementById("dos-output");
  container.scrollTop = container.scrollHeight;
}

// Matrix Digital Rain Canvas
let matrixInterval = null;
function toggleMatrixRain() {
  const canvas = document.getElementById("matrix-canvas");
  state.matrixRunning = !state.matrixRunning;

  if (state.matrixRunning) {
    canvas.classList.add("active");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const chars = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890ABCDEF";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    matrixInterval = setInterval(() => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 40);
  } else {
    canvas.classList.remove("active");
    clearInterval(matrixInterval);
  }
}

// ============================================================================
// 11. EASTER EGGS: CLIPPY, ERROR CASCADE, BSOD & BOOT
// ============================================================================

const clippyQuotes = [
  "It looks like you're evaluating a hackathon submission. Would you like me to fill in 10/10 across all categories?",
  "Did you know? In 1998, 64MB of RAM was considered a colossal luxury!",
  "Don't click DO_NOT_CLICK.exe! Seriously, Dr. Vikram spent 3 weeks calibrating that kernel error.",
  "Psst! Have you checked C:\\Secret\\hackathon_confidential.txt yet? That's where the real lore is.",
  "Try opening the MS-DOS Prompt and typing 'matrix' or 'hack'. You won't regret it!",
  "Fun fact: When this PC was built, Eminem just released 'The Slim Shady EP' and Google was in a Menlo Park garage.",
  "Need to save your notes? Notepad actually saves your text to Local Disk using localStorage!"
];

function setupClippy() {
  const avatar = document.getElementById("clippy-avatar");
  const textEl = document.getElementById("clippy-text");
  const jokeBtn = document.getElementById("clippy-joke-btn");
  const dismissBtn = document.getElementById("clippy-dismiss-btn");
  const speechBubble = document.getElementById("clippy-speech");

  if (avatar) {
    avatar.addEventListener("click", () => {
      playClickSound();
      speechBubble.style.display = "block";
      state.clippyIndex = (state.clippyIndex + 1) % clippyQuotes.length;
      textEl.textContent = clippyQuotes[state.clippyIndex];
    });
  }

  if (jokeBtn) {
    jokeBtn.addEventListener("click", () => {
      playClickSound();
      state.clippyIndex = (state.clippyIndex + 1) % clippyQuotes.length;
      textEl.textContent = clippyQuotes[state.clippyIndex];
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener("click", () => {
      playClickSound();
      speechBubble.style.display = "none";
    });
  }
}

// Chaos Error Cascade (from DO_NOT_CLICK.exe)
function triggerChaosError() {
  playErrorSound();
  document.body.classList.add("screen-shake");
  setTimeout(() => document.body.classList.remove("screen-shake"), 500);

  showModal(
    "FATAL EXCEPTION: Curiosity Overload",
    "Warning: You clicked DO_NOT_CLICK.exe!\n\nSystem CPU temperature has reached 9000°C.\nWould you like Windows 98 to panic now?",
    true,
    () => {
      triggerBSOD();
    }
  );
}

// Blue Screen of Death (BSOD)
function triggerBSOD() {
  playErrorSound();
  const bsod = document.getElementById("bsod");
  bsod.classList.add("active");
  closeStartMenu();

  // Any key to restart
  const restartHandler = () => {
    window.removeEventListener("keydown", restartHandler);
    rebootSystem();
  };
  window.addEventListener("keydown", restartHandler);

  const restartBtn = document.getElementById("bsod-restart-button");
  restartBtn.onclick = () => {
    window.removeEventListener("keydown", restartHandler);
    rebootSystem();
  };
}

function rebootSystem() {
  const bsod = document.getElementById("bsod");
  const bootScreen = document.getElementById("boot-screen");
  bsod.classList.remove("active");
  bootScreen.classList.add("active");

  setTimeout(() => {
    bootScreen.classList.remove("active");
    playStartupSound();
    showToast("Windows 98 restarted successfully. All systems operational!");
  }, 2600);
}

function triggerShutdownDialog() {
  playClickSound();
  closeStartMenu();
  showModal(
    "Shut Down Windows",
    "What do you want the computer to do?\n\n• Shut down the computer\n• Restart the computer in MS-DOS mode",
    true,
    () => {
      rebootSystem();
    }
  );
}

// ============================================================================
// 12. RUN DIALOG & MODALS
// ============================================================================

function openRunDialog() {
  playClickSound();
  closeStartMenu();
  const runWin = document.getElementById("window-run");
  runWin.style.display = "flex";
  bringToFront(runWin);
  const input = document.getElementById("run-dialog-input");
  input.value = "";
  input.focus();
}

function setupRunDialog() {
  const okBtn = document.getElementById("run-dialog-ok");
  const cancelBtn = document.getElementById("run-dialog-cancel");
  const input = document.getElementById("run-dialog-input");

  function executeRun() {
    const val = (input.value || "").trim().toLowerCase();
    closeWindow("run");

    if (!val) return;
    if (val === "notepad") openWindow("notepad");
    else if (val === "calc") openWindow("calc");
    else if (val === "cmd" || val === "dos" || val === "command") openWindow("dos");
    else if (val === "ie" || val === "iexplore" || val === "browser") openWindow("internet-explorer");
    else if (val === "minesweeper" || val === "mine") openWindow("minesweeper");
    else if (val === "matrix") toggleMatrixRain();
    else if (val === "bsod" || val === "crash") triggerBSOD();
    else if (val.endsWith(".txt")) openFile(val);
    else if (val.endsWith(".jpg")) openImageFile(val);
    else {
      showModal("Cannot find file", `Windows cannot find '${val}'. Make sure you typed the name correctly, and then try again.`);
    }
  }

  if (okBtn) okBtn.addEventListener("click", executeRun);
  if (cancelBtn) cancelBtn.addEventListener("click", () => closeWindow("run"));
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") executeRun();
    });
  }
}

// Modal helper
let modalCallback = null;
function showModal(title, message, showCancel = false, onOk = null) {
  playErrorSound();
  const modal = document.getElementById("modal-dialog");
  const titleText = document.getElementById("modal-title-text");
  const messageText = document.getElementById("modal-message-text");
  const cancelBtn = document.getElementById("modal-btn-cancel");
  const okBtn = document.getElementById("modal-btn-ok");

  titleText.textContent = title;
  messageText.innerHTML = message.replace(/\n/g, "<br>");
  cancelBtn.style.display = showCancel ? "inline-block" : "none";

  modalCallback = onOk;
  modal.classList.add("open");

  okBtn.onclick = () => {
    closeModal();
    if (modalCallback) modalCallback();
  };
}

function closeModal() {
  playClickSound();
  const modal = document.getElementById("modal-dialog");
  modal.classList.remove("open");
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

function triggerMenu(name) {
  playClickSound();
  if (name === "Help") {
    showModal(
      "Windows 98 Help",
      "Welcome to THE LOST PC Help System!\n\n• Double-click desktop icons to open applications.\n• Double-click files to open them in Notepad or Image Viewer.\n• Notepad saves notes permanently using localStorage.\n• Explore C:\\Secret for hidden hackathon blueprints!\n• Warning: DO_NOT_CLICK.exe will trigger a simulated BSOD."
    );
  } else if (name === "View") {
    showToast("Folder view refreshed.");
  } else if (name === "Edit") {
    showToast("Edit mode: Ready.");
  } else if (name === "File") {
    showToast("File operations: Ready.");
  } else {
    showToast(`Option: ${name}`);
  }
}

// ============================================================================
// 13. CONTROL PANEL & SETTINGS
// ============================================================================

function setupControlPanel() {
  const crtBtn = document.getElementById("toggle-crt-btn");
  const soundBtn = document.getElementById("toggle-sound-btn");
  const traySoundIcon = document.getElementById("tray-sound-icon");
  const themeSelect = document.getElementById("theme-color-select");

  if (crtBtn) {
    crtBtn.addEventListener("click", () => {
      state.crtEnabled = !state.crtEnabled;
      document.body.classList.toggle("crt-active", state.crtEnabled);
      crtBtn.textContent = state.crtEnabled ? "Toggle Scanlines (ON)" : "Toggle Scanlines (OFF)";
      showToast(state.crtEnabled ? "CRT Scanline filter enabled!" : "CRT filter disabled.");
    });
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    soundBtn.textContent = state.soundEnabled ? "Sound: ON 🔊" : "Sound: MUTED 🔇";
    traySoundIcon.style.opacity = state.soundEnabled ? "1" : "0.4";
    showToast(state.soundEnabled ? "Sound effects enabled!" : "Sound effects muted.");
  }

  if (soundBtn) soundBtn.addEventListener("click", toggleSound);
  if (traySoundIcon) traySoundIcon.addEventListener("click", toggleSound);

  if (themeSelect) {
    themeSelect.addEventListener("change", (e) => {
      document.getElementById("desktop").style.backgroundColor = e.target.value;
      showToast("Desktop theme wallpaper updated!");
    });
  }
}

// Image Viewer Controls
function setupImageViewerControls() {
  const img = document.getElementById("image-viewer-img");
  const zoomIn = document.getElementById("img-zoom-in");
  const zoomOut = document.getElementById("img-zoom-out");
  const resetBtn = document.getElementById("img-reset");

  let currentScale = 1;

  if (zoomIn) {
    zoomIn.addEventListener("click", () => {
      currentScale += 0.2;
      img.style.transform = `scale(${currentScale})`;
    });
  }

  if (zoomOut) {
    zoomOut.addEventListener("click", () => {
      currentScale = Math.max(0.4, currentScale - 0.2);
      img.style.transform = `scale(${currentScale})`;
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentScale = 1;
      img.style.transform = "scale(1)";
    });
  }
}

// ============================================================================
// 14. INITIALIZATION & EVENT LISTENERS
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize draggable windows
  document.querySelectorAll(".window").forEach((win) => {
    setupWindowDraggable(win);
  });

  // 2. Setup Desktop Icons
  document.querySelectorAll(".desktop-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      playClickSound();
      document.querySelectorAll(".desktop-icon").forEach((i) => i.classList.remove("selected"));
      icon.classList.add("selected");
    });

    icon.addEventListener("dblclick", () => {
      const app = icon.dataset.app;
      handleAppLaunch(app);
    });

    // Touch support (tap opens icon)
    let lastTap = 0;
    icon.addEventListener("touchend", (e) => {
      const curTime = new Date().getTime();
      const tapLen = curTime - lastTap;
      if (tapLen < 500 && tapLen > 0) {
        handleAppLaunch(icon.dataset.app);
      }
      lastTap = curTime;
    });
  });

  function handleAppLaunch(app) {
    if (app === "readme") {
      openFile("read_me_first.txt");
    } else if (app === "danger-egg") {
      triggerChaosError();
    } else {
      openWindow(app);
    }
  }

  // Deselect icons when clicking desktop background
  document.getElementById("desktop").addEventListener("click", (e) => {
    if (e.target.id === "desktop") {
      document.querySelectorAll(".desktop-icon").forEach((i) => i.classList.remove("selected"));
      closeStartMenu();
    }
  });

  // 3. Setup Start Button & Menu
  const startBtn = document.getElementById("start-button");
  if (startBtn) {
    startBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleStartMenu();
    });
  }

  // Mobile touch support for submenus
  document.querySelectorAll(".start-menu-item.has-submenu").forEach((item) => {
    item.addEventListener("click", (e) => {
      const submenu = item.querySelector(".submenu");
      if (submenu && window.innerWidth <= 768) {
        e.stopPropagation();
        const isShown = submenu.style.display === "flex";
        document.querySelectorAll(".submenu").forEach((s) => (s.style.display = ""));
        submenu.style.display = isShown ? "none" : "flex";
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#start-menu") && !e.target.closest("#start-button")) {
      closeStartMenu();
    }
  });

  // 4. File Explorer Items (My Computer & My Documents)
  document.querySelectorAll("[data-action]").forEach((item) => {
    item.addEventListener("click", () => {
      playClickSound();
      const action = item.dataset.action;
      if (action === "floppy-drive") {
        showModal("3½ Floppy (A:)", "Please insert a disk into drive A:\n\n*mechanical grinding noises*");
      } else if (action === "open-c-drive") {
        openWindow("c-drive");
      } else if (action === "open-my-documents") {
        openWindow("my-documents");
      } else if (action === "audio-cd") {
        playStartupSound();
        showModal("Audio CD (D:)", "Now Playing:\nTrack 1 - Eiffel 65 - Blue (Da Ba Dee)\nAudio volume: 100%");
      } else if (action === "open-control-panel") {
        openWindow("control-panel");
      } else if (action === "open-secret-vault") {
        openWindow("secret-folder");
      } else if (action === "show-system-folder") {
        showModal("System Folder", "This folder contains system files that cannot be edited.");
      } else if (action === "open-autoexec") {
        openFile("autoexec.bat");
      }
    });
  });

  // Data open file & open image triggers
  document.querySelectorAll("[data-open-file]").forEach((item) => {
    item.addEventListener("click", () => {
      openFile(item.dataset.openFile);
    });
  });

  document.querySelectorAll("[data-open-image]").forEach((item) => {
    item.addEventListener("click", () => {
      openImageFile(item.dataset.openImage);
    });
  });

  // 5. Setup Individual Modules
  setupNotepad();
  setupInternetExplorer();
  setupRecycleBin();
  setupDosPrompt();
  setupClippy();
  setupRunDialog();
  setupControlPanel();
  setupImageViewerControls();

  // 6. Clock & Initial Sounds
  updateSystemClock();
  setInterval(updateSystemClock, 1000);

  // Auto-play startup chime on first user interaction
  const initAudioOnFirstClick = () => {
    playStartupSound();
    window.removeEventListener("click", initAudioOnFirstClick);
  };
  window.addEventListener("click", initAudioOnFirstClick);

  // Automatically open "READ_ME_FIRST.txt" and "My Documents" on first load so users & judges immediately see the experience!
  setTimeout(() => {
    openWindow("my-documents");
  }, 400);

  console.log("THE LOST PC (Windows 98) initialized successfully! 🚀");
});

