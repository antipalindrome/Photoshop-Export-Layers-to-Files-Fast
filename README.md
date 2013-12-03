Photoshop-Export-Layers-as-Images
=================================

<b>This light-weight script allows you to export your layers as individual JPGs / PNGs</b> at a speed much faster than the built-in script from Adobe. Do note, that it does not contain all the functionality the Adobe one has, but it is due to its barebones nature that it is faster. Feel free to contribute to it and make it even more powerful!

This script was originally built as a response to a question on [graphicdesign.stackexchange.com](http://graphicdesign.stackexchange.com/).

The question may be found [here](http://graphicdesign.stackexchange.com/q/1961/408), as well as [my answer](http://graphicdesign.stackexchange.com/a/1962/408).


Descriptions:
-------------------------------
Saves each layer in the active document to a PNG or JPG file named after the layer. 

IMPORTANT: The images will automatically be saved in whatever directory your PSD is contained in! 


_Disclaimer:_ Please use script at your own risk. I have not tested it thoroughly enough to guarantee that it is in fact bulletproof.


Features:
-------------------------------
* Allows exporting of layers as either PNG (8 or 24 bit) or JPEGs
* Can export JPEGs on a quality range from 1 - 12
* Handles nesting in grouped layers

Requirement: 
-------------------------------
Adobe Photoshop CS2 or higher.

How To Use: 
-------------------------------
1. Open Photoshop
2. File -> Scripts -> Browse...
3. Locate the file, and open it.


[View Screenshots](http://imgur.com/a/os9XV)

Version History:
-------------------------------

<b>2 December 2013</b> by [Justin Wang](http://www.github.com/Tangleworm)

* Added support for both PNG-24 and PNG-8

<b>24 May 2013</b> by [Johannes Walter](http://www.graphicdesign.stackexchange.com/users/408/johannes)

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


<b>26 Sept 2012</b> by [Johannes Walter](http://www.graphicdesign.stackexchange.com/users/408/johannes)

* Original version


Contact:
-------------------------------
Please feel free to email feedback/bugs/suggestions to: github(at)johanneswalter(dot)com
