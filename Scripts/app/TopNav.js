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
$(document).ready(function(){
if(!msieversion()){	 
	InitializeTabURLS();
	CheckSelectedTabs();
}
});
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
  function InitializeTabURLS(){
 $('#CharacterCounter_Tab').find('a').attr('href',ConstantsModel.BASE_URI+ConstantsModel.Views_PATH_URI+ConstantsModel.CharacterCount_FILE_URI);
 $('#CharacterCounter_Tab').find('a').attr('target','_top');
 $('#NumberGenerator_Tab').find('a').attr('href',ConstantsModel.BASE_URI+ConstantsModel.Views_PATH_URI+ConstantsModel.NumberGenerator_FILE_URI);
 $('#NumberGenerator_Tab').find('a').attr('target','_top');
 $('#Home_Tab').find('a').attr('href',ConstantsModel.BASE_URI+ConstantsModel.Home_FILE_URI);
 $('#DocumentGenerator_Tab').find('a').attr('href',ConstantsModel.BASE_URI+ConstantsModel.Views_PATH_URI+ConstantsModel.DocumentGenerator_FILE_URI);
 $('#DocumentGenerator_Tab').find('a').attr('target','_top');
 }
  function CheckSelectedTabs(){
	 var CurrentURI = window.location.href, id;
	  if(CurrentURI != '' && !Contains(CurrentURI,ConstantsModel.TopNav_FILE_URI)){
		  RemoveActiveClassFromTab();
			//For Number Generators
			 if(Contains(CurrentURI, ConstantsModel.NumberGenerator_FILE_URI)){
				 id="NumberGenerator_Tab";
			 }
			 //For Home
			 if(Contains(CurrentURI, ConstantsModel.Home_FILE_URI)){
				 id="Home_Tab";
			 }
			 //For Character Count
			 if(Contains(CurrentURI, ConstantsModel.CharacterCount_FILE_URI)){
				 id="CharacterCounter_Tab";
			 }
			 //For XML Editor
			 if(Contains(CurrentURI, ConstantsModel.DocumentGenerator_FILE_URI)){
				 id="DocumentGenerator_Tab";
			 }
			 console.log(id, CurrentURI);
			 $('#'+id).attr('class','active');
	  }
 }
 function RemoveActiveClassFromTab(){
	 $.each($('#Nav_tabs').find('li'), function(item, value){
		 $(this).removeAttr('class','active');
	 });

 }