//check if document is ready
const func = function() {
  //event handler for input in tweet-text
  //add hover to tweet container
  $(".tweet").hover(
    function() {
      const $tweet = $(this).parents().find(".tweet");
      $tweet.css("box-shadow", "5px 10px #888");
    },
    function() {
      const $tweet = $(this).parents().find(".tweet");
      $tweet.css("box-shadow", "");
    });
  //add hover to flags in tweet container
  $(".fas.fa-flag").hover(
    function() {
      const $flag = $(this).parents().find(".fas.fa-flag");
      $flag.css("color", "purple");
    },
    function() {
      const $flag = $(this).parents().find(".fas.fa-flag");
      $flag.css("color", "");
    });
  $(".fas.fa-retweet").hover(
    function() {
      const $flag = $(this).parents().find(".fas.fa-retweet");
      $flag.css("color", "purple");
    },
    function() {
      const $flag = $(this).parents().find(".fas.fa-retweet");
      $flag.css("color", "");
    });
  $(".fas.fa-heart").hover(
    function() {
      const $flag = $(this).parents().find(".fas.fa-heart");
      $flag.css("color", "purple");
    },
    function() {
      const $flag = $(this).parents().find(".fas.fa-heart");
      $flag.css("color", "");
    });
};
$(document).ready(func);

