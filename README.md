# Power Profile Notifier

A simple GNOME Shell extension that displays an on-screen notification whenever the system's power profile changes (e.g., Balanced, Performance, Power Saver).

## Features

- Reacts to power profile changes in real-time.
- Displays an OSD
- Clean and lightweight, with no external dependencies.

## Installation

1. Clone this repository:

```bash
 git clone https://github.com/BnSplits/gnome-shell-extension-power-profile-notifier.git
```

2. Copy the folder to your extensions directory:

   ```bash
   cp -r gnome-shell-extension-power-proile-notifie ~/.local/share/gnome-shell/extensions/powerprofilenotifier@bnsplits.github.com
   ```

3. Restart GNOME Shell:

   - Press <kbd>Alt</kbd> + <kbd>F2</kbd>, type `r`, then press <kbd>Enter</kbd> (on X11),
   - Or logout and log back in (on Wayland).

4. Enable the extension:

   - Via the **GNOME Extensions** app,
   - Or run:

     ```bash
     gnome-extensions enable power-profile-notifier@bnsplits.github.com
     ```
