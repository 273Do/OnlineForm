//ロード時の動作
window.onload = function () {
  document.querySelector("#searchByTitle").style.display = "none";
  document.querySelector("#searchByTag").style.display = "none";
  document.querySelector("#page2").style.display = "none";
};

//スプレッドシートよりスレッド取得   2023/04/14(金) 有田海斗
var tN = 0; //threadNumber
var threadsStorage = []; //全スレッドのタイトル等が格納されています．
var trueThreadsStorage = []; //Thread_ID以外の属性が結合されたものが格納されています．
const thread_data =
  "https://script.googleusercontent.com/macros/echo?user_content_key=hTx8wFRUE2qbwLxB3AjsDbwmZvWeb3JJ6muTht4ZJkC7zR8sv2WS_sfx5HEh9JJfr29tyQKtTNsKOQoZq7zSktyhPheX0ZqLm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFDzYkW62iTnTRRvq0UzqL2aLRzsznG29RR9oj8S5JsSMqOTsh77sGIbR0Rc_Gyuwi_zrFfFSS6M_iG8pnzLkT2Exmw6L_5gdNz9Jw9Md8uu&lib=MALqgNzxnUdruCf9dwMX1EjnQ_tEriaYy";
fetch(thread_data)
  .then((response) => response.json())
  .then((data) => {
    //全スレッドを取得して配列に格納   2023/04/22(土) 山口慶大
    data.forEach((data) => {
      threadsStorage.push(data);
      trueThreadsStorage.push(
        data["Thread_Title"] +
          "　" +
          data["Creator_Name"] +
          "　" +
          data["date(yyyy/mm/dd)"] +
          "　" +
          data["time(hh:mm:dd)"] +
          "　" +
          data["Undergraduate"] +
          data["Department"] +
          "　" +
          data["Grade"] +
          "回生"
      );
    });
    document.getElementById("title").innerHTML =
      "<h2>" + data[tN]["Thread_Title"] + "</h2>";
    document.getElementById("maker").innerHTML = data[tN]["Creator_Name"];
    document.getElementById("facultyEtc").innerHTML =
      data[tN]["Undergraduate"] +
      " " +
      data[tN]["Department"] +
      " " +
      data[tN]["Grade"] +
      "回生";
    document.getElementById("dateAndTimeEtc").innerHTML =
      data[tN]["date(yyyy/mm/dd)"] + "　" + data[tN]["time(hh:mm:dd)"];
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
    "#date": "日付",
    "#Undergraduate": "学部",
    "#Department": "学科",
    "#grade": "学年",
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
      else if (value == "#date") searchDate();
      else if (value == "#Undergraduate") searchUndergraduate();
      else if (value == "#Department") searchDepartment();
      else if (value == "#grade") searchGrades();
    },
  });
}

var searchWords; //検索ワード
//日付検索
function searchDate() {
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
      console.log(searchWords ? searchWords : "Please choose a date.");
    },
  });
}

//学部検索
function searchUndergraduate() {
  Swal.fire({
    title: "Please select a undergraduate.",
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
    inputPlaceholder: "SelectUndergraduate▼",
    stopKeydownPropagation: false,
    preDeny: () => {
      searchFilter();
    },
    inputValidator: (result) => {
      if (!result) return "Please select a undergraduate.";
      else {
        searchWord = result;
        console.log(searchWords);
      }
    },
  });
}

//学科検索
function searchDepartment() {
  Swal.fire({
    title: "Please select a department.",
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
    inputPlaceholder: "SelectDepartment▼",
    stopKeydownPropagation: false,
    preDeny: () => {
      searchFilter();
    },
    inputValidator: (result) => {
      if (!result) return "Please select a department.";
      else {
        searchWord = result;
        console.log(searchWords);
      }
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
        console.log(searchWords);
      }
    },
  });
}
//スレッドのテスト   2023.04.19(水)　山口慶大
//debugBtnと連動しています．
//fncが0の場合，フリーワード検索
//fncが属性の場合，各フィルター検索が可能
//スレッドが見つからない場合はエラー表示
document.getElementById("debugBtn").addEventListener("click", function () {
  console.log(searchThread("2023/04/21　19:20:21", "0"));
  console.log(searchThread("テストスレッド２", "Thread_Title"));
  console.log(searchThread("ﾔﾏｸﾞﾁｹ", "Creator_Name"));
  console.log(searchThread("2023/04/21", "date(yyyy/mm/dd)"));
  console.log(searchThread("17:12:12", "time(hh:mm:dd)"));
  console.log(searchThread("文学部", "Undergraduate"));
  console.log(searchThread("経済学科", "Department"));
  console.log(searchThread("１", "Grade"));
});
//スレッドの検索関数   2023.04.19(水)　山口慶大
function searchThread(words, fnc) {
  var tmp = [];
  var searchTmp = [];
  var outputTmp = [];
  var i = (j = 0);
  var column = 0;
  fnc == 0
    ? trueThreadsStorage.forEach(() => {
        if (trueThreadsStorage[column].indexOf(words) != -1)
          searchTmp.push(column);
        column++;
      })
    : threadsStorage.forEach(() => {
        tmp.push(threadsStorage[i][fnc]);
        i++;
        if (tmp.length == 0) showError("スレッドが見つかりませんでした．");
      }),
    tmp.forEach(() => {
      if (tmp[column].indexOf(words) != -1) searchTmp.push(column);
      column++;
    });
  searchTmp.forEach(() => {
    outputTmp.push(threadsStorage[searchTmp[j]]["Thread_ID"]);
    j++;
  });
  if (outputTmp.length == 0) showError("スレッドが見つかりませんでした．");
  return outputTmp;
}
