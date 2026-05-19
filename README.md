#  Creaytic WebOS (Cupertino High Sierra)

Welcome to **Creaytic WebOS**, a premium, high-fidelity Apple macOS desktop environment built with Next.js 16.2.6, React 19, and Zustand. It features responsive windows, multitasking, a sandboxed virtual file system, and native utility emulation.

---

## 🚀 Outstanding Core Features

### 1. High-Fidelity Desktop & Window Multitasking
* **Responsive Drag & Drop**: Drag, maximize, and minimize windows with fluid animations powered by Framer Motion.
* **Apple Traffic Lights**: Modern color-coded window operations (Close, Minimize, Zoom). Clicking the red close traffic light on dynamic apps triggers safe warning confirmation prompts if there are unsaved state logs.

### 2. Sandbox Virtual File System (VFS)
* **Finder Emulation**: Explore local document directories, picture nodes, download directories, and pre-bundled applications.
* **VFS Synchronization**: Create folders, rename, touch text documents, set visual category tags, and delete items. All modifications sync natively inside the browser's persistent `localStorage`.

### 3. Notepad App (Multi-Tab & Close Warnings)
* **Cupertino Tab Interface**: Work on multiple documents simultaneously using the built-in `+` tab selector.
* **Safety Lock Close Warning**: Closing a Notepad window with unsaved files pops up a modern glassmorphic dialog. Select **Save & Close** to sync to VFS, or select **Discard & Close** to wipe unsaved session memory.
* **Focus Guard**: Editing text is protected from focus-transitions or background toggling.

### 4. Interactive macOS Terminal Shell
* **Full Core Utils**: Interactive zsh emulation with support for `pwd`, `ls`, `cd`, `cat`, `touch`, `mkdir`, `rm`, `whoami`, `date`, and `uname -a`.
* **System Process Checker**: Execute `ps` or `top` commands to display a live list of open windows and active window thread states.
* **Shell Accents**: Change theme colors dynamically using `theme emerald`, `theme amber`, `theme purple`, `theme cyan`, or `theme white`.
* **ASCII Branding**: Type `neofetch` to print Apple system specifications and retro logos.

### 5. Spotlight Search (Cmd + Space / Ctrl + Space)
* **Live Calculation**: Type mathematical operations (e.g. `(25 * 4) / 2`) for real-time calculations.
* **Application Finder**: Query and launch static system applications or custom dynamic user shortcuts.
* **Google Integration**: Type queries to open search results instantly in Safari using the iframe sandbox bypass layout.

### 6. Dynamic Custom App Shortcut Builder
* **Right-Click shortcut Creator**: Right-click the desktop area and click **"New App"** to spawn shortcuts. Specify the app name and target web URL.
* **Deterministic Letter-Badges**: If no custom icon URL is provided, Creaytic WebOS auto-generates a stylish geometric HSL gradient icon containing the first character of the app's name.
* **Iframe Sandbox Webviews**: Custom apps launch inside a sandboxed wrapper iframe.

### 7. Interactive Hardware Status Topbar
* **Branded logo**: Renders a premium `/logo.png` emblem with an inline fallback to Cupertino's `` character if missing.
* **Wi-Fi Toggle & Networks**: Click the Wi-Fi icon to toggle connections and choose between surrounding active signals.
* **Dynamic Hardware Battery**: Click the battery icon to view real power adapter statuses, discharging logs, and battery health, querying your machine's hardware state via `navigator.getBattery()`.

---

## 🛠️ Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Environment**:
   ```bash
   npm run dev
   ```

3. **Production Compilation**:
   ```bash
   npm run build
   ```

---

## 🌟 Give a Star & Contribute

Thank you for exploring **Creaytic WebOS**! 
* If this premium sandbox helps your workflow, please consider **giving [this repository](https://github.com/t2hasnain/creaytic-webos) a Star** 🌟!
* **Contribute**: Feel free to submit pull requests and contribute enhancements directly on [GitHub](https://github.com/t2hasnain/creaytic-webos) to make this macOS Cupertino sandbox even better. Thank you for your support!

---

## 📄 License & Restrictions

Created & maintained by **Hasnain** ([t2hasnain.me](https://t2hasnain.me)).

Protected under a strict **Proprietary Commercial Source & Security License** owned by **Hasnain**.
* **You ARE permitted to**: Contribute pull requests and review code in authorized repositories.
* **You ARE STRICTLY PROHIBITED from**: Copying, duplicating, cloning, republishing, or uploading the source code in your personal GitHub repositories or commercial platforms. Unauthorized distribution is strictly forbidden. See the `LICENSE` file for the legally binding terms.
