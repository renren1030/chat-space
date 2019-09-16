$(function(){
  function buildMessage(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="chat__main--messages--box" data-id="${message.id}">
                  <div class="chat__main--messages--box--name">
                    ${message.user_name}
                    <div class="chat__main--messages--box--time">
                    ${message.date}
                    </div>
                  </div>
                  <div class="chat__main--messages--box--text">
                    <p class="lower-messages__content">
                      ${content}
                    </p>
                      ${img}
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.chat__main--messages').append(html)
      $("#new_message")[0].reset();
      $('.chat__main--footer--form--send').prop('disabled',false);
      $('.chat__main--messages').animate({scrollTop: $('.chat__main--messages')[0].scrollHeight},'fasts')
    }
    )
    .fail(function(){
      alert('エラー');
    })
     
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");

      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json',
        data: {last_id: last_message_id} 
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  });
});

  

