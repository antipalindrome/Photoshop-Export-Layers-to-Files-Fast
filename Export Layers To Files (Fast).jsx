// NAME: 
// 	Export Layers To Files

// DESCRIPTION: 
//  Improved version of the built-in "Export Layers To Files" script:
//  * Supports PNG and possibly other formats in the future.
//  * Does not create document duplicates, so it's much faster.
//	Saves each layer in the active document to a file in a preferred format named after the layer. Supported formats:
//  * PNG
//  * JPEG
//  * Targa

// REQUIRES: 
// 	Adobe Photoshop CS2 or higher

// Most current version always available at: https://github.com/skjorn/Photoshop-Export-Layers-as-Images

// enable double-clicking from Finder/Explorer (CS2 and higher)
#target photoshop
app.bringToFront();

bootstrap();

//
// Processing logic
//

function main()
{
    // two quick checks
	if(! okDocument()) {
        alert("Document must be saved and be a layered PSD.");
        return; 
    }
    
	// read resource file
	var rsrcString;
	var rsrcFile = new File(env.scriptFileDirectory + "/dialog.json");
	if (! rsrcFile.exists) {
		alert("Resource file for the export dialog is missing! Please, download the rest of the files that come with this script.");
		return;
	}
	try {
		rsrcFile.open("r");
		if (rsrcFile.error) throw rsrcFile.error;
		rsrcString = rsrcFile.read();
		if (rsrcFile.error) throw rsrcFile.error;
		if (! rsrcFile.close()) {
			throw rsrcFile.error;
		}
	}
	catch (error) {
		alert("Failed to read the resource file '" + rsrcFile + "'!\n\nReason: " + error + "\n\nPlease, check it's available for reading and redownload it in case it became corrupted.");
		return;
	}

    // user preferences
    prefs = new Object();
    prefs.fileType = "";
	try {
		prefs.filePath = app.activeDocument.path;
	}
	catch (e) {
		prefs.filePath = Folder.myDocuments;
	}
    prefs.count = 0;
	prefs.formatArgs = null;
	prefs.visibleOnly = false;

    //instantiate dialogue
    showDialog(rsrcString);
	if (prefs.fileType) {
		// FIXME: layer subset functionality
		hideLayers(activeDocument);
		saveLayers(activeDocument);
		toggleVisibility(activeDocument);
		alert("Saved " + prefs.count + " files.");
	}
}

function hideLayers(ref) {
    var len = ref.layers.length;
    for (var i = 0; i < len; i++) {
        var layer = ref.layers[i];
        if (layer.typename == 'LayerSet') hideLayers(layer);
        else layer.visible = false;
    }
}

function toggleVisibility(ref) {
    var len = ref.layers.length;
    for (var i = 0; i < len; i++) {	
        layer = ref.layers[i];
        layer.visible = !layer.visible;
    }
}

function saveLayers(ref) {
    var len = ref.layers.length;
    // rename layers top to bottom
    for (var i = 0; i < len; i++) {
        var layer = ref.layers[i];
        if (layer.typename == 'LayerSet') {
            // recurse if current layer is a group
            hideLayers(layer);
            saveLayers(layer);
        } else {
            // otherwise make sure the layer is visible and save it
            layer.visible = true;
            saveImage(layer.name);
            layer.visible = false;
        }
    }
}

function saveImage(layerName) 
{
    var fileName = layerName.replace(/[\\\*\/\?:"\|<>]/g,''); 
    fileName = fileName.replace(/[ ]/g, '_'); 
    if(fileName.length ==0) fileName = "Layer";
    var handle = getUniqueName(prefs.filePath + "/" + fileName);
    ++prefs.count;
    
	if (prefs.formatArgs instanceof ExportOptionsSaveForWeb) {
		activeDocument.exportDocument(handle, ExportType.SAVEFORWEB, prefs.formatArgs);
	}
	else {
		activeDocument.saveAs(handle, prefs.formatArgs, true, Extension.LOWERCASE); 
	}
}

function getUniqueName(fileroot) 
{ 
    // form a full file name
    // if the file name exists, a numeric suffix will be added to disambiguate
	
    var filename = fileroot;
	var ext = prefs.fileType.toLowerCase();
    for (var i=1; i<100; i++) {
        var handle = File(filename + "." + ext); 
        if(handle.exists) {
            filename = fileroot + "-" + padder(i, 3);
        } else {
            return handle; 
        }
    }
} 

function padder(input, padLength) 
{
    // pad the input with zeroes up to indicated length
    var result = (new Array(padLength + 1 - input.toString().length)).join('0') + input;
    return result;
}

function forEachLayer(inCollection, doFunc, result, traverseInvisibleSets)
{
	var length = inCollection.length;
	for (var i = 0; i < length; ++i) {
		var layer = inCollection[i];
		if (layer.typename == "LayerSet") {
			if (traverseInvisibleSets || layer.visible) {
				result = forEachLayer(layer.layers, doFunc, result, traverseInvisibleSets);
			}
		}
		else {
			result = doFunc(layer, result);
		}
	}
	
	return result;
}

//
// User interface
//

function showDialog(rsrc) 
{
    // build dialogue
	var dlg;
	try {
		dlg = new Window(rsrc);
	}	
	catch (e) {
		alert("Dialog resource is corrupt! Please, redownload the script with all files.");
		return;
	}
	
	// destination path
	dlg.funcArea.content.grpDest.txtDest.text = prefs.filePath.fsName;
	dlg.funcArea.content.grpDest.btnDest.onClick = function() {
		var newFilePath = Folder.selectDialog("Select destination folder", prefs.filePath);
		if (newFilePath) {
			prefs.filePath = newFilePath;
			dlg.funcArea.content.grpDest.txtDest.text = newFilePath.fsName;
		}
	}
	
	// layer subset selection
	dlg.funcArea.content.grpLayers.radioLayersAll.onClick = function() {
		prefs.visibleOnly = false;
	}
	dlg.funcArea.content.grpLayers.radioLayersVis.onClick = function() {
		prefs.visibleOnly = true;
	}
	
	var formatDropDown = dlg.funcArea.content.grpFileType.drdFileType;
	var optionsPanel = dlg.funcArea.content.pnlOptions;

    // file type - call cloned getDialogParams*() for new file formats here
	// (add a single line, the rest is taken care of)
    var saveOpt = [];
	var paramFuncs = [getDialogParamsPNG, getDialogParamsJPEG, getDialogParamsTarga];
    for (var i = 0, len = paramFuncs.length; i < len; ++i) {
		var optionsRoot = optionsPanel.add("group");
		optionsRoot.orientation = "column";
		optionsRoot.alignChildren = "left";
		var opts = paramFuncs[i](optionsRoot);
		opts.controlRoot = optionsRoot;
		saveOpt.push(opts);
		
        formatDropDown.add("item", saveOpt[i].type);
    }
	
    // show proper file type options
    formatDropDown.onChange = function() {
		for (var i = saveOpt.length - 1; i >= 0; --i) {
			if (this.items[i].selected) {
				saveOpt[i].controlRoot.show();
			}
			else {
				saveOpt[i].controlRoot.hide();
			}
		}
    }; 
	
    formatDropDown.selection = 0;
	  	   
    // buttons
    dlg.funcArea.buttons.btnRun.onClick = function() {
		// collect arguments for saving and proceed
		var selIdx = formatDropDown.selection.index;
		saveOpt[selIdx].handler(saveOpt[selIdx].controlRoot);
        dlg.close(0); 
    }; 
    dlg.funcArea.buttons.btnCancel.onClick = function() {
        dlg.close(0); 
    }; 
	
	// warning message
	var count = forEachLayer(
		activeDocument.layers,
		function(layer, prevResult) 
		{
			++prevResult.count;
			if (layer.visible) {
				++prevResult.visibleCount;
			}
			return prevResult;
		},
		{
			count: 0,
			visibleCount: 0
		},
		true
	);
	dlg.warning.message.text = formatString(dlg.warning.message.text, count.count, count.visibleCount);

    dlg.center(); 
    dlg.show();
}

// Clone these two functions to add a new export file format - GUI
function getDialogParamsTarga(parent)
{
	var depth = parent.add("group");
	depth.add("statictext", undefined, "Depth:");
	var bitsPerPixelLabels = ["16 bit", "24 bit", "32 bit"];
	parent.bitsPerPixel = depth.add("dropdownlist", undefined, bitsPerPixelLabels);
	parent.bitsPerPixel.selection = 2;
	
	parent.alpha = parent.add("checkbox", undefined, "With alpha channel");
	parent.alpha.value = true;
		
	parent.rle = parent.add("checkbox", undefined, "RLE compression");
	parent.rle.value = true;
	
	return {type: "TGA", handler: onDialogSelectTarga};
}

// Clone these two functions to add a new export file format - result handler
function onDialogSelectTarga(controlRoot)
{
	prefs.fileType = "TGA";
	prefs.formatArgs = new TargaSaveOptions();
	prefs.formatArgs.alphaChannels = controlRoot.alpha.value;
	prefs.formatArgs.rleCompression = controlRoot.rle.value;
	var resolution_enum = [TargaBitsPerPixels.SIXTEEN, TargaBitsPerPixels.TWENTYFOUR, TargaBitsPerPixels.THIRTYTWO];
	prefs.formatArgs.resolution = resolution_enum[controlRoot.bitsPerPixel.selection.index];
}

function getDialogParamsJPEG(parent)
{
	var qualityRow = parent.add("group");
	qualityRow.add("statictext", undefined, "Quality:");
	parent.quality = qualityRow.add("dropdownlist");
	
    for (var i=12; i>=1; --i) {
		parent.quality.add('item', "" + i);
    }
	
	parent.quality.selection = 0;
	
	return {type: "JPG", handler: onDialogSelectJPEG};
}

function onDialogSelectJPEG(controlRoot)
{
	prefs.fileType = "JPG";
	prefs.formatArgs = new JPEGSaveOptions();
	prefs.formatArgs.quality = 12 - controlRoot.quality.selection.index;
}

function getDialogParamsPNG(parent)
{
	var type = parent.add("group");
	type.add("statictext", undefined, "Resolution:");
	var resolution_items = ["8 bit", "24 bit"];
	parent.resolution = type.add("dropdownlist", undefined, resolution_items);	
	parent.resolution.selection = 1;
	
	return {type: "PNG", handler: onDialogSelectPNG};
}

function onDialogSelectPNG(controlRoot)
{
	prefs.fileType = "PNG";
	prefs.formatArgs = new ExportOptionsSaveForWeb();
	prefs.formatArgs.format = SaveDocumentType.PNG;
	prefs.formatArgs.PNG8 = controlRoot.resolution.items[0].selected;
	prefs.formatArgs.dither = Dither.NONE;
}

function okDocument() {
     // check that we have a valid document
     
    if (!documents.length) return false;

    var thisDoc = app.activeDocument; 
    var fileExt = decodeURI(thisDoc.name).replace(/^.*\./,''); 
    return fileExt.toLowerCase() == 'psd'
}

//
// Bootstrapper (version support, getting additional environment settings, error handling...)
//

function bootstrap() 
{
    function showError(err) {
        alert(err + ': on line ' + err.line, 'Script Error', true);
    }

    try {
		env = new Object();
		
		var versionNumber = parseInt(version, 10);
		
		if (versionNumber < 9) {
			alert("Photoshop versions before CS2 are not supported!");
			return;
		}
		
		env.cs3OrHigher = (versionNumber >= 10);
		
		// get script file name
		if (env.cs3OrHigher) {
			env.scriptFileName = $.fileName;
		}
		else {
			try {
				//throw new Error();		// doesn't provide the file name, at least in CS2
				var illegal = RUNTIME_ERROR;
			}
			catch (e) {
				env.scriptFileName = e.fileName;
			}
		}
		
		env.scriptFileDirectory = (new File(env.scriptFileName)).parent;
		
        // suspend history for CS3 or higher
        if (env.cs3OrHigher) {
            activeDocument.suspendHistory('Export Layers To Files', 'main()');
        } 
		else {
            main();
        }
    } 
	catch(e) {
        // report errors unless the user cancelled
        if (e.number != 8007) showError(e);
    }
}

//
// Utilities
//

function formatString(text) 
{
	var args = Array.prototype.slice.call(arguments, 1);
	return text.replace(/\{(\d+)\}/g, function(match, number) { 
			return (typeof args[number] != 'undefined') ? args[number] : match;
		});
}