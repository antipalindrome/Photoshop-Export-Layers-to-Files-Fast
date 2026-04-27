# Photoshop Export Layers to Files (Fast)

![Version](https://img.shields.io/badge/version-v2.7.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Export every layer in your Photoshop document as its own image file — much faster than Adobe's built-in export script. Supports PNG, JPEG, TIFF, PDF, Targa, BMP, and PSD. Includes a **CSV Manifest** mode that lets you define exact output dimensions, padding, and filenames per layer from a spreadsheet.

![Screenshot of the script dialog](example.png)

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Export Options](#export-options)
  - [Format](#format)
  - [Layers](#layers)
  - [Filenames](#filenames)
  - [Trimming & Padding](#trimming--padding)
  - [Scaling](#scaling)
  - [Prefix & Suffix](#prefix--suffix)
- [CSV Manifest Export](#csv-manifest-export)
- [Batch Processing](#batch-processing)
- [Contributing](#contributing)
- [Requirements](#requirements)
- [License](#license)

---

## Installation

> **Note:** This script is not affiliated with Adobe. Use at your own risk — always back up your PSDs before running.

**Option A — Run once:**
1. Go to `File → Scripts → Browse…` in Photoshop
2. Select `Export Layers To Files (Fast).jsx`

**Option B — Add to Scripts menu (permanent):**
1. Copy both `Export Layers To Files (Fast).jsx` **and** `Export Layers To Files (Fast)-progress_bar.json` into your Photoshop Scripts folder:
   - **Mac:** `/Applications/Adobe Photoshop <VERSION>/Presets/Scripts`
   - **Windows:** `C:\Program Files\Adobe\Adobe Photoshop <VERSION>\Presets\Scripts`
2. Restart Photoshop — the script will appear under `File → Scripts`

> **Important:** The `.jsx` and `.json` files must stay in the same directory. Without the JSON file you will get a *"Progress bar resource corrupt"* error.

---

## Quick Start

1. Open your Photoshop document
2. Run the script (`File → Scripts → Browse…` → select the `.jsx`)
3. Choose your output folder and export format
4. Click **Run**

Settings are remembered between runs.

---

## Export Options

### Format

| Format | Notes |
|--------|-------|
| PNG-24 | Full quality, transparency supported |
| PNG-8  | Indexed color, smaller file size |
| JPEG   | Adjustable quality (0–100) |
| TIFF   | Lossless, large files |
| PDF    | Choose PDF standard |
| Targa  | 24-bit with optional alpha |
| BMP    | Uncompressed raster |
| PSD    | Full Photoshop document per layer |

### Layers

| Option | Behavior |
|--------|----------|
| All layers | Exports every layer in the document |
| Visible only | Skips hidden layers |
| Selected group | Exports only the layers inside the currently selected group; all other layers remain untouched |

Use **Ignore Layers Starting With** to skip layers whose names begin with a specified prefix (e.g. `x` to ignore `x_draft`, `x_old`).

### Filenames

| Option | Example |
|--------|---------|
| Use Layer Name (strip extension) | `icon.png` → `icon.png` |
| Use Layer Name (keep extension) | `icon.png` → `icon.png.png` |
| Use layer and parent group names | `Group 1 > icon` → `Group-1-icon.png` |
| Use index ascending | Top-most layer → `1`, next → `2`, … |
| Use index descending | Top-most layer → `N`, next → `N-1`, … |

**Custom Delimiter:** Replaces spaces in layer names. Default is `-`. The following characters are not allowed: `\ / * ? | . : " < > % , ; =`

### Trimming & Padding

- **Trim each layer individually** — crops each exported image to its content bounds
- **Trim combined** — crops to the combined bounds of all layers
- **Padding** — adds pixel padding around trimmed content (enter a value in pixels)

### Scaling

Enter a percentage to scale all exported images (e.g. `50` for half-size, `200` for double). Leave at `100` for no scaling.

### Prefix & Suffix

Added to every exported filename. Support variable substitution:

| Variable | Replaced with |
|----------|--------------|
| `{i}` | Layer index |
| `{ii}` | Layer index with leading zero |
| `{iii}` | Layer index with up to two leading zeros |
| `{iiii}` | Layer index with up to three leading zeros |
| `{ln}` | Layer name (useful when exporting by index) |
| `{dn}` | Document name |
| `{M}` | Month |
| `{MM}` | Month with leading zero |
| `{D}` | Day of month |
| `{DD}` | Day of month with leading zero |
| `{YY}` | Year (last two digits) |
| `{YYYY}` | Year (four digits) |
| `{HH}` | Hours with leading zero |
| `{mm}` | Minutes with leading zero |
| `{ss}` | Seconds with leading zero |
| `{sss}` | Milliseconds with leading zeros |

**Examples:**

| Prefix | Suffix | Output |
|--------|--------|--------|
| `icon-` | — | `icon-layer-name.png` |
| `{ii}-` | — | `04-layer-name.png` |
| `{YYYY}-` | — | `2024-layer-name.png` |
| — | `.scale-100` | `layer-name.scale-100.png` |

---

## CSV Manifest Export

The **CSV Manifest Export** panel lets you define exact output dimensions, padding, and a custom filename for each layer from a CSV file. Layers are matched to rows by their order in the document (top-to-bottom).

This is useful when different layers need different canvas sizes — for example, a slot game where each symbol has a different aspect ratio.

### CSV Format

```csv
Width,Height,Padding,Filename,Mode
500,500,10,symbol_01,fit
600,400,5,banner_01,canvas
```

| Column | Required | Description |
|--------|----------|-------------|
| `Width` | Yes | Output canvas width in pixels |
| `Height` | Yes | Output canvas height in pixels |
| `Padding` | Yes | Padding in pixels applied around the layer content |
| `Filename` | Yes | Output filename without extension |
| `Mode` | No | `fit` (default) or `canvas` — see below |

### Mode Values

| Mode | Behavior |
|------|----------|
| `fit` | Scales the layer to fit inside the canvas minus padding |
| `canvas` | Resizes the canvas to `Width × Height` without scaling the layer |

See [`example_manifest.csv`](example_manifest.csv) for a working example.

### How to Use

1. In the script dialog, find the **Manifest Export (CSV)** panel
2. Click the folder icon and select your `.csv` file
3. Click **Run** — the script reads each row and exports the corresponding layer with the specified settings

> The number of CSV rows should match the number of exported layers. Extra rows are ignored; layers without a matching row export with default settings.

---

## Batch Processing

Run the script silently with no dialog, using previously saved settings:

1. Run the script normally, configure your settings, and click **Save and Close**
2. Open `Export Layers To Files (Fast).jsx` in a text editor
3. Near the top, find: `var BATCH_OPERATION = false;`
4. Change it to: `var BATCH_OPERATION = true;`
5. Save the file — the script now runs without a dialog every time

To edit settings again, set `BATCH_OPERATION` back to `false` and re-run.

---

## Contributing

Contributions are welcome!

- **UI changes:** Load `dev/dialog.js` at [scriptui.joonas.me](https://scriptui.joonas.me/), make your changes, export the dialog, paste the comment block back into `dev/dialog.js`, and paste the generated code into the `showDialog` function in the `.jsx` file.
- **Settings persistence:** Any new UI control must save and restore its value between script runs.
- **Issues / feature requests:** [Open an issue](https://github.com/antipalindrome/Photoshop-Export-Layers-to-Files-Fast/issues/new)

---

## Requirements

Adobe Photoshop CS2 or higher. Tested on Mac and Windows. If you encounter version-specific issues, try a [previous release](https://github.com/antipalindrome/Photoshop-Export-Layers-to-Files-Fast/releases).

---

## License

MIT © 2012–2024
