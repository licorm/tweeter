/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// const renderTweets = function(tweets) {
//   let tweetString = "";
//   for (const tweet of tweets) {
//     tweetString += createTweetElement(tweet);
//   }
//   return tweetString;
// }

// const createTweetElement = function(obj) {
//   let $tweet =
//   `<article class="tweet">
//           <header>
//             <div><img src ="${obj.user.avatars}"></img>${obj.user.name}</div>
//             <div>${obj.user.handle}</div>
//           </header>
//             <p>${obj.content.text}</p>
//           <footer>${timeago.format(obj.created_at)}
//             <div>
//               <i class="fas fa-flag"></i>
//               <i class="fas fa-retweet"></i>
//               <i class="fas fa-heart"></i>
//             </div>
//           </footer>
//   </article>`
//   return $tweet;
// }




$( document ).ready(function() {

  const renderTweets = function(tweets) {
    let $tweetString = "";
    for (const tweet of tweets) {
      $tweetString += createTweetElement(tweet);
    }
    return $tweetString;
  }
  
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
    </article>`
    return $tweet;
  }

  //function for fetching tweets from /tweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(response) {
      $('#tweets-container').prepend(renderTweets(response));
      func();
    });
  }
  
  //call the function to load tweets to the page
  loadTweets();

  //function for fetching tweets on submission
  const loadTweetsOnSubmission = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(response) {
      $('#tweets-container').empty().prepend(renderTweets(response));
      func();
    });
  }


  //using jquery to add event listener for submitting tweets
  $('form').submit(function(event) {
    
    event.preventDefault();
    
    //use jquery to serialize data and send to server as ajax post
    const serializedData = $(this).serialize();
    
   //error message for making sure there is input
   if (serializedData.length < 6) {
     $(this).parents().find("#error-message-null").slideDown()
   }
   //hide error when they return to form
   $(this).on("click", () => {
    $(this).parents().find("#error-message-null").hide();
    return;
   })

   //error message for keeping length under 140 characters
   if (serializedData.length > 145) {
    $(this).parents().find("#error-message-length").slideDown();
    return;
  }

  //hide error message on click
  $(this).on("click", () => {
    $(this).parents().find("#error-message-length").hide();
  })

  $.post("/tweets", serializedData)
   .then(() => loadTweetsOnSubmission())
  })
  
  $("form").on("submit", function() {
    $(this).trigger("reset")
  })

});



