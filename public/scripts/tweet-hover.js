//check if document is ready
const func = function() {
  //event handler for input in tweet-text
  //add hover to tweet container
  $(".tweet").hover(
    function() {
      const $tweet = $(this);
      $tweet.css("box-shadow", "5px 10px #888");
    },
    function() {
      const $tweet = $(this);
      $tweet.css("box-shadow", "");
    });
  //add hover to flags in tweet container
  $(".fas.fa-flag").hover(
    function() {
      const $flag = $(this);
      $flag.css("color", "purple");
    },
    function() {
      const $flag = $(this);
      $flag.css("color", "");
    });
  $(".fas.fa-retweet").hover(
    function() {
      const $retweet = $(this);
      $retweet.css("color", "purple");
    },
    function() {
      const $retweet = $(this);
      $retweet.css("color", "");
    });
  $(".fas.fa-heart").hover(
    function() {
      const $heart = $(this);
      $heart.css("color", "purple");
    },
    function() {
      const $heart = $(this);
      $heart.css("color", "");
    });
  //hover for write a new tweet
  $("#clickme").hover(
    function() {
      const $clickme = $(this).parents().find(".fas.fa-angle-double-down");
      $clickme.animate({ marginTop: "0.2em"}).animate({ marginTop: "0em"});
      },
    function() {
      const $clickme = $(this).parents().find(".fas.fa-angle-double-down");
      $clickme.stop();
    });
   // hover for button to bring to top
  $(".buttonTop").hover(
    function() {
      const $buttonTop = $(this).parents().find(".buttonTop");
      $buttonTop.animate({ opacity: "0.2"}, "slow").animate({opacity: "1"}, "slow");
      },
    function() {
      const $buttonTop = $(this).parents().find(".buttonTop");
      $buttonTop.stop();
    });
};
$(document).ready(func);

