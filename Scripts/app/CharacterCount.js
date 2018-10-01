var IsTrailingSpacesCounted = false, IsWhiteSpacesCounted = false, RegEx;
// RegExp.quote = function(str) {
     // return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
// };
function GetCharacterCount(){
	var Result = '';
	if(IsWhiteSpacesCounted){
		Result = $('#TA_inputString').val();
		$('#H1_CountDisplay').text(Result.length);
	}
	else{
		Result = $('#TA_inputString').val().trim().split(" ").join("");
		$('#H1_CountDisplay').text(Result.length);
	}
	RegExCheck(Result);

}
function RegExCheck(stringToCheck){
	if(RegEx!=null && (typeof RegEx == "object")){
		if (!RegEx.test($("#TA_inputString").val())) {
				ApplyValidationEffects("TA_inputString", false);
		}
		else{
				ApplyValidationEffects("TA_inputString", true);
			}
	}
	else{
		RemoveValidationEffects("TA_inputString");
	}
	
}
function RefreshSettings(){
	//IsTrailingSpacesCounted = $('#cb_countTrailingSpaces').prop('checked');
	IsWhiteSpacesCounted = $('#cb_countWhiteSpaces').prop('checked');
	if($('#tb_RegEx').val().trim() != ''){
		try {
			RegEx =  new RegExp(($('#tb_RegEx').val().trim()));
			ApplyValidationEffects("tb_RegEx", true);
		} catch(e) {
			ApplyValidationEffects("tb_RegEx", false);
		}
	}
	else{
		RegEx = null;
		RemoveValidationEffects("tb_RegEx");
	}
	
	
	GetCharacterCount();
}
function ApplyValidationEffects(elemID, IsValid){
	if(!IsValid){
		$('#'+ elemID).addClass('regex-fail');
		$('#'+ elemID).removeClass('regex-pass');
	}else{
		$('#'+ elemID).addClass('regex-pass');
		$('#'+ elemID).removeClass('regex-fail');
	}
}
function RemoveValidationEffects(elemID){
	$('#'+elemID).removeClass('regex-fail');
	$('#'+elemID).removeClass('regex-pass');
}
$(document).ready(function(){
	RefreshSettings();
});