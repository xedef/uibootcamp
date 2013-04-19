
var enteredName;

$(document).ready(onDocumentFinishedLoading);

/**
* Executed when the page finishes loading.
*/
function onDocumentFinishedLoading (){

  // bind buttons' action
  $('#greeting-button').bind('click', onButtonPressed);
  $('#twitter-button').bind('click', getTweets);
  $('#close-floating-box').bind('click', hideTweets);

  alert('Page has finished loading.');

  $('#alias').focus();
}


/**
* Executed when the button in the templated is pressed.
*/
function onButtonPressed(){
  enteredName = $('#alias').val();
  $.ajax({
    url: 'http://bootcamp.aws.af.cm/welcome/' + enteredName,
    success: onServiceCallResponse,
    dataType: 'json'
  }).fail(onServiceCallFail);
}

/**
* Called once the response of the service is get.
*/
function onServiceCallResponse(data){
  // check if the response was successful or not based in its properties
  if (data.hasOwnProperty('response')) {
    setGreetMessage(data.response);
  } else if (data.hasOwnProperty('error')) {
    setErrorMessage(data.error);
  } else {
    setErrorMessage('Something went wrong...');
  }
}

function setErrorMessage(message){
  $('#response-container').html(message).addClass('error');
}

function setGreetMessage(message){
  message = message.replace(enteredName, '<span class="highlight">' + enteredName + '</span>');
  $('#response-container').html(message).removeClass('error');
}

/**
* Executed when the service call fails (eg. 500 error)
*/
function onServiceCallFail()
{
  $('#response-container').html('Service call failed!').addClass('error');
}

/**
* Calls Twitter API
*/
function getTweets(){
  $.ajax({
    url: 'http://search.twitter.com/search.json',
    data:{'q': 'html5'},
    dataType: 'jsonp',
    jsonpCallback: 'onGetTweetsSuccess'
  });
}

/**
* Callback function for Twitter service AJAX call
*/
function onGetTweetsSuccess(data){
  var tweets = data.results;
  showTweets(tweets);
}

function showTweets(tweets){

  for (var index in tweets){
    $('#tweets-container').append(createTweetItem(tweets[index], index));
  }

  // animate overlay
  $('.floating-box').show('slow');
}

function createTweetItem(tweet, index){
  var oddityClass = (+index % 2 === 0) ? 'even' : 'odd';

  var $avatarImage = $('<img>').attr('src', tweet.profile_image_url);
  var $avatar = $('<div class="avatar"></div>').html($avatarImage);

  var $user = $('<div class="left"></div>').html(tweet.from_user);
  var $date = $('<div class="right"></div>').html(tweet.created_at);
  var $tweetTop = $('<div class="tweet-top-text"></div>').append($user).append($date);
  var $text = $('<div></div>').html(tweet.text);
  var $description = $('<div class="tweet-description"></div>').append($tweetTop).append($text);

  var $tweetItem = $('<div class="tweet ' + oddityClass + '"></div>').append($avatar).append($description);

  return $tweetItem;
}

/**
* Hides the overlay that contains the tweets
*/
function hideTweets(){
  $('.floating-box').hide('slow');
}
