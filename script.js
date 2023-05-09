//閲覧モード状態   2023/04/23(日) 山口慶大
var viewOnly = 1;

//スレッド番号を指定するとそのスレッドが表示される．
var nowThreadID = 1000;

let userData = [];
var i = 0;

//ロード時の動作　　023/04/25(火) 山口慶大
window.onload = function () {
  document.querySelector("#searchByTitle").style.display = "block";
  document.querySelector("#searchByTag").style.display = "none";
  document.querySelector("#createThread").style.display = "none";
  document.querySelector("#page1").style.display = "none";
  viewOnly == 1
    ? (document.querySelector("#view").style.display = "block")
    : (document.querySelector("#view").style.display = "none");

  //パラーメーターの有無を確認．　2023年4月25日　有田海斗
  const url = new URL(window.location.href);
  const params = url.searchParams;

  //パラメーターが無い場合、ログイン画面へ遷移．　2023年4月25日　有田海斗

  if (params == "" || params == null) {
    setTimeout(function () {
      //一旦無効化 無効化するとaccountボタン押せなくなる
      // location.href = "indexLogin.html";
    }, 100);
  }

  //データベースからアカウント情報を取得．　2023年4月25日　有田海斗
  const user_data =
    "https://script.google.com/macros/s/AKfycbxzclUMPdnA98fdRGw7fjzt2Chb_BzSzJoQYaWIA4WPe8pOgwT3MfNCjEq6bvTxoxTMDw/exec";

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      fetch(user_data)
        .then((response) => response.json())
        .then((data) => {
          userData = data;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  fetchData()
    .then(() => {
      const user = params.get("user");

      //パラメーターが偽造である場合、ログイン画面へ遷移   2023/04/19(水) 有田海斗
      let flag = false;
      for (i = 0; i < userData.length; i++) {
        if (userData[i]["Access_Code"] == user) {
          //パラメーターが一致した場合、データベースからパラメーターを削除．　2023年4月25日　有田海斗
          var now = new Date();
          var year = now.getFullYear();
          var month = ("0" + (now.getMonth() + 1)).slice(-2);
          var day = ("0" + now.getDate()).slice(-2);
          var hour = ("0" + now.getHours()).slice(-2);
          var minute = ("0" + now.getMinutes()).slice(-2);
          var second = ("0" + now.getSeconds()).slice(-2);
          var url =
            "https://script.google.com/macros/s/AKfycbwTuVY4UJ2_YNV2Ps0hQPVMAJSvvozrvb7Wpvg9Dw4-naYdXM0a27F-r6BEfywDNOCMrQ/exec" +
            "?row=" +
            (i + 2) +
            "&value1=" +
            encodeURIComponent("") +
            "&value2=" +
            "'" +
            year +
            "/" +
            month +
            "/" +
            day +
            " " +
            hour +
            ":" +
            minute +
            ":" +
            second;
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.send();

          BGImageAndPE(userData[i]["BackGround"], 0);
          BGImageAndPE(userData[i]["ParallaxEffect"], 1);

          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      if (flag == true) {
        setTimeout(function () {
          // location.href = "indexLogin.html";
        }, 100);
      }
    })
    .catch((error) => {
      showError("ユーザー情報の取得に失敗しました.", error);
    });
  //スレッド検索：ワードを入れるたびに動作
  document
    .querySelector("#searchByWord")
    .addEventListener("input", function () {
      console.log(this.value);
      console.log(searchThread(this.value, 0));
      if (
        document.getElementById("searchByWord").value == "" ||
        document.getElementById("searchByWord").value == null
      )
        return showSearchedTitle(commonThreadData, 0);
      showSearchedTitle(commonThreadData, 1, searchThread(this.value, 0));
    });
  //コメント検索：ワードを入れるたびに動作
  document
    .querySelector("#searchByComment")
    .addEventListener("input", function () {
      console.log(this.value);
      console.log(searchComment(this.value));
      if (
        document.getElementById("searchByComment").value == "" ||
        document.getElementById("searchByComment").value == null
      )
        return showSearchedTitle(commonThreadData, 0);
      showSearchedTitle(commonThreadData, 2, searchComment(this.value));
    });
};
//スプレッドシートよりスレッド取得．   2023/04/14(金) 有田海斗
var tN = 0; //threadNumber
var commonThreadData;
var threadsStorage = []; //全スレッドのタイトル等が格納されています．
var trueThreadsStorage = []; //Thread_ID以外の属性が結合されたものが格納されています．
const thread_data =
  "https://script.google.com/macros/s/AKfycbyLA7mP7nOgQvvVy9vGLWUmXC-T0wsDMk_bR6mYrHNwhPNh6Rn01pNAR2hQMm8SZgopBw/exec";
fetch(thread_data)
  .then((response) => response.json())
  .then((data) => {
    commonThreadData = data;
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
//スプレッドシートよりコメント取得   2023/04/14(金) 有田海斗
const comment_data = //たまに複数回読み込まれるバグあり
  "https://script.google.com/macros/s/AKfycbxiadRatS0K87utFoFIK3SACnV7BoSAA8K9AAsDMGCSkEvCi9-z3OtsTE3lB4J4_qsB/exec";
fetch(comment_data)
  .then((response) => response.json())
  .then((data) => {
    commonCommentData = data;
    showThread(data, nowThreadID);
  })
  .catch((error) => {
    showError("チャット取得に失敗しました.", error);
  });

//Viewボタンが押された時の動作   2023/04/23(日) 山口慶大
function vOnly() {
  Swal.fire({
    icon: "warning",
    title: "ログインしますか?",
    toast: "true",
    // showLoaderOnConfirm: true,
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("ログインページへ移動．");
    }
  });
}

//Accountボタンが押された時の動作
document.querySelector("#Account").addEventListener("click", function () {
  Swal.fire({
    title: "YourAccount",
    // toast: "true",
    backdrop: "none",
    html:
      "アカウント名：" +
      userData[i]["Name"] +
      "<br>メールアドレス：" +
      userData[i]["Mail"],
    footer:
      "<p onclick=changeAccountData() style='cursor:pointer'>変更はこちら</p>",
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
      setTimeout(function () {
        location.href = "indexLogin.html";
      }, 100);
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

//sortingIconボタンが押された時の動作

document.querySelector("#sortingIcon").addEventListener("click", function () {
  console.log("昇順降順を切り替えるボタンです．");
});

//historyIconボタンが押された時の動作
var historyTmp = []; //ここにスレッドIDをスタックする．
//そのスレッドIDを利用してポップアップ表示の部分に反映させるようにする．
let showHistory =
  "<ul style='height: 100px;overflow-y: scroll;'><li>test1</li><li>test2</li><li>test3</li><li>test4</li><li>test5</li><li>test6</li><li>test7</li><li>test8</li></ul>";
document.querySelector("#historyIcon").addEventListener("click", function () {
  Swal.fire({
    title: "History",
    html: showHistory,
    footer: "スレッドの閲覧履歴です",
    showCancelButton: true,
    toast: true,
    backdrop: "none",
    confirmButtonText: "Clear",
    preConfirm: () => {
      console.log("history");
    },
  });
});

//optionボタンが押された時の動作
function option() {
  const inputOptions = {
    0: "TitleSearch",
    1: "CommentSearch",
    2: "CreateThread",
  };
  Swal.fire({
    title: "About threads",
    input: "radio",
    backdrop: "none",
    width: "600px",
    showCancelButton: true,
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) return "optionを選択してください．";
      else if (value == 0) {
        document.querySelector("#createThread").style.display = "none";
        document.querySelector("#searchByTitle").style.display = "block";
        document.querySelector("#searchByTag").style.display = "none";
      } else if (value == 1) {
        document.querySelector("#createThread").style.display = "none";
        document.querySelector("#searchByTitle").style.display = "none";
        document.querySelector("#searchByTag").style.display = "block";
      } else if (value == 2) {
        document.querySelector("#createThread").style.display = "block";
        document.querySelector("#searchByTitle").style.display = "none";
        document.querySelector("#searchByTag").style.display = "none";
      }
    },
  });
}
//アカウント情報の変更　　2023/04/23(日) 山口慶大
//バリデーションチェックはまだ
//'<select name="example" class="swal2-input" id="changeContents" onchange="selectInputType()"><option value="select" selected disabled>Select contents▼</option><option value="changeUsername">Username</option><option value="changePassword">Password</option></select><input type="text" class="swal2-input" id="changeUsername" style="align-items: center"><input type="password" class="swal2-input" id="changePassword" style="  display:flex, flex-direction: column,align-items:center">'
function changeAccountData() {
  let tmp = "";
  Swal.fire({
    title: "Change Account Data",
    input: "checkbox",
    html: '<select name="example" class="swal2-input" id="changeContents" onchange="selectInputType()"><option value="select" selected disabled>Select contents▼</option><option value="Username">Username</option><option value="Password">Password</option></select><input type="text" class="swal2-input" id="changeAccount">',
    backdrop: "none",
    inputPlaceholder: "Change Your Account Data?",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) return "You need to agree.";
      else if (document.getElementById("changeAccount").value == "")
        return "入力欄が空です．";
      else if (document.getElementById("changeContents").value == "select")
        return "項目が選択されていません．";
      else {
        tmp = document.getElementById("changeAccount").value;
        if (document.getElementById("changeContents").value == "Username") {
          var url =
            "https://script.google.com/macros/s/AKfycbwXlVw4BI718xsCxkaQYOatfIGhKUQSQpFRiZkQ5S9vZHbql6R-65u415HbEvUQhKjj/exec" +
            "?row=" +
            (i + 2) +
            "&changeData=" +
            document.getElementById("changeAccount").value +
            encodeURIComponent("");
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.send();
          userData[i]["Name"] = document.getElementById("changeAccount").value;

          showMessage(
            "変更しました．",
            "変更：" + document.getElementById("changeAccount").value
          );
          console.log(
            document.getElementById("changeContents").value,
            document.getElementById("changeAccount").value
          );
        } else {
          Swal.fire({
            title: "ReEnter New Password",
            input: "password",
            showCancelButton: true,
            inputValidator: (value) => {
              if (value == tmp) {
                url =
                  "https://script.google.com/macros/s/AKfycbxoiJlyW8AJ0_HqNvYebBkmL0b019rlR0KyRuZzsGAn7EY9fD8BuYjt5w4UIVqjmKrD/exec" +
                  "?row=" +
                  (i + 2) +
                  "&changeData=" +
                  tmp +
                  encodeURIComponent("");
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.send();

                showMessage("変更しました．");
              } else {
                showError(
                  "変更できませんでした．",
                  "パスワードが一致しません．"
                );
              }
            },
          });
        }
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
      document
        .getElementById("date")
        .value.replace("-", "/")
        .replace("-", "/") !== ""
        ? showSearchedTitle(
            commonThreadData,
            1,
            searchThread(
              document
                .getElementById("date")
                .value.replace("-", "/")
                .replace("-", "/"),
              "date(yyyy/mm/dd)"
            )
          )
        : Swal.fire({
            icon: "error",
            title: "Please choose a date.",
            toast: "true",
            width: "400px",
            showCancelButton: true,
            confirmButtonText: "back",
          }).then((result) => {
            if (result.isConfirmed) searchDate();
          });
    },
  });
}

//学部検索
function searchUndergraduate() {
  const inputOptions = {
    文学部: "文学部",
    国際英語学部: "国際英語学部",
    発達教育学部: "発達教育学部",
    総合心理学部: "総合心理学部",
    現代ビジネス学部: "現代ビジネス学部",
    経済学部: "経済学部",
    経営学部: "経営学部",
    工学部: "工学部",
    健康科学部: "健康科学部",
  };
  Swal.fire({
    title: "Please select a undergraduate.",
    input: "select",
    showCancelButton: true,
    showDenyButton: true,
    denyButtonText: "back",
    toast: true,
    inputOptions: inputOptions,
    inputPlaceholder: "SelectUndergraduate▼",
    stopKeydownPropagation: false,
    preDeny: () => {
      searchFilter();
    },
    inputValidator: (result) => {
      if (!result) return "Please select a undergraduate.";
      else {
        showSearchedTitle(
          commonThreadData,
          1,
          searchThread(result, "Undergraduate")
        );
      }
    },
  });
}

//学科検索
function searchDepartment() {
  const inputOptions = {
    日本語日本文学科: "日本語日本文学科",
    歴史学科: "歴史学科",
    歴史遺産学科: "歴史遺産学科",
    国際英語学: "国際英語学科",
    児童教育学科: "児童教育学科",
    総合心理学科: "総合心理学科",
    都市環境デザイン学科: "都市環境デザイン学科",
    経済学科: "経済学科",
    経営学科: "経営学科",
    情報工学科: "情報工学科",
    建築デザイン学科: "建築デザイン学科",
    看護学科: "看護学科",
    心理学科: "心理学科",
    理学療法学科: "理学療法学科",
    作業療法学科: "作業療法学科",
    救急救命学科: "救急救命学科",
    臨床検査学科: "臨床検査学科",
  };
  Swal.fire({
    title: "Please select a department.",
    input: "select",
    showCancelButton: true,
    showDenyButton: true,
    denyButtonText: "back",
    toast: true,
    inputOptions: inputOptions,
    inputPlaceholder: "SelectDepartment▼",
    stopKeydownPropagation: false,
    preDeny: () => {
      searchFilter();
    },
    inputValidator: (result) => {
      if (!result) return "Please select a department.";
      else
        showSearchedTitle(
          commonThreadData,
          1,
          searchThread(result, "Department")
        );
    },
  });
}

//学年検索
//データベースの形式に合わせて、漢数字→数字へ変更．　2023.04.19(水)　有田海斗
function searchGrades() {
  const inputOptions = {
    "１": "１回生",
    "２": "２回生",
    "３": "３回生",
    "４": "４回生",
  };
  Swal.fire({
    title: "Please select a grade.",
    input: "select",
    showCancelButton: true,
    showDenyButton: true,
    denyButtonText: "back",
    toast: true,
    inputOptions: inputOptions,
    inputPlaceholder: "SelectGrade▼",
    stopKeydownPropagation: false,
    preDeny: () => {
      searchFilter();
    },
    inputValidator: (result) => {
      if (!result) return "Please select a grade.";
      else
        showSearchedTitle(commonThreadData, 1, searchThread(result, "Grade"));
    },
  });
}
//スレッドのテスト   2023.04.19(水)　山口慶大
//debugBtnと連動しています．
//fncが0の場合，フリーワード検索
//fncが属性の場合，各フィルター検索が可能
//スレッドが見つからない場合はエラー表示

document.getElementById("debugBtn").addEventListener("click", function () {
  console.log("デバッグボタン");
});
//スレッドの検索関数   2023.04.22(土)　山口慶大
function searchThread(words, fnc) {
  var tmp = [];
  var searchTmp = [];
  var output = [];
  var i = 0;
  fnc == 0
    ? trueThreadsStorage.forEach((e) => {
        if (e.indexOf(words) != -1) searchTmp.push(i);
        i++;
      })
    : threadsStorage.forEach((e) => {
        tmp.push(e[fnc]);
      }),
    tmp.forEach((e) => {
      if (e.indexOf(words) != -1) searchTmp.push(i);
      i++;
    });
  searchTmp.forEach((e) => {
    output.push(threadsStorage[e]["Thread_ID"]);
  });
  if (output.length == 0) return ["noThread", words];
  else return output;
}
//コメントの検索関数   2023.04.23(日)　山口慶大
//検索ワードとを入れることで，そのコメントが投稿されているスレッドIDとコメントIDを二次元配列にして返します．
//見つからない場合はエラーを表示します．
function searchComment(words) {
  var tmp = [];
  var resultTmp = [];
  var output;
  var i = 0;
  commentStorage.forEach((e) => {
    if (e["Comment"].indexOf(words) != -1) tmp.push(i);
    i++;
  });
  tmp.forEach((e) => {
    resultTmp.push(
      commentStorage[e]["Thread_ID"],
      commentStorage[e]["Comment_ID"]
    );
  });
  output = new Array(Math.ceil(resultTmp.length / 2))
    .fill()
    .map((_, i) => resultTmp.slice(i * 2, (i + 1) * 2));
  if (output.length == 0) {
    console.log(words);
    return ["noThread", words];
  } else return output;
}
//スレッドIDを指定したらコメントを表示する関数
function showThread(commentData, thread_ID) {
  var chat_load = "";
  var chat_load2 = "";
  commentData.forEach((e) => {
    commentStorage.push(e);
    if (e["Thread_ID"] == thread_ID) {
      chat_load +=
        '<div id="chat' +
        e["Comment_ID"] +
        '" class="commentDetail"> <li class="chatDetail1">' +
        e["Comment_ID"] +
        "：" +
        e["Wrote_Name"] +
        "(" +
        e["Undergraduate"] +
        " " +
        e["Department"] +
        " " +
        e["Grade"] +
        "回生)" +
        '</li> <li class="chatDetail2">' +
        e["date(yyyy/mm/dd)"] +
        "　" +
        e["time(hh:mm:dd)"] +
        '</li> <li class="comment">' +
        e["Comment"] +
        "</li> </div>";
      chat_load2 = chat_load.replace("commentDetail", "trueCommentDetail");
    }
  });
  document.getElementById("chat").innerHTML = chat_load;
  // ScrollReveal().reveal("#chat, .commentDetail", {
  //   delay: 200,
  //   origin: "left",
  //   distance: "28px",
  //   interval: 100,
  //   afterReveal: function () {
  //     window.setTimeout(function () {
  //       document.getElementById("chat").innerHTML = chat_load2;
  //     }, 450);
  //   },
  // });
  document.getElementById("chat").innerHTML = chat_load2;
}
//スレッドIDを指定したらタイトルを表示する関数
function showTitle(threadData, thread_ID) {
  var i = 0;
  threadData.forEach((e) => {
    threadsStorage.push(e);
    trueThreadsStorage.push(
      e["Thread_Title"] +
        "　" +
        e["Creator_Name"] +
        "　" +
        e["date(yyyy/mm/dd)"] +
        "　" +
        e["time(hh:mm:dd)"] +
        "　" +
        e["Undergraduate"] +
        e["Department"] +
        "　" +
        e["Grade"] +
        "回生"
    );
    if (e["Thread_ID"] == thread_ID) {
      document.getElementById("title").innerHTML =
        "<h2>" + threadData[i]["Thread_Title"] + "</h2>";
      document.getElementById("maker").innerHTML =
        threadData[i]["Creator_Name"];
      document.getElementById("facultyEtc").innerHTML =
        threadData[i]["Undergraduate"] +
        " " +
        threadData[i]["Department"] +
        " " +
        threadData[i]["Grade"] +
        "回生";
      document.getElementById("dateAndTimeEtc").innerHTML =
        threadData[i]["date(yyyy/mm/dd)"] +
        "　" +
        threadData[i]["time(hh:mm:dd)"];
    }
    i++;
  });

  // ScrollReveal().reveal("#threadTitle", {
  //   delay: 200,
  //   origin: "left",
  //   distance: "60px",
  // });
}

//スレッドタイトル一覧を表示する関数
//第一引数：commonThreadData
//第二引数：mode = 0：全スレッド表示，1：スレッド検索，2：コメント検索
//第三引数：スレッド番号が格納された配列
function showSearchedTitle(threadData, mode, threadIDArray) {
  console.log(commentStorage);
  var title_load = "";
  var title_load2 = "";
  if (mode == 0)
    threadData.forEach((e) => {
      title_load += titleLoad(e);
      title_load2 = title_load.replace(/"threadsDetail"/g, "trueThreadsDetail");
    });
  else if (threadIDArray[0] == "noThread") {
    title_load = titleLoadError(threadIDArray);
    title_load2 = title_load.replace(/"threadsDetail"/g, "noneThreadsDetail");
  } else if (mode == 1) {
    var i = 0;
    threadData.forEach((e) => {
      if (threadIDArray[i] == e["Thread_ID"]) {
        title_load += titleLoad(e);
        title_load2 = title_load.replace(
          /"threadsDetail"/g,
          "trueThreadsDetail"
        );
        i++;
      }
    });
  } else if (mode == 2) {
    var sortThreadIDArray;
    var i = 0;
    var commentTmp = [];
    sortThreadIDArray = threadIDArray.sort(
      (a, b) => a[0] - b[0] || a[1] - b[1]
    );
    sortThreadIDArray.forEach((e) => {
      commentStorage.forEach((e2) => {
        if (e[0] == e2["Thread_ID"] && e[1] == e2["Comment_ID"])
          commentTmp.push(e2["Comment"]);
      });
      threadData.forEach((e3) => {
        if (e[0] == e3["Thread_ID"]) {
          title_load +=
            '<div class="threadsDetail" onclick="viewThread(' +
            e3["Thread_ID"] +
            "," +
            e[1] +
            ')"> <li class="chatDetail1" style="font-size:30px">' +
            e3["Thread_Title"] +
            "</li>" +
            e3["Creator_Name"] +
            "(" +
            e3["Undergraduate"] +
            " " +
            e3["Department"] +
            " " +
            e3["Grade"] +
            "回生)" +
            '<li class="chatDetail2">' +
            e3["date(yyyy/mm/dd)"] +
            "　" +
            e3["time(hh:mm:dd)"] +
            "　" +
            '</li><li class="chatDetail2" style="font-size:22px">' +
            e[1] +
            "：" +
            commentTmp[i] +
            "</li></div>";
          title_load2 = title_load.replace(
            /"threadsDetail"/g,
            "trueThreadsDetail"
          );
          i++;
        }
      });
    });
  }
  document.getElementById("result").innerHTML = title_load;
  ScrollReveal().reveal("#result, .threadsDetail", {
    delay: 200,
    origin: "left",
    distance: "28px",
    interval: 100,
    afterReveal: function () {
      window.setTimeout(function () {
        document.getElementById("result").innerHTML = title_load2;
      }, 450);
    },
  });
}
//タイトル表示の要素を返す関数
function titleLoad(e) {
  return (
    '<div class="threadsDetail" onclick="viewThread(' +
    e["Thread_ID"] +
    ',0)"><li class="chatDetail1" style="font-size:30px">' +
    e["Thread_Title"] +
    "</li>" +
    e["Creator_Name"] +
    "(" +
    e["Undergraduate"] +
    " " +
    e["Department"] +
    " " +
    e["Grade"] +
    "回生)" +
    '<li class="chatDetail2">' +
    e["date(yyyy/mm/dd)"] +
    "　" +
    e["time(hh:mm:dd)"] +
    "　" +
    "</li> </div>"
  );
}
//タイトル表示のエラー要素を返す関数
function titleLoadError(e) {
  return (
    '<div class="threadsDetail"><li class="chatDetail1" style="font-size:18px">スレッドが見つかりませんでした．</li>検索：' +
    e[1] +
    "</div>"
  );
}
//選択したスレッドの表示を行う関数
function viewThread(threadID, mode) {
  document.querySelector("#page2").style.display = "none";
  document.querySelector("#page1").style.display = "block";
  showThread(commonCommentData, threadID);
  showTitle(commonThreadData, threadID);

  window.setTimeout(function () {
    if (mode != 0) {
      //   document.getElementById("chat").scrollTop =
      //     document
      //       .getElementById("chat" + String(mode - 1))
      //       .getBoundingClientRect().top + window.pageYOffset;
      // const chat = document.getElementById("chat");
      // const target = document.getElementById("chat" + String(mode - 1));
      // target.scrollIntoView({
      //   behavior: "smooth",
      //   block: "start",
      //   inline: "nearest",
      // });

      //   const chat = document.getElementById("chat");
      //   const target = document.getElementById("chat" + String(mode - 1));
      //   const step = 35; // スクロール量を分割する数
      //   const intervalTime = 10; // スクロールを行う間隔（ミリ秒）
      //   const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      //   const currentTop = chat.scrollTop;
      //   const distance = targetTop - currentTop;
      //   let count = 0;
      //   const interval = setInterval(() => {
      //     count++;
      //     const scrollTop = currentTop + (distance * count) / step;
      //     chat.scrollTop = scrollTop;
      //     if (count >= step) {
      //       clearInterval(interval);
      //     }
      //   }, intervalTime);
      // }
      //以下ChatGPTによる
      const chat = document.getElementById("chat");
      const target = document.getElementById("chat" + String(mode - 1));
      const duration = 1000; // スクロールを完了するまでの時間（ミリ秒）
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      const currentTop = chat.scrollTop;
      const distance = targetTop - currentTop;
      let startTime = null;
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) ** 2 + 1;
      };
      const scrollToTarget = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const scrollAmount = easeInOutCubic(elapsedTime / duration) * distance;
        chat.scrollTop = currentTop + scrollAmount;
        if (elapsedTime < duration) {
          window.requestAnimationFrame(scrollToTarget);
        } else {
          chat.scrollTop = targetTop;
        }
      };
      window.requestAnimationFrame(scrollToTarget);
    }
  }, 400);
}
//ターミナル上コミットテスト
