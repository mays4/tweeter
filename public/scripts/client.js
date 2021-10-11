
$(()=> {
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
  const loadTweets = function (){
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets)
      },
      error:(err) => {
        console.log(`there was an error: ${err}`)
      }
    })
  }
  loadTweets();
  const renderTweets = function(tweets) {
    $("section.for-all-tweets").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("section.for-all-tweets").prepend($tweet);
    }
  };
  const createTweetElement = function(tweetArr) {
  /* creating the tweet element */
    const $tweet = $("<article>").addClass("tweet");
    const tweet_conainer= `
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
    $tweet.append(tweet_conainer);
    return $tweet;
  };
  const $form = $("#new-tweet-form");
  $form.on("submit", function(event) {
    event.preventDefault();
    $('#error').empty();
    $('#error').hide();
  const $tweetNew = $('.new-tweet textarea').val();

  if ($tweetNew.length > 140) {
     $("#error").text("❌limit are 140 words🛑🚫");
     $("#error").slideDown("slow");

  } else if (!$tweetNew.length){
    $("#error").text("❌ error empty text🛑🚫");
    $("#error").slideDown("slow");
  }
  else{
    
    const serializedData = $(this).serialize();
    $.post("/tweets", serializedData, (response) => {
      loadTweets();
      $('.new-tweet textarea').val("");
    })
    
  }
  });
$(".nav-div button").click(()=>{
$("section.new-tweet").slideToggle("slow");
$("section.new-tweet textarea").focus()
});
  
});