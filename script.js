//ロード時の動作
window.onload = function () {
  document.querySelector("#searchByTitle").style.display = "none";
  document.querySelector("#searchByTag").style.display = "none";
  document.querySelector("#page2").style.display = "none";
};

//スプレッドシートよりスレッド取得   2023/04/14(金) 有田海斗
const thread_data =
  "https://script.googleusercontent.com/macros/echo?user_content_key=hTx8wFRUE2qbwLxB3AjsDbwmZvWeb3JJ6muTht4ZJkC7zR8sv2WS_sfx5HEh9JJfr29tyQKtTNsKOQoZq7zSktyhPheX0ZqLm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFDzYkW62iTnTRRvq0UzqL2aLRzsznG29RR9oj8S5JsSMqOTsh77sGIbR0Rc_Gyuwi_zrFfFSS6M_iG8pnzLkT2Exmw6L_5gdNz9Jw9Md8uu&lib=MALqgNzxnUdruCf9dwMX1EjnQ_tEriaYy";
fetch(thread_data)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("title").innerHTML =
      "<h2>" + data[0]["Thread_Title"] + "</h2>";
    document.getElementById("maker").innerHTML = data[0]["Creator_Name"];
    document.getElementById("facultyEtc").innerHTML =
      data[0]["Undergraduate"] +
      " " +
      data[0]["Department"] +
      " " +
      data[0]["Grade"] +
      "回生";
    document.getElementById("dateAndTimeEtc").innerHTML =
      data[0]["date(yyyy/mm/dd)"] + "　" + data[0]["time(hh:mm:dd)"];
  })
  .catch((error) => {
    showError("タイトル取得に失敗しました.", error);
  });

var chat_load = "";
var div = document.getElementById("commentDetail");
//スプレッドシートよりコメント取得   2023/04/14(金) 有田海斗
const comment_data =
  "https://script.googleusercontent.com/macros/echo?user_content_key=sRYv53Om9t149qVBsez11_YqRE6UjtlYW9ff9QWH8MEyXQP5yrBt56IOqfXUMHrjaEOj5tM39yw8xRgUhP7NFcP7FaQqNfTam5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCA_Svx5peXM6XMVrJ3Ipyu5znJnMuSzh4NxdlUwwMC05fDn9qpO80WIQjTfxIPCKYRkkyNAa567dyQeJ-doWvdoyYxsyg8V8w&lib=MZhz0KtvML4lyEqBxIAkhMMa0aySdfDvo";
fetch(comment_data)
  .then((response) => response.json())
  .then((data) => {
    for (var i = 0; i < data.length; i++) {
      chat_load +=
        '<div class="commentDetail"> <li class="chatDetail1">' +
        data[i]["Wrote_Name"] +
        "(" +
        data[i]["Undergraduate"] +
        " " +
        data[i]["Department"] +
        " " +
        data[i]["Grade"] +
        "回生)" +
        '</li> <li class="chatDetail2">' +
        data[i]["date(yyyy/mm/dd)"] +
        "　" +
        data[i]["time(hh:mm:dd)"] +
        '</li> <li class="comment">' +
        data[i]["Comment"] +
        "</li> </div>";
    }
    document.getElementById("chat").innerHTML = chat_load;
  })
  .catch((error) => {
    showError("チャット取得に失敗しました.", error);
  });

//Accountボタンが押された時の動作
document.querySelector("#Account").addEventListener("click", function () {
  var ex = 1;
  Swal.fire({
    title: "YourAccount",
    // toast: "true",
    backdrop: "none",
    html: "ログインしているアカウント情報を表示" + ex,
    // showLoaderOnConfirm: true,
    showCancelButton: true,
  });
});

//Logoutボタンが押された時の動作
document.querySelector("#Logout").addEventListener("click", function () {
  Swal.fire({
    icon: "warning",
    title: "ログアウトしますか?",
    toast: "true",
    // showLoaderOnConfirm: true,
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("ログインページへ移動．");
    }
  });
});

//page2Iconボタンが押された時の動作
document.querySelector("#page2Icon").addEventListener("click", function () {
  document.querySelector("#page1").style.display = "none";
  document.querySelector("#page2").style.display = "block";
});

//page1Iconボタンが押された時の動作
document.querySelector("#page1Icon").addEventListener("click", function () {
  document.querySelector("#page2").style.display = "none";
  document.querySelector("#page1").style.display = "block";
});

//optionボタンが押された時の動作
function option() {
  const inputOptions = {
    0: "create",
    1: "searchByTitle",
    2: "searchByTag",
  };
  Swal.fire({
    title: "About threads",
    input: "radio",
    backdrop: "none",
    showCancelButton: true,
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) return "optionを選択してください．";
      else if (value == 0) {
        document.querySelector("#createThread").style.display = "block";
        document.querySelector("#searchByTitle").style.display = "none";
        document.querySelector("#searchByTag").style.display = "none";
      } else if (value == 1) {
        document.querySelector("#createThread").style.display = "none";
        document.querySelector("#searchByTitle").style.display = "block";
        document.querySelector("#searchByTag").style.display = "none";
      } else if (value == 2) {
        document.querySelector("#createThread").style.display = "none";
        document.querySelector("#searchByTitle").style.display = "none";
        document.querySelector("#searchByTag").style.display = "block";
      }
    },
  });
}

//フィルター検索の設定項目  2023/04/15(土) 山口慶大
function searchFilter() {
  const inputOptions = {
    "#days": "日付",
    "#times": "時間",
    "#grade": "学年",
    // "#comment": "コメント数",
  };
  Swal.fire({
    title: "searchFilter",
    text: "Please select a filter.",
    input: "radio",
    backdrop: "none",
    showCancelButton: true,
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) return "Please select a filter.";
      else if (value == "#days") searchDays();
      else if (value == "#times") searchTimes();
      else if (value == "#grade") searchGrades();
      else if (value == "#comment") searchCommentValue();
    },
  });
}

var searchWord; //検索ワード
//日付検索
function searchDays() {
  Swal.fire({
    title: "Please choose a date.",
    html: '<input type="date" class="swal2-input" name="selectTime" id="date">',
    showCancelButton: true,
    showDenyButton: true,
    denyButtonText: "back",
    // focusConfirm: false,
    toast: true,
    preDeny: () => {
      searchFilter();
    },
    preConfirm: () => {
      searchWord = document
        .getElementById("date")
        .value.replace("-", "/")
        .replace("-", "/");
      console.log(searchWord ? searchWord : "Please choose a date.");
    },
  });
}

//時間検索
function searchTimes() {
  Swal.fire({
    title: "Please select a time.",
    html: '<input type="time" class="swal2-input" name="selectTime" id="time">',
    showCancelButton: true,
    showDenyButton: true,
    denyButtonText: "back",
    focusConfirm: false,
    toast: true,
    preDeny: () => {
      searchFilter();
    },
    preConfirm: () => {
      searchWord = document.getElementById("time").value;
      console.log(searchWord ? searchWord : "Please select a time.");
    },
  });
}

//学年検索
//データベースの形式に合わせて、漢数字→数字へ変更．　2023.04.19(水)　有田海斗
function searchGrades() {
  Swal.fire({
    title: "Please select a grade.",
    input: "select",
    showCancelButton: true,
    showDenyButton: true,
    denyButtonText: "back",
    toast: true,
    inputOptions: {
      "1回生": "1回生",
      "2回生": "2回生",
      "3回生": "3回生",
      "4回生": "4回生",
    },
    inputPlaceholder: "SelectGrade▼",
    stopKeydownPropagation: false,
    preDeny: () => {
      searchFilter();
    },
    inputValidator: (result) => {
      if (!result) return "Please select a grade.";
      else {
        searchWord = result;
        console.log(searchWord);
      }
    },
  });
}
