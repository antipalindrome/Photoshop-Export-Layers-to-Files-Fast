// NAME: 
// 	SaveLayers

// DESCRIPTION: 
//	Saves each layer in the active document to a PNG or JPG file named after the layer. 
//	These files will be created in the current document folder (same as working PSD).

// REQUIRES: 
// 	Adobe Photoshop CS2 or higher

//Most current version always available at: https://github.com/hsw107/Photoshop-Export-Layers-as-Images

// enable double-clicking from Finder/Explorer (CS2 and higher)
#target photoshop
app.bringToFront();

function main() {
    // two quick checks
	if(!okDocument()) {
        alert("Document must be saved and be a layered PSD.");
        return; 
    }
    
    var len = activeDocument.layers.length;
    var ok = confirm("Note: All layers will be saved in same directory as your PSD.\nThis document contains " + len + " top level layers.\nBe aware that large numbers of layers may take some time!\nContinue?");
    if(!ok) return

    // user preferences
    prefs = new Object();
    prefs.fileType = "";
    prefs.filePath = app.activeDocument.path;
    prefs.count = 0;
	prefs.formatArgs = null;

    //instantiate dialogue
    Dialog();
	if (prefs.fileType) {
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

function saveImage(layerName) {
    var fileName = layerName.replace(/[\\\*\/\?:"\|<>]/g,''); 
    fileName = fileName.replace(/[ ]/g, '_'); 
    if(fileName.length ==0) fileName = "autoname";
    var handle = getUniqueName(prefs.filePath + "/" + fileName);
    prefs.count++;
    
	if (prefs.formatArgs instanceof ExportOptionsSaveForWeb) {
		activeDocument.exportDocument(handle, ExportType.SAVEFORWEB, prefs.formatArgs);
	}
	else {
		activeDocument.saveAs(handle, prefs.formatArgs, true, Extension.LOWERCASE); 
	}
}

function getUniqueName(fileroot) { 
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

function padder(input, padLength) {
    // pad the input with zeroes up to indicated length
    var result = (new Array(padLength + 1 - input.toString().length)).join('0') + input;
    return result;
}

function Dialog() {
    // build dialogue
    var dlg = new Window ('dialog', 'Select Type'); 
	
    dlg.saver = dlg.add("dropdownlist", undefined, "");
	dlg.params = dlg.add("group");
	dlg.params.orientation = 'stack';

    // file type - call cloned getDialogParams*() for new file formats here
	// (add a single line, the rest is taken care of)
    var saveOpt = [];
	saveOpt.push(getDialogParamsPNG(dlg.params));
	saveOpt.push(getDialogParamsJPEG(dlg.params));
	saveOpt.push(getDialogParamsTarga(dlg.params));
    for (var i=0, len=saveOpt.length; i<len; i++) {
        dlg.saver.add ("item", "Save as " + saveOpt[i].type);
    }
	
    // show proper file type options
    dlg.saver.onChange = function() {
		for (var i = saveOpt.length - 1; i >= 0; --i) {
			if (this.items[i].selected) {
				saveOpt[i].controlRoot.show();
			}
			else {
				saveOpt[i].controlRoot.hide();
			}
		}
    }; 
	
    dlg.saver.selection = 0;
	  	   
    // remainder of UI
    dlg.btnRun = dlg.add("button", undefined, "Continue");
    dlg.btnRun.onClick = function() {
		// collect arguments for saving and proceed
		var selIdx = dlg.saver.selection.index;
		saveOpt[selIdx].handler(saveOpt[selIdx].controlRoot);
        this.parent.close(0); 
    }; 

    dlg.orientation = 'column'; 
    dlg.center(); 
    dlg.show();
}

// Clone these two functions to add a new export file format - GUI
function getDialogParamsTarga(parent)
{
	var controls = parent.add("group");
	
	controls.alpha = controls.add("checkbox", undefined, "With alpha channel");
	controls.alpha.value = true;
	
	var bitsPerPixelLabels = ["16 bit", "24 bit", "32 bit"];
	controls.bitsPerPixel = controls.add("dropdownlist", undefined, bitsPerPixelLabels);
	controls.bitsPerPixel.selection = 2;
	
	controls.rle = controls.add("checkbox", undefined, "RLE compression");
	controls.rle.value = true;
	
	return {type: "TGA", controlRoot: controls, handler: onDialogSelectTarga};
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
	quality = parent.add("dropdownlist");
	
    for (var i=12; i>=1; --i) {
		quality.add('item', "" + i);
    }
	
	quality.selection = 0;
	
	return {type: "JPG", controlRoot: quality, handler: onDialogSelectJPEG};
}

function onDialogSelectJPEG(controlRoot)
{
	prefs.fileType = "JPG";
	prefs.formatArgs = new JPEGSaveOptions();
	prefs.formatArgs.quality = 12 - controlRoot.selection.index;
}

function getDialogParamsPNG(parent)
{
	var resolution_items = ["8 bit", "24 bit"];
	var resolution = parent.add("dropdownlist", undefined, resolution_items);	
	resolution.selection = 1;
	
	return {type: "PNG", controlRoot: resolution, handler: onDialogSelectPNG};
}

function onDialogSelectPNG(controlRoot)
{
	prefs.fileType = "PNG";
	prefs.formatArgs = new ExportOptionsSaveForWeb();
	prefs.formatArgs.format = SaveDocumentType.PNG;
	prefs.formatArgs.PNG8 = controlRoot.items[0].selected;
	prefs.formatArgs.dither = Dither.NONE;
}

function okDocument() {
     // check that we have a valid document
     
    if (!documents.length) return false;

    var thisDoc = app.activeDocument; 
    var fileExt = decodeURI(thisDoc.name).replace(/^.*\./,''); 
    return fileExt.toLowerCase() == 'psd'
}

function wrapper() {
    function showError(err) {
        alert(err + ': on line ' + err.line, 'Script Error', true);
    }

    try {
        // suspend history for CS3 or higher
        if (parseInt(version, 10) >= 10) {
            activeDocument.suspendHistory('Save Layers', 'main()');
        } else {
            main();
        }
    } catch(e) {
        // report errors unless the user cancelled
        if (e.number != 8007) showError(e);
    }
}

wrapper();
