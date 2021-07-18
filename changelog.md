# Changelog

## v2.0

_Release Date: SOON_

- New smaller, and hopefully easier to use UI
- "Visible only" is now a checkbox (can use with "All Layers" or "Selected Group") https://github.com/hsw107/Photoshop-Export-Layers-to-Files-Fast/issues/91
- Delimiter is now a custom input
  - Deprecated “Allow Spaces”
- Prefix/Suffix supports some string formatting:
  - `{i} … {iiii}` in prefix or suffix to add index (with leading zeros) https://github.com/hsw107/Photoshop-Export-Layers-to-Files-Fast/issues/39
  - `{n}` in prefix/suffix to add layer name
- Prefix/Suffix is no longer disabled on group options select

## v1.2

_Release Date: 09 July, 2021_

- More flexible prefix/suffix https://github.com/hsw107/Photoshop-Export-Layers-to-Files-Fast/issues/128

## v1.1

_Release Date: 09 July, 2021_

- Ability to export file names with parental group names https://github.com/hsw107/Photoshop-Export-Layers-to-Files-Fast/issues/149

## v1.0

_Release Date: 27 November, 2018_

Contributions by: [willena](https://github.com/Willena), [finscn](https://github.com/finscn), [jgod](https://github.com/jgod)

- Ability to ignore layer starting with an "exclude string" (implemented by @jgod, improved by me; Related subbranch : https://github.com/Willena/Photoshop-Export-Layers-to-Files-Fast/tree/jgod-ignore-layers-starting-with-bang)
- Similar to the background feature, it is now possible to keep the highest layer on top of all other layer when exporting. (Related issues : #108, #96, #42; Related subbranch : https://github.com/Willena/Photoshop-Export-Layers-to-Files-Fast/tree/first-layer-as-foreground)
- Groups can now be exported as a single image/layer. (implemented by @finscn, updated to be mergeable by me) ( related issues : #79 #70 #69 #21 #108 ; Related subbranch : https://github.com/Willena/Photoshop-Export-Layers-to-Files-Fast/tree/finscn-groups-to-layers)
- Add Transparent padding pixels before export (Related issue : #64 ; Related subbranch : https://github.com/Willena/Photoshop-Export-Layers-to-Files-Fast/tree/transparent-padding-pixels)
- Scale image before export (Related subbranch : https://github.com/Willena/Photoshop-Export-Layers-to-Files-Fast/tree/scale-before-export)

## Older Changes

### 29 April 2016 by [Skjorn](https://github.com/skjorn)

- The option "Groups as folders" exports layers in a folder tree (same as groups) instead of a flat list.

### 05 May 2015 by [Skjorn](https://github.com/skjorn)

- A selected group can be exported as usual (layer by layer) while everything else is left in tact. (This way variable content can be exported for complex fixed background and foreground.) _Works only for the first selected group!_ If no layer/group is selected, the topmost one is assumed by Photoshop. All parent groups of the selection are made visible. Visibility of exported layers is not taken into account; all are exported.

### 25 April 2015 by [Hanna Walter](https://github.com/hsw107) and [Skjorn](https://github.com/skjorn)

- Last user settings remembered for versions CS 3 and higher.

### 21 November 2014 by [Skjorn](https://github.com/skjorn)

- Added option to strip extensions from layer names and made default.

### 26 September 2014 by [Skjorn](https://github.com/skjorn)

- Added layer trimming.

### 01 August 2014 by [Skjorn](https://github.com/skjorn)

- Lowest layer can be treated as common background.

### 10 July 2014 by [Skjorn](https://github.com/skjorn)

- Added BMP support.
- Enabled using layer indices for file names.
- Optional file name prefix.

### 23 June 2014 by [Skjorn](https://github.com/skjorn)

- Added progress bars with cancel buttons.
- Slow layer retrieval sped up and moved at the beginning.
- Dialog shows the correct layer count.

### 08 June 2014 by [Skjorn](https://github.com/skjorn)

- Script renamed to match the built-in version.
- The dialog extended.
- Destination folder made selectable.
- Added an option to export only visible layers and fixed visibility toggling after export.
- The script made faster!
- The document doesn't have to be saved and be a layered PSD anymore. Exporting from a temporary working copy is fine.
- Major rewrite of internals.

### 22 May 2014 by [Skjorn](https://github.com/skjorn)

- Added support for Targa (TGA).

### 02 December 2013 by [Justin Wang](http://www.github.com/Tangleworm)

- Added support for both PNG-24 and PNG-8

### 24 May 2013 by [Hanna Walter](https://github.com/hsw107)

- Nesting properly handled
- All layers save seperately again (no more stacking).

<b>27 March 2013</b> by [Robin Parmar](http://robinparmar.com/) (robin(at)robinparmar(dot)com)

- preferences stored in object
- auto-increment file names to prevent collisions
- properly handles layer groups
- header added
- code comments added
- main() now has error catcher
- counts number of layers
- many little code improvements

### 26 Sept 2012 by [Hanna Walter](https://github.com/hsw107)

- Original version
