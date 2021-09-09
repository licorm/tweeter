/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    let $tweetString = "";
    for (const tweet of tweets) {
      $tweetString += createTweetElement(tweet);
    }
    return $tweetString;
  };
  
   //escape unsafe text from user
   const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(obj) {
    let $tweet =
    `<article class="tweet">
            <header>
              <div><img src ="${obj.user.avatars}"></img>${obj.user.name}</div>
              <div>${obj.user.handle}</div>
            </header>
              <p>${obj.content.text}</p>
            <footer>${timeago.format(obj.created_at)}
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

  //function for fetching tweets on submission
  const loadTweetsOnSubmission = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(response) {
        $("#tweets-container").empty().prepend(renderTweets(response));
        //function to load css styling
        func();
      });
  };


  //using jquery to add event listener for submitting tweets
  $("form").submit(function(event) {
    
    event.preventDefault();

    //use jquery to serialize data and send to server as ajax post
    const serializedData = $(this).serialize();
    
    //error message for making sure there is input
    if (serializedData.length < 6) {
      return $(".error-message").html('<i class="fas fa-exclamation-circle"></i><p>Looks like you need to write something first...</p><i class="fas fa-exclamation-circle"></i>').show().slideDown();
    }

    //error message for keeping length under 140 characters
    if (serializedData.length > 145) {
      return $(".error-message").html('<i class="fas fa-exclamation-circle"></i><p>Our character limit is 140 characters!!</p><i class="fas fa-exclamation-circle"></i>').show().slideDown();
    }

    $.post("/tweets", serializedData)
      .then(() => {
        loadTweetsOnSubmission()
        $(this).trigger("reset");
        $(".error-message").hide();
      });
  });

});



