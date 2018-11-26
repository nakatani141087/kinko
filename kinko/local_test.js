$(loaded);

function loaded() {
  showText();
  $("#formButton").click(
    function() {
      saveText();
      showText();
    });
}


function saveText() {
  var name = $("#formName");
  var key = $("#formKey");
  localStorage.setItem(key.val(), name.val());
  key.val("");
  name.val("");
}


function showText() {
  var list = $("#list");
  list.children().remove();
  var key, value, html = [];
  for(var i=0, len=localStorage.length; i<len; i++) {
    key = localStorage.key(i);
    value = localStorage.getItem(key);
    html.push($("<p>").text(value));
  }
  list.append(html);
}