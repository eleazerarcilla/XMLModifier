 var ConstantsModel = {
	JIRALogInURL:"http://jira.us.ri.com/rest/auth/1/session",
	JIRALogInData: {
		username: "",
		password: ""
	},
	BASE_URI: "http://10.70.83.137:12345/",
	NumberGenerator_FILE_URI: "NumberGenerator.html",
	CharacterCount_FILE_URI: "CharacterCount.html",
	DocumentGenerator_FILE_URI: "DocumentGenerator.html",
	Home_FILE_URI: "Index.html",
	TopNav_FILE_URI: "TopNav.html",
	Views_PATH_URI: "views/tools/"
 };
 function PageRedirect(Const_WEBApp_Name){
 switch(Const_WEBApp_Name.toUpperCase()){
 case 'RAND' : window.open(ConstantsModel.BASE_URI + ConstantsModel.Views_PATH_URI + ConstantsModel.NumberGenerator_FILE_URI,"_top"); break;
 case 'CHAR_COUNT' : window.open(ConstantsModel.BASE_URI + ConstantsModel.Views_PATH_URI + ConstantsModel.CharacterCount_FILE_URI,"_top"); break;
 case 'HOME': window.open(ConstantsModel.BASE_URI + ConstantsModel.Home_FILE_URI,"_top"); break;
 default: console.log('UNKNOWN PATH!');
 }
 }
 $(document).ready(function(){
if(!msieversion()){	 
	InitializeTopNav();
}else{
	$('#Nav_tabs').hide();
	$('#main_content_div').hide();
	$('#div_unsupportedBrowser').removeAttr('hidden');
}
 });

 function InitializeTopNav(){
 $('#iFrame_TopNav').attr('src',ConstantsModel.BASE_URI+ConstantsModel.Views_PATH_URI+ConstantsModel.TopNav_FILE_URI);
 }

 function Contains(StringToCheck, Flag){
 var found = false;
 if(StringToCheck!=null || StringToCheck!=''){
	if((Flag==null || Flag=='') || Flag.trim() == '')
		return found
	else{
		return (StringToCheck.toLowerCase().indexOf(Flag.toLowerCase()) != -1)
	}
 }
 return found;
 }
 function msieversion() {
 var ua = window.navigator.userAgent;
 var msie = ua.indexOf("MSIE "); 
 if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number 
 {	 
 console.log(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
	//alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
	return true;
 } 
 else // If another browser, return 0
 { 
	return false; 
 }
 }