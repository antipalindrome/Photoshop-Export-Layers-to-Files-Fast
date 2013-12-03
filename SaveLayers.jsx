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
    
    var len = activeDocument.layers.length;
    var ok = confirm("Note: All layers will be saved in same directory as your PSD.\nThis document contains " + len + " top level layers.\nBe aware that large numbers of layers may take some time!\nContinue?");
    if(!ok) return

    // user preferences
    prefs = new Object();
    prefs.fileType = "";
    prefs.fileQuality = 12;
    prefs.filePath = app.activeDocument.path;
    prefs.count = 0;

    //instantiate dialogue
    Dialog();
    hideLayers(activeDocument);
    saveLayers(activeDocument);
    toggleVisibility(activeDocument);
    alert("Saved " + prefs.count + " files.");
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
    var handle = getUniqueName(prefs.filePath + "/" + layerName);
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
    var dlg = new Window ('dialog', 'Select Type'); 
    dlg.saver = dlg.add("dropdownlist", undefined, ""); 
    dlg.quality = dlg.add("dropdownlist", undefined, "");
    dlg.pngtype = dlg.add("dropdownlist", undefined, "");


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
    dlg.quality.onChange = function() {
        prefs.fileQuality = qualityOpt[12-parseInt(this.selection)];
    };
    dlg.pngtype.onChange = function() {
       prefs.fileQuality = pngtypeOpt[parseInt(this.selection)]; 
    };

    // remainder of UI
    var uiButtonRun = "Continue"; 

    dlg.btnRun = dlg.add("button", undefined, uiButtonRun ); 
    dlg.btnRun.onClick = function() {	
        this.parent.close(0); 
    }; 

    dlg.orientation = 'column'; 

    dlg.saver.selection = dlg.saver.items[0] ;
    dlg.quality.selection = dlg.quality.items[0] ;
    dlg.center(); 
    dlg.show();
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
