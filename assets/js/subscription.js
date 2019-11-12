/* * * * * * * * * * * * * * * * * * *
JS for Subscription page
* * * * * * * * * * * * * * * * * * */


// Close subscription fail message layer
  const messageClose = document.querySelector("#message-close");
  const subMessage = document.querySelector(".subMessage");
    // Result layer close event
    messageClose.addEventListener("click", function(){
      subMessage.setAttribute("class","closeMessage") 
      location.reload();
    });



