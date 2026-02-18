# 🍪 Mohktobrowser

> A zero-dependency, single-file web app for collecting mokhs (emoji treats). **Just double-click `index.html` to run it.**

---

## ⚡ Quickstart — Pick ONE Method

### Method 1: Double-Click (Easiest — No Terminal Needed)

1. **Download this repo** → click the green **Code** button on GitHub, then click **Download ZIP**
2. **Unzip** the downloaded file (right-click → "Extract All" on Windows, or double-click on macOS)
3. **Open the folder** you just unzipped
4. **Double-click `index.html`** — it opens in your default browser. That's it. You're done.

### Method 2: One Command (Terminal)

Copy-paste **one** of the following into your terminal:

**macOS:**
```bash
git clone https://github.com/Nspaz/Mohktobrowser.git && open Mohktobrowser/index.html
```

**Linux:**
```bash
git clone https://github.com/Nspaz/Mohktobrowser.git && xdg-open Mohktobrowser/index.html
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/Nspaz/Mohktobrowser.git; Start-Process Mohktobrowser\index.html
```

**Windows (Command Prompt):**
```cmd
git clone https://github.com/Nspaz/Mohktobrowser.git && start Mohktobrowser\index.html
```

### Method 3: Copy-Paste the Entire App

1. Open **Notepad** (Windows), **TextEdit** (macOS in plain text mode), or any text editor
2. Go to the [`index.html` file on GitHub](https://github.com/Nspaz/Mohktobrowser/blob/main/index.html)
3. Click the **Raw** button (top-right of the file view)
4. Press `Ctrl+A` (or `Cmd+A` on macOS) to select all, then `Ctrl+C` (or `Cmd+C`) to copy
5. Paste into your text editor with `Ctrl+V` (or `Cmd+V`)
6. Save the file as `index.html` (make sure the file extension is `.html`, not `.html.txt`)
7. Double-click the saved `index.html` file to open it in your browser

---

## 🎮 How to Use

1. **On launch**, the app asks: **"Navigate to MoneyMe? Y or N?"**
   - Click **Y** to go to [MONEYME](https://moneyme.com.au/u?c=MTQwMjE4MTM)
   - Click **N** to stay and collect mokhs
2. **Click "Take a Mokh"** or **click the emoji directly** to collect a mokh
2. Each click gives you a new mokh treat (🍪 🥠 🍩 🧁 🍰 🎂 🥧 🍫 🍬 🍭)
3. Your **counter** updates automatically
4. Click **"Browse Mokhs"** to see your full collection
5. Close the browser and reopen — **your collection is saved automatically** (via localStorage)

---

## 📁 What's in This Repo

| File | Purpose |
|------|---------|
| `index.html` | **The entire app.** One self-contained file: HTML + CSS + JS. No other files needed. |
| `README.md` | This file. Instructions only. |

---

## 🔧 Requirements

- **Any modern web browser** (Chrome, Firefox, Safari, Edge — anything from the last 10 years)
- **No internet required** after download — runs 100% offline
- **No install, no build, no server, no terminal, no dependencies**

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| File opens as text instead of a web page | Make sure the file is saved as `index.html` (not `index.html.txt`). On Windows, turn off "Hide extensions for known file types" in File Explorer → View → Options. |
| Browser shows a blank page | Try a different browser. Make sure you downloaded the full file, not just a snippet. |
| Collection not saving | Your browser may have localStorage disabled. Check browser privacy settings. |
| Downloaded ZIP won't open | Use [7-Zip](https://7-zip.org/) (Windows) or just double-click on macOS/Linux. |

---

## 🛠 For Developers — Optional Local Server

If you want to serve it over HTTP (not required):

```bash
# Python 3 (pre-installed on macOS/Linux)
cd Mohktobrowser
python3 -m http.server 8000
# Open http://localhost:8000 in your browser

# Or with Node.js
npx serve .
```

---

## 📝 Tech Details

- **Architecture:** Single self-contained HTML file with inline CSS and JS
- **Storage:** Browser localStorage (persists across sessions, per-browser)
- **Dependencies:** None. Zero. Nil.
- **Build step:** None. It's just an HTML file.
- **Frameworks:** None. Pure vanilla HTML/CSS/JavaScript.