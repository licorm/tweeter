//check if document is ready
$(document).ready(function() {
  console.log('Ready!');
  //event handler for input in tweet-text
  $(".tweet").on("mouseover", function() {
    console.log("hovering!")
    const $tweet = $(this).parents().find(".tweet");
    $tweet.css("box-shadow", "5px, 10px, pink")
  })
});