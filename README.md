# 💾 THE LOST PC — Windows 98 Experience

> **Gandhi Hackathon 2026** | *OpenLake × Meraz — Indian Institute of Technology (IIT) Bhilai*  
> **Problem Statement:** The Abandoned Computer  
> **Built with:** HTML5, CSS3, Vanilla JavaScript (Zero Frameworks, Zero Backend)

---

## 🌟 Overview

**The Lost PC** is an interactive, fully responsive replica of an abandoned Windows 98 personal computer from late 1998. When you open the website, you are transported back to the late 90s, discovering the forgotten files, memories, software, and mysteries left behind by its previous owner, Dr. Vikram Malhotra, right before the Y2K panic.

---

## 🚀 Live Demo & Deployment

- **Live URL:** Deployable instantly to Vercel, Netlify, or GitHub Pages.
- **Repository:** Public GitHub repository with full commit history intact.

---

## 🖥️ Features

### 1. Authentic Windows 98 Desktop
- **Classic Teal Wallpaper** (`#008080`) with classic system fonts and retro 3D beveled borders.
- **Desktop Icons**:
  - `My Computer`
  - `My Documents`
  - `Recycle Bin` (dynamic full/empty state)
  - `Notepad`
  - `Internet Explorer`
  - `Minesweeper`
  - `READ_ME.txt`
  - `DO_NOT_CLICK.exe` (Easter egg hazard icon)
- **Bottom Taskbar**:
  - Classic Start button with Windows 98 logo.
  - Active taskbar buttons reflecting open windows (click to focus or minimize).
  - System tray with volume toggle, unstable alert icon, and a live digital clock updating every second.
- **Working Start Menu**:
  - Vertical Windows 98 gradient sidebar.
  - Nested submenus for Programs and Favorites.
  - Settings, Help, Run..., and an authentic Shut Down dialog with reboot sequence.
  - Auto-closes when clicking outside.

### 2. Interactive Applications
- **Notepad**:
  - Full text typing and editing.
  - Persistent save functionality using `localStorage`.
  - Line/column/character counter status bar.
  - Shortcut `Ctrl+S` support, New, Save As, and Clear options.
- **My Computer**:
  - Explores `3½ Floppy (A:)` (with authentic mechanical grinding prompt), `Local Disk (C:)`, `Audio CD (D:)` (playing 90s music), and `Control Panel`.
- **My Documents**:
  - Realistic period documents: `read_me_first.txt`, `secret_diary.txt`, and original photographs.
  - Secret folder leading to classified hackathon blueprints.
- **Image Viewer**:
  - Displays original photographs from the problem statement:
    - `titanic_1997.jpg` (825 × 413)
    - `world_cup_1998.jpg` (612 × 408)
    - `old_memories.jpg` (612 × 452)
    - `most_wanted_list.jpg` (640 × 455)
    - `news_clipping_2001.jpg` (860 × 484)
  - Zoom In, Zoom Out, and Reset Size controls.
  - Aspect ratio strictly preserved; dynamic status readout of dimensions and zoom percentage.
- **Internet Explorer 4.0**:
  - Period toolbar (Back, Forward, Stop, Refresh, Home, Address Bar).
  - **Google 1998 Beta**: Working search engine returning authentic 90s search results for queries like `Gandhi Hackathon`, `IIT Bhilai`, `Windows 98`, and `Y2K bug`.
  - **Geocities 1998 Site**: Under-construction banner, visitor hit counter, and 56k dial-up audio test.
- **Recycle Bin**:
  - Inspect discarded files.
  - Working **Empty Recycle Bin** (with confirmation prompt and icon change) and **Restore All Items**.
- **Minesweeper**:
  - Playable 9×9 grid with 10 randomly placed mines.
  - Timer and flag counters.
  - Reactive smiley face button (`🙂`, `😮`, `😎`, `😵`).
- **MS-DOS Prompt**:
  - Interactive shell supporting `help`, `dir`, `cls`, `ver`, `hack`, `matrix`, `bsod`, `date`, `time`, and `exit`.

### 3. Easter Eggs (Hackathon Priority)
- **`DO_NOT_CLICK.exe`**: Screen shake animation, retro audio, and cascading critical error alerts leading to an optional kernel panic.
- **Blue Screen of Death (BSOD)**: Custom Windows 98 exception screen tailored to the hackathon judges. Clicking restart launches a full reboot sequence: Award BIOS memory check → Windows 98 cloud splash screen with loading bar → desktop restore with startup sound.
- **Interactive Clippy**: Floating Microsoft Office assistant in the lower right corner offering humorous hackathon tips and scoring advice.
- **Matrix Digital Rain**: Falling green code rain togglable via `matrix` command in DOS or Run dialog.
- **Web Audio API Synthesizer**: Pure client-side synthesis of the Windows 98 startup chord, error dings, and 56k dial-up handshake sound without external audio files.

---

## 📁 Project Structure

```text
Gandhi-Hackathon/
├── index.html                   # Main application entry point (root)
├── style.css                    # Windows 98 styling, 3D borders, animations
├── script.js                    # Window manager, Notepad, apps & audio engine
├── vercel.json                  # Vercel static deployment configuration
├── netlify.toml                 # Netlify deployment configuration
├── README.md                    # Project documentation
├── assets/                      # Vector SVG icons & authentic 1998 photographs
│   ├── calc.svg
│   ├── clippy.svg
│   ├── danger.svg
│   ├── file-image.svg
│   ├── file-text.svg
│   ├── floppy.svg
│   ├── folder.svg
│   ├── hard-drive.svg
│   ├── internet-explorer.svg
│   ├── minesweeper.svg
│   ├── most_wanted_list.jpg
│   ├── msdos.svg
│   ├── my-computer.svg
│   ├── my-documents.svg
│   ├── news_clipping_2001.jpg
│   ├── notepad.svg
│   ├── old_memories.jpg
│   ├── recycle-bin.svg
│   ├── recycle-bin-empty.svg
│   ├── sound.svg
│   ├── titanic_1997.jpg
│   ├── win98-logo.svg
│   └── world_cup_1998.jpg
└── the-lost-pc/                 # Subdirectory replica
```

---

## 🛠️ How to Run Locally

1. **Directly in Browser**: Double-click [index.html](index.html) to open in any modern browser.
2. **With VS Code Live Server**: Right-click `index.html` and choose **Open with Live Server**.
3. **With Python**:
   ```bash
   python -m http.server 8000
   ```
   Open `http://localhost:8000` in your browser.

---

## ☁️ Deployment

### Vercel (Recommended)
1. Push repository to GitHub.
2. In Vercel, click **Add New Project** and select your repository.
3. Keep default settings (Static Site, Root Directory `./`).
4. Click **Deploy**.

### GitHub Pages
1. Go to repository **Settings** → **Pages**.
2. Under **Source**, select `Deploy from a branch`.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**.

