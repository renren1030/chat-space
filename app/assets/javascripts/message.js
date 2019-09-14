$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="chat-main-messages" data-id="${message.id}">
                  <div class="chat-main-messages-box">
                    <p class="chat__main--messages--box--name">
                      ${message.user_name}
                    </p>
                    <p class="chat__main--messages--box--time">
                      ${message.date}
                    </p>
                  </div>
                  <p class="chat__main--messages--box--text">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat').append(html)
      $('#newmessage')[0].reset();
      $('.chat__main--footer--form--send').prop('disabled',false);
      $('.chat').animate({scollTop: $('.chat')[0].scrollHeight},'fasts')
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);　//ここで解除している
    })
  })
});
