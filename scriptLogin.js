//ロード時の動作
window.onload = function () {
  document.querySelector("#register").style.display = "none";
  BGImageAndPE(3, 0); //初期値
  BGImageAndPE(1, 1); //初期値
};

//スプレッドシートよりユーザー情報取得   2023/04/19(水) 有田海斗
// 大学メールより，解析されるかチェック   2023.04.19(水)　山口慶大
let userData = [];
const user_data =
  "https://script.googleusercontent.com/macros/echo?user_content_key=ydyEHK8czyCc0jLK0TgZEiRuQBgyM-2Dz0EvzKOxVSlYM56vZkg0USLplu3CKh1xbMcHneVwybB6IV2zsWeI72QyT3b7tttMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGzl-GvM2UdVp6gcd4UZQRZGH0gnNSEyzYxYcpcmcrlYrA-6whO6UGa8tfedmGPKMaPYOu-T2iV7AZlj6JTuX8N3UVRQ8fw829z9Jw9Md8uu&lib=Myv0raDKCsIQD01rt9rFOEDnQ_tEriaYy";
fetch(user_data)
  .then((response) => response.json())
  .then((data) => {
    userData = data;
  })
  .catch((error) => {
    showError("ユーザー情報の取得に失敗しました.", error);
  });

//データベースとのログイン情報照合処理．　2023.04.21(金)　有田海斗
let flag = false;
function loginBtn() {
  const email = document.getElementsByClassName("email");
  const password = document.getElementsByClassName("password");

  if (email[0].value == "" || password[0].value == "") {
    //入力不備がある場合は実行しない．
  } else {
    for (var i = 0; i < userData.length; i++) {
      flag = false;
      if (email[0].value == userData[i]["Mail"]) {
        if (password[0].value == userData[i]["Password"]) {
          showMessage("IDとPASSが一致しました．");
          //ログイン処理
          //アクセスコード生成　2023年4月25日　有田海斗

          //アクセスコードをデータベースに書き込み．　2023年4月25日　有田海斗
          var access_code = console.log(
            (Math.random() + 1).toString(36).substring(2) +
              (Math.random() + 1).toString(36).substring(2) +
              (Math.random() + 1).toString(36).substring(2)
          );
          var url =
            "https://script.google.com/macros/s/AKfycbzluX4FeB8T-SLIC-cXbEQX3hbEmcJgNlC5S5Zt8KO94Q2gE-tmKiQk_5JLk587po6v/exec" +
            "?col=" +
            (i + 2) +
            "&value=" +
            encodeURIComponent(access_code);
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.send();

          //アクセスコードを用いてページ遷移．　2023年4月25日　有田海斗
          location = "index.html?user=" + access_code;

          studentIDAndGradeAnalysis(userData[i]["Mail"]);
        } else {
          flag = true;
        }
      } else {
        flag = true;
      }
    }
    if (flag == true) {
      showError("メールアドレスかパスワードが間違っています．");
    }
  }
}

//新規登録 データベース書き込み処理．　2023.04.21(金)　有田海斗
function registerBtn() {
  const email = document.getElementsByClassName("email");
  const password = document.getElementsByClassName("password");
  const username = document.getElementsByClassName("username");

  if (
    email[1].value == "" ||
    password[1].value == "" ||
    username[0].value == ""
  ) {
    //入力不備がある場合は実行しない．
  } else if (email[1].value.indexOf("@st.tachibana-u.ac.jp") == -1) {
    //大学のメールアドレスかチェック．
    showError("大学から付与されたメールアドレスを入力してください.");
  } else {
    let Analysis = studentIDAndGradeAnalysis(email[1].value);
    var data = {
      Mail: email[1].value,
      Password: password[1].value,
      Name: username[0].value,
      Undergraduate: Analysis[0],
      Department: Analysis[1],
      Grade: Analysis[2],
      BackGround: "0",
      ParallaxEffect: "1",
    }; // POSTするデータを定義
    var url =
      "https://script.google.com/macros/s/AKfycbx9FQI6LbVNUAthnwX_iRxY8vOQTUdyIxoBU5vLh35G0khyGT2V4AyO2oKl07z0fhxB/exec";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {});
    showMessage("登録しました．\nログインしてください．");

    //ログインタブへ切り替え
    document.querySelector("#register").style.display = "none";
    document.querySelector("#login").style.display = "block";

    //データベース再読み込み
    const user_data =
      "https://script.googleusercontent.com/macros/echo?user_content_key=ydyEHK8czyCc0jLK0TgZEiRuQBgyM-2Dz0EvzKOxVSlYM56vZkg0USLplu3CKh1xbMcHneVwybB6IV2zsWeI72QyT3b7tttMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGzl-GvM2UdVp6gcd4UZQRZGH0gnNSEyzYxYcpcmcrlYrA-6whO6UGa8tfedmGPKMaPYOu-T2iV7AZlj6JTuX8N3UVRQ8fw829z9Jw9Md8uu&lib=Myv0raDKCsIQD01rt9rFOEDnQ_tEriaYy";
    fetch(user_data)
      .then((response) => response.json())
      .then((data) => {
        userData = data;
      })
      .catch((error) => {
        showError("ユーザー情報の取得に失敗しました.", error);
      });
  }
}

//viewOnlyボタンが押された時の動作
function viewOnly() {
  Swal.fire({
    icon: "question",
    title: "閲覧モードに移行しますか?",
    footer: "スレッド作成や書き込みはできません．",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) location = "index.html";
  });
}

//学籍番号から，学部学科と学年を解析する関数
//学部・学科・学年の3つをリターンするように改良．　2023.04.21(金)　有田海斗
function studentIDAndGradeAnalysis(UniEmail) {
  const str = UniEmail.replace("@st.tachibana-u.ac.jp", "");
  var yearCount = new Date().getFullYear() - 2000;
  const faculty = {
    1020: "文学部/日本語日本文学科",
    1030: "文学部/歴史学科",
    1041: "文学部/歴史遺産学科",
    2010: "国際英語学部/国際英語学科",
    3110: "発達教育学部/児童教育学科",
    4010: "総合心理学部/総合心理学科",
    5011: "現代ビジネス学部/経営学科",
    5020: "現代ビジネス学部/都市環境デザイン学科",
    5510: "経済学部/経済学科",
    5610: "経営学部/経営学科",
    6010: "工学部/情報工学科",
    6020: "工学部/建築デザイン学科",
    7010: "看護学部/看護学科",
    9020: "健康科学部/心理学科",
    9030: "健康科学部/理学療法学科",
    9035: "健康科学部/作業療法学科",
    9040: "健康科学部/救急救命学科",
    9050: "健康科学部/臨床検査学科",
  };

  const grade = { 0: "１", 1: "２", 2: "３", 3: "４" };
  //console.log(grade[yearCount - (str.charAt(5) + str.charAt(6))]);
  //console.log(
  var Number =
    faculty[str.charAt(1) + str.charAt(2) + str.charAt(3) + str.charAt(4)];
  //);

  var Undergraduate = Number.substr(0, Number.indexOf("/"));
  var Department = Number.substr(Number.indexOf("/") + 1);

  if (Undergraduate == "" || Department == "") {
    showError("学籍番号に誤りがあります.");
  } else {
    return [
      Undergraduate,
      Department,
      grade[yearCount - (str.charAt(5) + str.charAt(6))],
    ];
  }
}
