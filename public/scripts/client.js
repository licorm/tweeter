/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //function that takes multiple strings of html and adds it to one html string
  const renderTweets = function(tweets) {
    let $tweetString = "";
    if (!Array.isArray(tweets)) {
      return createTweetElement(tweets);
    }
    for (const tweet of tweets) {
      $tweetString += createTweetElement(tweet);
    }
    return $tweetString;
  };
  
  //escape unsafe text from user
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Function takes in tweet data stored as an object and turns it into html
  const createTweetElement = function(tweetData) {
    let $tweet =
    `<article class="tweet">
            <header>
              <div><img src ="${tweetData.user.avatars}"></img>${tweetData.user.name}</div>
              <div>${tweetData.user.handle}</div>
            </header>
              <p>${escape(tweetData.content.text)}</p>
            <footer>${timeago.format(tweetData.created_at)}
              <div>
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
    </article>`;
    return $tweet;
  };

  //function for fetching tweets from /tweets
  const loadTweets = function(firstLoad) {
    $.ajax("/tweets", { method: "GET" })
      .then(function(response) {
        
        //checks if this is a reload or a submission
        if (!firstLoad) {
          const lastTweet = response.length - 1
          $("#tweets-container").append(renderTweets(response[lastTweet]));
          func();
          return;
        } 
        //if its a first load it will just load all of the data
        $("#tweets-container").prepend(renderTweets(response));

        //function to load css styling
        func();
      });
  };
  
  //call the function to load tweets to the page
  loadTweets(true);

  //function to reveal submit tweet form
  $("#clickme").on("click", function() {
    $("form").slideDown();
  })

  //function to go to top of page
  $("#footerButton").on("click", function() {
    $(window).scrollTop(0);
  })

  //using jquery to add event listener for submitting tweets in the form element
  $("form").submit(function(event) {
    
    //prevents the form submission from reloading on the page
    event.preventDefault();

    //use jquery to serialize data and send to server as ajax post
    const serializedData = $(this).serialize();
    let $counter = $(this).parents().children().find(".counter");
    
    //error message for making sure there is input
    if ($counter.val() >= 140) {
      return $(this).parents().children().find(".error-message").html('<i class="fas fa-exclamation-circle"></i><p>Looks like you need to write something first...</p><i class="fas fa-exclamation-circle"></i>').slideDown();
    }

    //error message for keeping length under 140 characters
    if ($counter.val() < 0) {
      return $(this).parents().children().find(".error-message").html('<i class="fas fa-exclamation-circle"></i><p>Our character limit is 140 characters!!</p><i class="fas fa-exclamation-circle"></i>').slideDown();
    }
    
   
    //ajax post request to the /tweets page
    $.post("/tweets", serializedData)
      .then(() => {
        //reload tweets containter upon posting so that it shows new tweet
        loadTweets(false);
        //resets form so the user can write a new tweet
        $(this).trigger("reset");
        //hides any error messages
        $(".error-message").slideUp();
      });
  });

  //error messages will slide away once edits are made
  $("#tweet-text").on("click", function() {
    $(".error-message").slideUp();
  })


});



