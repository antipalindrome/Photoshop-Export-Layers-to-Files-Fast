// DIALOG
// ======
var dialog = new Window('dialog', undefined, undefined, {
  closeButton: false,
  resizeable: true,
});
dialog.text = 'Export Layers To Files v2.7.1';
dialog.orientation = 'column';
dialog.alignChildren = ['center', 'center'];
dialog.spacing = 5;
dialog.margins = [10, 10, 10, 5];

// GRPCOLCONTAINER
// ===============
var grpColContainer = dialog.add('group', undefined, {
  name: 'grpColContainer',
});
grpColContainer.orientation = 'row';
grpColContainer.alignChildren = ['center', 'center'];
grpColContainer.spacing = 10;
grpColContainer.margins = 0;

// GRPCOL1
// =======
var grpCol1 = grpColContainer.add('group', undefined, { name: 'grpCol1' });
grpCol1.orientation = 'column';
grpCol1.alignChildren = ['left', 'center'];
grpCol1.spacing = 17;
grpCol1.margins = 0;
grpCol1.alignment = ['center', 'top'];

// PNLDESTINATION
// ==============
var pnlDestination = grpCol1.add('panel', undefined, undefined, {
  name: 'pnlDestination',
});
pnlDestination.text = 'Output Destination';
pnlDestination.orientation = 'row';
pnlDestination.alignChildren = ['left', 'center'];
pnlDestination.spacing = 10;
pnlDestination.margins = 10;
pnlDestination.alignment = ['left', 'center'];

var txtDestination = pnlDestination.add(
  'edittext {properties: {name: "txtDestination"}}'
);
txtDestination.helpTip = 'Where to save the files';
txtDestination.preferredSize.width = 200;

var btnBrowse = pnlDestination.add('button', undefined, undefined, {
  name: 'btnBrowse',
});
btnBrowse.text = 'Browse...';
btnBrowse.justify = 'left';

// PNLEXPORT
// =========
var pnlExport = grpCol1.add('panel', undefined, undefined, {
  name: 'pnlExport',
});
pnlExport.text = 'Export';
pnlExport.orientation = 'column';
pnlExport.alignChildren = ['left', 'top'];
pnlExport.spacing = 11;
pnlExport.margins = 10;
pnlExport.alignment = ['fill', 'center'];

// GRPEXPORT
// =========
var grpExport = pnlExport.add('group', undefined, { name: 'grpExport' });
grpExport.orientation = 'row';
grpExport.alignChildren = ['left', 'center'];
grpExport.spacing = 10;
grpExport.margins = 0;

var radioAll = grpExport.add('radiobutton', undefined, undefined, {
  name: 'radioAll',
});
radioAll.helpTip = 'Exports all layers';
radioAll.text = 'All Layers';
radioAll.value = true;

var radioSelected = grpExport.add('radiobutton', undefined, undefined, {
  name: 'radioSelected',
});
radioSelected.helpTip =
  'Only exports selected group. Must select a group to be enabled.';
radioSelected.text = 'Selected Group';

// GRPIGNORE
// =========
var grpIgnore = pnlExport.add('group', undefined, { name: 'grpIgnore' });
grpIgnore.orientation = 'column';
grpIgnore.alignChildren = ['left', 'center'];
grpIgnore.spacing = 5;
grpIgnore.margins = 0;

var cbVisibleOnly = grpIgnore.add('checkbox', undefined, undefined, {
  name: 'cbVisibleOnly',
});
cbVisibleOnly.helpTip = 'Whether to export only visible layers';
cbVisibleOnly.text = 'Visible Only';

// GRPIGNOREORONLYPREFIX
// =====================
var grpIgnoreOrOnlyPrefix = grpIgnore.add('group', undefined, {
  name: 'grpIgnoreOrOnlyPrefix',
});
grpIgnoreOrOnlyPrefix.orientation = 'row';
grpIgnoreOrOnlyPrefix.alignChildren = ['left', 'center'];
grpIgnoreOrOnlyPrefix.spacing = 10;
grpIgnoreOrOnlyPrefix.margins = 0;

var cbIgnoreOrOnlyLayersSelectionEnabled = grpIgnoreOrOnlyPrefix.add(
  'checkbox',
  undefined,
  undefined,
  { name: 'cbIgnoreOrOnlyLayersSelectionEnabled' }
);
cbIgnoreOrOnlyLayersSelectionEnabled.helpTip =
  'Ignore/Only layers starting with';

var ddIgnoreOrOnlyLayersSelection_array = ['Ignore', 'Only'];
var ddIgnoreOrOnlyLayersSelection = grpIgnoreOrOnlyPrefix.add(
  'dropdownlist',
  undefined,
  undefined,
  {
    name: 'ddIgnoreOrOnlyLayersSelection',
    items: ddIgnoreOrOnlyLayersSelection_array,
  }
);
ddIgnoreOrOnlyLayersSelection.selection = 0;

var lblIgnoreOrOnlyLayerSelection = grpIgnoreOrOnlyPrefix.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblIgnoreOrOnlyLayerSelection' }
);
lblIgnoreOrOnlyLayerSelection.text = 'Layers Starting With';

var txtIgnoreOrOnlyPrefix = grpIgnoreOrOnlyPrefix.add(
  'edittext {properties: {name: "txtIgnoreOrOnlyPrefix"}}'
);
txtIgnoreOrOnlyPrefix.helpTip = 'The prefix to match against';
txtIgnoreOrOnlyPrefix.text = '!';
txtIgnoreOrOnlyPrefix.preferredSize.width = 31;

// PNLNAMEFILES
// ============
var pnlNameFiles = grpCol1.add('panel', undefined, undefined, {
  name: 'pnlNameFiles',
});
pnlNameFiles.text = 'Filenames';
pnlNameFiles.orientation = 'column';
pnlNameFiles.alignChildren = ['left', 'top'];
pnlNameFiles.spacing = 4;
pnlNameFiles.margins = [10, 10, 10, 10];
pnlNameFiles.alignment = ['fill', 'center'];

var ddNameAs_array = [
  'Use layer name (strip extension)',
  'Use layer name (keep extension)',
  'Use layer and parent group names',
  'Use index descending',
  'Use index ascending',
];
var ddNameAs = pnlNameFiles.add('dropdownlist', undefined, undefined, {
  name: 'ddNameAs',
  items: ddNameAs_array,
});
ddNameAs.selection = 0;

// GRPDELIMITER
// ============
var grpDelimiter = pnlNameFiles.add('group', undefined, {
  name: 'grpDelimiter',
});
grpDelimiter.orientation = 'row';
grpDelimiter.alignChildren = ['left', 'center'];
grpDelimiter.spacing = 10;
grpDelimiter.margins = 0;

var cbDelimiter = grpDelimiter.add('checkbox', undefined, undefined, {
  name: 'cbDelimiter',
});
cbDelimiter.helpTip = 'Whether to use a custom delimiter between words';
cbDelimiter.text = 'Use Custom Delimiter';

var txtDelimiter = grpDelimiter.add(
  'edittext {properties: {name: "txtDelimiter"}}'
);
txtDelimiter.helpTip = 'The delimiter to use between words';
txtDelimiter.text = '_';
txtDelimiter.preferredSize.width = 22;

// GRPCASING
// =========
var grpCasing = pnlNameFiles.add('group', undefined, { name: 'grpCasing' });
grpCasing.orientation = 'row';
grpCasing.alignChildren = ['left', 'center'];
grpCasing.spacing = 10;
grpCasing.margins = 0;

var lblLetterCasing = grpCasing.add('statictext', undefined, undefined, {
  name: 'lblLetterCasing',
});
lblLetterCasing.text = 'Letter Casing';

var ddLetterCasing_array = ['Keep', 'Lowercase', 'Uppercase'];
var ddLetterCasing = grpCasing.add('dropdownlist', undefined, undefined, {
  name: 'ddLetterCasing',
  items: ddLetterCasing_array,
});
ddLetterCasing.selection = 0;

// GRPPREFIXSUFFIXWRAPPER
// ======================
var grpPrefixSuffixWrapper = pnlNameFiles.add('group', undefined, {
  name: 'grpPrefixSuffixWrapper',
});
grpPrefixSuffixWrapper.orientation = 'column';
grpPrefixSuffixWrapper.alignChildren = ['left', 'center'];
grpPrefixSuffixWrapper.spacing = 0;
grpPrefixSuffixWrapper.margins = 0;

// GRPPREFIXSUFFIXLABEL
// ====================
var grpPrefixSuffixLabel = grpPrefixSuffixWrapper.add('group', undefined, {
  name: 'grpPrefixSuffixLabel',
});
grpPrefixSuffixLabel.orientation = 'row';
grpPrefixSuffixLabel.alignChildren = ['left', 'center'];
grpPrefixSuffixLabel.spacing = 81;
grpPrefixSuffixLabel.margins = [0, 0, 0, 0];

var lblPrefix = grpPrefixSuffixLabel.add('statictext', undefined, undefined, {
  name: 'lblPrefix',
});
lblPrefix.text = 'Prefix';
lblPrefix.alignment = ['left', 'center'];

var lblSuffix = grpPrefixSuffixLabel.add('statictext', undefined, undefined, {
  name: 'lblSuffix',
});
lblSuffix.text = 'Suffix';

// GRPPREFIXSUFFIX
// ===============
var grpPrefixSuffix = grpPrefixSuffixWrapper.add('group', undefined, {
  name: 'grpPrefixSuffix',
});
grpPrefixSuffix.orientation = 'row';
grpPrefixSuffix.alignChildren = ['left', 'center'];
grpPrefixSuffix.spacing = 2;
grpPrefixSuffix.margins = 0;

var txtPrefix = grpPrefixSuffix.add(
  'edittext {properties: {name: "txtPrefix"}}'
);
txtPrefix.helpTip = 'Prefix will be added before every layer name';
txtPrefix.preferredSize.width = 100;

var lblEllipsis = grpPrefixSuffix.add('statictext', undefined, undefined, {
  name: 'lblEllipsis',
});
lblEllipsis.text = '...';

var txtSuffix = grpPrefixSuffix.add(
  'edittext {properties: {name: "txtSuffix"}}'
);
txtSuffix.helpTip = 'Suffix will be added after every layer name';
txtSuffix.preferredSize.width = 100;

// GRPCOL2
// =======
var grpCol2 = grpColContainer.add('group', undefined, { name: 'grpCol2' });
grpCol2.orientation = 'column';
grpCol2.alignChildren = ['left', 'center'];
grpCol2.spacing = 10;
grpCol2.margins = 0;
grpCol2.alignment = ['center', 'top'];

// GRPACTIONS
// ==========
var grpActions = grpCol2.add('group', undefined, { name: 'grpActions' });
grpActions.orientation = 'column';
grpActions.alignChildren = ['fill', 'top'];
grpActions.spacing = 5;
grpActions.margins = [0, 0, 0, 1];
grpActions.alignment = ['fill', 'center'];

var btnRun = grpActions.add('button', undefined, undefined, { name: 'btnRun' });
btnRun.helpTip = 'Runs the script with the selected settings';
btnRun.text = 'Run';

// GRPCLOSEBUTTONS
// ===============
var grpCloseButtons = grpActions.add('group', undefined, {
  name: 'grpCloseButtons',
});
grpCloseButtons.orientation = 'row';
grpCloseButtons.alignChildren = ['center', 'top'];
grpCloseButtons.spacing = 10;
grpCloseButtons.margins = 0;

var btnCancel = grpCloseButtons.add('button', undefined, undefined, {
  name: 'btnCancel',
});
btnCancel.helpTip = 'Closes the dialog and does not save any changes';
btnCancel.text = 'Cancel';
btnCancel.preferredSize.width = 111;

var btnSaveAndCancel = grpCloseButtons.add('button', undefined, undefined, {
  name: 'btnSaveAndCancel',
});
btnSaveAndCancel.helpTip = 'Closes the dialog but saves any changes made';
btnSaveAndCancel.text = 'Save and Close';

// GRPACTIONS
// ==========
var cbOverwriteFiles = grpActions.add('checkbox', undefined, undefined, {
  name: 'cbOverwriteFiles',
});
cbOverwriteFiles.helpTip =
  'If checked, will overwrite existing files if they have the same name. Otherwise it will make unique copies';
cbOverwriteFiles.text = 'Overwrite Existing Files';
cbOverwriteFiles.alignment = ['center', 'top'];

var cbSilent = grpActions.add('checkbox', undefined, undefined, {
  name: 'cbSilent',
});
cbSilent.helpTip =
  'If checked, will run without a progress bar and success confirmation.';
cbSilent.text = 'Run Silently';
cbSilent.alignment = ['center', 'top'];

// PNLOUTPUT
// =========
var pnlOutput = grpCol2.add('panel', undefined, undefined, {
  name: 'pnlOutput',
});
pnlOutput.text = 'Output Options';
pnlOutput.orientation = 'column';
pnlOutput.alignChildren = ['left', 'top'];
pnlOutput.spacing = 10;
pnlOutput.margins = 10;
pnlOutput.alignment = ['fill', 'center'];

// GRPGROUPSAS
// ===========
var grpGroupsAs = pnlOutput.add('group', undefined, { name: 'grpGroupsAs' });
grpGroupsAs.orientation = 'column';
grpGroupsAs.alignChildren = ['left', 'center'];
grpGroupsAs.spacing = 5;
grpGroupsAs.margins = 0;

var cbGroupsAsFolders = grpGroupsAs.add('checkbox', undefined, undefined, {
  name: 'cbGroupsAsFolders',
});
cbGroupsAsFolders.helpTip = 'Groups and sub-groups are saved as directories.';
cbGroupsAsFolders.text = 'Groups as Folders';

var cbTopGroupsAsFolders = grpGroupsAs.add('checkbox', undefined, undefined, {
  name: 'cbTopGroupsAsFolders',
});
cbTopGroupsAsFolders.helpTip =
  'Groups are saved as directories. Layers in nested groups will be saved in their topmost group.';
cbTopGroupsAsFolders.text = 'Top Groups as Folders';

var cbTopGroupsAsLayers = grpGroupsAs.add('checkbox', undefined, undefined, {
  name: 'cbTopGroupsAsLayers',
});
cbTopGroupsAsLayers.helpTip =
  'Top level groups will merge all their children into a single layer before export';
cbTopGroupsAsLayers.text = 'Merge Groups as Layers';

// PNLOUTPUT
// =========
var dvdrOutput = pnlOutput.add('panel', undefined, undefined, {
  name: 'dvdrOutput',
});
dvdrOutput.alignment = 'fill';

// GRPFOREGROUNDBACKGROUND
// =======================
var grpForegroundBackground = pnlOutput.add('group', undefined, {
  name: 'grpForegroundBackground',
});
grpForegroundBackground.orientation = 'column';
grpForegroundBackground.alignChildren = ['left', 'center'];
grpForegroundBackground.spacing = 5;
grpForegroundBackground.margins = 0;

var cbForeground = grpForegroundBackground.add(
  'checkbox',
  undefined,
  undefined,
  { name: 'cbForeground' }
);
cbForeground.helpTip =
  'The top layer will be used as a foreground in every export.';
cbForeground.text = 'Top Layer as Foreground';

var cbBackground = grpForegroundBackground.add(
  'checkbox',
  undefined,
  undefined,
  { name: 'cbBackground' }
);
cbBackground.helpTip =
  'The bottom layer will be used as a background in every export.';
cbBackground.text = 'Bottom Layer as Background';

// PNLMODIFYLAYERS
// ===============
var pnlModifyLayers = grpCol2.add('panel', undefined, undefined, {
  name: 'pnlModifyLayers',
});
pnlModifyLayers.text = 'Modify Layers';
pnlModifyLayers.orientation = 'column';
pnlModifyLayers.alignChildren = ['left', 'top'];
pnlModifyLayers.spacing = 5;
pnlModifyLayers.margins = 10;
pnlModifyLayers.alignment = ['fill', 'center'];

// GRPTRIM
// =======
var grpTrim = pnlModifyLayers.add('group', undefined, { name: 'grpTrim' });
grpTrim.orientation = 'row';
grpTrim.alignChildren = ['left', 'center'];
grpTrim.spacing = 10;
grpTrim.margins = 0;

var cbTrim = grpTrim.add('checkbox', undefined, undefined, { name: 'cbTrim' });
cbTrim.helpTip = 'Whether to trim before export';
cbTrim.text = 'Trim';

var ddTrim_array = ['Each Layer', 'Each Layer (use trim())', 'Combined'];
var ddTrim = grpTrim.add('dropdownlist', undefined, undefined, {
  name: 'ddTrim',
  items: ddTrim_array,
});
ddTrim.selection = 0;

// GRPPADDING
// ==========
var grpPadding = pnlModifyLayers.add('group', undefined, {
  name: 'grpPadding',
});
grpPadding.orientation = 'row';
grpPadding.alignChildren = ['left', 'center'];
grpPadding.spacing = 10;
grpPadding.margins = 0;

var cbPadding = grpPadding.add('checkbox', undefined, undefined, {
  name: 'cbPadding',
});
cbPadding.helpTip = 'Whether to add padding to every layer before export';
cbPadding.text = 'Padding';

// GRPPADDINGLABEL
// ===============
var grpPaddingLabel = grpPadding.add('group', undefined, {
  name: 'grpPaddingLabel',
});
grpPaddingLabel.orientation = 'row';
grpPaddingLabel.alignChildren = ['left', 'center'];
grpPaddingLabel.spacing = 0;
grpPaddingLabel.margins = 0;

var txtPadding = grpPaddingLabel.add(
  'edittext {properties: {name: "txtPadding"}}'
);
txtPadding.text = '0';
txtPadding.preferredSize.width = 29;

var lblPadding = grpPaddingLabel.add('statictext', undefined, undefined, {
  name: 'lblPadding',
});
lblPadding.text = 'px';

// GRPSCALE
// ========
var grpScale = pnlModifyLayers.add('group', undefined, { name: 'grpScale' });
grpScale.orientation = 'row';
grpScale.alignChildren = ['left', 'center'];
grpScale.spacing = 10;
grpScale.margins = 0;

var cbScale = grpScale.add('checkbox', undefined, undefined, {
  name: 'cbScale',
});
cbScale.helpTip = 'Whether to scale every layer before export';
cbScale.text = 'Scale';

// GRPSCALELABEL
// =============
var grpScaleLabel = grpScale.add('group', undefined, { name: 'grpScaleLabel' });
grpScaleLabel.orientation = 'row';
grpScaleLabel.alignChildren = ['left', 'center'];
grpScaleLabel.spacing = 0;
grpScaleLabel.margins = 0;

var txtScale = grpScaleLabel.add('edittext {properties: {name: "txtScale"}}');
txtScale.text = '100';
txtScale.preferredSize.width = 36;

var lblScale = grpScaleLabel.add('statictext', undefined, undefined, {
  name: 'lblScale',
});
lblScale.text = '%';

// PNLEXPORTAS
// ===========
var pnlExportAs = dialog.add('panel', undefined, undefined, {
  name: 'pnlExportAs',
  borderStyle: 'none',
});
pnlExportAs.text = 'Export As';
pnlExportAs.orientation = 'column';
pnlExportAs.alignChildren = ['center', 'center'];
pnlExportAs.spacing = 10;
pnlExportAs.margins = [0, 6, 0, 0];
pnlExportAs.alignment = ['fill', 'center'];

// TABPNLEXPORTOPTIONS
// ===================
var tabpnlExportOptions = pnlExportAs.add('tabbedpanel', undefined, undefined, {
  name: 'tabpnlExportOptions',
});
tabpnlExportOptions.alignChildren = 'fill';
tabpnlExportOptions.preferredSize.width = 554.625;
tabpnlExportOptions.margins = 0;
tabpnlExportOptions.alignment = ['fill', 'center'];

// TABPNG24
// ========
var tabPng24 = tabpnlExportOptions.add('tab', undefined, undefined, {
  name: 'tabPng24',
});
tabPng24.text = 'PNG-24';
tabPng24.orientation = 'column';
tabPng24.alignChildren = ['left', 'top'];
tabPng24.spacing = 5;
tabPng24.margins = 10;

// GRPPNG24MATTE
// =============
var grpPng24Matte = tabPng24.add('group', undefined, { name: 'grpPng24Matte' });
grpPng24Matte.orientation = 'row';
grpPng24Matte.alignChildren = ['left', 'center'];
grpPng24Matte.spacing = 10;
grpPng24Matte.margins = 0;

var lblPng24Matte = grpPng24Matte.add('statictext', undefined, undefined, {
  name: 'lblPng24Matte',
});
lblPng24Matte.text = 'Matte';

var ddPng24Matte_array = [
  'White',
  'Black',
  'Gray',
  '-',
  'Background',
  'Foreground',
];
var ddPng24Matte = grpPng24Matte.add('dropdownlist', undefined, undefined, {
  name: 'ddPng24Matte',
  items: ddPng24Matte_array,
});
ddPng24Matte.selection = 0;

// TABPNG24
// ========
var cbPng24Transparency = tabPng24.add('checkbox', undefined, undefined, {
  name: 'cbPng24Transparency',
});
cbPng24Transparency.text = 'Transparency';

var cbPng24Interlaced = tabPng24.add('checkbox', undefined, undefined, {
  name: 'cbPng24Interlaced',
});
cbPng24Interlaced.text = 'Interlaced';

// TABPNG8
// =======
var tabPng8 = tabpnlExportOptions.add('tab', undefined, undefined, {
  name: 'tabPng8',
});
tabPng8.text = 'PNG-8';
tabPng8.orientation = 'column';
tabPng8.alignChildren = ['left', 'top'];
tabPng8.spacing = 5;
tabPng8.margins = 10;

// GRPPNG8COLORREDUCTION
// =====================
var grpPng8ColorReduction = tabPng8.add('group', undefined, {
  name: 'grpPng8ColorReduction',
});
grpPng8ColorReduction.orientation = 'row';
grpPng8ColorReduction.alignChildren = ['left', 'center'];
grpPng8ColorReduction.spacing = 10;
grpPng8ColorReduction.margins = 0;

var lblPng8ColorReduction = grpPng8ColorReduction.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPng8ColorReduction' }
);
lblPng8ColorReduction.text = 'Color Reduction';

var ddPng8ColorReduction_array = [
  'Perceptual',
  'Selective',
  'Adaptive',
  'Restrictive (Web)',
  '-',
  'Black & White',
  'Grayscale',
  'Mac OS',
  'Windows',
];
var ddPng8ColorReduction = grpPng8ColorReduction.add(
  'dropdownlist',
  undefined,
  undefined,
  { name: 'ddPng8ColorReduction', items: ddPng8ColorReduction_array }
);
ddPng8ColorReduction.selection = 0;

// GRPPNG8NUMBEROFCOLORS
// =====================
var grpPng8NumberOfColors = tabPng8.add('group', undefined, {
  name: 'grpPng8NumberOfColors',
});
grpPng8NumberOfColors.orientation = 'row';
grpPng8NumberOfColors.alignChildren = ['left', 'center'];
grpPng8NumberOfColors.spacing = 10;
grpPng8NumberOfColors.margins = 0;

var lblNumberOfColors = grpPng8NumberOfColors.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblNumberOfColors' }
);
lblNumberOfColors.text = 'Number of Colors';

var txtPng8NumberofColors = grpPng8NumberOfColors.add(
  'edittext {properties: {name: "txtPng8NumberofColors"}}'
);
txtPng8NumberofColors.preferredSize.width = 36;

// GRPPNG8DITHER
// =============
var grpPng8Dither = tabPng8.add('group', undefined, { name: 'grpPng8Dither' });
grpPng8Dither.orientation = 'row';
grpPng8Dither.alignChildren = ['left', 'center'];
grpPng8Dither.spacing = 10;
grpPng8Dither.margins = 0;

var lblPng8Dither = grpPng8Dither.add('statictext', undefined, undefined, {
  name: 'lblPng8Dither',
});
lblPng8Dither.text = 'Dither';

var ddPng8Dither_array = ['None', 'Diffusion', 'Pattern', 'Noise'];
var ddPng8Dither = grpPng8Dither.add('dropdownlist', undefined, undefined, {
  name: 'ddPng8Dither',
  items: ddPng8Dither_array,
});
ddPng8Dither.selection = 1;

// GRPPNG8DITHERSLIDER
// ===================
var grpPng8DitherSlider = grpPng8Dither.add('group', undefined, {
  name: 'grpPng8DitherSlider',
});
grpPng8DitherSlider.enabled = false;
grpPng8DitherSlider.orientation = 'row';
grpPng8DitherSlider.alignChildren = ['left', 'center'];
grpPng8DitherSlider.spacing = 10;
grpPng8DitherSlider.margins = 0;

var sldrPng8Dither = grpPng8DitherSlider.add(
  'slider',
  undefined,
  undefined,
  undefined,
  undefined,
  { name: 'sldrPng8Dither' }
);
sldrPng8Dither.minvalue = 0;
sldrPng8Dither.maxvalue = 100;
sldrPng8Dither.value = 50;
sldrPng8Dither.preferredSize.width = 100;

var lblPng8DitherValue = grpPng8DitherSlider.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPng8DitherValue' }
);
lblPng8DitherValue.text = '100%';

// GRPPNG8MATTE
// ============
var grpPng8Matte = tabPng8.add('group', undefined, { name: 'grpPng8Matte' });
grpPng8Matte.orientation = 'row';
grpPng8Matte.alignChildren = ['left', 'center'];
grpPng8Matte.spacing = 10;
grpPng8Matte.margins = 0;

var lblPng8Matte = grpPng8Matte.add('statictext', undefined, undefined, {
  name: 'lblPng8Matte',
});
lblPng8Matte.text = 'Matte';

var ddPng8Matte_array = [
  'White',
  'Black',
  'Gray',
  '-',
  'Background',
  'Foreground',
];
var ddPng8Matte = grpPng8Matte.add('dropdownlist', undefined, undefined, {
  name: 'ddPng8Matte',
  items: ddPng8Matte_array,
});
ddPng8Matte.selection = 0;

// GRPPNG8TRANSPARENCY
// ===================
var grpPng8Transparency = tabPng8.add('group', undefined, {
  name: 'grpPng8Transparency',
});
grpPng8Transparency.orientation = 'row';
grpPng8Transparency.alignChildren = ['left', 'center'];
grpPng8Transparency.spacing = 10;
grpPng8Transparency.margins = 0;

var cbPng8Transparency = grpPng8Transparency.add(
  'checkbox',
  undefined,
  undefined,
  { name: 'cbPng8Transparency' }
);
cbPng8Transparency.text = 'Transparency';

// GRPPNG8TRANSPARENCYDITHER
// =========================
var grpPng8TransparencyDither = grpPng8Transparency.add('group', undefined, {
  name: 'grpPng8TransparencyDither',
});
grpPng8TransparencyDither.enabled = false;
grpPng8TransparencyDither.orientation = 'row';
grpPng8TransparencyDither.alignChildren = ['left', 'center'];
grpPng8TransparencyDither.spacing = 10;
grpPng8TransparencyDither.margins = 0;

var lblPng8TransparencyDither = grpPng8TransparencyDither.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPng8TransparencyDither' }
);
lblPng8TransparencyDither.text = 'Transparency Dither';

var ddPng8TransparencyDither_array = ['None', 'Diffusion', 'Pattern', 'Noise'];
var ddPng8TransparencyDither = grpPng8TransparencyDither.add(
  'dropdownlist',
  undefined,
  undefined,
  { name: 'ddPng8TransparencyDither', items: ddPng8TransparencyDither_array }
);
ddPng8TransparencyDither.selection = 0;

var sldrPng8TransparencyDither = grpPng8TransparencyDither.add(
  'slider',
  undefined,
  undefined,
  undefined,
  undefined,
  { name: 'sldrPng8TransparencyDither' }
);
sldrPng8TransparencyDither.minvalue = 0;
sldrPng8TransparencyDither.maxvalue = 100;
sldrPng8TransparencyDither.value = 50;
sldrPng8TransparencyDither.preferredSize.width = 100;

var lblPng8TransparencyDitherValue = grpPng8TransparencyDither.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPng8TransparencyDitherValue' }
);
lblPng8TransparencyDitherValue.text = '100%';

// TABPNG8
// =======
var cbPng8Interlaced = tabPng8.add('checkbox', undefined, undefined, {
  name: 'cbPng8Interlaced',
});
cbPng8Interlaced.text = 'Interlaced';

// TABJPG
// ======
var tabJpg = tabpnlExportOptions.add('tab', undefined, undefined, {
  name: 'tabJpg',
});
tabJpg.text = 'JPG';
tabJpg.orientation = 'column';
tabJpg.alignChildren = ['left', 'top'];
tabJpg.spacing = 5;
tabJpg.margins = 10;

// GRPJPGQUALITY
// =============
var grpJpgQuality = tabJpg.add('group', undefined, { name: 'grpJpgQuality' });
grpJpgQuality.orientation = 'row';
grpJpgQuality.alignChildren = ['left', 'center'];
grpJpgQuality.spacing = 10;
grpJpgQuality.margins = 0;

var lblQuality = grpJpgQuality.add('statictext', undefined, undefined, {
  name: 'lblQuality',
});
lblQuality.text = 'Quality';

var sldrJpgQuality = grpJpgQuality.add(
  'slider',
  undefined,
  undefined,
  undefined,
  undefined,
  { name: 'sldrJpgQuality' }
);
sldrJpgQuality.minvalue = 0;
sldrJpgQuality.maxvalue = 100;
sldrJpgQuality.value = 50;
sldrJpgQuality.preferredSize.width = 200;

var lblJpgQualityValue = grpJpgQuality.add('statictext', undefined, undefined, {
  name: 'lblJpgQualityValue',
});
lblJpgQualityValue.text = '100';

// GRPJPGMATTE
// ===========
var grpJpgMatte = tabJpg.add('group', undefined, { name: 'grpJpgMatte' });
grpJpgMatte.orientation = 'row';
grpJpgMatte.alignChildren = ['left', 'center'];
grpJpgMatte.spacing = 10;
grpJpgMatte.margins = 0;

var lblJpgMatte = grpJpgMatte.add('statictext', undefined, undefined, {
  name: 'lblJpgMatte',
});
lblJpgMatte.text = 'Matte';

var ddJpgMatte_array = [
  'White',
  'Black',
  'Gray',
  '-',
  'Background',
  'Foreground',
];
var ddJpgMatte = grpJpgMatte.add('dropdownlist', undefined, undefined, {
  name: 'ddJpgMatte',
  items: ddJpgMatte_array,
});
ddJpgMatte.selection = 0;

// TABJPG
// ======
var cbJpgIcc = tabJpg.add('checkbox', undefined, undefined, {
  name: 'cbJpgIcc',
});
cbJpgIcc.text = 'ICC Profile';

var cbJpgOptimized = tabJpg.add('checkbox', undefined, undefined, {
  name: 'cbJpgOptimized',
});
cbJpgOptimized.text = 'Optimized';

var cbJpgProgressive = tabJpg.add('checkbox', undefined, undefined, {
  name: 'cbJpgProgressive',
});
cbJpgProgressive.text = 'Progressive';

// TABTIF
// ======
var tabTif = tabpnlExportOptions.add('tab', undefined, undefined, {
  name: 'tabTif',
});
tabTif.text = 'TIFF';
tabTif.orientation = 'column';
tabTif.alignChildren = ['left', 'top'];
tabTif.spacing = 5;
tabTif.margins = 10;

// GRPTIFENCODING
// ==============
var grpTifEncoding = tabTif.add('group', undefined, { name: 'grpTifEncoding' });
grpTifEncoding.orientation = 'row';
grpTifEncoding.alignChildren = ['left', 'center'];
grpTifEncoding.spacing = 10;
grpTifEncoding.margins = 0;

var lblTifEncoding = grpTifEncoding.add('statictext', undefined, undefined, {
  name: 'lblTifEncoding',
});
lblTifEncoding.text = 'Image Compression';

var ddTifEncoding_array = ['None', 'LZW', 'ZIP', 'JPG'];
var ddTifEncoding = grpTifEncoding.add('dropdownlist', undefined, undefined, {
  name: 'ddTifEncoding',
  items: ddTifEncoding_array,
});
ddTifEncoding.selection = 0;

// GRPTIFQUALITY
// =============
var grpTifQuality = grpTifEncoding.add('group', undefined, {
  name: 'grpTifQuality',
});
grpTifQuality.orientation = 'row';
grpTifQuality.alignChildren = ['left', 'center'];
grpTifQuality.spacing = 10;
grpTifQuality.margins = 0;

var lblTifQuality = grpTifQuality.add('statictext', undefined, undefined, {
  name: 'lblTifQuality',
});
lblTifQuality.text = 'Quality';

var sldrTifQuality = grpTifQuality.add(
  'slider',
  undefined,
  undefined,
  undefined,
  undefined,
  { name: 'sldrTifQuality' }
);
sldrTifQuality.minvalue = 0;
sldrTifQuality.maxvalue = 100;
sldrTifQuality.value = 50;
sldrTifQuality.preferredSize.width = 100;

var lblTifQualityValue = grpTifQuality.add('statictext', undefined, undefined, {
  name: 'lblTifQualityValue',
});
lblTifQualityValue.text = '100';

// TABTIF
// ======
var cbTifWithAlpha = tabTif.add('checkbox', undefined, undefined, {
  name: 'cbTifWithAlpha',
});
cbTifWithAlpha.text = 'With Alpha Channel';

var cbTifIcc = tabTif.add('checkbox', undefined, undefined, {
  name: 'cbTifIcc',
});
cbTifIcc.text = 'ICC Profile';

var cbTifTransparency = tabTif.add('checkbox', undefined, undefined, {
  name: 'cbTifTransparency',
});
cbTifTransparency.text = 'Transparency';

// TABPDF
// ======
var tabPdf = tabpnlExportOptions.add('tab', undefined, undefined, {
  name: 'tabPdf',
});
tabPdf.text = 'PDF';
tabPdf.orientation = 'column';
tabPdf.alignChildren = ['left', 'top'];
tabPdf.spacing = 5;
tabPdf.margins = 10;

// GRPPDFSTANDARD
// ==============
var grpPdfStandard = tabPdf.add('group', undefined, { name: 'grpPdfStandard' });
grpPdfStandard.orientation = 'row';
grpPdfStandard.alignChildren = ['left', 'center'];
grpPdfStandard.spacing = 10;
grpPdfStandard.margins = 0;

var lblPdfStandard = grpPdfStandard.add('statictext', undefined, undefined, {
  name: 'lblPdfStandard',
});
lblPdfStandard.text = 'Standard';

var ddPdfStandard_array = [
  'None',
  'PDF/X-1a:2001',
  'PDF/X-1a:2003',
  'PDF/X-3:2002',
  'PDF/X-3:2003',
  'PDF/X-4:2010',
];
var ddPdfStandard = grpPdfStandard.add('dropdownlist', undefined, undefined, {
  name: 'ddPdfStandard',
  items: ddPdfStandard_array,
});
ddPdfStandard.selection = 0;

var lblPdfCompatibility = grpPdfStandard.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPdfCompatibility' }
);
lblPdfCompatibility.text = 'Compatibility';

var ddPdfCompatibility_array = [
  'Acrobat 4 (PDF 1.3)',
  'Acrobat 5 (PDF 1.4)',
  'Acrobat 6 (PDF 1.5)',
  'Acrobat 7 (PDF 1.6)',
  'Acrobat 8 (PDF 1.7)',
];
var ddPdfCompatibility = grpPdfStandard.add(
  'dropdownlist',
  undefined,
  undefined,
  { name: 'ddPdfCompatibility', items: ddPdfCompatibility_array }
);
ddPdfCompatibility.selection = 0;

// GRPPDFCOLORCONVERSION
// =====================
var grpPdfColorConversion = tabPdf.add('group', undefined, {
  name: 'grpPdfColorConversion',
});
grpPdfColorConversion.orientation = 'row';
grpPdfColorConversion.alignChildren = ['left', 'center'];
grpPdfColorConversion.spacing = 10;
grpPdfColorConversion.margins = 0;

var cbPdfColorConversion = grpPdfColorConversion.add(
  'checkbox',
  undefined,
  undefined,
  { name: 'cbPdfColorConversion' }
);
cbPdfColorConversion.text = 'Color Conversion';

// GRPPDFDESTINATIONPROFILE
// ========================
var grpPdfDestinationProfile = grpPdfColorConversion.add('group', undefined, {
  name: 'grpPdfDestinationProfile',
});
grpPdfDestinationProfile.orientation = 'row';
grpPdfDestinationProfile.alignChildren = ['left', 'center'];
grpPdfDestinationProfile.spacing = 10;
grpPdfDestinationProfile.margins = 0;

var lblPdfDestinationProfile = grpPdfDestinationProfile.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPdfDestinationProfile' }
);
lblPdfDestinationProfile.text = 'Destination';

var ddPdfDestinationProfile_array = [
  'Japan Color 2001 Coated',
  'Japan Color 2001 Uncoated',
  'Japan Color 2002 Newspaper',
  'Japan Color 2003 Web Coated',
  'Japan Web Coated (Ad)',
  'U.S. Sheetfed Coated v2',
  'U.S. Sheetfed Uncoated v2',
  'U.S. Web Coated (SWOP) v2',
  'U.S. Web Uncoated v2',
  '-',
  'sRGB IEC61966-2.1',
  'Adobe RGB (1998)',
  'Apple RGB',
  'ColorMatch RGBimage P3',
  'ProPhoto RGB',
  'Rec.601 NTSC Gamma 2.4',
  'Rec.601 PAL Gamma 2.4',
  'Rec.709 Gamma 2.4',
];
var ddPdfDestinationProfile = grpPdfDestinationProfile.add(
  'dropdownlist',
  undefined,
  undefined,
  { name: 'ddPdfDestinationProfile', items: ddPdfDestinationProfile_array }
);
ddPdfDestinationProfile.selection = 0;

// GRPPDFDOWNSAMPLE
// ================
var grpPdfDownSample = tabPdf.add('group', undefined, {
  name: 'grpPdfDownSample',
});
grpPdfDownSample.orientation = 'row';
grpPdfDownSample.alignChildren = ['left', 'center'];
grpPdfDownSample.spacing = 10;
grpPdfDownSample.margins = 0;

var ddPdfDownSample_array = [
  'Do Not Downsample',
  'Average Downsampling To',
  'Subsampling To',
  'Bicubic Downsampling To',
];
var ddPdfDownSample = grpPdfDownSample.add(
  'dropdownlist',
  undefined,
  undefined,
  { name: 'ddPdfDownSample', items: ddPdfDownSample_array }
);
ddPdfDownSample.selection = 3;

// GRPPDFDOWNSAMPLESIZE
// ====================
var grpPdfDownSampleSize = grpPdfDownSample.add('group', undefined, {
  name: 'grpPdfDownSampleSize',
});
grpPdfDownSampleSize.orientation = 'row';
grpPdfDownSampleSize.alignChildren = ['left', 'center'];
grpPdfDownSampleSize.spacing = 10;
grpPdfDownSampleSize.margins = 0;

var txtPdfDownSampleSize = grpPdfDownSampleSize.add(
  'edittext {properties: {name: "txtPdfDownSampleSize"}}'
);
txtPdfDownSampleSize.text = '300';
txtPdfDownSampleSize.preferredSize.width = 40;

var lblPdfDownSampleSize = grpPdfDownSampleSize.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPdfDownSampleSize' }
);
lblPdfDownSampleSize.text = 'PPI';

var lblPdfDownSampleSizeLimit = grpPdfDownSampleSize.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPdfDownSampleSizeLimit' }
);
lblPdfDownSampleSizeLimit.text = 'For Images Above';

var txtPdfDownSampleSizeLimit = grpPdfDownSampleSize.add(
  'edittext {properties: {name: "txtPdfDownSampleSizeLimit"}}'
);
txtPdfDownSampleSizeLimit.text = '450';
txtPdfDownSampleSizeLimit.preferredSize.width = 40;

var lblPdfDownSampleSizeLimit2 = grpPdfDownSampleSize.add(
  'statictext',
  undefined,
  undefined,
  { name: 'lblPdfDownSampleSizeLimit2' }
);
lblPdfDownSampleSizeLimit2.text = 'PPI';

// GRPPDFENCODING
// ==============
var grpPdfEncoding = tabPdf.add('group', undefined, { name: 'grpPdfEncoding' });
grpPdfEncoding.orientation = 'row';
grpPdfEncoding.alignChildren = ['left', 'center'];
grpPdfEncoding.spacing = 10;
grpPdfEncoding.margins = 0;

var lblPdfEncoding = grpPdfEncoding.add('statictext', undefined, undefined, {
  name: 'lblPdfEncoding',
});
lblPdfEncoding.text = 'Compression';

var ddPdfEncoding_array = ['None', 'ZIP', 'JPEG'];
var ddPdfEncoding = grpPdfEncoding.add('dropdownlist', undefined, undefined, {
  name: 'ddPdfEncoding',
  items: ddPdfEncoding_array,
});
ddPdfEncoding.selection = 2;

// GRPPDFQUALITY
// =============
var grpPdfQuality = grpPdfEncoding.add('group', undefined, {
  name: 'grpPdfQuality',
});
grpPdfQuality.orientation = 'row';
grpPdfQuality.alignChildren = ['left', 'center'];
grpPdfQuality.spacing = 10;
grpPdfQuality.margins = 0;

var lblPdfQuality = grpPdfQuality.add('statictext', undefined, undefined, {
  name: 'lblPdfQuality',
});
lblPdfQuality.text = 'Quality';

var sldrPdfQuality = grpPdfQuality.add(
  'slider',
  undefined,
  undefined,
  undefined,
  undefined,
  { name: 'sldrPdfQuality' }
);
sldrPdfQuality.minvalue = 0;
sldrPdfQuality.maxvalue = 100;
sldrPdfQuality.value = 50;
sldrPdfQuality.preferredSize.width = 100;

var lblPdfQualityValue = grpPdfQuality.add('statictext', undefined, undefined, {
  name: 'lblPdfQualityValue',
});
lblPdfQualityValue.text = '100';

// TABPDF
// ======
var cbPdfWithAlpha = tabPdf.add('checkbox', undefined, undefined, {
  name: 'cbPdfWithAlpha',
});
cbPdfWithAlpha.text = 'With Alpha Channel';

var cbPdfIcc = tabPdf.add('checkbox', undefined, undefined, {
  name: 'cbPdfIcc',
});
cbPdfIcc.text = 'ICC Profile';

// TABTGA
// ======
var tabTga = tabpnlExportOptions.add('tab', undefined, undefined, {
  name: 'tabTga',
});
tabTga.text = 'TGA';
tabTga.orientation = 'column';
tabTga.alignChildren = ['left', 'top'];
tabTga.spacing = 5;
tabTga.margins = 10;

// GRPTGADEPTH
// ===========
var grpTgaDepth = tabTga.add('group', undefined, { name: 'grpTgaDepth' });
grpTgaDepth.orientation = 'row';
grpTgaDepth.alignChildren = ['left', 'center'];
grpTgaDepth.spacing = 10;
grpTgaDepth.margins = 0;

var lblTgaDepth = grpTgaDepth.add('statictext', undefined, undefined, {
  name: 'lblTgaDepth',
});
lblTgaDepth.text = 'Depth';

var ddTgaDepth_array = ['16 bit', '24 bit', '36 bit'];
var ddTgaDepth = grpTgaDepth.add('dropdownlist', undefined, undefined, {
  name: 'ddTgaDepth',
  items: ddTgaDepth_array,
});
ddTgaDepth.selection = 0;

// TABTGA
// ======
var cbTgaWithAlpha = tabTga.add('checkbox', undefined, undefined, {
  name: 'cbTgaWithAlpha',
});
cbTgaWithAlpha.text = 'With Alpha Channel';

var cbTgaRleCompression = tabTga.add('checkbox', undefined, undefined, {
  name: 'cbTgaRleCompression',
});
cbTgaRleCompression.text = 'RLE Compression';

// TABBMP
// ======
var tabBmp = tabpnlExportOptions.add('tab', undefined, undefined, {
  name: 'tabBmp',
});
tabBmp.text = 'BMP';
tabBmp.orientation = 'column';
tabBmp.alignChildren = ['left', 'top'];
tabBmp.spacing = 5;
tabBmp.margins = 10;

// GRPBMPDEPTH
// ===========
var grpBmpDepth = tabBmp.add('group', undefined, { name: 'grpBmpDepth' });
grpBmpDepth.orientation = 'row';
grpBmpDepth.alignChildren = ['left', 'center'];
grpBmpDepth.spacing = 10;
grpBmpDepth.margins = 0;

var lblBmpDepth = grpBmpDepth.add('statictext', undefined, undefined, {
  name: 'lblBmpDepth',
});
lblBmpDepth.text = 'Depth';

var ddBmpDepth_array = [
  '24 bit',
  '32 bit',
  'RGB 565 (16 bit)',
  'ARGB 1555 (16 bit)',
  'ARGB 4444 (16 bit)',
];
var ddBmpDepth = grpBmpDepth.add('dropdownlist', undefined, undefined, {
  name: 'ddBmpDepth',
  items: ddBmpDepth_array,
});
ddBmpDepth.selection = 0;

// TABBMP
// ======
var cbBmpWithAlpha = tabBmp.add('checkbox', undefined, undefined, {
  name: 'cbBmpWithAlpha',
});
cbBmpWithAlpha.text = 'With Alpha Channel';

var cbBmpRleCompression = tabBmp.add('checkbox', undefined, undefined, {
  name: 'cbBmpRleCompression',
});
cbBmpRleCompression.text = 'RLE Compression';

var cbBmpFlipRowOrder = tabBmp.add('checkbox', undefined, undefined, {
  name: 'cbBmpFlipRowOrder',
});
cbBmpFlipRowOrder.text = 'Flip Row Order';

// PSD
// ===
var PSD = tabpnlExportOptions.add('tab', undefined, undefined, { name: 'PSD' });
PSD.text = 'PSD';
PSD.orientation = 'column';
PSD.alignChildren = ['left', 'top'];
PSD.spacing = 10;
PSD.margins = 10;

// TABPNLEXPORTOPTIONS
// ===================
tabpnlExportOptions.selection = tabPng24;

// DIALOG
// ======
var lblMetadata = dialog.add('statictext', undefined, undefined, {
  name: 'lblMetadata',
});
lblMetadata.text =
  'This document contains {0} layer(s), {1} of them visible, {2} selected';
lblMetadata.justify = 'center';

var lblContact = dialog.add('group', undefined, { name: 'lblContact' });
lblContact.getText = function () {
  var t = [];
  for (var n = 0; n < lblContact.children.length; n++) {
    var text = lblContact.children[n].text || '';
    if (text === '') text = ' ';
    t.push(text);
  }
  return t.join('\n');
};
lblContact.orientation = 'column';
lblContact.alignChildren = ['center', 'center'];
lblContact.spacing = 0;

lblContact.add(
  'statictext',
  undefined,
  'To get the most recent version, or leave feedback, go to:'
);
lblContact.add(
  'statictext',
  undefined,
  'https://github.com/antipalindrome/Photoshop-Export-Layers-to-Files-Fast'
);

dialog.show();
