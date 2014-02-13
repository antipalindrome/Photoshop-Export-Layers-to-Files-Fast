// NAME: 
// 	SaveLayers

// DESCRIPTION: 
//	Saves each layer in the active document to a PNG or JPG file named after the layer. 
//	These files will be created in the current document folder (same as working PSD).

// REQUIRES: 
// 	Adobe Photoshop CS2 or higher

//Most current version always available at: https://github.com/jwa107/Photoshop-Export-Layers-as-Images

// enable double-clicking from Finder/Explorer (CS2 and higher)
#target photoshop
app.bringToFront();

function main() {
    // two quick checks
	if(!okDocument()) {
        alert("Document must be saved and be a layered PSD.");
        return; 
    }
    
    // user preferences
    prefs = new Object();
    prefs.fileType = "";
    prefs.fileQuality = 12;
    prefs.filePath = app.activeDocument.path;
    prefs.count = 0;
	prefs.layerNames = false;
	prefs.reverse = true;

    //instantiate dialogue
    if(Dialog())
	{
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
        var frameIndex = i;
		if(prefs.reverse)
		{
			frameIndex = len - 1 - frameIndex;
		}
		var layer = ref.layers[frameIndex];
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
	var fileName = prefs.filePath + "/";
    if(prefs.layerNames)
	{
		fileName += layerName;
	}
	else
	{
		var documentName = app.activeDocument.name.substring(0, app.activeDocument.name.lastIndexOf("."));
		fileName += documentName + padder(prefs.count, 4);
	}
	var handle = getUniqueName(fileName);
    prefs.count++;
    
    if(prefs.fileType=="PNG" && prefs.fileQuality=="8") {
        SavePNG8(handle); 
    } else if (prefs.fileType=="PNG" && prefs.fileQuality=="24") {
        SavePNG24(handle);
    } else {
        SaveJPEG(handle); 
    }
}

function getUniqueName(fileroot) { 
    // form a full file name
    // if the file name exists, a numeric suffix will be added to disambiguate
	
    var filename = fileroot;
    for (var i=1; i<100; i++) {
        var handle = File(filename + "." + prefs.fileType); 
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

function SavePNG8(saveFile) { 
    exportOptionsSaveForWeb = new ExportOptionsSaveForWeb();
    exportOptionsSaveForWeb.format = SaveDocumentType.PNG
    exportOptionsSaveForWeb.dither = Dither.NONE;
    activeDocument.exportDocument( saveFile, ExportType.SAVEFORWEB, exportOptionsSaveForWeb );
} 

function SavePNG24(saveFile) { 
    pngSaveOptions = new PNGSaveOptions(); 
    activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE); 
} 

function SaveJPEG(saveFile) { 
    jpegSaveOptions = new JPEGSaveOptions(); 
    jpegSaveOptions.quality = prefs.fileQuality;
    activeDocument.saveAs(saveFile, jpegSaveOptions, true, Extension.LOWERCASE); 
} 

function Dialog() {
    // build dialogue
    var dlg = new Window ('dialog', 'Save frames'); 
	
	//dlg.alignChildren = 'left';
    
	// add warning
    var warning = dlg.add("statictext", undefined, "Note: All layers will be saved in same directory as your PSD.", { multiline: true });
    
	
	// add options
	dlg.options = dlg.add("panel", undefined, "options");
	dlg.options.alignChildren = "left";
	
	dlg.saver = dlg.options.add("dropdownlist", undefined, ""); 
    dlg.quality = dlg.options.add("dropdownlist", undefined, "");
    dlg.pngtype = dlg.options.add("dropdownlist", undefined, "");
	dlg.layerNames = dlg.options.add("checkbox", undefined, "use layer names as filename for frames");
	dlg.reverse = dlg.options.add("checkbox", undefined, "run animation reversed");
	
    // file type
    var saveOpt = [];
    saveOpt[0] = "PNG"; 
    saveOpt[1] = "JPG"; 
    for (var i=0, len=saveOpt.length; i<len; i++) {
        dlg.saver.add ("item", "Save as " + saveOpt[i]);
    }; 
	
    // trigger function
    dlg.saver.onChange = function() {
        prefs.fileType = saveOpt[parseInt(this.selection)]; 
        // decide whether to show JPG or PNG options
        if(prefs.fileType==saveOpt[1]){
            dlg.quality.show();
            dlg.pngtype.hide();
        } else {
            dlg.quality.hide();
            dlg.pngtype.show();
        }
    };
	  	   
    // jpg quality
    var qualityOpt = [];
    for(var i=12; i>=1; i--) {
        qualityOpt[i] = i;
        dlg.quality.add ('item', "" + i);
    }; 

    // png type
    var pngtypeOpt = [];
    pngtypeOpt[0]=8;
    pngtypeOpt[1]=24;
    dlg.pngtype.add ('item', ""+ 8 );
    dlg.pngtype.add ('item', "" + 24);

    // trigger functions
	dlg.layerNames.onClick = function() {
		if(dlg.layerNames.value)
		{
			dlg.reverse.hide();
		}
		else
		{
			dlg.reverse.show();
		}
		//dlg.layout(true);
	}
	
    dlg.quality.onChange = function() {
        prefs.fileQuality = qualityOpt[12-parseInt(this.selection)];
		//dlg.layout(true);
    };
    dlg.pngtype.onChange = function() {
        prefs.fileQuality = pngtypeOpt[parseInt(this.selection)]; 
		//dlg.layout(true);
    };

    // remainder of UI

	var warning2 = dlg.add("statictext", undefined, "This document contains " + activeDocument.layers.length + " top level layers. Be aware that large numbers of layers may take some time!", { multiline: true });
	
	var buttonPanel = dlg.add("group", undefined, { orientation: "row", alignChildren: "right" });
	
	var buttonOkay = buttonPanel.add("button", undefined, "Okay");    
	buttonOkay.onClick = function() {
        dlg.close(5);
    };
	var buttonCancel = buttonPanel.add("button", undefined, "Cancel");
	buttonCancel.onClick = function() {
		dlg.close(1);
	}; 

    dlg.orientation = 'column'; 

    dlg.saver.selection = dlg.saver.items[0];
	dlg.pngtype.selection = dlg.pngtype.items[1];
    dlg.quality.selection = dlg.quality.items[0];
    dlg.center(); 
    var result = dlg.show();
	
	prefs.layerNames = dlg.layerNames.value;
	prefs.reverse = dlg.reverse.value;
	
	// return true when ok was pressed
	return result == 5;
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
