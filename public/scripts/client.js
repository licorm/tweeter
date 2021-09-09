/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //function that takes multiple strings of html and adds it to one html string
  const renderTweets = function(tweets) {
    let $tweetString = "";
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
  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(response) {
        $("#tweets-container").prepend(renderTweets(response));

        //function to load css styling
        func();
      });
  };
  
  //call the function to load tweets to the page
  loadTweets();

  //function for fetching tweets on submission (empties the div unlike function about)
  const loadTweetsOnSubmission = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(response) {
        $("#tweets-container").empty().prepend(renderTweets(response));

        //function to load css styling
        func();
      });
  };


  //using jquery to add event listener for submitting tweets in the form element
  $("form").submit(function(event) {
    
    //prevents the form submission from reloading on the page
    event.preventDefault();

    //use jquery to serialize data and send to server as ajax post
    const serializedData = $(this).serialize();
    
    //error message for making sure there is input
    if (serializedData.length < 6) {
      return $(this).parents().children().find(".error-message").html('<i class="fas fa-exclamation-circle"></i><p>Looks like you need to write something first...</p><i class="fas fa-exclamation-circle"></i>').show().slideDown();
    }

    //error message for keeping length under 140 characters
    if (serializedData.length > 145) {
      return $(this).parents().children().find(".error-message").html('<i class="fas fa-exclamation-circle"></i><p>Our character limit is 140 characters!!</p><i class="fas fa-exclamation-circle"></i>').show().slideDown();
    }

    //ajax post request to the /tweets page
    $.post("/tweets", serializedData)
      .then(() => {
        //reload tweets containter upon posting so that it shows new tweet
        loadTweetsOnSubmission();
        //resets form so the user can write a new tweet
        $(this).trigger("reset");
        //hides any error messages
        $(".error-message").hide();
      });
  });

});



