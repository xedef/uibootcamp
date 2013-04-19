
var enteredName;
var twitterDataValues;
var twitterSearchTopic = 'html5'; // used as a constant
var previousTweetsContainerHeight = 0;

// call the initializing function once the page loads
window.onload = onDocumentFinishedLoading;

/**
* Executed when the page finishes loading.
*/
function onDocumentFinishedLoading (){

  $('#twitter-button').val('Let\'s see what people are saying about ' + twitterSearchTopic);

  // bind buttons' action
  $('#greeting-button').bind('click', onButtonPressed);
  $('#twitter-button').bind('click', getTweets);
  $('#close-floating-box').bind('click', hideTweets);
  $('#get-more-tweets').bind('click', getMoreTweets);

  alert('Page has finished loading.');

  // set focus on the textbox
  $('#alias').focus();

  // initialize Twitter API call data parameters
  twitterDataValues = {'q': twitterSearchTopic};
}

/**
* Executed when the button in the templated is pressed.
*/
function onButtonPressed(){
  enteredName = $('#alias').val();
  var url = 'http://bootcamp.aws.af.cm/welcome/' + enteredName;

  // Thanks, IE!
  if (window.XDomainRequest) {
    // Use Microsoft XDR
    var xdr = new XDomainRequest();
    xdr.open('get', url);
    xdr.onload = function() {
        onServiceCallResponse(JSON.parse(xdr.responseText));
    };
    xdr.send();
  } else { // decent browsers...
    $.ajax({
      url: url,
      success: onServiceCallResponse,
      dataType : 'json'
    }).fail(onServiceCallFail);
  }
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
    data: twitterDataValues,
    dataType: 'jsonp',
    jsonpCallback: 'onGetTweetsSuccess'
  });
}

/**
* Same as "getTweets" but checking/setting the "More Tweets" button status
*/
function getMoreTweets(){

  // where do you think you're going?
  if ($('#get-more-tweets').hasClass('disabled')){
    return;
  }

  setMoreTweetsButtonEnabledStatus(false);
  getTweets();
}

/**
* Callback function for Twitter service AJAX call
*/
function onGetTweetsSuccess(data){
  var tweets = data.results;

  parseNextPageDataValues(data.next_page);
  addTweetsToContainer(tweets);

  // save the current lastItem position for the next page scrolling
  previousTweetsContainerHeight = $('.floating-box-content')[0].scrollHeight;

  setMoreTweetsButtonEnabledStatus(true);
}

/**
* Sets the status of the "More Twweets" button to enabled or disabled
*/
function setMoreTweetsButtonEnabledStatus(enabledValue){
  if (enabledValue) {
    $('#get-more-tweets').removeClass('disabled');
  } else {
    $('#get-more-tweets').addClass('disabled');
  }

}

/**
* Parses the "next_page" value from Twitter response to identify the parameters for the next call
*/
function parseNextPageDataValues(queryString){
  // ?page=2&max_id=324969446781370368&q=html5
  var parameters;
  var newTwitterDataValues = {};
  var kvPair;

  // drop initial question mark if present
  if (queryString[0] == '?') {
    queryString = queryString.substring(1);
  }

  // split queries
  parameters = queryString.split('&');

  // split parameters/values in pairs
  for (var index in parameters) {
    kvPair = parameters[index].split('=');
    newTwitterDataValues[kvPair[0]] = kvPair[1];
  }

  twitterDataValues = newTwitterDataValues;
}

/**
* Adds the tweets that came in the response to the container.
*/
function addTweetsToContainer(tweets){

  for (var index in tweets){
    $('#tweets-container').append(createTweetItem(tweets[index], index));
  }

  // animate overlay
  if ($('.floating-box').hasClass('hidden')){
    showTweets();
  }

  if (previousTweetsContainerHeight) {
    $('.floating-box-content').animate({scrollTop: previousTweetsContainerHeight}, 500);
  }
}

/**
* Creates a tweet template item that is going to be shown in the container
*/
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
function showTweets(){
  $('.overlay-background').fadeIn('slow');
  $('.floating-box').show('slow');
}


/**
* Hides the overlay that contains the tweets
*/
function hideTweets(){
  $('.overlay-background').fadeOut('slow');
  $('.floating-box').hide('slow');
}
