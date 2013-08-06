Photoshop-Export-Layers-as-Images
=================================

This script allows you to export your layers as individual JPGs / PNGs at a speed much faster than the built-in script from adobe.



DESCRIPTION:
-------------------------------
Saves each layer in the active document to a PNG or JPG file named after the layer. 

These files will be created in the current document folder (the same directory the workng PSD is in).


REQUIREMENTS: 
-------------------------------
Adobe Photoshop CS2 or higher.

How To Use: 
-------------------------------
1. Open Photoshop
2. File -> Scripts -> Browse...
3. Locate the file, and open it.

VERSIONS:
-------------------------------

<b>24 May 2013</b> by Johannes Walter  (graphicdesign.stackexchange/users/408/johannes)

* Nesting properly handled
*  All layers save seperately again (no more stacking).


<b>27 March 2013</b> by Robin Parmar (robin@robinparmar.com)

* preferences stored in object
* auto-increment file names to prevent collisions
* properly handles layer groups
* header added
* code comments added
* main() now has error catcher
* counts number of layers
* many little code improvements


<b>26 Sept 2012</b> by Johannes Walter on stackexchange (graphicdesign.stackexchange/users/408/johannes)

* Original version
