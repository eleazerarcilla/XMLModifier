var JsTree_Event, JsTree_Data, ctr=-1;
var tempFileName = '';
var XMLhasBeenUpdated = false, IsCountApplicable=false;
var JsTreeParentNodeOfNodeSelected;
var CurrentNodeValues = '';
var _temp='', nodes = '';
$(document).ready(function(){
	 $('#file_input').on('change', function(event){
	 InitializeFile(event);
	 });
	 $('#div_instructions_simple').fadeOut('fast');
	
});

function InitializeFile(event){
	const input = event.target;
	XMLhasBeenUpdated = false;
  if ('files' in input && input.files.length > 0) {
	  var fileNameDetails = input.files[0].name.split('.');
	  nodes='';
	  ctr=-1;
	  if(fileNameDetails[fileNameDetails.length-1].toLowerCase() === 'xml'){
		  placeFileContent($('#TA_inputString')[0],
       input.files[0])
	   $('#Btn_ExportSettings').removeAttr('hidden');
	   $('#div_instructions_simple').fadeIn('fast');
	   tempFileName = input.files[0].name + '_modified';
	  }
	  else{
	   ShowAlert('Selected file is unsupported!', 'error');
	   $('#file_input').val('');
	  }
	   
  }
}
function placeFileContent(target, file) {
	readFileContent(file).then(content => {
  	ReadXML(content)
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}
function ShowAlert(message, type){
	type = type.toLowerCase();
	if(type === 'success'){
		alertify.success(message);
	}
	else if(type === 'warning'){
		alertify.warning(message);
	}
	else if(type === 'error'){
		alertify.error(message);
	}
	else {
			alertify.message(message);
	}
}
function ReadXML(content){
	var xmlDoc = $.parseXML(content);
	$xml = $(xmlDoc);
	if($xml[0].firstChild == $xml[0].lastChild){
		$('#jstree').empty().jstree('destroy');
		$('#jstree').jstree({

		core: {
			data: XMLtoJSON($xml[0].documentElement),
			themes : { "stripes" : true },
		}
		}).bind("ready.jstree", function (event, data) {
			$(this).jstree("open_all");
		});
		
		$('#jstree').on("changed.jstree", function (e, data) {
			JsTree_Data = data;
			JsTree_Event = e;
			var ElementValue = data.event.target.text.trim();
		if(JsTree_Data.event.target.parentNode.className.indexOf('leaf') > 0){
		ShowEditModal(true, (ElementValue != '' ? ElementValue.split(' : ')[0] : ''), (ElementValue != '' ? ElementValue.split(' : ')[1] : ''));
		GetCharacterCount();
		}
		else{
			ShowAlert('Parent nodes can\'t be modified', 'error');
		}
	});
		UpdateXMLNodes($xml);
		ShowAlert('Document upload success', 'success');
	}else{
		ShowAlert('Oops! Something went wrong. Please try again.', 'warning');
	}
	//console.log(XMLtoJSON($xml[0].documentElement));
}

function UpdateXMLNodes(xmlDoc_LocalName){
if(IsCountApplicable){
$xml.find(xmlDoc_LocalName).each(function(i,j){
	 $(this).attr('objectClass',i);
	 temp=i-1;
	 //CurrentNodeValues+=i+',';
 });
//console.log(CurrentNodeValues, xmlDoc_LocalName);
XMLhasBeenUpdated = true;
}
}
function UpdateXML(){
var AlteredFieldName = $('#fieldToBeAltered').text();
var AlteredFieldNewValue = $('#fieldValue').val();
console.log("\""+JsTreeParentNodeOfNodeSelected[0]+"[objectClass="+"\""+JsTreeParentNodeOfNodeSelected[1]+"\""+"] "+ AlteredFieldName+"\"", AlteredFieldNewValue);
$xml.find(JsTreeParentNodeOfNodeSelected[0]+"[objectClass="+"\""+JsTreeParentNodeOfNodeSelected[1]+"\""+"] "+ AlteredFieldName).text(AlteredFieldNewValue);

UpdateJSTreeUIandDOM(AlteredFieldName, AlteredFieldNewValue);
ShowEditModal(false);
}
function UpdateJSTreeUIandDOM(fieledToBeAltered, newValue){
$('#'+JsTree_Data.event.target.id).html('<i class="jstree-icon jstree-themeicon" role="presentation"></i>'+fieledToBeAltered + ' : '+newValue);
}

function XMLtoJSON(xmlDocument){
	var IsEmpty = (xmlDocument.firstChild != null && xmlDocument.firstChild.textContent.trim() != '') ? false: true;
	var IsNodeHasChildNodes = xmlDocument.hasChildNodes();
	var NodeHasParent = xmlDocument.parentElement != null;
	var tempNodes; //= CurrentNodeValues.split(',');
	//console.log(IsNodeHasChildNodes +'-' + IsEmpty +'-'+NodeHasParent);
	if(IsEmpty && IsNodeHasChildNodes && NodeHasParent){
		IsCountApplicable = true;
		UpdateXMLNodes(xmlDocument.localName);
		nodes+= xmlDocument.localName+',';
	}
	else{
		IsCountApplicable =false;
	}
	//console.log(nodes[0], xmlDocument.localName);
	if(nodes != '' && nodes.slice(0,-1).split(',')[0] == xmlDocument.localName){
		ctr++;
		console.log(nodes);
	}
 return {
        text: xmlDocument.firstChild && xmlDocument.firstChild.nodeType === 3 ? 
                  (xmlDocument.localName+(IsCountApplicable? ('_'+ctr) : '')+ (IsEmpty ? '': ' : ')+xmlDocument.firstChild.textContent) :  (xmlDocument.localName),
        children: [...xmlDocument.children].map(childNode => XMLtoJSON(childNode))
    };
}

function RemoveAllTemporaryXMLAttributes(Array_Nodes){
	if(Array_Nodes != '' && typeof Array_Nodes != 'string'){
$.each(Array_Nodes, function(index, value){
	$xml.find(value).removeAttr('objectClass');
});
	}
	else{
		ShowAlert('Unable to remove xml temporary attributes', 'error');
	}
}
function ShowEditModal(IsShown, fieldName, fieldValue){
	if(IsShown){
$('#edit_modal').modal('show');
$('#fieldToBeAltered').text(fieldName);
$('#fieldValue').val(fieldValue);
$('#edit_ModalLabel').html('Modify <i>' + fieldName + '</i>');
JsTreeParentNodeOfNodeSelected = JsTree_Data.instance.get_node($('#'+JsTree_Data.instance.get_parent(JsTree_Data.node))).text.trim().split('_');
	}
	else{
		$('#edit_modal').modal('hide');
	}
}

function ExportXML(){
RemoveAllTemporaryXMLAttributes(nodes != '' ? nodes.trim().slice(0,-1).split(',') : 'error');
var s = new XMLSerializer();
var newFileName =$('#tb_FileName').val().trim();
var blob = new Blob([s.serializeToString($xml[0])], {type: "application/xml"});
saveAs(blob, (newFileName != '' ? newFileName : tempFileName) +".xml");
ShowAlert('XML Export Successful!', 'success');
}

function ExportCSV(){
var newFileName =$('#tb_FileName').val().trim();
var blob = new Blob([XMLDocToCSV($xml.text())], {type: "text/csv"});
saveAs(blob, (newFileName != '' ? newFileName : tempFileName) +".csv");
ShowAlert('CSV Export Successful!', 'success');
}

function GetCharacterCount(){
	var Result = '';
	//if(IsWhiteSpacesCounted){
		Result = $('#fieldValue').val();
		$('#H4_CountDisplay').text(Result.length);
	//}
	//else{
	//	Result = $('#fieldValue').val().trim().split(" ").join("");
	//	$('#H4_CountDisplay').text(Result.length);
	//}
}
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
function XMLDocToCSV(xmlObject){
var lines = xmlObject.trim().split('    ').join('').split('\n');
var csvString = '';
for(var i = 0; i < lines.length; i++){
	csvString += lines[i]+',';
}
return csvString;
}
  function ConvertToCSV(objArray) {
            var array = objArray;//typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';

            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += array[i][index];
                }

                str += line + '\r\n';
            }

            return str;
        }
		
		