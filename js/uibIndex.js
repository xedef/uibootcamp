
var enteredName;
$(document).ready(onDocumentFinishedLoading);

/**
* Executed when the page finishes loading.
*/
function onDocumentFinishedLoading (){

  // bind buttons' action
  $('#greeting-button').bind('click', onButtonPressed);
  $('#twitter-button').bind('click', getTweets);

  alert('Page has finished loading.');

  $('#alias').focus();
}


/**
* Executed when the button in the templated is pressed.
*/
function onButtonPressed(){
  enteredName = $('#alias').val();
  $.get('http://bootcamp.aws.af.cm/welcome/' + enteredName, onServiceCallResponse).fail(onServiceCallFail);
}

/**
* Called once the response of the service is get.
*/
function onServiceCallResponse(data){
  var responseObject = JSON.parse(data);

  // check if the response was successful or not based in its properties
  if (responseObject.hasOwnProperty('response')) {
    setGreetMessage(responseObject.response);
  } else if (responseObject.hasOwnProperty('error')) {
    setErrorMessage(responseObject.error);
  } else {
    setErrorMessage('Something went wrong...');
  }
}

function setErrorMessage(message){
  $('#response-container').html(message).addClass('error');
}

function setGreetMessage(message){
  message = message.replace(enteredName, '<span class="highlight">' + enteredName + '</span>');
  console.log(message);
  $('#response-container').html(message).removeClass('error');
}

/**
* Called when the service call fails (eg. 500 error)
*/
function onServiceCallFail()
{
  $('#response-container').html('Service call failed!').addClass('error');
}

/**
* Calls Twitter API
*/
function getTweets(){
   var serviceUrl = 'http://search.twitter.com/search.json';

   $.ajax({
    url: serviceUrl,
    data:{'q': 'html5'},
    dataType: 'jsonp',
    jsonpCallback: onGetTweetsSuccess
   });
}

/**
* Callback function for Twitter service AJAX call
*/
function onGetTweetsSuccess(data){
  console.log(data);
}