Photoshop-Export-Layers-to-Files-Fast
=================================

<b>This script allows you to export layers in your Photoshop document as individual files</b> at a speed much faster than the built-in script from Adobe. So far it does not feature all the formats that the built-in version does, but more can be added easily upon request. Feel free to contribute to it and make it even more powerful!

[We accept donations.](https://github.com/jwa107/Photoshop-Export-Layers-to-Files-Fast/wiki)

Please, consider donating a modest sum if you enjoy using our script regularly and would like to see more features implemented sooner.

This script was originally built as a response to a [question](http://graphicdesign.stackexchange.com/questions/1961/export-photoshop-layers-to-individual-png-files-batch-process) on [graphicdesign.stackexchange.com](http://graphicdesign.stackexchange.com/).

Make sure to download all files:

<b>[Download as zip](https://github.com/jwa107/Photoshop-Export-Layers-to-Files-Fast/archive/master.zip)</b>

Disclaimer: We are not associated with Adobe in any way. For any issues relating to Adobe products or Adobe scripts please contact them directly. We have never had an issue, but please use this script at your own risk. We are not responsible for any lost data or damaged PSDs so always make a back-up.

Features:
-------------------------------
* Supported export formats:
  * PNG (8 and 24 bit)
  * JPEG
  * Targa
  * BMP
* Handles nesting in grouped layers.
* Export either all layers or visible only.
* Shows current progress and allows to cancel any time.
* Shows proper layer count in advance.
* Files are named either using layer names or automatic layer indices.
* Lowest layer can be treated as common background.
* Exported images can have layer size or canvas size (trimming option).
* Last used dialog settings are remembered.
* A selected group can be exported as usual (layer by layer) while everything else is left in tact. (This way variable content can be exported for complex fixed background and foreground.)
* Can export groups as folder hierarchy. Conflicting folders are renamed.

You can also see [what's coming next](https://github.com/jwa107/Photoshop-Export-Layers-to-Files-Fast/wiki/Feature-Roadmap) and browse some of our [performance test results](https://github.com/jwa107/Photoshop-Export-Layers-to-Files-Fast/wiki/Performance-Test-Results).

Requirements:
-------------------------------
Adobe Photoshop CS2 or higher.

How To Use:
-------------------------------
1. Open Photoshop
2. File -> Scripts -> Browse...
3. Locate the file, and open it.

Alternatively move the script into the /presets/scripts directory, located by in your Photoshop folder.

Windows: /Program Files/Adobe/Adobe Photoshop VERSION/Presets/Scripts/

Mac: /Applications/Adobe Photoshop VERSION/Presets/Scripts/


Version History:
-------------------------------
<b>29 April 2016</b> by [Skjorn](https://github.com/skjorn)

* The option "Groups as folders" exports layers in a folder tree (same as groups) instead of a flat list.

<b>05 May 2015</b> by [Skjorn](https://github.com/skjorn)

* A selected group can be exported as usual (layer by layer) while everything else is left in tact. (This way variable content can be exported for complex fixed background and foreground.) _Works only for the first selected group!_ If no layer/group is selected, the topmost one is assumed by Photoshop. All parent groups of the selection are made visible. Visibility of exported layers is not taken into account; all are exported.

<b>25 April 2015</b> by [Johannes Walter](https://github.com/jwa107) and [Skjorn](https://github.com/skjorn)

* Last user settings remembered for versions CS 3 and higher.

<b>21 November 2014</b> by [Skjorn](https://github.com/skjorn)

*  Added option to strip extensions from layer names and made default.

<b>26 September 2014</b> by [Skjorn](https://github.com/skjorn)

* Added layer trimming.

<b>01 August 2014</b> by [Skjorn](https://github.com/skjorn)

* Lowest layer can be treated as common background.

<b>10 July 2014</b> by [Skjorn](https://github.com/skjorn)

* Added BMP support.
* Enabled using layer indices for file names.
* Optional file name prefix.

<b>23 June 2014</b> by [Skjorn](https://github.com/skjorn)

* Added progress bars with cancel buttons.
* Slow layer retrieval sped up and moved at the beginning.
* Dialog shows the correct layer count.

<b>08 June 2014</b> by [Skjorn](https://github.com/skjorn)

* Script renamed to match the built-in version.
* The dialog extended.
* Destination folder made selectable.
* Added an option to export only visible layers and fixed visibility toggling after export.
* The script made faster!
* The document doesn't have to be saved and be a layered PSD anymore. Exporting from a temporary working copy is fine.
* Major rewrite of internals.

<b>22 May 2014</b> by [Skjorn](https://github.com/skjorn)

* Added support for Targa (TGA).

<b>02 December 2013</b> by [Justin Wang](http://www.github.com/Tangleworm)

* Added support for both PNG-24 and PNG-8

<b>24 May 2013</b> by [Johannes Walter](https://github.com/jwa107)

* Nesting properly handled
*  All layers save seperately again (no more stacking).

<b>27 March 2013</b> by [Robin Parmar](http://robinparmar.com/) (robin(at)robinparmar(dot)com)

* preferences stored in object
* auto-increment file names to prevent collisions
* properly handles layer groups
* header added
* code comments added
* main() now has error catcher
* counts number of layers
* many little code improvements

<b>26 Sept 2012</b> by [Johannes Walter](https://github.com/jwa107)

* Original version


Contact:
-------------------------------
Please use communication channels on GitHub to write feedback/bugs/suggestions: https://github.com/jwa107/Photoshop-Export-Layers-to-Files-Fast/issues
