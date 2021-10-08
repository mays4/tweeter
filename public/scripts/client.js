/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(()=> {
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    // const safeHTML = `<p>${escape(textFromUser)}</p>`;
  const loadTweets = function (){
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        // console.log("data:", tweets)
        renderTweets(tweets)
      },
      error:(err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }
  loadTweets();
  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  // const $tweetContainer = $("section.tweet");
    $("section.for-all-tweets").empty();
    for (const tweet of tweets) {
      //console.log("tweet",tweet);
      const $tweet = createTweetElement(tweet);
      $("section.for-all-tweets").prepend($tweet);
    }
  };
  const createTweetElement = function(tweetArr) {
  /* Your code for creating the tweet element */
    const $tweet = $("<article>").addClass("tweet");
    const markup = `
    <header class="header_name">
        <div class="avatar_name">
        <img class="avatar" src =${tweetArr.user.avatars}>
        <span class="name-of-avatar">${tweetArr.user.name} </span>
        </div>
        <span class = "handle" >${tweetArr.user.handle} </span>
    </header>
    <div> 
      <p class="pcolor" >${tweetArr.content.text}
      </p>
      <hr class='line'>
    </div>
    <footer>
        <span class="timeago"> ${timeago.format(tweetArr.created_at)} </span> 
        <ul class="icon"> 
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
        </ul>
    </footer>
    `;
    
    $tweet.append(markup);
    console.log("test")
    return $tweet;
  };
  // renderTweets(data);
  const $form = $("#new-tweet-form");
  $form.on("submit", function(event) {
    event.preventDefault();
    $('#error').empty();
    $('#error').hide();
  const $tweetNew = $('.new-tweet textarea').val();
  console.log("tweet",$tweetNew)

  if ($tweetNew.length > 140) {
     //alert("limit are 140 words")
     $("#error").text("❌limit are 140 words🛑🚫");
     $("#error").slideDown("slow");

  } else if (!$tweetNew.length){
    //alert("error empty ")
    $("#error").text("❌ error empty text🛑🚫");
    $("#error").slideDown("slow");
  }
  else{
    
    const serializedData = $(this).serialize();
    //console.log(serializedData)
    $.post("/tweets", serializedData, (response) => {
      console.log(response)
      loadTweets();
    })
  }
  });
$(".nav-div button").click(()=>{
$("section.new-tweet").slideToggle("slow");
$("section.new-tweet textarea").focus()

});
  
});