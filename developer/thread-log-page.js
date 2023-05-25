const li = document.getElementsByTagName("li");

for (let i = 0; i < li.length; i++) {
  li[i].addEventListener("click", function() {
    this.classList.toggle("active");
  });
}

//スプレッドシートよりスレッド取得．   2023/04/14(金) 有田海斗
var commonThreadData;
var threadsStorage = []; //全スレッドのタイトル等が格納されています．
var trueThreadsStorage = []; //Thread_ID以外の属性が結合されたものが格納されています．
const thread_data =
  "https://script.google.com/macros/s/AKfycbyLA7mP7nOgQvvVy9vGLWUmXC-T0wsDMk_bR6mYrHNwhPNh6Rn01pNAR2hQMm8SZgopBw/exec";
fetch(thread_data)
  .then((response) => response.json())
  .then((data) => {
    commonThreadData = data.reverse(); //ここ消せば昇順になる
    showTitle(data, nowThreadID);
    showSearchedTitle(data, 0);
  })
  .catch((error) => {
    showError("タイトル取得に失敗しました.", error);
  });

var chat_load = "";
var chat_load2 = "";
var commonCommentData;
var div = document.getElementById("commentDetail");
var commentStorage = [];


console.log(commonThreadData);


