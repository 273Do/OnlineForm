//閲覧モード状態   2023/04/23(日) 山口慶大
var viewOnly = 1;
//ロード時の動作
window.onload = function () {
  document.querySelector("#searchByTitle").style.display = "none";
  document.querySelector("#searchByTag").style.display = "none";
  document.querySelector("#page2").style.display = "none";
  viewOnly == 1
    ? (document.querySelector("#view").style.display = "block")
    : (document.querySelector("#view").style.display = "none");

  // BGImageAndPE(userData[i]["BackGround"], 0);
  // BGImageAndPE(userData[i]["ParallaxEffect"], 1);
};

//スプレッドシートよりスレッド取得   2023/04/14(金) 有田海斗
var tN = 0; //threadNumber
var threadsStorage = []; //全スレッドのタイトル等が格納されています．
var trueThreadsStorage = []; //Thread_ID以外の属性が結合されたものが格納されています．
const thread_data =
  "https://script.googleusercontent.com/macros/echo?user_content_key=ydyEHK8czyCc0jLK0TgZEiRuQBgyM-2Dz0EvzKOxVSlYM56vZkg0USLplu3CKh1xbMcHneVwybB6IV2zsWeI72QyT3b7tttMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGzl-GvM2UdVp6gcd4UZQRZGH0gnNSEyzYxYcpcmcrlYrA-6whO6UGa8tfedmGPKMaPYOu-T2iV7AZlj6JTuX8N3UVRQ8fw829z9Jw9Md8uu&lib=Myv0raDKCsIQD01rt9rFOEDnQ_tEriaYy";
fetch(thread_data)
  .then((response) => response.json())
  .then((data) => {
    //全スレッドを取得して配列に格納   2023/04/22(土) 山口慶大
    data.forEach((e) => {
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
var commentStorage = [];
//スプレッドシートよりコメント取得   2023/04/14(金) 有田海斗
const comment_data =
  "https://script.googleusercontent.com/macros/echo?user_content_key=uoiLJpNMrkCOAp5IIK76u-KjE4N96ZOkS2-fSWELPgQm6aNBB2221RkZ8s6VbWbib9VNO5Z9RHXFSoqWUKT0jgZXu3oRryp5m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGuuznB-1IVpCXuAToq9M0yxLmkNOn5llonehqecMTTRAfF2BN7E4sN-PXF_7N_2rBSFR8ef2l8D0KVixp1OCr1d1jzQiNN_Idz9Jw9Md8uu&lib=MMVbT_xkc9qZI94DtOPrtwTnQ_tEriaYy";
fetch(comment_data)
  .then((response) => response.json())
  .then((data) => {
    for (var i = 0; i < data.length; i++) {
      commentStorage.push(data[i]);
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
    //リファクタリングを行いました．(今後，スレッド番号による変更がありそうなのでコメント化しています．)   2023.04.23(日)　山口慶大
    //  data.forEach((e) => {
    //   commentStorage.push(e);
    //   chat_load +=
    //     '<div class="commentDetail"> <li class="chatDetail1">' +
    //     e["Wrote_Name"] +
    //     "(" +
    //     e["Undergraduate"] +
    //     " " +
    //     e["Department"] +
    //     " " +
    //     e["Grade"] +
    //     "回生)" +
    //     '</li> <li class="chatDetail2">' +
    //     e["date(yyyy/mm/dd)"] +
    //     "　" +
    //     e["time(hh:mm:dd)"] +
    //     '</li> <li class="comment">' +
    //     e["Comment"] +
    //     "</li> </div>";
    // });
    document.getElementById("chat").innerHTML = chat_load;
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
  let testName = "たち　ばな";
  let testEmail = "a600000000@st.tachibana-u.ac.jp";
  Swal.fire({
    title: "YourAccount",
    // toast: "true",
    backdrop: "none",
    html: "アカウント名：" + testName + "<br>メールアドレス：" + testEmail,
    footer:
      "<p onclick=changeAccountDate() style='cursor:pointer'>変更はこちら</p>",
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
    2: "searchByComment",
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
//アカウント情報の変更　　2023/04/23(日) 山口慶大
//バリデーションチェックはまだ
function changeAccountDate() {
  Swal.fire({
    title: "ChangeAccountDate",
    input: "checkbox",
    html: '<select name="example" class="swal2-input" id="changeContents"><option value="select" selected disabled>Select contents▼</option><option value="Username">Username</option><option value="Password">Password</option></select><input type="text" class="swal2-input" id="changeAccount">',
    backdrop: "none",
    inputPlaceholder: "ChangeYourAccountDate?",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) return "You need to agree.";
      else if (document.getElementById("changeAccount").value == "")
        return "入力欄が空です．";
      else if (document.getElementById("changeContents").value == "select")
        return "項目が選択されていません．";
      else {
        console.log(
          document.getElementById("changeContents").value,
          document.getElementById("changeAccount").value
        );
        showMessage("変更しました．");
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
        ? console.log(
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
      else console.log(searchThread(result, "Undergraduate"));
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
      else console.log(searchThread(result, "Department"));
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
      else console.log(searchThread(result, "Grade"));
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
  console.log(searchThread("エラー用のワード", "0")); //エラー出力
  console.log(searchComment("ゲーム"));
  console.log(searchComment("エラー用のワード")); //エラー出力
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
  if (output.length == 0)
    showError("スレッドが見つかりませんでした．", "検索：" + words);
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
  if (output.length == 0)
    showError("コメントが見つかりませんでした．", "検索：" + words);
  else return output;
}
