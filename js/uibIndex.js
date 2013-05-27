var uibIndex = (function($){

  var enteredName,
      twitterDataValues,
      TWITTER_SEARCH_TOPIC = 'html5',
      previousTweetsContainerHeight = 0;

  // call the initializing function once the page loads
  // window.onload = onDocumentFinishedLoading;

  /**
  * Executed when the page finishes loading.
  */
  var init = function (){

    $('#home').bind('pageinit', initHomePage);

    // bind buttons' action
    $('#greeting-button').bind('click', onGreetingButtonPressed);
    $('#twitter-button').bind('click', getTweets);
    $('#get-more-tweets').bind('click', getMoreTweets);
    $('#show-menu').bind('click', showMenu);

    alert('Page has finished loading.');

    // set focus on the textbox
    $('#alias').focus();

    // initialize Twitter API call data parameters
    twitterDataValues = {'q': TWITTER_SEARCH_TOPIC};

    // bind ESC key functionality
    $(document).on('keydown',
      function(e){
        if(+e.which === 27){
          hideLoader();
        }
      }
    );

    $( '#show-gallery-image' ).bind( 'click', onShowGalleryImage );
  };

  var initHomePage = function(){
    $('#twitter-button').find('.ui-btn-text').html('Get ' + TWITTER_SEARCH_TOPIC + ' tweets');
  };

  /**
  * Executed when the button in the templated is pressed.
  */
  var onGreetingButtonPressed = function (){
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
        dataType : 'json',
        success: onServiceCallResponse
      }).fail(onServiceCallFail);
    }
  };


  /**
  *
  */
  var showMenu = function (){
    $('#menu-panel').panel('open');
  };

  /**
  * Called once the response of the service is get.
  */
  var onServiceCallResponse = function (data){
    // check if the response was successful or not based in its properties
    if (data.hasOwnProperty('response')) {
      setGreetMessage(data.response);
    } else if (data.hasOwnProperty('error')) {
      setErrorMessage(data.error);
    } else {
      setErrorMessage('Something went wrong...');
    }
  };

  var setErrorMessage = function (message){
    $('#response-container').html(message).addClass('error');
  };

  var setGreetMessage = function (message){
    message = message.replace(enteredName, '<span class="highlight">' + enteredName + '</span>');
    $('#response-container').html(message).removeClass('error');
  };

  /**
  * Executed when the service call fails (eg. 500 error)
  */
  var onServiceCallFail = function(){
    $('#response-container').html('Service call failed!').addClass('error');
  };

  /**
  * Calls Twitter API
  */
  var getTweets = function (){

    showLoader();

    $.ajax({
      url: 'http://search.twitter.com/search.json',
      data: twitterDataValues,
      dataType: 'jsonp',
      success: onGetTweetsSuccess
    });
  };

  /**
  * Same as "getTweets" but checking/setting the "More Tweets" button status
  */
  var getMoreTweets = function (){

    // where do you think you're going?
    if ($('#get-more-tweets').hasClass('disabled')){
      return;
    }

    setMoreTweetsButtonEnabledStatus(false);
    getTweets();
  };

  /**
  * Callback function for Twitter service AJAX call
  */
  var onGetTweetsSuccess = function(data){
    var tweets = data.results;

    parseNextPageDataValues(data.next_page);
    addTweetsToContainer(tweets);

    hideLoader();

    // save the current lastItem position for the next page scrolling
    // previousTweetsContainerHeight = $('.floating-box-content')[0].scrollHeight;

    //setMoreTweetsButtonEnabledStatus(true);
  };

  var showLoader = function(){
    $.mobile.loading( 'show', {
        textVisible: false,
        theme: 'a',
        textonly: false
    });
  };

  var hideLoader = function(){
    $.mobile.loading('hide');
  };

  /**
  * Sets the status of the "More Twweets" button to enabled or disabled
  */
  var setMoreTweetsButtonEnabledStatus = function(enabledValue){
    if (enabledValue) {
      $('#get-more-tweets').removeClass('disabled');
    } else {
      $('#get-more-tweets').addClass('disabled');
    }
  };

  /**
  * Parses the "next_page" value from Twitter response to identify the parameters for the next call
  */
  var parseNextPageDataValues = function(queryString){
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
  };

  /**
  * Adds the tweets that came in the response to the container.
  */
  var addTweetsToContainer = function(tweets){

    for (var index in tweets){
      $('#tweets-container').append(createTweetListViewItem(tweets[index]));
    }

    $('#tweets-container').listview('refresh');
    showTweets();

    if (previousTweetsContainerHeight) {
      $('.floating-box-content').animate({scrollTop: previousTweetsContainerHeight}, 500);
    }
  };

  /**
  * Creates and returns a listviewitem that contains a single tweet information
  */
  var createTweetListViewItem = function(tweet){
    var $lviTweet = $('<li></li>');

    $date = $('<p class="ui-li-aside"></p>').append($('<strong></strong>').html(formatTweetDate(tweet.created_at)));
    $lviTweet.append($('<img>').attr('src', tweet.profile_image_url));
    $lviTweet.append($date);
    $lviTweet.append($('<h2></h2>').html(tweet.from_user));
    $lviTweet.append($('<p></p>').html(tweet.text));

    return $lviTweet;
  };

  /**
  * Returns a formatted date based in the tweet "created_at"
  */
  var formatTweetDate = function(date){
    // the easiest slappiest
    return date.replace(' +0000', '');
  };

  /**
  * Hides the overlay that contains the tweets
  */
  var showTweets = function(){
    $('.floating-box').popup('open');
  };

  var onShowGalleryImage = function(){
    showLoader();
    var galleryImage = new Image();
    galleryImage.onload = onGalleryImageFinishedLoading;
    galleryImage.src = 'http://nukethefridge.com/wp-content/uploads/2013/02/back-to-the-future-delorean.jpg';
  };

  var onGalleryImageFinishedLoading = function(){
    $(this).css('display', 'none');
    $('#gallery-page div[data-role=content] .gallery-image-container').html($(this));
    $(this).fadeIn('slow');
    hideLoader();
  };

  return init();
});

jQuery(document).ready(uibIndex);