
 var Ajax_ObjectFor_JIRASessionCheck ={
  "async": true,
  "crossDomain": true,
  "url": "http://jira.us.ri.com/rest/auth/1/session",
  "method": "GET",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "c5992384-5d85-df1a-9eed-d453501b86e9"
  }
}

 
$(document).ready(function(){
	$
//console.log("Checking JIRA session");
//CheckIfLoggedInToJIRA();

});
function SearchBtnClick(){

}
 var onloadCallback = function() {
  grecaptcha.render('g_recaptcha', {
          'sitekey' : '6LeuahUTAAAAACF8p59_HNdCvDJV1CvizziO7GNP'
        });
    console.log("ready!");
  };
function Ajax_LogInToJIRA(){
console.log(ConstantsModel);
$.ajax({
  type: "POST",
  url: ConstantsModel.JIRALogInURL,
  data: GenerateLogInData(),
  contentType: "application/json",
  method: "GET",
  success: function(result){
	$('#loginModal').modal('hide');
  }
});
CheckIfLoggedInToJIRA();
}
function CheckIfLoggedInToJIRA(){
  $.get(ConstantsModel.JIRALogInURL, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
    });
}
function GenerateLogInData(){
 return {"username": ConstantsModel.JIRALogInData.username,"password": ConstantsModel.JIRALogInData.password};
}
function EnterLogInDetails(){
ConstantsModel.JIRALogInData.username = $('#txtLogInUsername').val().trim();
ConstantsModel.JIRALogInData.password = $('#txtLogInPassword').val();
Ajax_LogInToJIRA();
}