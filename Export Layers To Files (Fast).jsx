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
    // user preferences
    prefs = new Object();
    prefs.format = "";
	prefs.fileExtension = "";
	try {
		prefs.filePath = app.activeDocument.path;
	}
	catch (e) {
		prefs.filePath = Folder.myDocuments;
	}
	prefs.formatArgs = null;
	prefs.visibleOnly = false;
	
	userCancelled = false;
	
	// create progress bar
	var progressBarWindow = createProgressBar();
	if (! progressBarWindow) {
		return "cancel";
	}
	
	// collect layers	
	var profiler = new Profiler(env.profiling);
	var collected = collectLayers(progressBarWindow);
	if (userCancelled) {
		return "cancel";
	}
	layers = collected.layers;
	visibleLayers = collected.visibleLayers;
	var collectionDuration = profiler.getDuration(true, true);		
	if (env.profiling) {
		alert("Layers collected in " + profiler.format(collectionDuration), "Debug info");
	}
	
    // show dialogue
	if (showDialog()) {
		// export
		profiler.resetLastTime();
	
		var count = exportLayers(prefs.visibleOnly, progressBarWindow);
		var exportDuration = profiler.getDuration(true, true);
		
		var message = "";
		if (userCancelled) {
			message += "Export cancelled!\n\n";
		}
		message += "Saved " + count.count + " files.";
		if (env.profiling) {
			message += "\n\nExport function took " + profiler.format(collectionDuration) + " + " + profiler.format(exportDuration) + " to perform.";
		}
		if (count.error) {
			message += "\n\nSome layers failed to export! (Are there many layers with the same name?)"
		}
		alert(message, "Finished", count.error);
	}
	else {
		return "cancel";
	}
}

function exportLayers(visibleOnly, progressBarWindow)
{
	var retVal = {
		count: 0,
		error: false
	};
	var doc = activeDocument;
	
	var layerCount = layers.length;
	
	if ((layerCount == 1) && layers[0].isBackgroundLayer) {
		// Flattened images don't support LayerComps or visibility toggling, so export it directly.
		if (saveImage(layers[0].name)) {
			++retVal.count;
		}
		else {
			retVal.error = true;
		}
	}
	else {	
		// capture current layer state
		var lastHistoryState = doc.activeHistoryState;
		var capturedState = doc.layerComps.add("ExportLayersToFilesTmp", "Temporary state for Export Layers To Files script", false, false, true);
		
		var layersToExport = visibleOnly ? visibleLayers : layers;
		const count = layersToExport.length;
		
		if (progressBarWindow) {
			showProgressBar(progressBarWindow, "Exporting 1 of " + count + "...", count);
		}
	
		// Turn off all layers when exporting all layers - even seemingly invisible ones.
		// When visibility is switched, the parent group becomes visible and a previously invisible child may become visible by accident.
		for (var i = 0; i < count; ++i) {
			layersToExport[i].visible = false;
		}
			
		// export layers
		for (var i = 0; i < count; ++i) {
			var layer = layersToExport[i];
			layer.visible = true;
			if (saveImage(layer.name)) {
				++retVal.count;
			}
			else {
				retVal.error = true;
			}
			layer.visible = false;
			
			if (progressBarWindow) {
				updateProgressBar(progressBarWindow, "Exporting " + (i + 1) + " of " + count + "...");
				repaintProgressBar(progressBarWindow);
				if (userCancelled) {
					break;
				}
			}
		}
				
		// restore layer state
		capturedState.apply();
		capturedState.remove();
		if (env.version <= 9) {
			doc.activeHistoryState = lastHistoryState;
			app.purge(PurgeTarget.HISTORYCACHES);
		}

		if (progressBarWindow) {
			progressBarWindow.hide();
		}
	}
		
	return retVal;
}

function saveImage(layerName) 
{
    var fileName = layerName.replace(/[\\\*\/\?:"\|<>]/g, ''); 
    fileName = fileName.replace(/[ ]/g, '_'); 
    if(fileName.length == 0) fileName = "Layer";
    var handle = getUniqueName(prefs.filePath + "/" + fileName);
	if (! handle) {
		return false;
	}
    
	if (prefs.formatArgs instanceof ExportOptionsSaveForWeb) {
		// FIXME: built-in export is buggy; bypass it using ActionManager
		activeDocument.exportDocument(handle, ExportType.SAVEFORWEB, prefs.formatArgs);
	}
	else {
		activeDocument.saveAs(handle, prefs.formatArgs, true, Extension.LOWERCASE); 
	}
	
	return true;
}

function getUniqueName(fileroot) 
{ 
    // form a full file name
    // if the file name exists, a numeric suffix will be added to disambiguate
	
    var filename = fileroot;
    for (var i=1; i<100; i++) {
        var handle = File(filename + prefs.fileExtension.toLowerCase()); 
        if(handle.exists) {
            filename = fileroot + "-" + padder(i, 3);
        } 
		else {
            return handle; 
        }
    }
	
	return false;
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

// Indexed access to Layers via the default provided API is very slow, so all layers should be 
// collected into a separate collection beforehand and that should be accessed repeatedly.
function collectLayers(progressBarWindow)
{
	// proxy to lower level ActionManager code
	return collectLayersAM(progressBarWindow);
}

//
// User interface
//

function createProgressBar()
{
 	// read progress bar resource
	var rsrcFile = new File(env.scriptFileDirectory + "/progress_bar.json");
	var rsrcString = loadResource(rsrcFile);
	if (! rsrcString) {
		return false;
	}

   // create window
	var win;
	try {
		win = new Window(rsrcString);
	}	
	catch (e) {
		alert("Progress bar resource is corrupt! Please, redownload the script with all files.", "Error", true);
		return false;
	}
	
	win.barRow.cancelBtn.onClick = function() {
		userCancelled = true;
	};
	
	win.onClose = function() {
		userCancelled = true;
		return false;
	};
	
	return win;
}

function showProgressBar(win, message, maxValue)
{
	win.lblMessage.text = message;
	win.barRow.bar.maxvalue = maxValue;
	win.barRow.bar.value = 0;
	
	win.center();
	win.show();
	repaintProgressBar(win, true);
}

function updateProgressBar(win, message)
{
	++win.barRow.bar.value;
	if (message) {
		win.lblMessage.text = message;
	}
}

function repaintProgressBar(win, force /* = false*/) 
{
	if (env.version >= 11) {	// CS4 added support for UI updates; the previous method became unbearably slow, as is app.refresh()
		if (force) {
			app.refresh();
		}
		else {  
			win.update();
		}
	}
	else {	
		// CS3 and below
		var d = new ActionDescriptor();
		d.putEnumerated(app.stringIDToTypeID('state'), app.stringIDToTypeID('state'), app.stringIDToTypeID('redrawComplete'));
		executeAction(app.stringIDToTypeID('wait'), d, DialogModes.NO);
  }
}

function showDialog() 
{
 	// read dialog resource
	var rsrcFile = new File(env.scriptFileDirectory + "/dialog.json");
	var rsrcString = loadResource(rsrcFile);
	if (! rsrcString) {
		return false;
	}

   // build dialogue
	var dlg;
	try {
		dlg = new Window(rsrcString);
	}	
	catch (e) {
		alert("Dialog resource is corrupt! Please, redownload the script with all files.", "Error", true);
		return false;
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
	var paramFuncs = [getDialogParamsPNG24, getDialogParamsPNG8, getDialogParamsJPEG, getDialogParamsTarga];
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
		// Note: There's a bug in CS5 and CC where ListItem.selected doesn't report correct value in onChange().
		// A workaround is to rely on DropDownList.selection instead.
		for (var i = saveOpt.length - 1; i >= 0; --i) {
			saveOpt[i].controlRoot.hide();
		}
		saveOpt[this.selection.index].controlRoot.show();
    }; 
	
    formatDropDown.selection = 0;
	  	   
    // buttons
    dlg.funcArea.buttons.btnRun.onClick = function() {
		// collect arguments for saving and proceed
		var selIdx = formatDropDown.selection.index;
		saveOpt[selIdx].handler(saveOpt[selIdx].controlRoot);
        dlg.close(1); 
    }; 
    dlg.funcArea.buttons.btnCancel.onClick = function() {
        dlg.close(0); 
    }; 
	
	// warning message
	dlg.warning.message.text = formatString(dlg.warning.message.text, layers.length, visibleLayers.length);

	dlg.center(); 
    return dlg.show();
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
function onDialogSelectTarga(parent)
{
	prefs.format = "TGA";
	prefs.fileExtension = ".tga";
	prefs.formatArgs = new TargaSaveOptions();
	prefs.formatArgs.alphaChannels = parent.alpha.value;
	prefs.formatArgs.rleCompression = parent.rle.value;
	var resolution_enum = [TargaBitsPerPixels.SIXTEEN, TargaBitsPerPixels.TWENTYFOUR, TargaBitsPerPixels.THIRTYTWO];
	prefs.formatArgs.resolution = resolution_enum[parent.bitsPerPixel.selection.index];
}

function getDialogParamsJPEG(parent)
{
	const ROW_HEIGHT = 16;
	
	// quality
	var row = parent.add("group");
	var qualityLabel = row.add("statictext", undefined, "Quality:");
	qualityLabel.preferredSize = [40, ROW_HEIGHT];
	parent.quality = row.add("slider", undefined, 12, 0, 12);
	parent.quality.preferredSize = [140, ROW_HEIGHT];
	var qualityValue = row.add("statictext", undefined, "12");
	qualityValue.preferredSize = [30, ROW_HEIGHT];
	
	parent.quality.onChanging = function() {
		this.value = Math.round(this.value);
		qualityValue.text = this.value;
	};
	
	// matte
	row = parent.add("group");
	var matteLabel = row.add("statictext", undefined, "Matte:");
	matteLabel.preferredSize = [40, ROW_HEIGHT];
	parent.matte = row.add("dropdownlist", undefined, ["White", "Black", "Gray", "-", "Background", "Foreground"]);
	parent.matte.selection = 0;
	
	// colour profile
	parent.icc = parent.add("checkbox", undefined, "ICC Profile");
	
	// optimised
	parent.optimised = parent.add("checkbox", undefined, "Optimized");
	parent.optimised.value = true;
	
	// progressive
	parent.progressive = parent.add("checkbox", undefined, "Progressive");
	parent.progressive.onClick = function() {
		parent.optimised.enabled = ! this.value;
	};
	
	return {type: "JPG", handler: onDialogSelectJPEG};
}

function onDialogSelectJPEG(parent)
{
	prefs.format = "JPG";
	prefs.fileExtension = ".jpg";
	prefs.formatArgs = new JPEGSaveOptions();
	const matteValue = [MatteType.WHITE, MatteType.BLACK, MatteType.SEMIGRAY, MatteType.NONE, MatteType.BACKGROUND, MatteType.FOREGROUND];
	with (prefs.formatArgs) {
		quality = parent.quality.value;
		matte = matteValue[parent.matte.selection.index];
		embedColorProfile = parent.icc.value;
		if (parent.progressive.value) {
			formatOptions = FormatOptions.PROGRESSIVE;
			scans = 3;
		}
		else if (parent.optimised.value) {
			formatOptions = FormatOptions.OPTIMIZEDBASELINE;
		}
		else {
			formatOptions = FormatOptions.STANDARDBASELINE;
		}
	}
}

function getDialogParamsPNG24(parent)
{
	const ROW_HEIGHT = 16;
	
	// matte
	var row = parent.add("group");	
	var matteLabel = row.add("statictext", undefined, "Matte:");
	matteLabel.preferredSize = [40, ROW_HEIGHT];
	parent.matte = row.add("dropdownlist", undefined, ["White", "Black", "Gray", "-", "Background", "Foreground"]);
	parent.matte.selection = 0;	
	parent.matte.enabled = false;
	
	// transparency
	parent.transparency = parent.add("checkbox", undefined, "Transparency");
	parent.transparency.value = true;
	
	parent.transparency.onClick = function() {
		parent.matte.enabled = ! this.value;
	};
	
	// interlaced
	parent.interlaced = parent.add("checkbox", undefined, "Interlaced");
	
	return {type: "PNG-24", handler: onDialogSelectPNG24};
}

function onDialogSelectPNG24(parent)
{
try {
	prefs.format = "PNG-24";
	prefs.fileExtension = ".png";
	
	var WHITE = new RGBColor(); 
	WHITE.red = 255; WHITE.green = 255; WHITE.blue = 255;
	var BLACK = new RGBColor(); 
	BLACK.red = 0; BLACK.green = 0; BLACK.blue = 0;
	var GRAY = new RGBColor(); 
	GRAY.red = 127; GRAY.green = 127; GRAY.blue = 127;
	
	const matteColours = [WHITE, BLACK, GRAY, BLACK, backgroundColor.rgb, foregroundColor.rgb];
	
	prefs.formatArgs = new ExportOptionsSaveForWeb();
	with (prefs.formatArgs) {
		format = SaveDocumentType.PNG;
		PNG8 = false;
		interlaced = parent.interlaced.value;
		transparency = parent.transparency.value;
		matteColor = matteColours[parent.matte.selection.index];
	}
}
catch (e) {
	alert("Line " + e.line + ": " + e.message);
	throw e;
}
}

function getDialogParamsPNG8(parent)
{
	return {type: "PNG-8", handler: onDialogSelectPNG8};
}

function onDialogSelectPNG8(parent)
{
	prefs.format = "PNG-8";
	prefs.fileExtension = ".png";
	prefs.formatArgs = new ExportOptionsSaveForWeb();
	prefs.formatArgs.format = SaveDocumentType.PNG;
	prefs.formatArgs.PNG8 = true;
	prefs.formatArgs.dither = Dither.NONE;
}

//
// Bootstrapper (version support, getting additional environment settings, error handling...)
//

function bootstrap() 
{
    function showError(err) {
        alert(err + ': on line ' + err.line, 'Script Error', true);
    }

	// initialisation of class methods
	defineProfilerMethods();
	
	// check if there's a document open
	try {
		var doc = activeDocument;		// this actually triggers the exception
		if (! doc) {					// this is just for sure if it ever behaves differently in other versions
			throw new Error();
		}
	}
	catch (e) {
		alert("No document is open! Nothing to export.", "Error", true);
		return "cancel";
	}
	
    try {
		// setup the environment
		
		env = new Object();
		
		env.profiling = false;
		
		env.version = parseInt(version, 10);
		
		if (env.version < 9) {
			alert("Photoshop versions before CS2 are not supported!", "Error", true);
			return "cancel";
		}
		
		env.cs3OrHigher = (env.version >= 10);
		
		// get script's file name
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
		
		// run the script itself
        if (env.cs3OrHigher) {
			// suspend history for CS3 or higher
            activeDocument.suspendHistory('Export Layers To Files', 'main()');
        } 
		else {
            main();
        }
    } 
	catch(e) {
        // report errors unless the user cancelled
        if (e.number != 8007) showError(e);
		return "cancel";
    }
}

//
// ActionManager mud
//

// Faster layer collection:
// 	https://forums.adobe.com/message/2666611

function collectLayersAM(progressBarWindow)
{
	var layers = [],
		visibleLayers = [];
	var layerCount = 0;

	var ref = null;
	var desc = null;
	
	const idOrdn = charIDToTypeID("Ordn");
	
	// Get layer count reported by the active Document object - it never includes the background.
	ref = new ActionReference();
	ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
	desc = executeActionGet(ref);
	layerCount = desc.getInteger(charIDToTypeID("NmbL"));

	if (layerCount == 0) {
		// This is a flattened image that contains only the background (which is always visible).
		var bg = activeDocument.backgroundLayer;
		layers.push(bg);
		visibleLayers.push(bg);
	}
	else {
		// There are more layers that may or may not contain a background. The background is always at 0;
		// other layers are indexed from 1.
		
		const idLyr = charIDToTypeID("Lyr ");
		const idLayerSection = stringIDToTypeID("layerSection");
		const idVsbl = charIDToTypeID("Vsbl");
		const idNull = charIDToTypeID("null");
		const idSlct = charIDToTypeID("slct");
		const idMkVs = charIDToTypeID("MkVs");
		
		const FEW_LAYERS = 10;
		
		if (layerCount <= FEW_LAYERS) {
			// don't show the progress bar UI for only a few layers
			progressBarWindow = null;
		}
		
		if (progressBarWindow) {
			// The layer count is actually + 1 if there's a background present, but it should be no biggie.
			showProgressBar(progressBarWindow, "Collecting layers... Might take up to several seconds.", (layerCount + FEW_LAYERS) / FEW_LAYERS);
		}
	
		ref = new ActionReference();
		ref.putEnumerated(idLyr, idOrdn, charIDToTypeID("Trgt"));
		var selectionDesc = executeActionGet(ref);
		
		try {
			// Collect normal layers.
			var visibleInGroup = [true];
			var layerVisible;
			for (var i = layerCount; i >= 1; --i) {
				// check if it's an art layer (not a group) that can be selected
				ref = new ActionReference();
				ref.putIndex(idLyr, i);
				desc = executeActionGet(ref);
				layerVisible = desc.getBoolean(idVsbl);
				layerSection = typeIDToStringID(desc.getEnumerationValue(idLayerSection));
				if (layerSection == "layerSectionContent") {
					// select the layer and then retrieve it via Document.activeLayer
					desc.clear();
					desc.putReference(idNull, ref);  
					desc.putBoolean(idMkVs, false);  
					executeAction(idSlct, desc, DialogModes.NO);
					
					var activeLayer = activeDocument.activeLayer;
					layers.push(activeLayer);
					if (layerVisible && visibleInGroup[visibleInGroup.length - 1]) {
						visibleLayers.push(activeLayer);
					}				
				}
				else if (layerSection == "layerSectionStart") {
					visibleInGroup.push(layerVisible && visibleInGroup[visibleInGroup.length - 1]);
				}
				else if (layerSection == "layerSectionEnd") {
					visibleInGroup.pop();
				}
				
				if (progressBarWindow && ((i % FEW_LAYERS == 0) || (i == layerCount))) {
					updateProgressBar(progressBarWindow);
					repaintProgressBar(progressBarWindow);
					if (userCancelled) {
						throw new Error("cancel");
					}
				}
			}
			
			// Collect the background.
			ref = new ActionReference();
			ref.putIndex(idLyr, 0);
			try {
				desc = executeActionGet(ref);
				var bg = activeDocument.backgroundLayer;
				layers.push(bg);
				if (bg.visible) {
					visibleLayers.push(bg);
				}
				
				if (progressBarWindow) {
					updateProgressBar(progressBarWindow);
					repaintProgressBar(progressBarWindow);
				}
			}
			catch (e) {
				// no background, move on
			}		
		}
		catch (e) {
			if (e.message != "cancel") throw e;
		}

		// restore selection (unfortunately CS2 doesn't support multiselection, so only the topmost layer is re-selected)
		desc.clear();
		ref = new ActionReference();
		const totalLayerCount = selectionDesc.getInteger(charIDToTypeID("Cnt "));
		ref.putIndex(idLyr, selectionDesc.getInteger(charIDToTypeID("ItmI")) - (totalLayerCount - layerCount));
		desc.putReference(idNull, ref);  
		desc.putBoolean(idMkVs, false);  
		executeAction(idSlct, desc, DialogModes.NO);
		
		if (progressBarWindow) {
			progressBarWindow.hide();
		}
	}
		
	return {layers: layers, visibleLayers: visibleLayers};
}

//
// Utilities
//

function padder(input, padLength) 
{
    // pad the input with zeroes up to indicated length
    var result = (new Array(padLength + 1 - input.toString().length)).join('0') + input;
    return result;
}

function formatString(text) 
{
	var args = Array.prototype.slice.call(arguments, 1);
	return text.replace(/\{(\d+)\}/g, function(match, number) { 
			return (typeof args[number] != 'undefined') ? args[number] : match;
		});
}

function loadResource(file)
{
	var rsrcString;
	if (! file.exists) {
		alert("Resource file '" + file.name + "' for the export dialog is missing! Please, download the rest of the files that come with this script.", "Error", true);
		return false;
	}
	try {
		file.open("r");
		if (file.error) throw file.error;
		rsrcString = file.read();
		if (file.error) throw file.error;
		if (! file.close()) {
			throw file.error;
		}
	}
	catch (error) {
		alert("Failed to read the resource file '" + rsrcFile + "'!\n\nReason: " + error + "\n\nPlease, check it's available for reading and redownload it in case it became corrupted.", "Error", true);
		return false;
	}
	
	return rsrcString;
}

function Profiler(enabled)
{
	this.enabled = enabled;
	if (this.enabled) {
		this.startTime = new Date();
		this.lastTime = this.startTime;
	}
}

function defineProfilerMethods()
{
	Profiler.prototype.getDuration = function(rememberAsLastCall, sinceLastCall)
	{
		if (this.enabled) {
			var currentTime = new Date();
			var lastTime = sinceLastCall ? this.lastTime : this.startTime;
			if (rememberAsLastCall) {
				this.lastTime = currentTime;
			}
			return new Date(currentTime.getTime() - lastTime.getTime());
		}
	}
	
	Profiler.prototype.resetLastTime = function()
	{
		this.lastTime = new Date();
	}

	Profiler.prototype.format = function(duration)
	{
		var output = padder(duration.getUTCHours(), 2) + ":";
		output += padder(duration.getUTCMinutes(), 2) + ":";
		output += padder(duration.getUTCSeconds(), 2) + ".";
		output += padder(duration.getUTCMilliseconds(), 3);
		return output;
	}
}
